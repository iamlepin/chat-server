import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Row, Form, Icon, Input, Button, Checkbox, message, Divider } from 'antd'
import nodeApi from '../../api'
import { trimValue } from '../../utils'
import { USER_NAME } from '../../constants/regexp'
import FaceBookButton from '../FaceBookButton'
import './SignIn.css'

const FormItem = Form.Item

class SignIn extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.error()
      } else {
        console.log('Received values of form: ', values)
        const { userName: name, password, remember } = values
        const body = {
          name,
          password,
          remember,
        }
        nodeApi.loginUser(body)
          .then((response) => {
            message.success(response.message)
          })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { userInfo } = this.props
    return (
      <Row type="flex" justify="center">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Divider orientation="left">Login with your account</Divider>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [
                {
                  required: true,
                  message: 'Please input your username!',
                },
                {
                  min: 4,
                  max: 16,
                  pattern: USER_NAME,
                  transform: trimValue,
                  message: 'User name must be between 4 and 16 characters and contains letters, numbers and symbols like - _ .',
                },
              ],
              validateTrigger: 'onBlur',
            })(<Input
              prefix={
                <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Username"
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' },
              ],
            })(<Input
              prefix={
                <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type="password"
              placeholder="Password"
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            {!userInfo.id && (
              <Fragment>
                <Divider orientation="left">Login with FaceBook</Divider>
                <Row>
                  <FaceBookButton />
                </Row>
              </Fragment>
            )}
            Or <Link to="/signup">register now!</Link>
          </FormItem>
        </Form>
      </Row>
    )
  }
}

const MSTP = (state) => ({
  userInfo: state.userInfo,
})

export default compose(
  connect(MSTP, null),
  Form.create(),
)(SignIn)
