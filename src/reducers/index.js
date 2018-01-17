import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY,
  SELECT_POST,
  VOTE_POST,
  SUBMIT_POST,
  SORT_POSTS,
  GET_SELECTED_POST_COMMENTS,
  GET_POST_TO_EDIT,
  SUBMIT_EDITED_POST,
  CANCEL_EDIT_POST,
  DELETE_POST,
  VOTE_COMMENT,
  GET_COMMENT_TO_EDIT,
  SUBMIT_EDITED_COMMENT,
  CANCEL_EDIT_COMMENT,
  DELETE_COMMENT,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  SET_USER_LOGIN,
  SET_SEARCH_KEY_WORD
} from '../actions'


//sets search_key_word for post find by title, author
function set_search_key_word_reducer(state, action){
  switch (action.type) {
    case SET_SEARCH_KEY_WORD:
      return {
        search_key_word: action.key_word
      }
    default:
      return {...state}
  }
}

//sets user_login from user login Modal
function user_login_reducer(state, action) {
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

//sets values for sorting posts in the category
//by popular, title, voteScore, author
function sort_posts_reducer(state, action) {
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
      return {...state}
  }
}//sort_posts_reducer()

//sets values for voting on posts
function vote_on_post_reducer(state, action) {
  switch (action.type) {
    case VOTE_POST:
      return {
        vote_post: action.post
      }
    default:
      return {...state}
  }
}

//sets posts to show in category by selectig category name,
//if category is now selected category = home. showing all posts.
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

//Shows a post that was selected
function select_post_reducer(state, action) {
  switch (action.type) {
    case SELECT_POST:
      return {
        ...state,
        post: action.post
      }
    case SUBMIT_POST:
      return {
        ...state,
        post: action.post
      }
    case SUBMIT_EDITED_POST: //after edit open post page with edited post
      return {
        ...state,
        post: action.edited_post
      }
    case VOTE_POST:
      if(state.post && action.post.id === state.post.id){
        return {
          ...state,
          post: action.post
        }
      }
      return {...state}
    case DELETE_POST:
      if(state.post && action.post.id === state.post.id){
        return {
          ...state,
          post: {}
        }
      }
      return {...state}
    default:
      return {...state}
  }
}

//sets values for a post that was selected for editing
function get_post_to_edit_reducer(state, action) {
  switch (action.type) {
    case GET_POST_TO_EDIT:
      return {
        post_to_edit: action.post_to_edit,
        editing: true
      }
    case SUBMIT_EDITED_POST://fall through
    case CANCEL_EDIT_POST:
      return {
        post_to_edit: {},
        editing: false
      }
    default:
      return {...state}
  }
}

//sets list of comments for a post that was selected for reading
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

//sets comment values to edit
function get_comment_to_edit_reducer(state, action) {
  switch (action.type) {
    case GET_COMMENT_TO_EDIT:
      return{
        comment_to_edit: action.comment_to_edit
      }
    case SUBMIT_EDITED_COMMENT://Fall through
    case CANCEL_EDIT_COMMENT:
      return{
        comment_to_edit: {}
      }
    default:
      return {...state}
  }
}

export default combineReducers({
  category_posts_reducer,
  select_post_reducer,
  sort_posts_reducer,
  vote_on_post_reducer,
  selected_post_comments_reducer,
  get_post_to_edit_reducer,
  user_login_reducer,
  get_comment_to_edit_reducer,
  set_search_key_word_reducer
})
