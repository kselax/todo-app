import io from 'socket.io-client'
import { bindActionCreators } from 'redux'
import store from '../redux/store'

import * as Actions from '../redux/actions.js'

const actions = bindActionCreators(Actions, store.dispatch)
const socket = io('http://localhost:3002')



socket.on('allTodosPag', (res) => {
  actions.setAllTodos(res)
})

socket.on('addTodoR', (res) => {
  actions.addTodoR(res)
  actions.setTodoSpinner(false)
})

export const allTodosPag = p => {
  const query = `{ allTodosPag(p: "${p}") }`
  socket.emit('allTodosPag', query)
}

export const addTodo = content => {
  const query = `mutation{ 
    addTodo(content: "${content}"){ 
      id 
      content 
      completed 
    } 
  }`
  socket.emit('addTodo', query)
}

export const toggleTodo = id => {
  const query = `mutation { 
    toggleTodo(id: "${id}" ) 
  }`
  socket.emit('toggleTodo', query)
}

export const delTodo = id => {
  const query = `mutation {
    delTodo(id: "${id}")
  }`
  socket.emit('delTodo', query)
}