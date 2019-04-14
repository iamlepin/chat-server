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
    <ConnectedRouter history={history}>
      <ChatProvider>
        <Route path="/" component={App} />
      </ChatProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
