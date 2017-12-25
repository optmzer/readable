import React, {Component} from 'react'
import * as Fa from 'react-icons/lib/fa'
import * as IoAndroid from 'react-icons/lib/io'

class CommentHeader extends Component {
  render() {
    return(
      <div className="comment-header">
        <div className="voting-block">
          <a className="vote-up" ><Fa.FaArrowUp size={15}/></a>
          <div className="vote-count">15</div>
          <a className="vote-down" ><Fa.FaArrowDown size={15}/></a>
        </div>
        <span className="user-avatar">
          <a><Fa.FaFileImageO size={50}/></a>
        </span>
        <div className="comment-info">
          <div><a>comentAuthor to PostAuthor</a></div>
          <div>
            <span className="comment-time">commented on Time: </span>
            <span className="comments-count">Comments count:</span></div>
        </div>
        <div className="edit-tools">
          <a ><IoAndroid.IoEdit className="edit-btn" size={25} /></a>
          <a ><IoAndroid.IoAndroidDelete className="delete-btn" size={25} /></a>
        </div>
      </div>
    )//return()
  }//render()
}//class CommentHeader

export default CommentHeader
