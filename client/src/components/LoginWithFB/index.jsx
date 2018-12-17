import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { setUserInfo, clearUserInfo } from '../../actions/userInfo'
import { loadFacebookSDK } from './utils'

const withFaceBookApi = (WrappedComponent) => {

  return class extends Component {
    static propTypes = {
      setUserInfo: PropTypes.func.isRequired,
      clearUserInfo: PropTypes.func.isRequired,
    }

    componentDidMount = () => {
      loadFacebookSDK(this.updateUserInfo)
    }

    updateUserInfo = ({ status }) => {
      console.log("​LoginWithFB -> updateUserInfo -> updateUserInfo")

      if (status === 'connected') {
        window.FB.api('/me', (response) => {
          console.log('Good to see you, ', response.name);
          this.props.setUserInfo(response)
        })
      } else {
        this.props.clearUserInfo()
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

withFaceBookApi.propTypes = {
  component: PropTypes.any,
}

const MSTP = (state) => ({
  userInfo: state.userInfo,
})

const MDTP = {
  setUserInfo,
  clearUserInfo,
}

export default compose(
  connect(MSTP, MDTP),
  withFaceBookApi,
)
