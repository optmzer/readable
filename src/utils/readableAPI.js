/**
 *
 */
const URL = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json' //Server does not update votes without this line.
}
//============== CATEGORIES ===================
/**
 *
 GET /categories
   USAGE:
     Get all of the categories available for the app. List is found in
     categories.js. Feel free to extend this list as you desire.
*/
export const getAllCategories = () => (
  fetch(`${URL}/categories`, {
    headers: headers,
  } )
  .then( (res) => res.json())
  .then((data) => data)
)

/*
 GET /:category/posts
   USAGE:
     Get all of the posts for a particular category
*/
export const getPostsFromCategory = (category) => (
  fetch(`${URL}/${category}/posts`, {
    headers: headers,
  } )
  .then( (res) => res.json())
  .then((data) => data)
)

//============== POSTS ===================
/**
 * GET /posts
   USAGE:
     Get all of the posts. Useful for the main page when no category is selected.
 */
export const getAllPosts = () => (
  fetch(`${URL}/posts`, {
    headers: headers,
    // method: "GET"
  } )
  .then( (res) => res.json())
  .then((data) => data)
)

/**
 * POST /posts
   USAGE:
     Add a new post

   PARAMS:
     id - UUID should be fine, but any unique id will work
     timestamp - timestamp in whatever format you like, you can use Date.now() if you like
     title - String
     body - String
     author - String
     category: Any of the categories listed in categories.js.
     Feel free to extend this list as you desire.
*/
export const addPost = (post_data) => (
  fetch(`${URL}/posts`, {
    headers: headers,
    body: JSON.stringify(post_data),
    method: "POST"
  } )
  .then( (res) => res.json())
  .then((data) => data)
)

/*
 GET /posts/:id
   USAGE:
     Get the details of a single post
*/
export const getPostById = (post_id) => (
  fetch(`${URL}/posts/${post_id}`, {
    headers: headers,
  })
  .then( (res) => res.json())
  .then((data) => {
    return data
  })
)

/*
 POST /posts/:id
   USAGE:
     Used for voting on a post
   PARAMS:
     option - String: Either "upVote" or "downVote"
*/
//Mistake was in headers and I did not use JSON.stringify()
export const voteOnPost = (post_id, vote) => (
  fetch(`${URL}/posts/${post_id}`, {
    headers: headers,
    body: JSON.stringify({
      option : `${vote}`
    }),
    method: "POST"
  } )
  .then( (res) => res.json())
  .then((data) => data)
)


/*
 PUT /posts/:id
   USAGE:
     Edit the details of an existing post
   PARAMS:
     title - String
     body - String
*/
export const editPost = (post_id, title, body) => (
  fetch(`${URL}/posts/${post_id}`, {
    headers: headers,
    body: JSON.stringify({
      title : `${title}`,
      body : `${body}`,
    }),
    method: "PUT"
  } )
  .then( (res) => res.json())
  .then((data) => data)
)

/*
 DELETE /posts/:id
   USAGE:
     Sets the deleted flag for a post to 'true'.
     Sets the parentDeleted flag for all child comments to 'true'.

*/
export const deletePostById = (post_id) => (
  fetch(`${URL}/posts/${post_id}`, {
    headers: headers,
    method: "DELETE"
  } )
  .then( (res) => res.json())
  .then((data) => data)
)

// ============= COMMENTS ============
/*
GET /posts/:id/comments
  USAGE:
    Get all the comments for a single post
*/
export const getAllPostComments = (post_id) => (
  fetch(`${URL}/posts/${post_id}/comments`, {
    headers: headers,
    // method: "GET"
  } )
  .then( (res) => res.json())
  .then((data) => data)
)

/*
POST /comments
  USAGE:
    Add a comment to a post

  PARAMS:
    id: Any unique ID. As with posts, UUID is probably the best here.
    timestamp: timestamp. Get this however you want.
    body: String
    author: String
    parentId: Should match a post id in the database.
*/
export const addComment = (comment_data) => (
  fetch(`${URL}/comments`, {
    headers: headers,
    body: JSON.stringify(comment_data),
    method: "POST"
  } )
  .then( (res) => res.json())
  .then((data) => data)
)


/*
GET /comments/:id
  USAGE:
    Get the details for a single comment
*/
export const getCommentById = (comment_id) => (
  fetch(`${URL}/comments/${comment_id}`, {
    headers: headers,
  } )
  .then( (res) => res.json())
  .then((data) => data)
)

/*
POST /comments/:id
  USAGE:
    Used for voting on a comment.
  PARAMS:
    option - String: Either "upVote" or "downVote"
*/
export const voteOnComment = (comment_id, vote) => (
  fetch(`${URL}/comments/${comment_id}`, {
    headers: headers,
    body: JSON.stringify({
      option: `${vote}`
    }),
    method: "POST"
  } )
  .then( (res) => res.json())
  .then((data) => data)
)

/*
PUT /comments/:id
  USAGE:
    Edit the details of an existing comment

  PARAMS:
    timestamp: timestamp. Get this however you want.
    body: String
*/
export const editComment = (comment_id, comment_data) => (
  fetch(`${URL}/comments/${comment_id}`, {
    headers: headers,
    body: JSON.stringify(comment_data),
    method: "PUT"
  } )
  .then( (res) => res.json())
  .then((data) => data)
)

/*
DELETE /comments/:id
  USAGE:
    Sets a comment's deleted flag to 'true'
*/
export const deleteCommentById = (comment_id) => (
  fetch(`${URL}/comments/${comment_id}`, {
    headers: headers,
    method: 'DELETE'
  } )
  .then( (res) => res.json())
  .then((data) => data)
)
