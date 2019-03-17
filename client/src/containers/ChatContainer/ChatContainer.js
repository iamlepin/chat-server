import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Avatar, List, message as antdMsg, Row, Col } from 'antd'
import nodeApi from '../../api/index'
import PropTypes from 'prop-types'
import { of } from '../../utils/common';
import Chat from '../../components/Chat';
import ChatsList from '../../components/ChatsList';
import { REDIRECT } from '../../constants/routes'

class ChatContainer extends React.Component {
  state = {
    data: [],
  }

  // componentDidMount = async () => {
  //   const { data, error, message } = await of(nodeApi.getChatsList())

  //   if (error) {
  //     antdMsg.error(message)
  //   } else {
  //     this.setState({ data })
  //   }
  // }


  render () {
    const { match } = this.props

    return (
      <Switch>
        <Route path={`${match.path}/:userId`} component={Chat} />
        <Route path={match.path} component={ChatsList} />
        <Redirect
          to={{
            path: REDIRECT,
            state: {
              message: 'Sorry! Chat not found.',
            },
          }}
        />
      </Switch>
    )
  }
}

ChatContainer.propTypes = {

}

export default ChatContainer
