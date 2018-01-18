import * as actionType from '../actions/action_types'

//sets user_login from user login Modal
export default function user_login_reducer(state, action) {
  switch (action.type) {
    case actionType.OPEN_LOGIN_MODAL:
      return {
        ...state,
        open_login_modal: true,
      }
    case actionType.CLOSE_LOGIN_MODAL:
      return {
        ...state,
        open_login_modal: false,
      }
    case actionType.SET_USER_LOGIN:
      return {
        user_login: action.user_login,
        open_login_modal: false,
      }
    default:
      return {...state}
  }
}//user_login_reducer()
