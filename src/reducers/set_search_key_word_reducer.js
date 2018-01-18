import * as actionType from '../actions/action_types'

//sets search_key_word for post find by title, author
export default function set_search_key_word_reducer(state, action){
  switch (action.type) {
    case actionType.SET_SEARCH_KEY_WORD:
      return {
        search_key_word: action.key_word
      }
    default:
      return {...state}
  }
}
