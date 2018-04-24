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
import {Header} from "../components/Header"
import {Cube} from '../components/Cube'

@connect(({api, app}) => ({api, app}))
export default class AppDetail extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.api.name
  })


  // help function, 判断是否收藏
  isFavor() {
    const {favor_users = []} = this.props.api.app
    const user_id = _.get(this.props.app.login, '[response][user][_id]', null)
    return favor_users.includes(user_id)
  }

  isStar() {
    const {star_users = []} = this.props.api.app
    const user_id = _.get(this.props.app.login, '[response][user][_id]', null)
    return star_users.includes(user_id)
  }

  componentDidMount() {
    // 获取 api 详情
    this.props.dispatch({
      type: "api/getApi",
      payload: {
        api_id: this.props.navigation.state.params.api._id
      }
    })
  }

  renderCubes = () => {

  }

  render() {
    const {
      name,
      description,
      doc,
      create_time,
      // input_type = [],
      // output_type = [],
      tags = [],
      category = [],
      user,
      user_ID,
      _id,
      args,
      star_users = [],
      favor_users = []
    } = this.props.api.app

    let inputTypes = []
    let outputTypes = []


    if(args){
      const {input, output} = args
      inputTypes = _.map(input, (value, key)=> value.value_type)
      outputTypes = _.map(output, (value, key)=> value.value_type)
      // 筛选
      inputTypes = inputTypes.filter(function (item, index, self) {
        return self.indexOf(item) === index;

      });

      outputTypes = outputTypes.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      });

    }

    return (
      <View style={{flex: 1, backgroundColor: "white"}}>
        <ScrollView
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.container}>
            <Header title={name}
                    create_time={create_time}
                    starNum={star_users.length}
                    favorNum={favor_users.length}
                    onPressStar={() => {
                      this.props.dispatch({
                        type: "api/starApi",
                        payload: {
                          api_id: _id
                        }
                      })
                    }}

                    onPressFavor={() => {
                      this.props.dispatch({
                        type: "api/favorApi",
                        payload: {
                          api_id: _id
                        }
                      })
                    }}
                    isFavor={this.isFavor()}
                    isStar={this.isStar()}
            />

            <View style={{height: 1, backgroundColor: "#E7E7E7",
              width: "100%", marginTop: 5, marginBottom: 5}}/>

            <View style={{flexDirection: "row", padding: 10}}>
              <Cube title="输入" content={inputTypes}/>
              <Cube title="输出" content={outputTypes}/>
              {/*<Cube title="分类" content={category}/>*/}
              <Cube title="发布者" content={user_ID} type="text"/>
            </View>

            <View style={{height: 1, backgroundColor: "#E7E7E7",
              width: "100%", marginTop: 0, marginBottom: 5}}/>

            <View style={{padding: 10}}>
              {/*<Text style={{marginTop: 10, marginBottom: 10, fontSize: 20}}>*/}
                {/*应用描述*/}
              {/*</Text>*/}
              <Text style={{lineHeight: 20}}>{description}</Text>
              <Text>{doc}</Text>
            </View>


            <View style={{flexDirection: "row", padding: 10}}>
              {(tags || tags.length === 0) ?tags.map(tag => <Tag key={tag}>{tag}</Tag>): <Tag key={"tag"}>无标签</Tag>}
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
                NavigationActions.navigate({
                  routeName: 'Predict',
                  params: {title: this.props.navigation.state.params.api.name}
                })
              )
            }}
            disabled={args === undefined}
          >
            立即使用
          </Button>
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

