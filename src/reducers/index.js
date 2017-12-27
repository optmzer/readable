import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY_REACT,
  SELECT_CATEGORY_REDUX,
  SELECT_CATEGORY_UDACITY
} from '../actions'

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
