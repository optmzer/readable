import * as actionType from '../actions/action_types'

//sets values for sorting posts in the category
//by popular, title, voteScore, author
export default function sort_posts_reducer(state, action) {
  switch (action.type) {
    case actionType.SORT_POSTS:
      switch (action.sort_param) {
          case "popular":
            return {//most to least popular
              select_value: action.sort_param,
              sort_param: "-voteScore"
            }
          case "new":
            return {//most to least popular
              select_value: action.sort_param,
              sort_param: "-timestamp"
            }
          default://New from new to old
            return {
              select_value: action.sort_param,
              sort_param: action.sort_param
            }
      }//switch
    default:
      return {...state}
  }
}//sort_posts_reducer()
