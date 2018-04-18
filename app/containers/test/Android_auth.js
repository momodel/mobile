import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  PermissionsAndroid,
} from 'react-native'

export default class PermissionAndroidView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button_view}
                          onPress={this.requestReadPermission.bind(this)}>
          <Text style={styles.button_text}>申请读写权限</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_view}
                          onPress={this.requestCarmeraPermission.bind(this)}>
          <Text style={styles.button_text}>申请相机权限</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_view}
                          onPress={this.requestLocationPermission.bind(this)}>
          <Text style={styles.button_text}>申请访问地址权限</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_view}
                          onPress={this.checkPermission.bind(this)}>
          <Text style={styles.button_text}>查询是否获取了读写权限</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_view}
                          onPress={this.requestMultiplePermission.bind(this)}>
          <Text style={styles.button_text}>一次申请所以权限</Text>
        </TouchableOpacity>
      </View>
    )
  }

  show(data) {
    ToastAndroid.show(data,ToastAndroid.SHORT)
  }

  /*
  * 弹出提示框向用户请求某项权限。返回一个promise，最终值为用户是否同意了权限申请的布尔值。
  * 其中rationale参数是可选的，其结构为包含title和message)的对象。
  * 此方法会和系统协商，是弹出系统内置的权限申请对话框，
  * 还是显示rationale中的信息以向用户进行解释。
  * */
  async requestReadPermission() {
    try {
      //返回string类型
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          //第一次请求拒绝后提示用户你为什么要这个权限
          'title': '我要读写权限',
          'message': '没权限我不能工作，同意就好了'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.show("你已获取了语音权限")
      } else {
        this.show("获取读写权限失败")
      }
    } catch (err) {
      this.show(err.toString())
    }
  }

  async requestCarmeraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          //第一次请求拒绝后提示用户你为什么要这个权限
          'title': '我要相机权限',
          'message': '没权限我不能工作，同意就好了'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.show("你已获取了相机权限")
      } else {
        this.show("获取相机失败")
      }
    } catch (err) {
      this.show(err.toString())
    }
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          //第一次请求拒绝后提示用户你为什么要这个权限
          'title': '我要地址查询权限',
          'message': '没权限我不能工作，同意就好了'
        }
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.show("你已获取了地址查询权限")
      } else {
        this.show("获取地址查询失败")
      }
    } catch (err) {
      this.show(err.toString())
    }
  }

  checkPermission() {
    try {
      //返回Promise类型
      const granted = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      )
      granted.then((data)=>{
        this.show("是否获取读写权限"+data)
      }).catch((err)=>{
        this.show(err.toString())
      })
    } catch (err) {
      this.show(err.toString())
    }
  }

  async requestMultiplePermission() {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CAMERA
      ]
      //返回得是对象类型
      const granteds = await PermissionsAndroid.requestMultiple(permissions)
      var data = "是否同意地址权限: "
      if (granteds["android.permission.ACCESS_FINE_LOCATION"] === "granted") {
        data = data + "是\n"
      } else {
        data = data + "否\n"
      }
      data = data+"是否同意相机权限: "
      if (granteds["android.permission.CAMERA"] === "granted") {
        data = data + "是\n"
      } else {
        data = data + "否\n"
      }
      data = data+"是否同意存储权限: "
      if (granteds["android.permission.WRITE_EXTERNAL_STORAGE"] === "granted") {
        data = data + "是\n"
      } else {
        data = data + "否\n"
      }
      this.show(data)
    } catch (err) {
      this.show(err.toString())
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button_view: {
    margin:4,
    borderRadius: 4,
    backgroundColor: '#8d4dfc',
    alignItems: 'center',
  },
  button_text: {
    padding: 6,
    fontSize: 16,
    fontWeight: '600'
  }
})
