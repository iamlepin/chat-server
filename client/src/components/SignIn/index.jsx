import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Row, Form, Icon, Input, Button, Checkbox, message, Divider } from 'antd'
import { loadFacebookSDK } from '../../utils/faceBook'
import nodeApi from '../../api'
import { trimValue, storage, of } from '../../utils/common'
import { USER_NAME } from '../../constants/regexp'
import FaceBookButton from '../FaceBookButton'
import { setUserInfo, clearUserInfo } from '../../actions/userInfo'
import './SignIn.css'
import { USER_INFO, APP_ACCOUNT } from '../../constants/common'

const FormItem = Form.Item

class SignIn extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    setUserInfo: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    const { logoutUser, setUserInfo } = this.props
    loadFacebookSDK({ setUserInfo, logoutUser })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async(err, values) => {
      if (err) {
        console.error()
      } else {
        const { userName: name, password, remember } = values
        const body = {
          name,
          password,
          remember,
        }

        const { error, message: msg, data } = await of(nodeApi.loginUser(body))

        if (error) {
          message.error(error)
        }
        if (data) {
          const userInfo = { ...data, profileType: APP_ACCOUNT }
          message.success(msg)
          this.props.setUserInfo(userInfo)
          storage.set(USER_INFO, userInfo)
        }
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
            <a className="login-form-forgot" href=""> {/* eslint-disable-line */}
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

const mstp = (state) => ({ userInfo: state.userInfo })

const mdtp = (dispatch) => ({
  setUserInfo: (userInfo) => dispatch(setUserInfo(userInfo)),
  logoutUser: () => {
    storage.remove(USER_INFO)
    dispatch(clearUserInfo())
  },
})

export default compose(
  connect(mstp, mdtp),
  Form.create()
)(SignIn)
