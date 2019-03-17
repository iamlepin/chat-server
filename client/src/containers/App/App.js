import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router-dom'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import Home from '../../components/Home'
import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'
import Chat from '../../components/Chat'
import UsersList from '../../components/UsersList'
import RedirectPage from '../../components/RedirectPage'
import { HOME, SIGN_IN, SIGN_UP, REDIRECT, CHAT, USERS, CHAT_LIST } from '../../constants/routes'
import { storage } from '../../utils/common'
import { updateUserInfo } from '../../utils/user'
import { loadFacebookSDK } from '../../utils/faceBook'
import { setUserInfo } from '../../actions/userInfo'
import { USER_INFO, FACE_BOOK, APP_ACCOUNT } from '../../constants/common'
import ChatsList from '../../components/ChatsList'
// import './App.scss'

const { Content, Footer } = Layout

const breadcrumbPathLinks = ['home', 'login']

const restoreUserLoginState = (params) => {
  const storedUserInfo = storage.get(USER_INFO)
  if (storedUserInfo) {
    switch (storedUserInfo.profileType) {
      case APP_ACCOUNT:
        updateUserInfo({ ...params, userInfo: storedUserInfo })
        break
      case FACE_BOOK:
        loadFacebookSDK({ ...params, userInfo: storedUserInfo })
        break
      default:
        break
    }
  }
}

class App extends Component {
  componentDidMount = () => {
    const { setUserInfo, logoutUser } = this.props
    restoreUserLoginState({ setUserInfo, logoutUser })
  }

  render () {
    return (
      <Layout className="layout">
        <Header {...this.props} />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumbs links={breadcrumbPathLinks} />
          <Switch>
            <Route exact path={HOME} component={Home} />
            <Route path={USERS} component={UsersList} />
            <Route path={SIGN_IN} component={SignIn} />
            <Route path={SIGN_UP} component={SignUp} />
            <Route path={CHAT} component={Chat} />
            <Route path={CHAT_LIST} component={ChatsList} />
            <Route path={REDIRECT} render={(props) => <RedirectPage {...props} />} />
            <Route render={() => <h2>404 not found!!! sorry</h2>} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    )
  }
}

export default connect(
  null,
  { setUserInfo }
)(App)
