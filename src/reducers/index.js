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
  SORT_POSTS,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  SET_USER_LOGIN
} from '../actions'

/**
 */

function user_login_reducer(state, action) {
  console.log("L20 user_login_reducer state", state);
  console.log("L20 user_login_reducer action", action);

  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        open_login_modal: true,
      }
    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        open_login_modal: false,
      }
    case SET_USER_LOGIN:
      return {
        user_login: action.user_login,
        open_login_modal: false,
      }
    default:
      return {...state}
  }
}


function sort_posts_reducer(state, action) {
  // console.log("L18 sort_posts_reducer state", state);
  // console.log("L18 sort_posts_reducer action", action);
  switch (action.type) {
    case SORT_POSTS:
      switch (action.sort_param) {
          case "popular":
            return {//most to least popular
              select_value: action.sort_param,
              sort_param: "-voteScore"
            }
          case "new":
            return {//most to least popular
              select_value: action.sort_param,
              sort_param: "-timestamp"
            }
          default://New from new to old
            return {
              select_value: action.sort_param,
              sort_param: action.sort_param
            }
      }//switch
    default:
      return {
        ...state
      }
  }
}//sort_posts_reducer()


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
      if(state.comments){//if there are any comments
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

    // case SUBMIT_COMMENT://?????? does not mutate state.Why???
    //it did not allow me to change state directly
    //copy them mutate.
      // let new_comments = state.comments.map(comment => comment)
      // new_comments.push(action.comment)
      // console.log("L124 reducer state ", state);
      // console.log("L125 reducer new_comments ", new_comments);
      // return {
      //   comments: new_comments
      // }
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
  sort_posts_reducer,
  vote_on_post_reducer,
  selected_post_comments_reducer,
  user_login_reducer,
})
