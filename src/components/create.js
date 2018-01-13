import React, { Component } from 'react'
import '../style/create.css'
import '../style/header.css'
import * as Fa from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import { submitPostThunk, openLoginModal } from '../actions'


/**
 * bug - Submit button will be disabled until the state is updated
 but it will never will be updated until it is submitted.
 update state by typing in inputs.
 */

class Create extends Component {

  state={
    disabled: true,
  }

  activateButton(event) {
    if(event.target.form[1].value !== "Select category"
        && event.target.form[2].value
        && event.target.form[3].value){
        console.log("L27 disabled: false ", this.state);
        this.setState({disabled: false})
      } else {
        this.setState({disabled: true})
      }
  }

  handleForm(event){

    event.preventDefault()
    console.log("L37 create ", event.target);
    if(event.target[1].value !== "Select category"
        && event.target[2].value
        && event.target[3].value){

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
    }
  }//handleForm()

  componentWillMount() {
    if(!this.props.user_login && !this.props.open_login_modal){
      this.props.openLoginModal()
    }
  }

  // componentDidMount() {
  //   if(!this.props.user_login && !this.props.open_login_modal){
  //     this.props.history.goBack()
  //   }else {
  //     this.props.history.push("/create")
  //   }
  // }
  // {!this.props.user_login && this.props.openLoginModal()}

  render() {
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

      { this.props.user_login &&
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

              <input id="post-title" name="title" type="text" placeholder="Title"/>
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
                onClick={() => this.props.history.goBack()}
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
  const { user_login_reducer } = state
  return {
    user_login: user_login_reducer.user_login,
    open_login_modal: user_login_reducer.open_login_modal
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitPost: (post) => dispatch(submitPostThunk(post)),
    openLoginModal: () => dispatch(openLoginModal())
  }
}//mapDispatchToProps()

export default connect(mapStateToProps, mapDispatchToProps)(Create)
