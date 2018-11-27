import React from "react"
import { Row, Form, Icon, Input, Button, message } from "antd"
import { EMAIL, USER_NAME, PASSWORD } from '../../constants/regexp'
import { trimValue } from '../../utils'
import nodeApi from "../../api"
import "./SignUp.css"

const FormItem = Form.Item

class SignUp extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.error('Error while validating data!')
        message.error('Please fill all fields correctly.')
      } else {
        console.log('TCL: handleSubmit')
        const { userName: name, email, password } = values
        const body = {
          name,
          email,
          password
        }
        console.log("Received body of form: ", values)
        nodeApi.addUser(body)
          .then(data => data && message.success(data.message))
          .catch(err => {
            console.log(err)
            message.error(err)
          })
      }
    })
  }

  checkUserNameExistence = (rule, value, callback) => {
    if (!trimValue(value)) { return callback('Please enter your username!')}
    nodeApi.checkUserName(value)
      .then(({ error }) => {
        if (error) {
          console.log('Username exists.')
          message.error('Username already registered.')
          callback('Username already registered.')
        } else {
          console.log('Username is available for registration.')
          callback()
        }
      })
      .catch(err => console.log(err))
  }

  checkUserMailExistence = (rule, value, callback) => {
    if (!trimValue(value)) { return callback('Please enter your email!')} // fix
    nodeApi.checkUserEmail(value)
      .then(({ error }) => {
        if (error) {
          console.log('Email exists.')
          message.error('Email already registered.')
          callback('Email already registered.')
        } else {
          console.log('Email is available for registration.')
          callback()
        }
      })
      .catch(err => console.log(err))
  }

  validatePasswordMatch = (rule, value, callback) => {
    const { getFieldValue, validateFields } = this.props.form
    const confirm = trimValue(getFieldValue('confirm'))
    const isConfirmEmpty = !confirm
    if (isConfirmEmpty) { return callback()}
    validateFields([ 'confirm' ], { force: true })
    callback()
  }

  validateConfirmMatch = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    const password = trimValue(getFieldValue('password'))
    const confirm = trimValue(getFieldValue('confirm'))
    const isPassEmpty = !password
    if (isPassEmpty) { return callback()}
    const isNotEqual = password !== confirm
    if (isNotEqual) {
      callback('Confirm doesn\'t match password!')
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Form onSubmit={this.handleSubmit} className="register-form">
          <FormItem hasFeedback >
            {getFieldDecorator('userName', {
              rules: [
                {
                  required: true,
                  min: 4,
                  max: 16,
                  pattern: USER_NAME,
                  transform: trimValue,
                  message: 'User name must be between 4 and 16 characters and contains letters, numbers and symbols like - _ .'
                },
                {
                  transform: trimValue,
                  validator: this.checkUserNameExistence,
                },
              ],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  pattern: EMAIL,
                  transform: trimValue,
                  message: 'Email must be valid email address.'
                },
                {
                  transform: trimValue,
                  validator: this.checkUserMailExistence,
                },
              ],
            })(<Input prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />} type="email" placeholder="Mail" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your password!' },
                {
                  min: 6,
                  max: 16,
                  pattern: PASSWORD,
                  message: 'Password must be between 6 and 16 characters and must contain at least one lowercase letter, one uppercase letter and one numeric digit.'
                },
                { validator: this.validatePasswordMatch },
              ],
            })(<Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="Password" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                { required: true, message: 'Please repeat your password!' },
                { validator: this.validateConfirmMatch },
              ],
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="register-form-button">
              Sign Up
            </Button>
          </FormItem>
        </Form>
      </Row>
  }
}

export default Form.create()(SignUp)
