import * as types from './action_types'
export * from './actions_login_modal'
export * from './actions_post'
export * from './actions_comments'

// ====== SORTING ======
//Sorts post by timestamp, Author, Title, voteScore
export function sortPosts(sort_param){
  return {
    type: types.SORT_POSTS,
    sort_param
  }
}

// ====== SEARCH KEY WORD ======
export function set_search_key_word(key_word){
  return{
    type: types.SET_SEARCH_KEY_WORD,
    key_word
  }
}
