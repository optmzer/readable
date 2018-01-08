import React, { Component } from 'react'
import '../style/create.css'
import * as Fa from 'react-icons/lib/fa'


class Create extends Component {
  render() {
    return(
      <div className="create-post">
      <Fa.FaFileImageO size={75} />
      <p className="author-name">Author: Any NickName</p>
        <form action="submit">
          Post category:
          <select name="category" >
            <option value="Select category">Select category...</option>
            <option value="react">React</option>
            <option value="redux">Redux</option>
            <option value="udacity">Udacity</option>
          </select>
          Post title: <input name="title" type="text"/>
          <br/>
            <textarea name="post-input" rows="8" cols="80"></textarea>
          <br/>
          <input type="submit" value="Submit"/>
          <input type="reset" value="Reset Form"/>
          <button type="button" name="button-cancel">Cancel</button>
        </form>
      </div>
    )//return()
  }//render()
}//class Create

export default Create
