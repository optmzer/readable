import React, { Component } from 'react'
import '../style/create.css'
import * as Fa from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import { submitPostThunk } from '../actions'
// import { Link } from 'react-router-dom'


/**
 * bug - Submit button will be disabled until the state is updated
 but it will never will be updated until it is submitted.
 update state by typing in inputs.
 */

class Create extends Component {

  state={
    disabled: true,
  }

//TODO: Create a unique ID so posts do not rewrite itself over the other one.
//activateButton does not really work. Find out why.
  activateButton(event) {
    if(event.target.form[1].value !== "Select category..."
        && event.target.form[2].value
        && event.target.form[3].value
        && event.target.form[4].value){
        console.log("L27 disabled: false ", this.state);
        this.setState({disabled: false})
      }
  }

  handleForm(event){

    event.preventDefault()

    if(event.target[1].value !== "Select category..."
        && event.target[2].value
        && event.target[3].value
        && event.target[4].value){

        let post_data ={
          id: Math.random() * 10000000000000000, //- UUID should be fine, but any unique id will work
          timestamp: Date.now(),          //- timestamp in whatever format you like, you can use Date.now() if you like
          category: event.target[1].value,   //- String
          author: event.target[2].value,     //- String
          title: event.target[3].value,  //Any of the categories listed in categories.js.
          body: event.target[4].value,    //- String
      }

      this.props.submitPost(post_data)
      //Open Post details page after complete
      this.props.history.replace("/" + post_data.category + "/" + post_data.id)
    }

  }//handleForm()

  render() {
    return(
      <div className="create-post">
      <Fa.FaFileImageO size={75} />
        <form
          id="submit-form"
          onChange={(event) => this.activateButton(event)}
          onSubmit={(event) => this.handleForm(event)}
          method="POST"
        >
          <fieldset>
            <legend>Create Post</legend>
            Post category:
            <select id="category_selector" name="post-category" >
              <option value="Select category">Select category...</option>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </select>
            Author: <input name="author" type="text"/>
            Post title: <input id="post-title" name="title" type="text"/>
            <br/>
              <textarea name="post-body" rows="8" cols="80"></textarea>
            <br/>
              <input type="submit" value="Post" disabled={this.state.disabled}/>
            <input type="reset" value="Reset Form"/>
            <button
              type="button"
              name="button-cancel"
              onClick={() => this.props.history.goBack()}
            >Cancel</button>
          </fieldset>
        </form>
      </div>
    )//return()
  }//render()
}//class Create

function mapDispatchToProps(dispatch) {
  return {
    submitPost: (post) => dispatch(submitPostThunk(post))
  }
}//mapDispatchToProps()

export default connect(null, mapDispatchToProps)(Create)
