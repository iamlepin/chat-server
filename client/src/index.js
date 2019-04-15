import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker'
import ChatProvider from './components/ChatProvider'
import App from './containers/App'
import './index.scss'

ReactDOM.render(
  <Provider store={store}>
    <ChatProvider>
      <ConnectedRouter history={history}>
        <Route path="/" component={App} />
      </ConnectedRouter>
    </ChatProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
