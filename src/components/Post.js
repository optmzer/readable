import React, {Component} from 'react'
import * as Fa from 'react-icons/lib/fa'
import Comment from './comment'
import '../style/post.css'
import '../style/header.css'
import { connect } from 'react-redux'
import {
  selectPostThunk,
  getSelectPostCommentsThunk,
  voteOnPostThunk,
  deletePostThunk,
  submitCommentThunk
} from '../actions'
import * as _ from 'underscore'

/**
 * Post can be done as a stand alone React app because I will only see
 comments when I see the post. And when I vote the server reterns new comment
 anyway.
 */

class Post extends Component {

  state={
    disabled: true
  }

  activateButton(event){
    console.log("L28 post event.target ", event.target);
      if(event.target.form[1].value && event.target.form[4].value){
        this.setState({ disabled: false })
    }
  }//activateButton()

  handleComment(event) {

    event.preventDefault()
      if(event.target[1].value && event.target[4].value){
        let comment_object = {
          id: "com" + Math.random() * 10000000000000000, //Any unique ID. As with posts, UUID is probably the best here.
          timestamp: Date.now(),  //timestamp. Get this however you want.
          body: event.target[4].value, //String
          author: event.target[1].value, //String
          parentId: this.props.match.params.post_id, //Should match a post id in the database.
        }

        //postCommentThunk
        this.props.submitComment(comment_object)

        //Reset form after submit
        event.target.reset()
        this.setState({disabled: true})

        //get fresh list of comments on update
        this.props.getSelectPostCommentsThunk(this.props.post.id)
    }
  }//handleComment()

  componentWillMount() {
    //get selected post
    this.props.selectPostThunk(this.props.match.params.post_id)
    this.props.getSelectPostCommentsThunk(this.props.match.params.post_id)

    // //if comments from previous post exist clear them from
    // if(this.props.comments){
    //   this.props.comment
    // }
  }

  render(){

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

  console.log("L80 post ", this.props);

  return(
        <div className="home-page-body">
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
                  <form
                    className="comment-form"
                    method="POST"
                    onChange={(event) => this.activateButton(event)}
                    onSubmit={(event) => this.handleComment(event)}
                  >
                    <fieldset>
                      <legend>Comment</legend>
                        <span className="comment-author">
                          <span>Author: </span>
                          <input  type="text" name="author" />
                        </span>
                        <span className="input-btn">
                          <input
                            type="submit"
                            value="Submit"
                            disabled={this.state.disabled}/>
                        </span>
                        <span className="input-btn">
                          <input type="reset" value="Reset Form"/>
                        </span>
                      <div className="comment-body">
                        <textarea
                          name="post-input"
                          rows="4"
                          cols="80"></textarea>
                      </div>
                    </fieldset>
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
    deletePost: (post_id) => dispatch(deletePostThunk(post_id)),
    submitComment: (comment) => dispatch(submitCommentThunk(comment)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
