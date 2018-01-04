import { combineReducers } from 'redux'
import {  SELECT_CATEGORY,
          SELECT_POST,
          VOTE_POST,
          VOTE_COMMENT} from '../actions'

/**
 * I think I need to create an empty state for data and fill it in with updates
  from the server as app is being used.
  Why it is only happening when I switch to another post?
  I probably need to use React state to make a data object to feed into the App.
 */

function vote_on_comment_reducer(state, action) {
  switch (action.type) {
    case VOTE_COMMENT:
      return {
        vote_comment: action.comment
      }
    default:
      return {
        ...state
      }
  }
}
//CRAPY NAMING CONVENTION ALERT!!!
//state- is not an app state state is DATA from action!!!
/**this reducer receives state of the element its action is signed to
that is post-header.
*/
function vote_on_post_reducer(state, action) {
  switch (action.type) {
    case VOTE_POST:
      return {
        vote_post: action.post
      }
    default:
      return {
        ...state
      }
  }
}

//this is how it is going to appear in redux store
//category_posts_reducer: {{category},{category_posts}}
function category_posts_reducer(state, action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        category_posts: action.category_posts
      }
    case VOTE_POST:
      let updated_posts = state.category_posts.map(post => {
        if(post.id === action.post.id) {
          return action.post
        } else {
          return post
        }
      })
      return {
        category_posts: updated_posts
      }
    default:
      return {...state}
  }
}//category_posts_reducer()

function select_post_reducer(state, action) {
  const {post} = action
  switch (action.type) {
    case SELECT_POST:
      return {
        post
      }
    default:
      return {...state}
  }
}

/**In Redux state management extension content of combineReducers
 *is shown as state.
 */
export default combineReducers({
  category_posts_reducer,
  select_post_reducer,
  vote_on_comment_reducer,
  vote_on_post_reducer
})
