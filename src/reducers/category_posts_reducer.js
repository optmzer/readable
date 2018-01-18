import * as actionType from '../actions/action_types'

//sets posts to show in category by selectig category name,
//if category is now selected category = home. showing all posts.
export default function category_posts_reducer(state, action) {
  switch (action.type) {
    case actionType.SELECT_CATEGORY:
      return {
        category_posts: action.category_posts
      }
    case actionType.VOTE_POST://when category is selected
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
    case actionType.DELETE_POST://when category is selected
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
