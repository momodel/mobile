import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, View, Image, Text, ScrollView, TouchableOpacity} from 'react-native'
import {InputItem, List, Tabs, Tag, Button} from 'antd-mobile'
import t from 'tcomb-form-native'

const Form = t.form.Form


@connect(({request}) => ({...request}))
export class RequestEdit extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: {},
      tags: [],
      inputVisible: false,
    }
  }

  componentWillMount() {
    const {title, description, input, output, tags} = this.props
    this.setState({
      value: {
        title: title,
        description,
        input,
        output,

      },
      tags
    })
  }

  onChange = (value) => {
    this.setState({value})
  }

  onSubmit = () => {

    let value = this.refs.form.getValue()
    if (value){
      this.props.dispatch({
        type: "request/updateUserRequest",
        payload: {
          userRequestId: this.props._id,
          description: value.description,
          input: value.input,
          output: value.output,
          tags: this.state.tags
        }
      })

    }

  }

  handleInputChange(e) {
    this.setState({inputValue: e})
  }

  handleInputConfirm(tags) {
    if (this.state.inputValue && tags.indexOf(this.state.inputValue) === -1) {
      tags = [...tags, this.state.inputValue]
      this.setState({ inputValue: undefined, inputVisible: false })
      this.setState({
        tags
      })
      // this.props.dispatch({ type: 'allRequest/setTags', payload: tags })
    }
  }

  showInput() {
    this.setState({inputVisible: true})
    // dispatch({ type: 'upload/showInput' })
  }


  render() {
    let Type = t.struct(
      {
        title: t.String,
        description: t.maybe(t.String),
        input: t.maybe(t.String),
        output: t.maybe(t.String)
      }
    )
    let options = {
      fields: {
        title: {
          editable: false
        }
      }
    }
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          // margin: 5,
          backgroundColor: "white"
        }}
      >
        <Form
          ref="form"
          type={Type}
          options={options}
          value={this.state.value}
          onChange={this.onChange}

        />
        <View style={{flexDirection: "row"}}>
          {
            this.state.tags && this.state.tags.map((tag) => {
              return <Tag closable
                          key={tag}
                          style={{height: 25, margin: 5}}
                          onClose={() => {
                            let tags = this.state.tags
                            tags = tags.filter(oldTag => oldTag !== tag).filter(e => e)
                            this.setState({
                              tags
                            })
                          }}
              >{tag}</Tag>
            })
          }
          {
            this.state.inputVisible ? (
              <InputItem
                type="text"
                size="small"
                style={{width: 78, height: 25, margin: 5}}
                value={this.state.inputValue}
                onChange={(e) => this.handleInputChange(e)}
                // onBlur={() => this.handleInputConfirm(tags)}
                onBlur={() => this.handleInputConfirm(this.state.tags)}
              />
            ) : <Button size="small"
                        // type="dashed"
                        onClick={() => this.showInput()}>+ New Tag</Button>
          }
        </View>
        <Button
          type="primary"
          onClick={this.onSubmit}
          style={{marginTop: 20}}
        >
          提交
        </Button>
      </View>
    )
  }
}

RequestEdit.defaultProps = {
  "id": "5ab3733bd845c005440e04f7",
  "answer_number": 3,
  "category": [],
  "create_time": "2018-03-22 09:11:23.746000",
  "description": "这是一个好问题",
  "star_user": [
    "5a01c3ff0c11f3291b0e5ca9"
  ],
  "status": 0,
  "tags": [
    "问题", "lala"
  ],
  "title_1": "好问题",
  "type": "app",
  "user": "5a01c3ff0c11f3291b0e5ca9",
  "user_ID": "super_user",
  "votes_up_user": []
}

// export default RequestEdit
