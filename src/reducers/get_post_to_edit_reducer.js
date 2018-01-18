import * as actionType from '../actions/action_types'

//sets values for a post that was selected for editing
export default function get_post_to_edit_reducer(state, action) {
  switch (action.type) {
    case actionType.GET_POST_TO_EDIT:
      return {
        post_to_edit: action.post_to_edit,
        editing: true
      }
    case actionType.SUBMIT_EDITED_POST://fall through
    case actionType.CANCEL_EDIT_POST:
      return {
        post_to_edit: {},
        editing: false
      }
    default:
      return {...state}
  }
}//get_post_to_edit_reducer()
