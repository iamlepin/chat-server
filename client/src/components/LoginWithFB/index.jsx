import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { setUserInfo, clearUserInfo } from '../../actions/userInfo'
import { loadFacebookSDK } from './utils'

const withFaceBookApi = (WrappedComponent) => class extends Component {
  static propTypes = {
    setUserInfo: PropTypes.func.isRequired,
    clearUserInfo: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    // if (this.props.userInfo) { return }
    loadFacebookSDK(this.updateUserInfo)
  }

  updateUserInfo = (resp) => {
    const { status, authResponse: { expiresIn, accessToken } } = resp
    console.log('​extends -> updateUserInfo -> resp', resp)

    if (status === 'connected') {
      window.FB.api('/me?fields=name,picture', (response) => {

         // post { id, name } If id exists in db response with account id, token
        console.log('Good to see you, ', response);
        const userData = {
          // add account id and token
          thirdPartyAuth: {
            type: 'face-book',
            ...response,
            accessToken,
            expiresIn,
          },
        }
        this.props.setUserInfo(userData)
      })
    } else {
      this.props.clearUserInfo()
    }
  }

  render() {
    return <WrappedComponent {...this.props} />
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
