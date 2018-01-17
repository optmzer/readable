import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as Fa from 'react-icons/lib/fa'
import * as _ from 'underscore'
import Modal from 'react-modal'
import Comment from './comment'
import sortBy from 'sort-by'
import '../style/post.css'
import '../style/header.css'
import { connect } from 'react-redux'
import {
  selectPostThunk,
  getSelectPostCommentsThunk,
  voteOnPostThunk,
  deletePostThunk,
  getPostToEditThunk,
  submitCommentThunk,
  openLoginModal,
  submitEditedCommentThunk,
  cancel_edit_comment
} from '../actions'


//style for user login Modal
let customStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.1)'
  },
  content : {
    position                   : 'absolute',
    top                        : '35%',
    left                       : '20%',
    right                      : '20%',
    bottom                     : '35%',
    border                     : '1px solid #bbb',
    background                 : '#ddd',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
}//customStyle


class Post extends Component {

  state={
    disabled: true, //category selector on post form
    edit_comment_modal_open: false, //Edit comment modal
    comment_to_edit: {}
  }

  updatePost() {
    this.props.selectPostThunk(this.props.match.params.post_id)
    this.props.getSelectPostCommentsThunk(this.props.match.params.post_id)
  }

  //Activate submit button on comment form
  activateButton(event){
      if(event.target.form[3].value){
        this.setState({ disabled: false })
    }
  }//activateButton()

  //Creates comment object and sends it to the server
  handleComment(event) {
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

  // ====== Identify Modal =====

  // Opens Identify Modal on Edit Post button click.
  openIdentifyModal(event){
    if(this.props.user_login === "" || _.isEmpty(this.props.user_login)){
      this.props.openLoginModal()
      //removes focus from the input othervise it stays focused
      //and the Modal stays opened.
      event.target.blur()
    }
  }//openIdentifyModal()

  // ========== Edit comment Modal =========
  componentDidMount() {
    Modal.setAppElement(".home-page-body")
  }

  handleEditCommentModalInput(event) {
    event.preventDefault()

    let new_comment = this.state.comment_to_edit
    new_comment.timestamp = Date.now()
    new_comment.body = event.target[1].value

    this.props.submitEditedComment(new_comment)

    this.closeEditCommentModal()

  }

  //This has to be in store so I can subscribe <Comment> for actions?
  openEditCommentModal(comment){
    if(this.props.user_login === "" || _.isEmpty(this.props.user_login)){
      this.props.openLoginModal()
    }

    this.setState({
      comment_to_edit: comment,
      edit_comment_modal_open: true
    })
  }

  closeEditCommentModal(){
    this.setState({
      comment_to_edit: {},
      edit_comment_modal_open: false
    })
    this.props.cancelEditComment()
  }

  render(){

  const { post, comments } = this.props
  let timestamp
  var options = { weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour12: false }
  //translate date into local format
  if(post) {
    timestamp = new Date(post.timestamp).toLocaleTimeString("en-NZ", options)
  }

  //sort comments by dane New to Old
  if(comments) {comments.sort(sortBy("-timestamp"))}

  return(
        <div className="home-page-body">
          {
            !_.isEmpty(post) &&
            <div className="user-info">
              <div className="voting-block">
                <a className="vote-up"
                  onClick={() => this.props.voteOnPost(post.id, "upVote")}
                  title="Vote Up"
                ><Fa.FaChevronUp size={22}/></a>
                <div className="vote-count">{post.voteScore}</div>
                <a className="vote-down"
                  onClick={() => this.props.voteOnPost(post.id, "downVote")}
                  title="Vote Down"
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
                    <span className="published-time">
                      Published: {`${timestamp}`} |</span>
                    <span className="comments-count">
                      <Fa.FaComments className="comments-count-icon" size={30}/>
                    </span>
                    <span>{post.commentCount}</span>
                  </p>
                </div>
              </div>
              <div className="edit-tools">
                <Link
                  to="/create"
                  title="Edit Post"
                  onClick={() => this.props.getPostToEdit(post.id)}
                >
                  <Fa.FaEdit className="edit-btn" size={30} />
                </Link>
                <a
                  onClick={() => this.props.deletePost(post.id)}
                  title="Delete Post"
                  ><Fa.FaTrashO className="delete-btn" size={30} />
                </a>
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
                    onReset={() => this.setState({disabled: true})}
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
                              <button
                                type="submit"
                                value="Submit"
                                disabled={this.state.disabled}
                              >
                                <Fa.FaCheck size={25}/>
                              </button>
                            </span>
                            <span className="input-btn">
                              <button type="reset" value="Reset Form">
                                <Fa.FaTrashO size={25} />
                              </button>
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
                      <Comment
                        comment_data={comment}
                        openEdit={(comment) =>
                          this.openEditCommentModal(comment)
                        }
                      />
                    </li>
                  )
                })
              }
              </ul>
            }
            </section>
          </div>
          <Modal
            className="modal"
            overlayClassName="overlay"
            isOpen={this.props.user_login && this.state.edit_comment_modal_open}
            onRequestClose={() => this.closeEditModal()}
            style={customStyle}
          >
            <form
              className="modal-login-form"
              onSubmit={(event) => this.handleEditCommentModalInput(event)}
            >
              <fieldset className="modal-fieldset">
              <legend>Edit comment</legend>
              <textarea
                name="edit-comment"
                rows="4"
                cols="80"
                defaultValue={this.state.comment_to_edit.body}
                ></textarea>
              <button
                className="modal-btn"
                type="submit"
                value="OK"
              >
                <Fa.FaCheck size={25}/>
              </button>
              <button
                className="modal-btn"
                onClick={() => this.closeEditCommentModal()}
              >
                <Fa.FaClose size={25}/>
              </button>
              </fieldset>
            </form>
          </Modal>
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
    openLoginModal: () => dispatch(openLoginModal()),
    getPostToEdit: (post_id) => dispatch(getPostToEditThunk(post_id)),
    submitEditedComment: (comment) => dispatch(submitEditedCommentThunk(comment)),
    cancelEditComment: () => dispatch(cancel_edit_comment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
