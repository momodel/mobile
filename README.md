# MO App for iOS and Android
## 项目描述
MO机器学习平台的手机端，包含iOS和Android

### 功能
1. 语音交互界面
  通过react-native-voice和科大讯飞语音SDK分别实现iOS和Android语音转文字功能。使用react native原生api实现按住录音，松开结束，上滑取消等功能，
2. 智能机器人意图识别
  通过训练好的第三方模型，在后端对用户的文字内容进行意图识别和多轮对话
3. 可视化交互界面
  卡片式的app列表以及各种图形化的机器人对话内容。
4. 平台内app实时调用
  用户可以使用平台内开放的app，如寻找夫妻脸这样的app

用户可以通过告知我想使用平台服务，触发使用app功能，再告知具体app描述如夫妻脸app，得到卡片式的匹配的app列表。通过填写具体app需要的输入以获得输出。

## Scaffolding
react-native-dva-starter as Scaffolding
https://github.com/nihgwu/react-native-dva-starter

## Voice to Text
- [x] using react-native-voice to achieve voice to text function (iOS)
  https://github.com/wenkesj/react-native-voice#example
- [x] voice to text (Android)
  https://github.com/zphhhhh/react-native-speech-iflytek

## Markdown docs
https://github.com/CharlesMangwa/react-native-simple-markdown

- [ ] yarn add react-native-simple-markdown


# TODO
- [x] Voice to Text
- [ ] markdown docs display

# issue
每次npm install之后 styled-components 都会消失
yarn add styled-compyarn global add react-devtoolsonents

试用这个包
https://github.com/zphhhhh/react-native-speech-iflytek
https://github.com/JoaoCnh/react-native-android-voice





# docs

## install

requirement : macOS, xcode, android studio

install node_modules

``yarn``  

run iOS

`` react-native run-ios --simulator="iPhone 7" ``

run Android

``react-native run-android``

## structure

#### overview

- app:  main sourse foldes, include all javascript files
- components:  UI component without state
- container: pages
- images: static image files
- models: model for each page. Store the global state and process the data of this page.
- package:  independent package
- services: restful api to backend
- utils: utils
- Global.js: global constant, include the backend address
- index.js： entry of app, includes error handle and models
- router.js: router of the app

#### detail

- components
  - Chat: 语音聊天机器人UI components
    - ApiList: app 展示列表
  - Item: 所有列表页内单条信息
  - List: 列表页
  - Speech: 语音按钮， 包含第三方包及语音逻辑
  - ApiCard: app 展示列表的卡片
  - CustomFlatList.js： 封装好的可以上拉刷新，下拉加载的列表组件
  - FooterInput.js 语音聊天机器人底部输入，语音切换组件
  - RequestHeader.js
- container
  - Account: 用户账号信息页
  - AppDetail: App详情页
  - Forget: 忘记密码
  - Home：手机端主页， 聊天机器人
  - Message.js： 消息页面
  - Predict.js： 使用app进行预测页面
  - Register.js：注册页面
  - Request.js: 需求页面
  - RequestEdit.js： 更改需求页面
  - Requests.js： 需求列表页面
  - ResetPassword.js： 修改密码页面 
  - UsedApps.js： app 历史记录
  - UserInfo.js： 用户个人信息

- utils
  - request.js: package of fetch
  - theme.js: global theme color

1. important files

