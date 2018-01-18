import * as actionType from '../actions/action_types'

//sets list of comments for a post that was selected for reading
export default function selected_post_comments_reducer(state, action) {
  switch (action.type) {
    case actionType.GET_SELECTED_POST_COMMENTS:
      return {
        comments: action.comments
      }
    case actionType.VOTE_COMMENT:
      if(state.comments){//if there are any comments
          return {
            comments: state.comments.map(comment => {
                      if(comment.id === action.comment.id){
                        return action.comment
                      } else {
                        return comment
                      }
                    })
          }
        }//if
      return {...state}
    case actionType.DELETE_COMMENT:
      if(state.comments.length !== 0){
        return {
          comments: state.comments.filter(com => com.id !== action.comment.id)
        }
      }
      return {...state}
    default:
      return {...state}
  }
}//selected_post_comments_reducer()
