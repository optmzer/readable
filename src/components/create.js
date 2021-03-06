import React, { Component } from 'react'
import '../style/create.css'
import '../style/header.css'
import * as Fa from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import * as _ from 'underscore'
import {
  submitPostThunk,
  submitEditedPostThunk,
  cancel_edit_post,
  openLoginModal
} from '../actions'


/**
 *Create/Edit post page.
 */

class Create extends Component {

  state={
    disabled: true,
  }

  //activates button when all necessary fields have values in them
  activateButton(event) {
    if(event.target.form[1].value !== "Select category"
        && event.target.form[2].value
        && event.target.form[3].value){
        this.setState({disabled: false})
      } else {
        this.setState({disabled: true})
      }
  }

  //handles input of the create post form
  handleForm(event){
    event.preventDefault()
    if(event.target[1].value !== "Select category"
        && event.target[2].value
        && event.target[3].value
        && _.isEmpty(this.props.post_to_edit))//there is no post_to_edit
    {
      let post_data ={
        id: Math.random() * 10000000000000000, //- UUID should be fine, but any unique id will work
        timestamp: Date.now(),          //- timestamp in whatever format you like, you can use Date.now() if you like
        category: event.target[1].value,   //- String
        author: this.props.user_login,     //- String
        title: event.target[2].value,  //Any of the categories listed in categories.js.
        body: event.target[3].value,    //- String
      }

      this.props.submitPost(post_data)
      //Open Post details page after complete
      this.props.history.replace("/" + post_data.category + "/" + post_data.id)
    } else {
      let post_data ={
        id: this.props.post_to_edit.id, //- UUID should be fine, but any unique id will work
        title: event.target[2].value,  //Any of the categories listed in categories.js.
        body: event.target[3].value,    //- String
      }

      this.props.submitEditedPostThunk(post_data)
      //Open Post details page after complete
      this.props.history.replace("/" + post_data.category + "/" + post_data.id)
    }
  }//handleForm()

  componentWillMount() {
    if(!this.props.user_login && !this.props.open_login_modal){
      this.props.openLoginModal()
    }
  }

  render() {

    const { post_to_edit } = this.props

    //sets default values
    let post_author = this.props.user_login,
        post_title,
        post_category = "Select category",
        post_body

    //if post is in edit mode fills in default values with
    //values of existing post
    if(post_to_edit) {
      post_author = post_to_edit.author
      post_title = post_to_edit.title
      post_category = post_to_edit.category
      post_body =post_to_edit.body
    }

    return(
      <div className="home-page-body">

        { !this.props.user_login &&
          <div className="login-info">
            <ul>
              <li>
                <a onClick={() => this.props.openLoginModal()}
                >Please login to create a post <Fa.FaSignIn size={35}/></a>
              </li>
              <li>
                <a onClick={() => this.props.history.goBack()}>
                  <Fa.FaArrowLeft size={30}/> Return
                </a>
              </li>
            </ul>
          </div>
        }

        { this.props.user_login && _.isEmpty(this.props.post_to_edit) &&
          <div>
            <div className="user-info-create">
              <div className="user-avatar-create">
                <Fa.FaFileImageO size={75} />
              </div>
              <span>Author: {this.props.user_login}</span>
            </div>
            <form
              id="submit-form"
              onChange={(event) => this.activateButton(event)}
              onSubmit={(event) => this.handleForm(event)}
              method="POST"
            >
              <fieldset>
                <legend>Create Post</legend>
                Post category:
                <select id="category_selector"
                        name="post-category"
                        defaultValue="Select category"
                        required>
                  <option value="Select category" disabled >Select post category</option>
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="udacity" >Udacity</option>
                </select>
                  <input
                    id="post-title"
                    name="title"
                    type="text"
                    placeholder="Title"
                  />
                  <br/>
                    <textarea name="post-body" rows="8" cols="80"></textarea>
                  <br/>
                <button
                  type="submit"
                  value="Post"
                  disabled={this.state.disabled}
                >
                  <Fa.FaCheck size={35}/>
                </button>
                <button
                  type="reset"
                  value="Reset"
                  onClick={() => this.setState({disabled: true})}
                >
                  <Fa.FaTrashO size={35}/>
                </button>
                <button
                  type="button"
                  name="button-cancel"
                  onClick={() => {
                    this.props.cancelEditPost()
                    this.props.history.goBack()
                  }}
                >
                  <Fa.FaClose size={35}/>
                </button>
              </fieldset>
            </form>
          </div>
        }

        { this.props.user_login && !_.isEmpty(this.props.post_to_edit) &&
          <div>
            <div className="user-info-create">
              <div className="user-avatar-create">
                <Fa.FaFileImageO size={75} />
              </div>
              <span>Author: {post_author}</span>
            </div>
            <form
              id="submit-form"
              onChange={(event) => this.activateButton(event)}
              onSubmit={(event) => this.handleForm(event)}
              method="POST"
            >
              <fieldset>
                <legend>Edit Post</legend>
                Post category:
                <select id="category_selector"
                        name="post-category"
                        defaultValue={post_category}
                        required>
                  <option value="Select category" disabled >Select post category</option>
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="udacity" >Udacity</option>
                </select>
                <input
                  id="post-title"
                  name="title"
                  type="text"
                  placeholder="Title"
                  defaultValue={post_title}
                />
                <br/>
                  <textarea
                    name="post-body"
                    rows="8"
                    cols="80"
                    defaultValue={post_body}
                  ></textarea>
                <br/>
                <button
                  type="submit"
                  value="Post"
                  disabled={this.state.disabled}
                >
                  <Fa.FaCheck size={35}/>
                </button>
                <button
                  type="reset"
                  value="Reset"
                  onClick={() => this.setState({disabled: true})}
                >
                  <Fa.FaTrashO size={35}/>
                </button>
                <button
                  type="button"
                  name="button-cancel"
                  onClick={() => {
                    this.props.cancelEditPost()
                    this.props.history.goBack()
                  }}
                >
                  <Fa.FaClose size={35}/>
                </button>
              </fieldset>
            </form>
          </div>
        }
      </div>
    )//return()
  }//render()
}//class Create

function mapStateToProps(state) {
  const { user_login_reducer, get_post_to_edit_reducer } = state
  return {
    user_login: user_login_reducer.user_login,
    open_login_modal: user_login_reducer.open_login_modal,
    post_to_edit: get_post_to_edit_reducer.post_to_edit
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitPost: (post) => dispatch(submitPostThunk(post)),
    submitEditedPostThunk: (post) => dispatch(submitEditedPostThunk(post)),
    cancelEditPost: () => dispatch(cancel_edit_post()),
    openLoginModal: () => dispatch(openLoginModal()),
  }
}//mapDispatchToProps()

export default connect(mapStateToProps, mapDispatchToProps)(Create)
