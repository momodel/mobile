import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {UsedAppItem} from '../components/Item'
import {NavigationActions} from '../utils'

@connect(({ appList }) => ({ ...appList }))
export default class AppList extends Component {
  componentDidMount(){
    this.props.dispatch({
      type: 'appList/getUsedApps'
    })
  }

  // gotoApp = () => {
  //   this.props.dispatch(NavigationActions.navigate({ routeName: 'UsedApps' }))
  // }

  render() {
    const {usedApps} = this.props
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="always">
          {usedApps.map(usedApp => (
            <UsedAppItem
              key={usedApp._id}
              usedApp={usedApp}
              onPress={() =>
                this.props.dispatch(
                  NavigationActions.navigate({
                    routeName: 'ApiDetail',
                    params: {api: usedApp.app_obj},
                  })
                )
              }
            />
          ))}
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },

})
