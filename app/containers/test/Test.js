// import React, {Component} from 'react'
// import ImagePicker from 'react-native-image-picker'
// import {View, Text, TouchableOpacity, Image, ImageBackground} from 'react-native'
// import {Icon} from 'antd-mobile'
// import ImageContainer from "../package/rn-chatbot/lib/steps/text/ImageContainer"
//
// var options = {
//   title: '选择图片',
//   customButtons: [
//     {name: 'fb', title: 'Choose Photo from Facebook'},
//   ],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images'
//   }
// }
//
//
// export default class ImagePickerExample extends React.Component {
//   state = {
//     response: ""
//   }
//
//   onClick = () => {
//     ImagePicker.showImagePicker(options, (response) => {
//
//       if (response.didCancel) {
//         console.log('User cancelled image picker')
//       }
//       else if (response.error) {
//         console.log('ImagePicker Error: ', response.error)
//       }
//       else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton)
//       }
//       else {
//         this.setState({
//           response
//         })
//         // let source = {uri: response.uri}
//
//         // You can also display the image using data:
//         // let source = { uri: 'data:image/jpeg;base64,' + response.data };
//
//         // this.setState({
//         //   avatarSource: source
//         // })
//       }
//     })
//   }
//
//   onSegChange = (e) => {
//     const index = e.nativeEvent.selectedSegmentIndex
//     this.setState({
//       multiple: index === 1,
//     })
//   }
//
//   _onDeleteImagePressed = () => {
//     this.setState({
//       response: ""
//     })
//   }
//
//   render() {
//     const {response} = this.state
//     return (
//       <View>
//
//         {
//           response ?
//
//             <ImageBackground
//               // key={`resizeImage${i}`}
//               source={{uri: response.uri}}
//               style={{ width: 100,
//                 height: 100,
//                 marginBottom: 30,}}
//             >
//               <TouchableOpacity
//                 underlayColor="#ffa456"
//                 // activeOpacity={0.9}
//                 // style={{ borderRadius: 8,padding: 6,marginTop:5}}
//                 style={{
//                   backgroundColor: 'transparent',
//                   opacity: 0.5,
//                   justifyContent: 'flex-end',
//                   alignItems: 'flex-end',
//                 }}
//                 onPress={
//                   this._onDeleteImagePressed
//                 }
//               >
//                 <Icon type="cross" size="md" color="white" />
//               </TouchableOpacity>
//             </ImageBackground>
//             :
//             < TouchableOpacity
//               onPress={this.onClick}
//               style={{
//                 width: 100, height: 100,
//                 justifyContent:"center",
//                 alignItems: "center",
//                 // boxSizing: "border-box",
//                 // borderRadius: 3,
//                 // border: "1pX solid #ddd",
//                 backgroundColor: "#fff",
//               }}
//             >
//               <Image style={{width: 50, height: 50}} source={require("../images/icons/add.png")}/>
//             </TouchableOpacity>
//
//         }
//
//
//       </View>
//     )
//   }
// }
//
// const ResultItem = ({keyIn, defaultValue, value}) => {
//   const {value_type} = defaultValue
//   if (value_type==='img'){
//     return (
//       <View style={{display: "flex", justifyContent: 'center', marginTop: 10}}>
//         <Text style={{fontSize: 20, color: "black"}}>
//           {keyIn}:
//         </Text>
//         {
//           value? <Image style={{width: 100, height: 50,
//               resizeMode: "contain", borderWidth: 1, borderColor: 'red'}}
//                         source={{uri: value}}/>
//             : <Text>
//               图片
//             </Text>
//         }
//       </View>
//     )
//   }else{
//     return (
//       <View style={{display: "flex", justifyContent: 'center', marginTop: 10}}>
//         <Text style={{fontSize: 20, color: "black"}}>
//           {keyIn}:
//         </Text>
//
//         <View style={{
//           backgroundColor: '#F5F5F5',
//           padding: 10, display: "flex",
//           alignItems: "center", justifyContent: 'center',
//           marginTop: 5,
//           height: 80
//         }}>
//           <Text style={{fontSize: 25, color: "#759DF2"}}>
//             {value}
//           </Text>
//         </View>
//       </View>
//     )
//   }
//
//
// }
//
// const DEFAULT_OPTIONS = {
//   title: 'Select a Photo',
//   cancelButtonTitle: 'Cancel',
//   takePhotoButtonTitle: 'Take Photo…',
//   chooseFromLibraryButtonTitle: 'Choose from Library…',
//   quality: 1.0,
//   allowsEditing: false,
//   permissionDenied: {
//     title: 'Permission denied',
//     text: 'To be able to take pictures with your camera and choose images from your library.',
//     reTryTitle: 're-try',
//     okTitle: 'I\'m sure',
//   }
// };
