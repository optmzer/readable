import React, {Component} from 'react'
import * as Fa from 'react-icons/lib/fa'
import Comment from './comment'
import '../style/post.css'
import { connect } from 'react-redux'
import {
  selectPostThunk,
  getSelectPostCommentsThunk,
  voteOnPostThunk,
  deletePostThunk
} from '../actions'
import * as _ from 'underscore'

/**
 * Post can be done as a stand alone React app because I will only see
 comments when I see the post. And when I vote the server reterns new comment
 anyway.
 */

class Post extends Component {


  componentWillMount() {
    if(!this.props.post){
      this.props.selectPostThunk(this.props.match.params.post_id)
      this.props.getSelectPostCommentsThunk(this.props.match.params.post_id)
    }
  }

  render(){
  // console.log("L23 Post this.props = ", this.props);
  // console.log("L24 Post this.props.match = ", this.props.match);
  // console.log("L25 Post this.state = ", this.state);


  const { post, comments } = this.props
  let timestamp
  var options = { weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour12: false }
  if(post) {
    timestamp = new Date(post.timestamp).toLocaleTimeString("en-NZ", options)
  }

  console.log("L47 post ", this.props);

  return(
        <div className="post">
          {
            !_.isEmpty(post) &&
            <div className="user-info">
              <div className="voting-block">
                <a className="vote-up"
                  onClick={() => this.props.voteOnPost(post.id, "upVote")}
                ><Fa.FaChevronUp size={22}/></a>
                <div className="vote-count">{post.voteScore}</div>
                <a className="vote-down"
                  onClick={() => this.props.voteOnPost(post.id, "downVote")}
                ><Fa.FaChevronDown size={22}/></a>
              </div>
              <span className="user-avatar">
                <Fa.FaFileImageO size={75}/>
              </span>
              <div className="post-info">
                <div>
                  {post.author}
                </div>
                <div>
                  <h3>{post.title}</h3>
                </div>
                <div>
                  <p>
                    <span className="published-time">published on Time: {`${timestamp}`} | </span>
                    <span className="comments-count">
                      Comment count: {post.commentCount}
                    </span>
                  </p>
                </div>
              </div>
              <div className="edit-tools">
                <a ><Fa.FaEdit className="edit-btn" size={25} /></a>
                <a
                  onClick={() => this.props.deletePost(post.id)}
                  ><Fa.FaTrashO className="delete-btn" size={25} /></a>
              </div>
            </div>
          }
          <div className="post-block">
            {
              !_.isEmpty(post) &&
              <section>
                <div className="post-title">
                  <h2>{post.title}</h2>
                </div>
                <div className="post-body">
                  <article className="post-text">
                    {post.body}
                  </article>
                </div>
                <section className="add-comment">
                  <form action="submit">
                    <p>Comment: </p>
                      <textarea name="post-input" rows="4" cols="80"></textarea>
                    <br/>
                    <input type="submit" value="Submit"/>
                    <input type="reset" value="Reset Form"/>
                  </form>
                </section>
              </section>
            }
            <section className="comment-section">{
              !_.isEmpty(post) && comments &&
              <ul>{
                comments.map(comment => {
                  return  (
                    <li key={comment.id}>
                      <Comment comment_data={comment}/>
                    </li>
                  )
                })
              }
              </ul>
            }
            </section>
          </div>
        </div>

    )//return()
  }//render()
}//class Post

function mapStateToProps(state) {
  const { select_post_reducer, selected_post_comments_reducer } = state
  return {
    post: select_post_reducer.post,
    comments: selected_post_comments_reducer.comments
  }
}//mapStateToProps()

function mapDispatchToProps(dispatch) {
  return {
    getSelectPostCommentsThunk: (post_id) => dispatch(getSelectPostCommentsThunk(post_id)),
    selectPostThunk: (post_id) => dispatch(selectPostThunk(post_id)),
    voteOnPost: (post_id, vote) => dispatch(voteOnPostThunk(post_id, vote)),
    deletePost: (post_id) => dispatch(deletePostThunk(post_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
