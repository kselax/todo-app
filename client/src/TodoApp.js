import React from 'react'

import './style.css'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import VisibilityFilter from './components/VisibilityFilter'


const TodoApp = () => {
  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      <AddTodo />
      <VisibilityFilter />
      <TodoList />
    </div>
  )
}

export default TodoApp