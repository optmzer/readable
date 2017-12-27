import React, {Component} from 'react'
import CommentHeader from './comment-header'
import '../style/comments.css'


class Comment extends Component {
  render() {
    return(
      <div className="comment">
        <CommentHeader />
        <p className="comment-text">
          Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Excepturi facilis, harum cum, aut aspernatur
          dolorem, ea accusamus assumenda at laboriosam enim rem nisi atque
          qui. Odio numquam saepe, vero vel velit expedita libero consectetur,
          distinctio, hic doloribus reiciendis tempore maxime temporibus dolor?
          Veritatis saepe corporis consequuntur facere ea consequatur commodi
        </p>
      </div>
    )//return()
  }//render()
}//class Comments

export default Comment
