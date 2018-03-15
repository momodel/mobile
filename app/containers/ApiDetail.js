import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {Button, Tag, Text,} from 'antd-mobile'
import {connect} from 'react-redux'
import {NavigationActions} from '../utils'
import _ from 'lodash'
import {HearderRight} from "../components/Header"

@connect(({api, app}) => ({api, app}))
export default class ApiDetail extends Component {
  // help function, 判断是否收藏
  isFavor() {
    const {favor_users=[]} = this.props.api.app
    const user_id = _.get(this.props.app.login, '[response][user][_id]', null)
    return favor_users.includes(user_id)
  }

  componentDidMount() {
    _this = this
    // 获取 api 详情
    this.props.dispatch({
      type: "api/getApi",
      payload: {
        api_id: this.props.navigation.state.params.api._id
      }
    })
  }

  render() {
    const {
      name,
      description,
      doc,
      create_time,
      input_type=[],
      output_type=[],
      tags=[],
      category=[],
      user,
      _id,
      args
    } = this.props.api.app
    return (
      <View style={{flex: 1, backgroundColor: "white"}}>
        <ScrollView
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.container}>
            <Header title={name} create_time={create_time}
                    onPressFavor={() => {
                      this.props.dispatch({
                        type: "api/favorApi",
                        payload: {
                          api_id: _id
                        }
                      })
                    }}
                    isFavor={this.isFavor()}
            />

            <View style={{flexDirection: "row", padding: 10}}>
              <Cube title="输入" content={input_type}/>
              <Cube title="输出" content={output_type}/>
              <Cube title="分类" content={category}/>
              <Cube title="发布者" content={user} type="text"/>
            </View>

            <View style={{padding: 10}}>
              <Text style={{marginTop: 10, marginBottom: 10, fontSize: 20}}>
                应用描述
              </Text>

              <Text style={{lineHeight: 20}}>{description}</Text>

              <Text>{doc}</Text>
            </View>

            <View style={{flexDirection: "row", padding: 10}}>
              {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </View>

          </View>
        </ScrollView>


        <View style={styles.footer}>
          <Button
            type="primary"
            style={{
              width: 300,
              margin: 10,
            }}
            onClick={() => {
              this.props.dispatch(
                NavigationActions.navigate({routeName: 'Predict'})
              )
            }}
            disabled={args===undefined}
          >
            立即使用
          </Button>
        </View>
      </View>
    )
  }

}

const Header = ({title, create_time, onPressFavor, isFavor}) => {
  return (
    <View style={{padding: 10}}>
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
        <Text style={{fontSize: 25}}>
          {title}
        </Text>
        <HearderRight {...{onPressFavor, isFavor}}/>
      </View>
      <Text style={{fontSize: 15, color: "grey", marginTop: 10}}>
        发布于{create_time}
      </Text>
    </View>
  )
}



const Cube = ({title, content, type = "icon"}) => {
  if (type === 'icon') {
    let dic = {
      "image": require('../images/icons/favor.png'),
      "int": require('../images/icons/user.png'),
      "str": require('../images/icons/user.png'),
    }
    return (
      <View style={{
        margin: 10, alignItems: "center", justifyContent: "center",
        flex: 0.25
      }}>
        <Text style={{height: 40}}>
          {title}
        </Text>

        <View style={{flexDirection: "row",height: 40}}>

          {content&&content.map(e =>
            <Image
              key={e}
              style={{
                width: 21, height: 21, tintColor: "grey"
              }}
              source={dic[e]}
            />
          )}
        </View>
      </View>
    )
  }
  else {
    return (
      <View style={{
        margin: 10, alignItems: "center", justifyContent: "center",
        flex: 0.25
      }}>
        <Text style={{height: 40}}>
          {title}
        </Text>
        <View style={{flexDirection: "row", height: 40}}>
          <Text>{content}</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 32,
    height: 32,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

})

@connect(({api, app}) => ({api, app}))
export class ApiDetailUI extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '应用详情',
  })

  render() {
    // 从apiList 直接传过来
    const {
      name,
      description,
      doc = 'aaa',
      create_time,
      input_type,
      output_type,
      tags,
      category,
      user

    } = {
      name: "健康咨询",
      create_time: "昨天23：12",
      input_type: ["image", "int"],
      output_type: ["str"],
      category: ["health"],
      user: "bingwei",
      description: "国家版权局表示，将继续积极推动网络音乐各方遵守版权法律法规、市场规则和国际惯例，通过优质服务、公平竞争、差异化发展，建立完善规范有序、持续发展的网络音乐授权、运营模式 ，促进网络音乐产业繁荣健康发展。 2015年底，国家版权局组织开展网络音乐版权秩序专项整治行动，规范网络音乐盗版。但由于没有行政介入，统一的收费标准，各大平台又担心用户流失，以致没有愿意当第一个吃螃蟹的人。尽管该政策得到唱片公司与音乐人的一众支持。“听歌要钱了”一时间成了“谣言”。",
      doc: "xxx",
      tags: ["交通", "生活"],
    }

    return (
      <View style={{flex: 1}}>

        {/*<HearderRight />*/}
        <ScrollView>
          <View style={styles.container}>

            <Header title={name} create_time={create_time}/>

            <View style={{flexDirection: "row", padding: 10}}>
              <Cube title="输入" content={input_type}/>
              <Cube title="输出" content={output_type}/>
              <Cube title="分类" content={category}/>
              <Cube title="发布者" content={user} type="text"/>
            </View>

            <View style={{padding: 10}}>
              <Text style={{marginTop: 10, marginBottom: 10, fontSize: 20}}>
                应用描述
              </Text>

              <Text style={{lineHeight: 20}}>{description}</Text>
              <Text>{doc}</Text>
            </View>

            <View style={{flexDirection: "row", padding: 10}}>
              {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </View>

          </View>
        </ScrollView>


        <View style={styles.footer}>
          <Button
            type="primary"
            style={{
              width: 300,
              margin: 10,
            }}
            onClick={() => {
              this.props.dispatch(
                NavigationActions.navigate({routeName: 'Predict'})
              )
            }}
          >
            立即使用
          </Button>
        </View>
      </View>
    )
  }
}
