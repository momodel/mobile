import React from 'react'
import { AppRegistry } from 'react-native'

import dva from './utils/dva'
import Router from './router'

import appModel from './models/app'
import routerModel from './models/router'
import apiModel from './models/api'
import apiListModel from './models/apiList'
import requestModel from './models/request'



const app = dva({
  initialState: {},
  models: [appModel, routerModel, apiModel, apiListModel, requestModel],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(<Router />)

AppRegistry.registerComponent('DvaStarter', () => App)
