import React, {Component} from 'react'
import PostHeader from './post-header'
import Comment from './comment'
import '../style/post.css'
// import * as readableAPI from '../utils/readableAPI'
import { connect } from 'react-redux'

class Post extends Component {


  render(){
  console.log("L32 Post this.props = ", this.props);
  console.log("L33 Post this.state = ", this.state);


  const { post } = this.props

  // var post_data = {
  //   id: post.id,
  //   category: post.category,
  //   title: post.title,
  //   author: post.author,
  //   voteScore: post.voteScore,
  //   commentCount: post.commentCount,
  //   timestamp: new Date(post.timestamp).toLocaleTimeString(),
  // }

  return(
        <div className="post">
          <PostHeader post_data={this.props.post} className="post-header" />
          <div className="post-block">
            <div className="post-title">
              <h2>{post.title}</h2>
            </div>
            <div className="post-body">
              <article className="post-text">
                {post.body}
              </article>
            </div>
            <section className="comment-section">
              <ul>
                <li>
                  <Comment />
                </li>
                <li>
                  <Comment />
                </li>
                <li>
                  <Comment />
                </li>
                <li>
                  <Comment />
                </li>
                <li>
                  <Comment />
                </li>
                <li>
                  <Comment />
                </li>
              </ul>
            </section>
          </div>
        </div>

    )//return()
  }//render()
}//class Post

function mapStateToProps(state) {
  const { select_post_reducer } = state
  return {
    post: select_post_reducer.post
  }
}

export default connect(mapStateToProps)(Post)
