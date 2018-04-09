import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {UsedAppItem} from '../components/Item'
import {NavigationActions} from '../utils'

@connect(({appList}) => ({...appList}))
export default class UsedApps extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'appList/getUsedApps'
    })
  }

  render() {
    const {usedApps} = this.props
    return (
        <View

          // keyboardShouldPersistTaps="always"
          >
          {usedApps.map(usedApp => (
            <UsedAppItem
              key={usedApp._id}
              usedApp={usedApp}
              onPress={() =>
                this.props.dispatch(
                  NavigationActions.navigate({
                    routeName: 'AppDetail',
                    params: {api: usedApp.app_obj},
                  })
                )
              }
            />
          ))}
        </View>

    )
  }
}
