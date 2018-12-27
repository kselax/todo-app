import { combineReducers } from 'redux'

import todos from './todos'
import visibilityFilter from './visibilityFilter'
import spinners from './spinners'

export default combineReducers({ todos, visibilityFilter, spinners })