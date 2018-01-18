import * as types from './action_types'

// ====== MODAL - "Identify" Author/user ======
export function openLoginModal() {
  return {
    type: types.OPEN_LOGIN_MODAL,
    open_login_modal: true
  }
}

export function closeLoginModal() {
  return {
    type: types.CLOSE_LOGIN_MODAL,
    open_login_modal: false
  }
}

export function setUserLogin(login) {
  return {
    type: types.SET_USER_LOGIN,
    user_login: login
  }
}
