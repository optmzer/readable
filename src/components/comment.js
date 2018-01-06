import React, {Component} from 'react'
// import CommentHeader from './comment-header'
import * as Fa from 'react-icons/lib/fa'
import * as IoAndroid from 'react-icons/lib/io'
import '../style/comments.css'
import { connect } from 'react-redux'
import { voteOnCommentThunk } from '../actions'

class Comment extends Component {

  // state={
  //   comment_data: {}
  // }
  // author: "thingtwo"
  // body: "Hi there! I am a COMMENT."
  // deleted: false
  // id: "894tuq4ut84ut8v4t8wun89g"
  // parentDeleted: false
  // parentId: "8xf0y6ziyjabvozdd253nd"
  // timestamp: 1468166872634
  // voteScore: 6

  render() {

    console.log("L12 Comment ", this.props)

    const { comment_data } = this.props
    let comment_timestamp = new Date(comment_data.timestamp).toLocaleTimeString()
    return(
      <div className="comment">
      <div className="comment-header">
        <div className="voting-block">
          <a className="vote-up"
            onClick={() => voteOnCommentThunk(comment_data.id, "voteUp")}
            ><Fa.FaArrowUp size={15}/></a>
          <div className="vote-count">{comment_data.voteScore}</div>
          <a className="vote-down"
            onClick={() => voteOnCommentThunk(comment_data.id, "voteDown")}
          ><Fa.FaArrowDown size={15}/></a>
        </div>
        <span className="user-avatar">
          <a><Fa.FaFileImageO size={50}/></a>
        </span>
        <div className="comment-info">
          <div><a>{comment_data.author}</a></div>
          <div>
            <span className="comment-time">
              commented on Time: {`${comment_timestamp}`}
            </span>
          </div>  
        </div>
        <div className="edit-tools">
          <a ><IoAndroid.IoEdit className="edit-btn" size={25} /></a>
          <a ><IoAndroid.IoAndroidDelete className="delete-btn" size={25} /></a>
        </div>
      </div>
      <div className="comment-body">
        <p className="comment-text">
          {comment_data.body}
        </p>
      </div>
      </div>
    )//return()
  }//render()
}//class Comments

// function mapStateToProps(state) {
//   const { vote_on_comment_reducer } = state
//   return{
//     voted_comment: vote_on_comment_reducer.voted_comment
//   }
// }

function mapDispatchToProps(dispatch){
  return {
    voteOnCommentThunk: (comment_id, vote) => dispatch(voteOnCommentThunk(comment_id, vote)),
  }
}

export default connect(null, mapDispatchToProps)(Comment)
