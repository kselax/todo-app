import * as types from '../actionTypes.js'

const initialState = {
  addTodoSpinner: false,
}

export default function(state = initialState, action) {
  switch (action.type) {

    case types.SET_TODO_SPINNER: {
      return {
        ...state,
        addTodoSpinner: action.payload.addTodoSpinner
      }
    }

    default:
      return state

  }
}