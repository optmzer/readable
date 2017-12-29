import { combineReducers } from 'redux'
import { SELECT_CATEGORY } from '../actions'

//this is how it is going to appear in redux store
//category_posts_reducer: {{category},{category_posts}}
function category_posts_reducer(state={}, action) {
  // console.log("L7 reducer ", action);

  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        category: action.category,
        category_posts: action.category_posts
      }
    default:
      return {...state}
  }
}

export default combineReducers({
  category_posts_reducer,
})
