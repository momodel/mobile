import React, {Component} from 'react'
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {NavigationActions} from '../utils'
import {AppItem} from '../components/Item/AppItem'
import {CustomFlatList} from '../components/CustomFlatList'

@connect(({favorApps}) => ({...favorApps}))
export default class FavorApps extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'favorApps/getFavorApps',
      payload: {
        pageNo: 1
      }
    })
  }

  _renderItem = ({item}) => {
    return <AppItem
      key={item._id}
      App={item}
      onPress={(App) =>
        this.props.dispatch(
          NavigationActions.navigate({
            routeName: 'AppDetail',
            params: {api: App},
          })
        )
      }
    />
  }

  render() {
    const {favorApps, refreshing, loadingMore, pageNo, noMore} = this.props
    return (
      <CustomFlatList
        dataItems={favorApps}
        // state={this.state}
        renderItem={this._renderItem}
        noMore={noMore} loadingMore={loadingMore} refreshing={refreshing}
        onEndReached={(distanceFromEnd) => {
          this.props.dispatch({
            type: 'favorApps/loadingMoreFavorApps',
            payload: {
              pageNo: pageNo + 1
            }
          })
        }}
        onRefresh={() => this.props.dispatch({
          type: 'favorApps/getFavorApps',
          payload: {
            pageNo: 1
          }
        })}
      />
    )

  }


  // render() {
  //   const {favorApps, fetching} = this.props
  //
  //   return <AppsList
  //     Apps={favorApps}
  //     // fetching={fetching}
  //     {...this.props}
  //
  //     onPressItem={(App) =>
  //       this.props.dispatch(
  //         NavigationActions.navigate({
  //           routeName: 'AppDetail',
  //           params: {api: App},
  //         })
  //       )
  //     }/>
  //
  // }
}

