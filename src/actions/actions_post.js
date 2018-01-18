import * as types from './action_types'
import * as readableAPI from '../utils/readableAPI'

// ====== POST ======
//Adds votes to the post
function vote_on_post(post) {
  return {
    type: types.VOTE_POST,
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
    type: types.SELECT_CATEGORY,
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
export function selectPostThunk(post_id){
  return function(dispatch) {
    readableAPI.getPostById(post_id)
    .then((post) =>  dispatch(select_post(post)))
  }
}

function select_post(post) {
  return {
    type: types.SELECT_POST,
    post
  }
}

// fetches post for editing from server
export function getPostToEditThunk(post_id){
  return function(dispatch) {
    readableAPI.getPostById(post_id)
    .then(post => dispatch(get_post_to_edit(post)))
  }
}

function get_post_to_edit(post_to_edit) {
  return {
    type: types.GET_POST_TO_EDIT,
    post_to_edit
  }
}

//Submits edited post to the server
export function submitEditedPostThunk(post) {
  return function(dispatch) {
    readableAPI.editPost(post)
    .then(response => dispatch(submit_edited_post(response)))
  }
}

function submit_edited_post(edited_post) {
  return {
    type: types.SUBMIT_EDITED_POST,
    edited_post
  }
}

export function cancel_edit_post(){
  return {
    type: types.CANCEL_EDIT_POST
  }
}

//Submits post to the server
export function submitPostThunk(post) {
  return function(dispatch){
    readableAPI.submitPost(post)
    .then(response => dispatch(submit_post(response)))
  }
}

function submit_post(post) {
  return {
    type: types.SUBMIT_POST,
    post
  }
}

//"Deletes" post. Sets flag
// Sets the deleted flag for a post to 'true'.
// Sets the parentDeleted flag for all child comments to 'true'.
function delete_post(post){
  return {
    type: types.DELETE_POST,
    post
  }
}

export function deletePostThunk(post_id){
  return function(dispatch) {
    readableAPI.deletePostById(post_id)
    .then(response => dispatch(delete_post(response)))
  }
}
