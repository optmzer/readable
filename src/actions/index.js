import * as readableAPI from '../utils/readableAPI'

export const SELECT_CATEGORY = "SELECT_CATEGORY"
export const SELECT_POST = "SELECT_POST"
export const VOTE_POST = "VOTE_POST"
export const VOTE_COMMENT = "VOTE_COMMENT"

export function vote_on_post(post) {
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

export function vote_on_comment(comment) {
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
export function select_category(posts) {
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

export function select_post(post) {
  return {
    type: SELECT_POST,
    post
  }
}

export function selectPostThunk(post_id){
  return function(dispatch){
    return readableAPI.getPostById(post_id)
    .then((post) => {
      dispatch(select_post(post))
    })
  }
}
