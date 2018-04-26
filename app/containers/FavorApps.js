import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions} from '../utils'
import {AppsList} from '../components/List/AppsList'


@connect(({appList}) => ({...appList}))
export default class FavorApps extends Component {


  componentDidMount() {
    this.props.dispatch({
      type: 'appList/getFavorApps',
      payload: {
        pageNo: 1
      }
    })
  }

  render() {
    const {favorApps, fetching} = this.props
    return <AppsList
      Apps={favorApps}
      fetching={fetching}
      onPressItem={(App) =>
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'AppDetail',
            params: {api: App},
          })
        )
      }/>

  }
}

