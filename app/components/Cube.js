// import React, {Component} from 'react'
// import {
//   StyleSheet,
//   View,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native'
// import {Button, Tag, Text,} from 'antd-mobile'
//
// export const Cube = ({title, content, type = "icon"}) => {
//   if (type === 'icon') {
//     let dic = {
//       "image": require('../images/icons/favor.png'),
//       "int": require('../images/icons/user.png'),
//       "str": require('../images/icons/user.png'),
//     }
//     return (
//       <View style={{
//         margin: 5, alignItems: "center", justifyContent: "center",
//         flex: 1
//       }}>
//         <Text>
//           {title}
//         </Text>
//
//         <View style={{flexDirection: "row", marginTop: 10}}>
//           {content.map(e =>
//             <Image
//               key={e}
//               style={{
//                 width: 21, height: 21, tintColor: "grey"
//               }}
//               source={dic[e]}
//             />
//           )}
//         </View>
//       </View>
//     )
//   }
//   else {
//     return (
//       <View style={{
//         margin: 10, alignItems: "center", justifyContent: "center",
//         flex: 1
//       }}>
//         <Text>
//           {title}
//         </Text>
//
//         <View style={{flexDirection: "row", marginTop: 10}}>
//           <Text style={{fontSize: 20, color: "blue"}}
//           >{content}</Text>
//         </View>
//       </View>
//     )
//   }
// }
