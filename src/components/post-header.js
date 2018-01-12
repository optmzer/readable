import React, {Component} from 'react'
import * as Fa from 'react-icons/lib/fa'
import { Link } from 'react-router-dom'
import {
        selectPostThunk,
        voteOnPostThunk,
        getSelectPostCommentsThunk,
        deletePostThunk
       } from '../actions'
import { connect } from 'react-redux'

/**
* This is post-header that is shown in categories list.
*
*/

class PostHeader extends Component {

  render(){

    const {post_data} = this.props

    let timestamp = "00:00:00",
    author = "Post Author",
    category = "home",
    commentCount = 0,
    post_id = "",
    title = "Post Title",
    voteScore = 0

    //assemble options object for toLocaleTimeString() method
    var options = { weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour12: false }

    if(this.props.post_data) {
      timestamp = new Date(post_data.timestamp).toLocaleTimeString("en-NZ", options)
      author = post_data.author
      category = post_data.category
      commentCount = post_data.commentCount
      post_id = post_data.id
      title = post_data.title
      voteScore = post_data.voteScore
    }

    return(
      <div className="user-info">
          <div className="voting-block">
            <a
              onClick={() => this.props.voteOnPost(post_id, "upVote")}
            ><Fa.FaChevronUp className="vote-up" size={22}/></a>
            <div className="vote-count">{voteScore}</div>
            <a
              onClick={() => this.props.voteOnPost(post_id, "downVote")}
            ><Fa.FaChevronDown className="vote-down" size={22}/></a>
          </div>

            <span className="user-avatar">
              <Link
                to={`/${category}/${post_id}`}
              ><Fa.FaFileImageO size={75}/></Link>
            </span>
            <div className="post-info">
              <div>
                <Link
                  to={`/${category}/${post_id}`}
                >{author}</Link>
              </div>
              <div>
                <Link
                  to={`/${category}/${post_id}`}
                  onClick={() => {
                    this.props.selectPostThunk(post_id)
                    this.props.getSelectPostCommentsThunk(post_id)
                  }}
                ><h3>{title}</h3>
                </Link>
              </div>
              <div>
                <span className="published-time">
                  published on Time: {`${timestamp}`} | </span>
                <span className="comments-count">
                  Comment count: {commentCount}
                </span>
              </div>
            </div>

          <div className="edit-tools">
            <a className="edit-btn"><Fa.FaEdit className="edit-btn" size={30} /></a>
            <a
              className="delete-btn"
              onClick={() => this.props.deletePost(post_id)}
            ><Fa.FaTrashO className="delete-btn" size={30} /></a>
          </div>
      </div>
    )//return()
  }//render()

}//class PostHeader

function mapDispatchToProps(dispatch) {
  return {
    selectPostThunk: (post_id) => {dispatch(selectPostThunk(post_id))},
    voteOnPost: (post_id, vote) => {dispatch(voteOnPostThunk(post_id, vote))},
    getSelectPostCommentsThunk: (post_id) => dispatch(getSelectPostCommentsThunk(post_id)),
    deletePost: (post_id) => dispatch(deletePostThunk(post_id))
  }
}

export default connect(null, mapDispatchToProps)(PostHeader)
