import React from 'react';
import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  itemWithImageContainer: {
    flexDirection: "row",
    margin: 8,
    padding: 3,
    backgroundColor: 'white',

    borderRadius: 5,
    shadowColor: 'grey',
    shadowOffset: {h: 2, w: 2},
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  itemContainer: {
    display: 'flex',
    padding: 3,
    margin: 8,
    // alignItems: 'center',
    backgroundColor: 'white',

    borderRadius: 5,
    shadowColor: 'grey',
    shadowOffset: {h: 2, w: 2},
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  title: {
    padding: 10,
    marginTop: -10
  },
  datetime: {
    padding: 10,
  },

  text: {
    alignItems: 'center',
    margin: 5,
  },
})

module.exports = styles;
