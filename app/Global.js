import avatar1 from './images/avatar/1.png'
import avatar2 from './images/avatar/2.png'
import avatar3 from './images/avatar/3.png'
import avatar4 from './images/avatar/4.png'
import avatar5 from './images/avatar/5.png'
import avatar6 from './images/avatar/6.png'

const Global = {
  // localhost
  // URL: 'http://localhost:5005',
  // URL: 'http://192.168.31.4:5005',
  // production
  URL: 'http://192.168.31.7:5005',
  MOCK: false,
  // production (demo)
  // URL: "http://10.52.22.196:3080",

  version: "0.1.1",
  // text font
  titleFontSize: 15,
  titleFontSizeBig: 18,
  titleFontSizeBigBig: 22,
  textFontSize: 12,
  timeFontSize: 9,
  headerFontSize: 15,
  buttonFontSize: 30,
  // color
  orange: '#e14b06',
  grey: '#e8eaeb',
  black: 'black',
  yellow: '#f4f2e3',
  lightBlue: '#6EB0F1',
  blue: '#2f5694',
  lightGrey: '#eeeeee',

  titleColor: 'black',
  textColor: 'grey',

  oldColor: ['#f08099', '#f4bb6c', '#57a5f1', '#8fe0ba'],
  // height width
  headerHeight: 50,

  //* ***************
  myOrange: '#e14b06',
  myGray: '#e8eaeb',
  myBlack: 'black',

  fetchTimeInterval: 3600 * 1000, // 1 hour

  py_type_to_antd_components: {
    "str": "text",
    "int": "number",
    "float": "digit",
    "datetime": "datetime",
    "image": {},
  },

  py_type_to_image: {
    datetime: require('./images/icons/py_type/date.png'),
    float: require('./images/icons/py_type/number.png'),
    "img": require('./images/icons/py_type/image.png'),
    "int": require('./images/icons/py_type/number.png'),
    "str": require('./images/icons/py_type/text.png'),
  },

  py_type_to_form: {
    'int': 'Number',
    'str': 'String',
    "float": "number",
    'datetime': 'Date',
    "image": {},
  },

  avatarList: [avatar1,avatar2,avatar3,avatar4,avatar5,avatar6]

}
module.exports = Global
