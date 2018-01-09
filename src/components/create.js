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

  formHandler(event){

    event.preventDefault()
    console.log("L11 create event.target", event.target);

    if(event.target[0].value !== "Select category..." &&
      event.target[1].value && event.target[2].value){

      let post_data ={
        id: Math.random() * 1000000000, //- UUID should be fine, but any unique id will work
        timestamp: Date.now(),          //- timestamp in whatever format you like, you can use Date.now() if you like
        category: event.target[1].value,   //- String
        author: event.target[2].value,     //- String
        title: event.target[3].value,  //Any of the categories listed in categories.js.
        body: event.target[4].value,    //- String
      }

      this.props.history.replace("/" + post_data.category + "/" + post_data.id)

      // console.log("L22 post_data ", post_data);
      this.props.submitPost(post_data)

      this.setState({disabled: false})

    }


  }//formHandler()

  render() {
    // console.log("L38 create this.props ", this.props);
    // console.log("L39 create this.state ", this.state);

    return(
      <div className="create-post">
      <Fa.FaFileImageO size={75} />
        <form
          id="submit-form"
          onSubmit={(data) => this.formHandler(data)}
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
              <input type="submit" value="Post" />
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
