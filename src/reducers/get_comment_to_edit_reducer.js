import * as actionType from '../actions/action_types'

//sets comment values to edit
export default function get_comment_to_edit_reducer(state, action) {
  switch (action.type) {
    case actionType.GET_COMMENT_TO_EDIT:
      return{
        comment_to_edit: action.comment_to_edit
      }
    case actionType.SUBMIT_EDITED_COMMENT://Fall through
    case actionType.CANCEL_EDIT_COMMENT:
      return{
        comment_to_edit: {}
      }
    default:
      return {...state}
  }
}//get_comment_to_edit_reducer()
