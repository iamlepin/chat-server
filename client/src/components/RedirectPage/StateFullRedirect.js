import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { HOME } from '../../constants/routes'
import './RedirectPage.scss'

const StateFullRedirect = ({ message, delay, link, history }) => {
  const redirect = () => {
    setTimeout(
      () => history.replace(link),
      delay * 1000
    )
  }

  redirect()

  return (
    <Row className="redirect-page" type="flex" justify="center">
      <Col>
        <p>
          {message}
        </p>
        <p>
          You will be redirected in few seconds...
        </p>
      </Col>
    </Row>
  )
}

StateFullRedirect.propTypes = {
  message: PropTypes.string,
  delay: PropTypes.number,
  link: PropTypes.string,
  history: PropTypes.object.isRequired,
}

StateFullRedirect.defaultProps = {
  message: '',
  delay: 3,
  link: HOME,
}

export default StateFullRedirect
