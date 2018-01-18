import { combineReducers } from 'redux'
import category_posts_reducer from './category_posts_reducer'
import select_post_reducer from './select_post_reducer'
import sort_posts_reducer from './sort_posts_reducer'
import vote_on_post_reducer from './vote_on_post_reducer'
import get_post_to_edit_reducer from './get_post_to_edit_reducer'
import selected_post_comments_reducer from './selected_post_comments_reducer'
import get_comment_to_edit_reducer from './get_comment_to_edit_reducer'
import set_search_key_word_reducer from './set_search_key_word_reducer'
import user_login_reducer from './user_login_reducer'

export default combineReducers({
  category_posts_reducer,
  select_post_reducer,
  sort_posts_reducer,
  vote_on_post_reducer,
  get_post_to_edit_reducer,
  selected_post_comments_reducer,
  get_comment_to_edit_reducer,
  user_login_reducer,
  set_search_key_word_reducer
})
