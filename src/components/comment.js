import React, {Component} from 'react'
import * as Fa from 'react-icons/lib/fa'
import '../style/comments.css'
import { connect } from 'react-redux'
import { voteOnCommentThunk, deleteCommentThunk } from '../actions'

class Comment extends Component {

  // state={
  //   comment_data: {}
  // }

  componentWillReceiveProps(){
    //update vote count
  }


  render() {

    // console.log("L12 Comment ", this.props)

    const { comment_data } = this.props
    //Date options
    var options = { weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour12: false }
    let comment_timestamp = new Date(comment_data.timestamp)
                              .toLocaleTimeString('en-NZ', options)

    return(
      <div className="comment">
      <div className="comment-header">
        <div className="voting-block">
          <a className="vote-up"
          onClick={() => this.props.voteOnCommentThunk(comment_data.id, "upVote")}
            ><Fa.FaChevronUp size={15} /></a>
          <div className="vote-count">{comment_data.voteScore}</div>
          <a className="vote-down"
            onClick={() => this.props.voteOnCommentThunk(comment_data.id, "downVote")}
          ><Fa.FaChevronDown size={15}/></a>
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
          <a ><Fa.FaEdit className="edit-btn" size={25} /></a>
          <a
            onClick={() => this.props.deleteComment(comment_data.id)}
          ><Fa.FaTrashO className="delete-btn" size={25} /></a>
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
    deleteComment: (comment_id) => dispatch(deleteCommentThunk(comment_id)),
  }
}

export default connect(null, mapDispatchToProps)(Comment)
