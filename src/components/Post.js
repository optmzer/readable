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
  submitCommentThunk,
  openLoginModal
} from '../actions'
import * as _ from 'underscore'
// import Modal from 'react-modal'


/**
 * Post can be done as a stand alone React app because I will only see
 comments when I see the post. And when I vote the server reterns new comment
 anyway.
 */

class Post extends Component {

  state={
    disabled: true, //category selector on post form
    // identifyModalOpened: false, //modal window
  }

  updatePost() {
    this.props.selectPostThunk(this.props.match.params.post_id)
    this.props.getSelectPostCommentsThunk(this.props.match.params.post_id)
  }

  activateButton(event){
      if(event.target.form[3].value){
        this.setState({ disabled: false })
    }
  }//activateButton()

  handleComment(event) {
    console.log("L69 comment-form ", event.target);
    event.preventDefault()
      if(event.target[3].value){
        //assemble comment object to send to server
        let comment_object = {
          id: "com" + Math.random() * 10000000000000000, //Any unique ID. As with posts, UUID is probably the best here.
          timestamp: Date.now(),  //timestamp. Get this however you want.
          body: event.target[3].value, //String
          author: this.props.user_login, //String
          parentId: this.props.match.params.post_id, //Should match a post id in the database.
        }

        //postCommentThunk
        this.props.submitComment(comment_object)

        //Reset form after submit
        event.target.reset()
        this.setState({disabled: true})

        //get fresh post and list of comments on update
        this.updatePost()
    }
  }//handleComment()

  componentWillMount() {
    //get selected post on start from the addtess bar
    this.updatePost()
  }

  openIdentifyModal(event){
    if(this.props.user_login === "" || _.isEmpty(this.props.user_login)){
      this.props.openLoginModal()
      //removes focus from the input othervise it stays focused
      //and the Modal stays opened.
      event.target.blur()
    }
  }//openIdentifyModal()

  render(){

    console.log("L128 post this.state ", this.state);
    console.log("L129 post this.props ", this.props);

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
                    onFocus={(event) => this.openIdentifyModal(event)}
                  >
                    <fieldset>
                      <legend>Comment</legend>
                        { this.props.user_login &&
                          <div className="comment-controls-hidden">
                            <span className="comment-author">
                              Author: {this.props.user_login}
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
                          </div>
                        }
                      <div className="comment-body">
                        <textarea
                          id="comment-textarea"
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
  const { select_post_reducer, selected_post_comments_reducer} = state
  const { user_login_reducer } = state

  return {
    post: select_post_reducer.post,
    comments: selected_post_comments_reducer.comments,
    user_login: user_login_reducer.user_login
  }
}//mapStateToProps()

function mapDispatchToProps(dispatch) {
  return {
    getSelectPostCommentsThunk: (post_id) => dispatch(getSelectPostCommentsThunk(post_id)),
    selectPostThunk: (post_id) => dispatch(selectPostThunk(post_id)),
    voteOnPost: (post_id, vote) => dispatch(voteOnPostThunk(post_id, vote)),
    deletePost: (post_id) => dispatch(deletePostThunk(post_id)),
    submitComment: (comment) => dispatch(submitCommentThunk(comment)),
    openLoginModal: () => dispatch(openLoginModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
