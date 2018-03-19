import React, {Component} from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native'
import {connect} from 'react-redux'
import {Button, Toast} from 'antd-mobile'
import _ from 'lodash'
import {ApiCard, NoMoreCard, MoreCard} from '../../components/ApiCard'
import {WebChatId} from './WebChat'
import {getApiList} from '../../services/api'
import {getfavorApps} from '../../services/user'
import {NavigationActions} from '../../utils'


@connect(({app}) => ({...app}))
export default class ApiList extends Component {
  constructor(props) {
    super(props)
    this.pageNo = 1
    this.keyWord = ''
    this.state = {
      apiList: null,
      displayText: null,
      // result: false
      hasMore: false,
      showButton: true
    }
  }

  componentWillMount() {
    const {steps, get_type} = this.props

    // 如果上一步是apilist, 则获取其页码
    let pageNo = _.get(this.props, "[previousStep][value][pageNo]", null)
    if (pageNo) {
      this.pageNo = this.props.previousStep.value.pageNo
    }

    if (get_type === "chat") {
      this.keyWord = steps[WebChatId.requirement.input].value
    }
    else if (get_type === "favor") {
    }

    // fetch
    const result = this.getApiList()

    this.props.triggerNextStep({
      trigger: WebChatId.message.input,
      value: {
        pageNo: this.pageNo + 1
      }
    })

  }

  isFavor(favor_users = []) {
    const user_id = _.get(this.props.login, '[response][user][_id]', null)
    return favor_users.includes(user_id)
  }

  getApiList() {
    // 根据get_type 判断调用那个api
    let apiFunc
    if (this.props.get_type === "chat") {
      apiFunc = getApiList
    } else {
      apiFunc = getfavorApps
    }
    const result = apiFunc(
      {keyword: this.keyWord, pageNo: this.pageNo},
      res => {},
      // 成功回调
      res => {
        const {objects, count, page_no, page_size} = res.response
        if (res.message) {
          this.setState({
            displayText: res.message
          })
          Toast.fail(res.message)
        }
        else {
          if (objects.length !== 0) {
            this.setState(
              {
                apiList: objects,
                hasMore: count > page_no * page_size
              },
            )
          } else {
            // 如果是空的
            this.setState({
              displayText: "你还没有收藏任何服务，点击服务右上角收藏按钮，收藏服务"
            })
            // Toast.fail('没有更多了')
          }
        }
      },
      // 失败回调
      res => {
        this.setState(
          {
            displayText: '对不起，你的需求未匹配到任何服务',
          },
          () =>
            this.props.triggerNextStep({
              trigger: WebChatId.failed.requirement_failed_select,
            })
        )
      }
    )
  }

  render() {
    const {apiList, displayText} = this.state
    return apiList ? (
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
        >
          {apiList.map(api => {
              const {favor_users} = api
              const favor_num = favor_users.length

              return <ApiCard
                app={api}
                key={api._id}
                isFavor={this.isFavor(favor_users)}
                onPress={() =>
                  this.props.dispatch(
                    NavigationActions.navigate({
                      routeName: 'AppDetail',
                      params: {api},
                    })
                  )
                }
              />
            }
          )}
          {
            this.state.hasMore ? (this.state.showButton && <MoreCard onPress={() => {
                // 判断 get_type 确定去哪
                this.props.triggerNextStep({
                  trigger: this.props.get_type === "chat" ? WebChatId.requirement.search : "favor_api_list",
                  value: {
                    pageNo: this.pageNo
                  }
                })

                this.setState({showButton: false})
              }}/>) :
              <NoMoreCard onPress={() => {
                console.log("this.props", this.props)
                this.props.triggerCustomOption({
                  value: 2,
                  label: '发布需求',
                  trigger: "createUserRequest", // WebChatId.asking.text,
                  borderColor: 'yellow',
                })
              }}/>
          }
        </ScrollView>
      </View>
    ) : (
      <Text> {displayText} </Text>
    )
  }
}
