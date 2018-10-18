import React from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs'
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
// import Movies from './Movies';
// import WatchList from './WatchList';
import './App.css'

const { Content, Footer } = Layout

const breadcrumbPathLinks = ['home', 'login']

const App = (props) => (
  <Layout className="layout">
    <Header {...props} />
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumbs links={breadcrumbPathLinks} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route render={() => <h2>404 not found!!! sorry</h2>} />
      </Switch>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
)

export default App
// import React from 'react';
// import PropTypes from 'prop-types';
// import { Switch, Route } from 'react-router-dom';
// import Header from './Header';
// import Home from './Home';
// import About from './About';
// import Movies from './Movies';
// import WatchList from './WatchList';

// const App = props => (
//   <div >
//     <Header {...props} />
//     <Switch>
//       <Route exact path="/" component={Home} />
//       <Route path="/about" component={About} />
//       <Route path="/movies" component={Movies} />
//       <Route path="/watch-list" component={WatchList} />
//       <Route render={() => <h2>404 not found!!! sorry</h2>} />
//     </Switch>
//   </div>
// );

// App.propTypes = {
//   location: PropTypes.instanceOf(Object).isRequired,
// };

// export default App;
