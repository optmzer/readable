import * as readableAPI from '../utils/readableAPI'

export const SELECT_CATEGORY = "SELECT_CATEGORY"
export const SELECT_POST = "SELECT_POST"
export const VOTE_POST = "VOTE_POST"
export const VOTE_COMMENT = "VOTE_COMMENT"
export const GET_SELECTED_POST_COMMENTS = "GET_SELECTED_POST_COMMENTS"
export const DELETE_COMMENT = "DELETE_COMMENT"

function vote_on_post(post) {
  return {
    type: VOTE_POST,
    post
  }
}

// ============= THUNK_VOTE ============
export function voteOnPostThunk (post_id, vote) {
  return function(dispatch) {
    return readableAPI.voteOnPost(post_id, vote)
    .then((post) => {
      dispatch(vote_on_post(post))
    })
  }
}

function vote_on_comment(comment) {
  console.log("L27 vote_on_comment comment ", comment);
  return {
    type: VOTE_COMMENT,
    comment
  }
}

export function voteOnCommentThunk(comment_id, vote) {
  return function(dispatch) {
    return readableAPI.voteOnComment(comment_id, vote).then (
      (comment) => dispatch(vote_on_comment(comment))
    )
  }
}

//Combines 3 different actions into one with new property.
function select_category(posts) {
  return {
    type: SELECT_CATEGORY,
    category_posts: posts
  }
}

export function selectCategoryThunk (category) {
  if(category === "home"){
    return function(dispatch){
      return readableAPI.getAllPosts()
      .then((posts) => {
        dispatch(select_category(posts))
      })
    }
  }
  return function(dispatch){
    return readableAPI.getPostsFromCategory(category)
    .then((posts) => {
      dispatch(select_category(posts))
    })
  }
}

function select_post(post) {
  return {
    type: SELECT_POST,
    post
  }
}

export function selectPostThunk(post_id){
  return function(dispatch) {
    readableAPI.getPostById(post_id)
    .then((post) =>  dispatch(select_post(post)))
  }
}

function get_select_post_comments(comments) {
  return {
    type: GET_SELECTED_POST_COMMENTS,
    comments
  }
}

export function getSelectPostCommentsThunk(post_id) {
  return function(dispatch){
    readableAPI.getAllPostComments(post_id)
    .then(comments => dispatch(get_select_post_comments(comments)))
  }
}

function deleteComment(comment) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export function deleteCommentThunk(comment_id){
  return function(dispatch) {
    readableAPI.deleteCommentById(comment_id)
    .then(response => dispatch(deleteComment(response)))
  }
}
