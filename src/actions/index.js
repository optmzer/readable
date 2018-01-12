import * as readableAPI from '../utils/readableAPI'

export const SELECT_CATEGORY = "SELECT_CATEGORY"
export const SELECT_POST = "SELECT_POST"
export const VOTE_POST = "VOTE_POST"
export const VOTE_COMMENT = "VOTE_COMMENT"
export const GET_SELECTED_POST_COMMENTS = "GET_SELECTED_POST_COMMENTS"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const DELETE_POST = "DELETE_POST"
export const SUBMIT_POST = "SUBMIT_POST"
export const SUBMIT_COMMENT = "SUBMIT_COMMENT"
export const SORT_POSTS = "SORT_POSTS"
export const OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL"
export const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL"
export const SET_USER_LOGIN = "SET_USER_LOGIN"

// ====== "Identify" Author/user ======
export function openLoginModal() {
  return {
    type: OPEN_LOGIN_MODAL,
    open_login_modal: true
  }
}

export function closeLoginModal() {
  return {
    type: CLOSE_LOGIN_MODAL,
    open_login_modal: false
  }
}

export function setUserLogin(login) {
  return {
    type: SET_USER_LOGIN,
    user_login: login
  }
}

// ====== SORTING ======
//Sorts post by timestamp, Author, Title, voteScore
export function sortPosts(sort_param){
  return {
    type: SORT_POSTS,
    sort_param
  }
}

// ====== POST ======
//Adds votes to the post
function vote_on_post(post) {
  return {
    type: VOTE_POST,
    post
  }
}

export function voteOnPostThunk (post_id, vote) {
  return function(dispatch) {
    return readableAPI.voteOnPost(post_id, vote)
    .then((post) => {
      dispatch(vote_on_post(post))
    })
  }
}



//Gets posts in selected category
function select_category(posts) {
  return {
    type: SELECT_CATEGORY,
    category_posts: posts
  }
}

export function selectCategoryThunk (category) {
  if(category === "home"){//get all posts
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

//Gets selected post to render
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

//"Deletes" post. Sets flag
// Sets the deleted flag for a post to 'true'.
// Sets the parentDeleted flag for all child comments to 'true'.
function delete_post(post){
  return {
    type: DELETE_POST,
    post
  }
}

export function deletePostThunk(post_id){
  return function(dispatch) {
    readableAPI.deletePostById(post_id)
    .then(response => dispatch(delete_post(response)))
  }
}

//Submits post to the server
function submit_post(post) {
  return {
    type: SUBMIT_POST,
    post
  }
}

export function submitPostThunk(post) {
  return function(dispatch){
    readableAPI.submitPost(post)
    .then(response => dispatch(submit_post(response)))
  }
}


// ======== COMMENTS SECTION ============

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

function vote_on_comment(comment) {
  console.log("L117 vote_on_comment comment ", comment);
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

function delete_comment(comment) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export function deleteCommentThunk(comment_id){
  return function(dispatch) {
    readableAPI.deleteCommentById(comment_id)
    .then(response => dispatch(delete_comment(response)))
  }
}

function submit_comment(comment) {
  return {
    type: SUBMIT_COMMENT,
    comment
  }
}

export function submitCommentThunk(comment){
  return function(dispatch) {
    readableAPI.submitComment(comment)
    .then(response => dispatch(submit_comment(response)))
  }
}
