import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

import PropTypes from 'prop-types'
const FormItem = Form.Item

import { WebChatId } from './WebChat'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class ShowApiDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: null,
    }
  }
  componentWillMount() {
    const { steps: { [WebChatId.requirement.search]: search } } = this.props
    this.setState({ search })
  }

  render() {
    const { search } = this.state
    return (
      <div>
        <div>你需要填写以下参数</div>
        {search ? (
          <WrappedHorizontalLoginForm
            value={search.value}
            triggerNextStep={this.props.triggerNextStep}
          />
        ) : null}
      </div>
    )
  }
}

ShowApiDetail.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
}

ShowApiDetail.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
}

class UIShowApiDetail extends Component {
  render() {
    // const {steps: {search}} = this.props
    const search = {
      value: {
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
    }
    return (
      <div>
        <div>你需要填写以下参数</div>
        {search ? (
          <WrappedHorizontalLoginForm
            value={search.value}
            triggerNextStep={this.props.triggerNextStep}
          />
        ) : null}
      </div>
    )
  }
}

class HorizontalLoginForm extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        // 补充api input
        const { input, _id } = this.props.value
        for (const key in values) {
          if (values.hasOwnProperty(key)) {
            input.body[key].value = values[key]
          }
        }

        // 发送请求
        fetch(`/pyapi/chat/api_predict`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            input,
            api_id: _id,
          }),
        })
          .then(response => response.json())
          .then(({ response }) => {
            this.props.triggerNextStep({
              value: response,
              trigger: WebChatId.requirement.api_result,
            })
          })
          .catch(() => {
            console.log('error')
          })
      }
    })
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form
    const { value: { input: { body } } } = this.props

    // Only show error after a field is touched.
    const keys = []
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        keys.push({
          key,
          customError: isFieldTouched(key) && getFieldError(key),
        })
      }
    }
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        {keys.map(item => (
          <FormItem
            key={item.key}
            validateStatus={item.customError ? 'error' : ''}
            help={item.customError || ''}
            // label="E-mail"
          >
            {getFieldDecorator(item.key, {
              rules: [
                { required: true, message: `Please input your ${item.key}!` },
              ],
            })(
              <Input
                // prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder={item.key}
              />
            )}
          </FormItem>
        ))}
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            提交
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm)

export { ShowApiDetail, UIShowApiDetail }
