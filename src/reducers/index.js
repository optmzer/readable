import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY,
  SELECT_POST,
  VOTE_POST,
  VOTE_COMMENT,
  GET_SELECTED_POST_COMMENTS,
  DELETE_COMMENT,
  DELETE_POST,
  SUBMIT_POST,
  // SUBMIT_COMMENT
} from '../actions'

/**
 */

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
    case VOTE_POST://when category is selected
      if(state.category_posts){
      return {
        category_posts: state.category_posts.map(post => {
                        if(post.id === action.post.id) {
                          return action.post
                        } else {
                          return post
                        }
                      })
      }}
      return {...state}
    case DELETE_POST://when category is selected
      if(state.category_posts){
      return {
        category_posts: state.category_posts.filter(post =>
                        post.id !== action.post.id
                      )
      }}
      return {...state}
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
    case SUBMIT_POST:
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

    case DELETE_POST:
      if(state.post && action.post.id === state.post.id){
        return {
          post: {}
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
    case DELETE_COMMENT:
      if(state.comments.length !== 0){
        return {
          comments: state.comments.filter(com => com.id !== action.comment.id)
        }
      }
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
