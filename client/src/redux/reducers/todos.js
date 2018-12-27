import * as types from '../actionTypes.js'


const initialState = {
  allIds: [],
  byIds: {},
  total: 0,
}

export default function(state = initialState, action) {
  try {
    switch (action.type) {

      case types.ADD_TODO: {
        const { id, content } = action.payload
        return {
          ...state,
          allIds: [ ...state.allIds, id ],
          byIds: {
            ...state.byIds,
            [id]: {
              completed: false,
              content
            }
          }
        }
      }

      case types.ADD_TODO_R: {
        const { id, content, completed } = action.payload
        return {
          ...state,
          allIds: [ ...state.allIds, id ],
          byIds: {
            ...state.byIds,
            [id]: {
              completed,
              content
            }
          }
        }
      }

      case types.TOGGLE_TODO: {
        const { id } = action.payload
        return {
          ...state,
          byIds: {
            ...state.byIds,
            [id]: {
              ...state.byIds[id],
              completed: !state.byIds[id].completed
            }
          }
        }
      }

      case types.DEL_TODO: {
        const { id } = action.payload
        const allIds = [ ...state.allIds ]
        allIds.splice(allIds.indexOf(id), 1)
        let byIds = Object.assign({}, state.byIds)
        delete byIds[id]
        return {
          ...state,
          allIds: allIds,
          byIds: byIds
        }
      }

      case types.SET_ALL_TODOS: {
        const obj = JSON.parse(action.payload.todos)
        const todos = obj.items
        const total = obj.total
        const output = {
          total: total,
          allIds: [],
          byIds: {}
        }
        todos.forEach(todo => {
          output.allIds.push(todo.id)
          output.byIds = { 
            ...output.byIds,
            [todo.id]: {
              completed: todo.completed,
              content: todo.content
            }
          }
        })
        return output
      }

      default:
        return state
    }
  } catch(e) {
    // statements
    console.log(e);
    return state
  }
  
}