import React from "react";
import { Row, Form, Icon, Input, Button, message } from "antd";
import { EMAIL, USER_NAME, PASSWORD } from '../../constants/regexp'
import { trimValue } from '../../utils'
import { loginUser } from '../../api'
import nodeApi from "../../api";
import "./SignUp.css";

const FormItem = Form.Item;

class SignUp extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.error('Error while validating data!')
        message.error('Please fill all fields.')
      } else {
        console.log('TCL: handleSubmit');
        const { userName: name, email, password } = values;
        const body = {
          name,
          email,
          password
        };
        console.log("Received body of form: ", values);
        nodeApi.addUser(body)
          .then(data => data && message.success(data.message))
          .catch(err => {
            console.log(err);
            message.error(err);
          });
      }
    });
  };

  validatePasswordsMatch = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    const isEqual = value && value === getFieldValue('password')
    if (!isEqual) {
      callback("Passwords doesn't match!");
    };
    callback()
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return <Row style={{ display: "flex", justifyContent: "center" }}>
        <Form onSubmit={this.handleSubmit} className="register-form">
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [
                { required: true, message: "Please input your username!" },
                {
                  min: 4,
                  max: 16,
                  pattern: USER_NAME,
                  transform: trimValue,
                  message: "User name must be between 4 and 16 characters and contains letters, numbers and symbols like - _ ."
                }
              ],
              validateTrigger: "onBlur",
            })(<Input prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />} placeholder="Username" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Please input your email!" },
                {
                  pattern: EMAIL,
                  transform: trimValue,
                  message: "Please input valid email address."
                }
              ],
              validateTrigger: "onBlur",
            })(<Input prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />} type="email" placeholder="Mail" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" },
                {
                  min: 6,
                  max: 16,
                  pattern: PASSWORD,
                  message: "Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number."
                }
              ],
              validateTrigger: "onBlur"
            })(<Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="Password" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("confirmPassword", {
              rules: [
                { required: true, message: "Please repeat your Password!" },
                { validator: this.validatePasswordsMatch },
              ],
              validateTrigger: "onBlur"
            })(<Input prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />} type="password" placeholder="Confirm Password" />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="register-form-button">
              Sign Up
            </Button>
          </FormItem>
        </Form>
      </Row>;
  };
}

export default Form.create()(SignUp);
