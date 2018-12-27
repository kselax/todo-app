import React from 'react'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'

import './todoListStyle.css'
import { getTodosByFilter, getTotal } from '../redux/selectors'
import Todo from './Todo'
import { setPage } from '../redux/actions.js'

class TodoList extends React.Component {

  handlePageClick = (data) => {
    this.props.setPage(Number(data.selected) + 1 )
  }

  render() {
    const todos = this.props.todos
    const total = this.props.total
    return (
      <div className="todo-list">
      <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={total}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
        <ul className="todo-list">
          {todos && todos.length
            ? todos.map((todo, index) => (
              <Todo key={index} todo={todo} />))
            : "doesn't exists"}
        </ul>
      </div>
    )
  }
}

const mapPropsToState = state => {
  const { visibilityFilter } = state
  const todos = getTodosByFilter(state, visibilityFilter)
  const total = getTotal(state)
  return { todos, total }
}

export default connect(mapPropsToState, { setPage })(TodoList)