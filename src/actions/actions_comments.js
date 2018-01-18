import * as types from './action_types'
import * as readableAPI from '../utils/readableAPI'

// ======== COMMENTS SECTION ============
// Get all comments of a post that you are viewing
export function getSelectPostCommentsThunk(post_id) {
  return function(dispatch){
    readableAPI.getAllPostComments(post_id)
    .then(comments => dispatch(get_select_post_comments(comments)))
  }
}

function get_select_post_comments(comments) {
  return {
    type: types.GET_SELECTED_POST_COMMENTS,
    comments
  }
}

// Vote on a comment
export function voteOnCommentThunk(comment_id, vote) {
  return function(dispatch) {
    return readableAPI.voteOnComment(comment_id, vote).then (
      (comment) => dispatch(vote_on_comment(comment))
    )
  }
}

function vote_on_comment(comment) {
  return {
    type: types.VOTE_COMMENT,
    comment
  }
}

// Delete selected comment
export function deleteCommentThunk(comment_id){
  return function(dispatch) {
    readableAPI.deleteCommentById(comment_id)
    .then(response => dispatch(delete_comment(response)))
  }
}

function delete_comment(comment) {
  return {
    type: types.DELETE_COMMENT,
    comment
  }
}

//Submit new comment
export function submitCommentThunk(comment){
  return function(dispatch) {
    readableAPI.submitComment(comment)
    .then(response => dispatch(submit_comment(response)))
  }
}

function submit_comment(comment) {
  return {
    type: types.SUBMIT_COMMENT,
    comment
  }
}

//Gets selected comment from the server for editing
export function getCommentToEditThunk(comment_id){
  return function(dispatch){
    readableAPI.getCommentById(comment_id)
    .then(response => dispatch(get_comment_to_edit(response)))
  }
}

function get_comment_to_edit(comment_to_edit){
  return {
    type: types.GET_COMMENT_TO_EDIT,
    comment_to_edit
  }
}

//Submit edited comment
export function submitEditedCommentThunk(comment){
  return function(dispatch) {
    readableAPI.editComment(comment)
    .then(response => dispatch(submit_edited_comment(comment)))
  }
}

function submit_edited_comment(edited_comment){
  return{
    type: types.SUBMIT_EDITED_COMMENT,
    edited_comment
  }
}

//Cancel comment edit
export function cancel_edit_comment(){
  return {
    type: types.CANCEL_EDIT_COMMENT
  }
}
