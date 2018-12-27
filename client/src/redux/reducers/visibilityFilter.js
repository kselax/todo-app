import { VISIBILITY_FILTERS } from '../../constants.js'
import { SET_FILTER } from '../actionTypes.js'

const initialState = VISIBILITY_FILTERS.ALL

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter
    }
    default:
      return state
  }
}