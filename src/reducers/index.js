import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY,
  SELECT_CATEGORY_REACT,
  SELECT_CATEGORY_REDUX,
  SELECT_CATEGORY_UDACITY
} from '../actions'

//this is how it is going to appear in redux store
//category_posts_reducer: {{category},{category_posts}}
function category_posts_reducer(state={}, action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      const {category, category_posts} = action
      state = {
        category,
        category_posts
      }
      break;
    default:
      return state
  }
}

function get_category_react(state = {}, action) {
  //TODO: make a request for new posts with this category
  return state
}

function get_category_redux(state = {}, action) {
  return state

}

function get_category_udacity(state = {}, action) {
  return state

}

export default combineReducers({
  get_category_react,
  get_category_redux,
  get_category_udacity
})
