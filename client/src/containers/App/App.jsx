import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router-dom'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import Home from '../../components/Home'
import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'
import RedirectPage from '../../components/RedirectPage'
import { HOME, SIGN_IN, SIGN_UP, REDIRECT } from '../../constants/routes'
import { storage } from '../../utils/common'
import { loadFacebookSDK, updateUserInfo } from '../../utils/faceBook'
import { setUserInfo } from '../../actions/userInfo'
// import Movies from './Movies'
// import WatchList from './WatchList'
// import './App.scss'

const { Content, Footer } = Layout

const breadcrumbPathLinks = ['home', 'login']

const restoreUserLoginState = (params) => {
  const storedUserInfo = storage.get('userInfo')
  if (storedUserInfo) {
    switch (storedUserInfo.profileType) {
      case 'app-account':
        updateUserInfo({ ...params, userInfo: storedUserInfo })
        break
      case 'face-book':
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
            <Route path={SIGN_IN} component={SignIn} />
            <Route path={SIGN_UP} component={SignUp} />
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
  {
    setUserInfo,
  }
)(App)
