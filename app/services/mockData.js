const apiList = [
  {
    _id: '5a61abeb81a4431145fffb29',
    description: '预测航班延误信息',
    domain: 'http://192.168.31.6:5000',
    fake_response: '晴天',
    http_req: 'GET',
    input: {
      body: {
        date_time: {
          type: 'datetime',
          value: null,
        },
        flight_no: {
          type: 'str',
          value: null,
        },
      },
    },
    keyword: '预测 天气',
    name: '预测天气',
    output: {},
    score: 0.329,
    status: 0,
    url: '/predict_weather',
  },
  {
    _id: '5a60942dd845c07dfc8b7259',
    description: '预测航班延误信息',
    domain: 'http://192.168.31.6:5000',
    fake_response: '预计延迟3小时',
    http_req: 'GET',
    input: {
      body: {
        date_time: {
          type: 'datetime',
          value: null,
        },
        flight_no: {
          type: 'str',
          value: null,
        },
      },
    },
    keyword: '预测 航班 延误',
    name: '预测航班延误',
    output: {},
    score: 0.196,
    status: 0,
    url: '/predict_flight_delay',
  },

  {
    _id: '5a60942dd845c07dfc8b72591',
    description: '预测航班延误信息',
    domain: 'http://192.168.31.6:5000',
    fake_response: '预计延迟3小时',
    http_req: 'GET',
    input: {
      body: {
        date_time: {
          type: 'datetime',
          value: null,
        },
        flight_no: {
          type: 'str',
          value: null,
        },
      },
    },
    keyword: '预测 航班 延误',
    name: '预测航班延误',
    output: {},
    score: 0.196,
    status: 0,
    url: '/predict_flight_delay',
  },
  {
    _id: '5a60942dd845c07dfc8b72592',
    description: '预测航班延误信息',
    domain: 'http://192.168.31.6:5000',
    fake_response: '预计延迟3小时',
    http_req: 'GET',
    input: {
      body: {
        date_time: {
          type: 'datetime',
          value: null,
        },
        flight_no: {
          type: 'str',
          value: null,
        },
      },
    },
    keyword: '预测 航班 延误',
    name: '预测航班延误',
    output: {},
    score: 0.196,
    status: 0,
    url: '/predict_flight_delay',
  },

  {
    _id: '5a60942dd845c07dfc8b72594',
    description: '预测航班延误信息',
    domain: 'http://192.168.31.6:5000',
    fake_response: '预计延迟3小时',
    http_req: 'GET',
    input: {
      body: {
        date_time: {
          type: 'datetime',
          value: null,
        },
        flight_no: {
          type: 'str',
          value: null,
        },
      },
    },
    keyword: '预测 航班 延误',
    name: '预测航班延误',
    output: {},
    score: 0.196,
    status: 0,
    url: '/predict_flight_delay',
  },

  {
    _id: '5a60942dd845c07dfc8b72593',
    description: '预测航班延误信息',
    domain: 'http://192.168.31.6:5000',
    fake_response: '预计延迟3小时',
    http_req: 'GET',
    input: {
      body: {
        date_time: {
          type: 'datetime',
          value: null,
        },
        flight_no: {
          type: 'str',
          value: null,
        },
      },
    },
    keyword: '预测 航班 延误',
    name: '预测航班延误',
    output: {},
    score: 0.196,
    status: 0,
    url: '/predict_flight_delay',
  },
]

export { apiList }
