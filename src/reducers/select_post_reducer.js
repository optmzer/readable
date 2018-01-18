import * as actionType from '../actions/action_types'

//Shows a post that was selected
export default function select_post_reducer(state, action) {
  switch (action.type) {
    case actionType.SELECT_POST:
      return {
        ...state,
        post: action.post
      }
    case actionType.SUBMIT_POST:
      return {
        ...state,
        post: action.post
      }
    case actionType.SUBMIT_EDITED_POST: //after edit open post page with edited post
      return {
        ...state,
        post: action.edited_post
      }
    case actionType.VOTE_POST:
      if(state.post && action.post.id === state.post.id){
        return {
          ...state,
          post: action.post
        }
      }
      return {...state}
    case actionType.DELETE_POST:
      if(state.post && action.post.id === state.post.id){
        return {
          ...state,
          post: {}
        }
      }
      return {...state}
    default:
      return {...state}
  }
}//select_post_reducer()
