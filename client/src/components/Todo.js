import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import { toggleTodo, delTodo } from '../redux/actions.js'

const Todo = ({ todo, toggleTodo, delTodo }) => {
  return (
    <li className="todo">
      <span
        className={cx(todo.completed && "completed")}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.content} 
      </span>
      <button onClick={() => delTodo(todo.id)}>del</button>
    </li>
  )
}

export default connect(null, { toggleTodo, delTodo })(Todo)