import React from 'react'
import { AppRegistry } from 'react-native'
import {NavigationActions} from 'react-navigation'
import {Toast} from 'antd-mobile'

import dva from './utils/dva'
import Router from './router'

import appModel from './models/app'
import routerModel from './models/router'
import apiModel from './models/api'
import apiListModel from './models/apiList'
import requestModel from './models/request'
import requestsModel from './models/requests'



const app = dva({
  initialState: {},
  models: [appModel, routerModel, apiModel, apiListModel, requestModel, requestsModel],
  onError(e, dispatch) {
    console.log('onError', e)
    console.log('onError', e.response)

    // const {status} = e.response
    // if (e && status === 422) {
    //   // 跳转到登陆页面
    //   dispatch(NavigationActions.navigate({ routeName: 'LoginNav' }))
    //   // dispatch(
    //   //   NavigationActions.navigate({
    //   //     routeName: 'Login',
    //   //   })
    //   // )
    //   Toast.fail('请登录', 1)
    //   e.preventDefault();
    // }

  },
})

const App = app.start(<Router />)

AppRegistry.registerComponent('DvaStarter', () => App)
