import React from 'react'
import { Row, Form, Icon, Input, Button, message } from 'antd'
import api from '../../api'
import './SignUp.css'

const FormItem = Form.Item;

const validatePasswordsMatch = (pass1, pass2) => {
  if (pass1 === pass2) {
    return {
      validateStatus: 'success',
      errorMsg: null,
    }
  }
  return {
    validateStatus: 'error',
    errorMsg: 'The prime between 8 and 12 is 11!',
  }
}

class SignUp extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.error('Error while registering user: ' + err)
      } else {
        const { userName: name, email, password } = values
        const body = {
          name,
          email,
          password,
        }
        console.log('Received body of form: ', values)
        api.addUser(body)
          .then(data => message.success(data.message))
          .catch(err => {
            console.error(err)
            message.error(err)
          })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row style={{display: 'flex', justifyContent: 'center'}}>
        <Form onSubmit={this.handleSubmit} className="register-form">
        <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Mail" />
            )}
          </FormItem>
          <FormItem
            hasFeedback
            validateStatus={}
          >
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem
            hasFeedback
            validateStatus={}
          >
            {getFieldDecorator('confirmPassword', {
              rules: [{ required: true, message: 'Please repeat your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm Password" />
            )}
          </FormItem>
          <FormItem>
            {/* {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )} */}
            {/* <a className="register-form-forgot" href="">Forgot password</a> */}
            <Button type="primary" htmlType="submit" className="register-form-button">
              Sign Up
            </Button>
            {/* Or <a href="">register now!</a> */}
          </FormItem>
        </Form>
      </Row>
    );
  }
}

export default Form.create()(SignUp);
