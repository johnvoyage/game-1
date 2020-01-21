import { SET_ITEM } from '../actions/game'

const defaultReducer = {
  level: 0,
}

const gameReducer = (state = defaultReducer, action) => {
  switch (action.type) {
    
    case SET_ITEM: 
      return {
        ...state,
        [action.key]: action.value
      }

    default:
      return state
  }
}