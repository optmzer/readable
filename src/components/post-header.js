import React, {Component} from 'react'
import * as Fa from 'react-icons/lib/fa'
import { Link } from 'react-router-dom'
import {
        getPostToEditThunk,
        voteOnPostThunk,
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
              title="Vote Up"
            ><Fa.FaChevronUp className="vote-up" size={22}/></a>
            <div className="vote-count">{voteScore}</div>
            <a
              onClick={() => this.props.voteOnPost(post_id, "downVote")}
              title="Vote Down"
            ><Fa.FaChevronDown className="vote-down" size={22}/></a>
          </div>

            <span className="user-avatar">
              <Link
                to={`/${category}/${post_id}`}
                title="Open Post"
              ><Fa.FaFileImageO size={75}/></Link>
            </span>
            <div className="post-info">
              <div>
                <Link
                  to={`/${category}/${post_id}`}
                  title="Open Post"
                >{author}</Link>
              </div>
              <div>
                <Link
                  to={`/${category}/${post_id}`}
                  title="Open Post"
                ><h3>{title}</h3>
                </Link>
              </div>
              <div>
                <span className="published-time">
                  Published: {`${timestamp}`} | </span>
                <span className="comments-count">
                  <Fa.FaComments className="comments-count-icon" size={30}/>
                    <span>{commentCount}</span>
                </span>
              </div>
            </div>

          <div className="edit-tools">
            <Link
              className="edit-btn"
              to="/create"
              title="Edit Post"
              onClick={() => this.props.getPostToEdit(post_id)}
            ><Fa.FaEdit className="edit-btn" size={30} /></Link>
            <a
              className="delete-btn"
              title="Delete Post"
              onClick={() => this.props.deletePost(post_id)}
            ><Fa.FaTrashO className="delete-btn" size={30} /></a>
          </div>
      </div>
    )//return()
  }//render()

}//class PostHeader

function mapDispatchToProps(dispatch) {
  return {
    getPostToEdit: (post_id) => {dispatch(getPostToEditThunk(post_id))},
    voteOnPost: (post_id, vote) => {dispatch(voteOnPostThunk(post_id, vote))},
    deletePost: (post_id) => dispatch(deletePostThunk(post_id))
  }
}

export default connect(null, mapDispatchToProps)(PostHeader)
