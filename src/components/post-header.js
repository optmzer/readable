import React, {Component} from 'react'
import * as Fa from 'react-icons/lib/fa'
import * as IoAndroid from 'react-icons/lib/io'

class PostHeader extends Component {

  render(){
    return(
      <div className="user-info">
        <div className="voting-block">
          <a className="vote-up" ><Fa.FaArrowUp size={22}/></a>
          <div className="vote-count">{this.props.voteScore}</div>
          <a className="vote-down" ><Fa.FaArrowDown size={22}/></a>
        </div>
        <span className="user-avatar">
          <a><Fa.FaFileImageO size={75}/></a>
        </span>
        <div className="post-info">
          <div><a>{this.props.author}</a></div>
          <div>
              <a><h3>{this.props.title}</h3></a>
          </div>
          <div>
            <span className="published-time">published on Time: </span>
            <span className="comments-count">Comment count: {this.props.commentCount}</span></div>
        </div>
        <div className="edit-tools">
          <a ><IoAndroid.IoEdit className="edit-btn" size={25} /></a>
          <a ><IoAndroid.IoAndroidDelete className="delete-btn" size={25} /></a>
        </div>
      </div>
    )//return()
  }//render()

}//class PostHeader

export default PostHeader
