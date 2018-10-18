import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd'

import { NavLink } from 'react-router-dom';
import logo from '../../images/movie-logo.png';


const Header = ({ navLinks }) => (
  <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '32px' }}
    >
      <Menu.Item style={{ borderRadius: '4px', marginRight: '5px' }} key="1">
        <Link to='/'> Home </Link>
      </Menu.Item>
      <Menu.Item style={{ borderRadius: '4px', marginRight: '5px' }} key="2">
        <Link to='/signin'> Sign In </Link>
      </Menu.Item>
    </Menu>
  </Layout.Header>
  // <header>
  //   <nav className="header">
  //     <div className="nav-wrapper">
  //       <a href="/" className="brand-logo brand-logo--header">
  //         <img src={logo} alt="" />
  //       </a>
  //       <ul id="nav-mobile" className="right hide-on-med-and-down">
  //         {navLinks.map((item) => {
  //           if (item.path === '/') {
  //             return (
  //               <li key={item.title}>
  //                 <NavLink exact to={item.path} className="nav-link" activeClassName="nav-link--active" >
  //                   {item.title}
  //                 </NavLink>
  //               </li>
  //             );
  //           }
  //           return (
  //             <li key={item.title}>
  //               <NavLink to={item.path} className="nav-link" activeClassName="nav-link--active" >
  //                 {item.title}
  //               </NavLink>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </div>
  //   </nav>
  // </header>
);

Header.propTypes = {
  navLinks: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
  navLinks: state.navLinks,
});


export default connect(mapStateToProps, null)(Header);
