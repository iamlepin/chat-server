import React from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router-dom'
import Header from '../../components/Header'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import Home from '../../components/Home'
import SignIn from '../../components/SignIn'
import SignUp from '../../components/SignUp'
import RedirectPage from '../../components/RedirectPage'
import { HOME, SIGN_IN, SIGN_UP, REDIRECT } from '../../constants/routes'
import withFaceBookApi from '../../components/LoginWithFB'
// import Movies from './Movies'
// import WatchList from './WatchList'
import './App.css'

const { Content, Footer } = Layout

const breadcrumbPathLinks = ['home', 'login']

const App = (props) => (
  <Layout className="layout">
    <Header {...props} />
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

export default withFaceBookApi(App)
