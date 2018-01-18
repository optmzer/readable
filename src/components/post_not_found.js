import React, { Component } from 'react'


//TODO: add some html to render post not found message instead of blanck page.
class PageNotFound extends Component {
  render(){
    return(
      <div className="home-page-body">
        <div className="message-404">
          <h1>404 Post Not Found</h1>
          <p>Something happened.</p>
          <p>We cannot find the post requested.</p>
          <p>Perhaps the internet connection
             to the server was lost or your post was deleted</p>
        </div>
      </div>
    )//return
  }//render()
}
export default PageNotFound
