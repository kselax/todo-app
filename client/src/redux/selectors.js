import { VISIBILITY_FILTERS } from '../constants.js'

export const getTodosState = store => store.todos

export const getTodosList = store =>
  getTodosState(store) ? getTodosState(store).allIds : []

export const getTodoById = (store, id) =>
  getTodosState(store) ? { ...getTodosState(store).byIds[id], id }: {}

export const getAllTodos = store => 
  getTodosList(store).map(id => getTodoById(store, id))

export const getTodosByFilter = (store, visibilityFilter) => {
  const todos = getAllTodos(store)
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED: {
      return todos.filter(todo => todo.completed)
    }
    case VISIBILITY_FILTERS.INCOMPLETE: {
      return todos.filter(todo => !todo.completed)
    }
    case VISIBILITY_FILTERS.ALL:
    default:
      return todos
  }
}

export const getAddTodoSpinner = state => state.spinners.addTodoSpinner

export const getTotal = store => {
  return getTodosState(store) ? getTodosState(store).total : 0
}