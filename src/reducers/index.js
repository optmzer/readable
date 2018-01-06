import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY,
  SELECT_POST,
  VOTE_POST,
  VOTE_COMMENT,
  GET_SELECTED_POST_COMMENTS
} from '../actions'

/**
 * I think I need to create an empty state for data and fill it in with updates
  from the server as app is being used.
  Why it is only happening when I switch to another post?
  I probably need to use React state to make a data object to feed into the App.
 */

// function vote_on_comment_reducer(state, action) {
//   switch (action.type) {
//     case VOTE_COMMENT:
//       return {
//         voted_comment: action.comment
//       }
//     default:
//       return {
//         ...state
//       }
//   }
// }
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

//Shows the post that was selected
function select_post_reducer(state, action) {
  switch (action.type) {
    case SELECT_POST:
      return {
        post: action.post
      }
    case VOTE_POST:
      if(state.post && action.post.id === state.post.id){
        return {
          post: action.post
        }
      }
      return {...state}
    default:
      return {...state}
  }
}


function selected_post_comments_reducer(state, action) {
  switch (action.type) {
    case GET_SELECTED_POST_COMMENTS:
      return {
        comments: action.comments
      }
    case VOTE_COMMENT:
    console.log("L98 state ", state);
    console.log("L99 action ", action);
      if(state.comments){
          return {
            comments: state.comments.map(comment => {
                      if(comment.id === action.comment.id){
                        return action.comment
                      } else {
                        return comment
                      }
                    })
          }
        }//if
      return {...state}
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
  // vote_on_comment_reducer,
  vote_on_post_reducer,
  selected_post_comments_reducer
})
