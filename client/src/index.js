import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './socket/'
import store from './redux/store'
import TodoApp from './TodoApp'

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)