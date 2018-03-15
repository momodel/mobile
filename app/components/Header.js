import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Text
} from 'react-native'

export const HearderRightV = ({onPressFavor, isFavor, starNum = 102, favorNum = 569}) => {
  return <View
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: "center"
    }}
  >
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <TouchableOpacity
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
        }}
      >
        <Image
          style={{width: 15, height: 15, tintColor: 'grey'}}
          source={require('../images/navigation/thumb_up.png')}
        />

      </TouchableOpacity>

      <Text style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5
      }}>
        {starNum}
      </Text>

    </View>

    <View style={{
      display: 'flex',
      flexDirection: 'row',
    }}>
      <TouchableOpacity
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
        }}
        onPress={onPressFavor}
      >
        <Image
          style={{
            width: 20, height: 20,
            tintColor: isFavor ? "blue" : "grey"
          }}
          source={require('../images/navigation/star.png')}
        />

      </TouchableOpacity>

      <Text style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 5
      }}>
        {favorNum}
      </Text>
    </View>
  </View>

}

export const HearderRight = ({onPressFavor, isFavor, starNum = 102, favorNum = 569}) => {
  return <View
    style={{
      display: 'flex',
      flexDirection: 'row',
    }}
  >
    <TouchableOpacity
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
      }}
    >
      <Image
        style={{width: 15, height: 15, tintColor: 'grey'}}
        source={require('../images/navigation/thumb_up.png')}
      />

    </TouchableOpacity>

    <Text style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10
    }}>
      {starNum}
    </Text>

    <TouchableOpacity
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
      }}
      onPress={onPressFavor}
    >
      <Image
        style={{
          width: 20, height: 20,
          tintColor: isFavor ? "blue" : "grey"
        }}
        source={require('../images/navigation/star.png')}
      />

    </TouchableOpacity>

    <Text style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10
    }}>
      {favorNum}
    </Text>


  </View>

}
