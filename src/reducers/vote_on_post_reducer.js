import * as actionType from '../actions/action_types'

//sets values for voting on posts
export default function vote_on_post_reducer(state, action) {
  switch (action.type) {
    case actionType.VOTE_POST:
      return {
        vote_post: action.post
      }
    default:
      return {...state}
  }
}
