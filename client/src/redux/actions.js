import * as types from './actionTypes.js'
import * as socket from '../socket/'



export const addTodo = content => {
  socket.addTodo(content)
  // on spinner
  return {
    type: types.SET_TODO_SPINNER,
    payload: {
      addTodoSpinner: true
    }
  }
}

export const addTodoR = ({ id, content, completed }) => {
  // off spinner
  return {
    type: types.ADD_TODO_R,
    payload: { id, content, completed }
  }
}

export const setTodoSpinner = val => ({
  type: types.SET_TODO_SPINNER,
  payload: {
    addTodoSpinner: val
  }
})

export const toggleTodo = id => {
  socket.toggleTodo(id)
  return {
    type: types.TOGGLE_TODO,
    payload: {
      id
    }
  }
}

export const delTodo = id => {
  socket.delTodo(id)
  return {
    type: types.DEL_TODO,
    payload: { id }
  }
}

export const setFilter = filter => ({
  type: types.SET_FILTER,
  payload: {
    filter
  }
})

export const setAllTodos = todos => ({
  type: types.SET_ALL_TODOS,
  payload: {
    todos
  }
})

export const setPage = p => {
  socket.allTodosPag(p)
  return {
    type: types.SET_PAGE,
    payload: { p }
  }
}