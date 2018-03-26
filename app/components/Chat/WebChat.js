/**
 * 智能机器人对话
 *
 * 把 props 放到component will mount 的state里可以只在第一次触发的时候出现内容，之后更改props，块可以不刷新
 * id 命名规则：
 * {n}_text 文本展示
 * {n}_input 用户输入
 * {n}_select 用户选择
 * {n}_api 后台服务发起
 *
 *
 */
import React, {Component} from 'react'
import {ThemeProvider} from 'styled-components'
import ChatBot from '../../package/rn-chatbot/lib/ChatBot'
import ApiList from './ApiList'
import Intent from './Intent'
import CreateUserRequest from './CreateUserRequest'

const theme = {
  // background: "red", //'#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#aa0000',
  //themeColor["custom-dark-purple"],
  headerFontColor: '#fff',
  headerFontSize: '309px',
  botBubbleColor: '#aa0000',
  //themeColor["custom-dark-purple"],
  botFontColor: 'red',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
}

export const WebChatId = {
  message: {
    hello: 'hello',
    desc: 'desc',
    desc1: 'desc1',

    input: 'input',
    intent: 'intent',
    apiList: 'message_apiList',
    request: 'message_request',
  },
  functionSelect: {
    text: 'functions_text',
    select: 'functions_select',
  },

  requirement: {
    text: 'requirement_text',
    input: 'requirement_input',
    // select: "requirement_select",
    search: 'requirement_search',
    api_detail: 'api_detail',
    api_result: 'api_result',
  },

  asking: {
    text: 'asking_text',
    input: 'asking_input',
    api: 'asking_api',
  },

  failed: {
    requirement_failed_select: 'requirement_failed_select',
    not_opened: '服务暂未开放',
    can_not_recognize: "无法识别",
  },
}

export const optionStep = {
  id: WebChatId.functionSelect.select,
  options: [
    {
      value: 1,
      label: '使用平台服务',
      trigger: WebChatId.requirement.text,
      borderColor: 'yellow',
    },
    {
      value: 2,
      label: '发布需求',
      trigger: "createUserRequest", // WebChatId.asking.text,
      borderColor: 'yellow',
    },

    {
      value: 6,
      label: '我发布的需求',
      // trigger: "createUserRequest", // WebChatId.asking.text,
      borderColor: 'yellow',
      route: "Requests"
    },

    {
      value: 3,
      label: '我收藏的服务',
      trigger: "favor_api_list",
      borderColor: 'white',
    },

    {
      value: 4,
      label: '夫妻脸',
      trigger: WebChatId.failed.not_opened,
      borderColor: 'white',
    },
    {
      value: 5,
      label: '购物推荐',
      trigger: WebChatId.failed.not_opened,
      borderColor: 'white',
    },

  ],
}
/**
 * 保存 webChat id
 * */

function finalSteps() {
  const start = [
    // introduction text
    {
      id: WebChatId.message.hello,
      message: '欢迎使用小蓦语音助手，有什么我可以帮助你的吗',
      //'你好，欢迎来到MO机器学习平台。',
      trigger: WebChatId.message.input,
    },
    // {
    //   id: WebChatId.message.desc,
    //   message: 'MO平台将会帮助你轻松的使用机器学习的各种工具。',
    //   trigger: WebChatId.message.desc1,
    // },
    // {
    //   id: WebChatId.message.desc1,
    //   message: '机器人服务现在只支持普通用户（使用服务的非开发者）',
    //   trigger: WebChatId.message.input,
    // },
    {
      id: WebChatId.message.apiList,
      message: '下面数小蓦为你精选的几个应用，快来试试吧',
      trigger: WebChatId.requirement.search,
    },

    {
      id: WebChatId.message.input,
      user: true,
      trigger: WebChatId.message.intent,
      validator: value => {
        if (value.trim() === '') {
          return '输入不能为空'
        }
        return true
      },
    },

    {
      id: WebChatId.message.intent,
      component: <Intent/>,
      waitAction: true,
    },

    {
      id: "custom_message",
      message: ({previousValue}) => `${previousValue}`,
      trigger: WebChatId.message.hello,
    },

    /*********** 分割线  **********/

    // functions select
    // {
    //   id: WebChatId.functionSelect.text,
    //   message: '请选择下列功能: ',
    //   trigger: WebChatId.functionSelect.select,
    // },
    // {
    //   id: WebChatId.functionSelect.select,
    //   options: [
    //     {
    //       value: 1,
    //       label: '使用平台服务',
    //       trigger: WebChatId.requirement.text,
    //     },
    //     // {value: 2, label: '我要提问', trigger: WebChatId.asking.text},
    //
    //     // {value: 3, label: '查看我的收藏', trigger: WebChatId.asking.text},
    //     // {value: 4, label: '查看我的使用历史', trigger: WebChatId.asking.text},
    //   ],
    // },

    // 服务暂未开放
    {
      id: WebChatId.failed.not_opened,
      message: '该服务暂未开放',
      trigger: WebChatId.message.hello,
    },

    // // 匹配服务失败时
    // {
    //   id: WebChatId.failed.requirement_failed_select,
    //   options: [
    //     {value: 1, label: '重新告知需求', trigger: WebChatId.requirement.text},
    //     {value: 2, label: '我要提问', trigger: WebChatId.asking.text},
    //   ],
    // },
  ]

  const requirement = [
    {
      id: WebChatId.requirement.text,
      message: '请告诉我你的需求？',
      trigger: WebChatId.requirement.input,
    },
    {
      id: WebChatId.requirement.input,
      user: true,
      trigger: WebChatId.requirement.search, //WebChatId.message.apiList,
      validator: value => {
        if (value.trim() === '') {
          return '输入不能为空'
        }
        return true
      },
    },
    {
      // display api list or go to asking (api list)
      id: WebChatId.requirement.search,
      component: <ApiList get_type="chat"/>,
      waitAction: true,
      // asMessage: true,
    },

    {
      // display api list or go to asking (api list)
      id: "favor_api_list",
      component: <ApiList get_type="favor"/>,
      waitAction: true,
      // asMessage: true,
    },
    // {
    //   id: WebChatId.requirement.api_detail,
    //   component: <ShowApiDetail/>,
    //   waitAction: true,
    //   trigger: WebChatId.requirement.api_result,
    //   asMessage: true
    // },
    // {
    //   id: WebChatId.requirement.api_result,
    //   message: ({ previousValue, steps }) => `result: ${previousValue}`,
    //   trigger: WebChatId.functionSelect.text,
    // },

    // {
    //   id: WebChatId.requirement.api_result,
    //   component: <Result/>,
    //   waitAction: true,
    //   trigger: WebChatId.functionSelect.text,
    //   asMessage: true
    // },
  ]
  //
  const asking = [
    {
      id: "createUserRequest",
      message: '请选择你要创建的需求类型',
      trigger: 'createUserRequest1',
    },
    {
      id: "createUserRequest1",
      options: [
        { value: 1, label: 'App',  trigger: "createUserRequestApp"},
        { value: 2, label: 'Module',  trigger: "createUserRequestModule" },
        { value: 3, label: 'DataSet',  trigger: "createUserRequestDataSet" },
      ],
    },

    {
      id: "createUserRequestApp",
      component: <CreateUserRequest type='app'/>,
    },

    {
      id: "createUserRequestModule",
      component: <CreateUserRequest type='module'/>,
    },

    {
      id: "createUserRequestDataSet",
      component: <CreateUserRequest type='dataset'/>,
    },

    //
    // {
    //   id: WebChatId.asking.text,
    //   message: '请输入你的问题？',
    //   trigger: WebChatId.asking.input,
    // },
    //
    // {
    //   id: WebChatId.asking.input,
    //   user: true,
    //   trigger: WebChatId.asking.api,
    //   validator: value => {
    //     if (value.trim() === '') {
    //       return '输入不能为空'
    //     }
    //     return true
    //   },
    // },
    //
    // {
    //   // 使用提问api
    //   id: WebChatId.asking.api,
    //   component: <Asking/>,
    //   waitAction: true,
    //   trigger: WebChatId.functionSelect.text,
    //   asMessage: true,
    // },
  ]

  return [
    ...start,
    ...requirement,
    ...asking
  ]
}

class WebChat extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          // floating={true}
          headerTitle="MO平台机器人"
          // recognitionEnable={true}
          placeholder="请输入你的问题"
          steps={finalSteps()}
          //steps={uiSteps}
          hideUserAvatar
          hideBotAvatar
          botDelay={100}
          userDelay={10}
          botBubbleColor="white"
          botFontColor="black"
          // customStyle={{"background-color": "red"}}
          userBubbleColor='#ffe695'
          // userFontColor=''
        />
      </ThemeProvider>
    )
  }
}

export default WebChat
