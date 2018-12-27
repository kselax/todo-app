import React from 'react'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'

import './addTodoStyle.css'
import { addTodo } from '../redux/actions.js'
import { getAddTodoSpinner } from '../redux/selectors.js'

class AddTodo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { input: '' }
  }

  hOnChange = (e) => {
    this.setState({ input: e.target.value })
  }

  hOnClick = () => {
    this.props.addTodo(this.state.input)
    this.setState({ input: '' })
  }

  render() {
    return (
      <div className="add-todo">
        <input
          value={this.state.input}
          onChange={this.hOnChange}
        />
        <button
          onClick={this.hOnClick}
        >Add Todo</button>
        {this.props.addTodoSpinner &&
          <div className="spin">
            <Spinner name='rotating-plane' />
          </div>}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const addTodoSpinner = getAddTodoSpinner(state)
  return { addTodoSpinner }
}

export default connect(mapStateToProps, { addTodo })(AddTodo)