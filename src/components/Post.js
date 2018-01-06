import React, {Component} from 'react'
import PostHeader from './post-header'
import Comment from './comment'
import '../style/post.css'
import * as readableAPI from '../utils/readableAPI'
import { connect } from 'react-redux'


/**
 * Post can be done as a stand alone React app because I will only see
 comments when I see the post. And when I vote the server reterns new comment
 anyway.
 */

class Post extends Component {

  // state={
  //   comments: []
  // }

  componentWillMount() {
    // readableAPI.getAllPostComments(this.props.post.id)
    // .then(comments => this.setState({
    //   comments
    // }))

  }

  render(){
  console.log("L32 Post this.props = ", this.props);
  console.log("L33 Post this.state = ", this.state);


  const { post, comments } = this.props


  return(
        <div className="post">
          <PostHeader post_data={post} className="post-header" />
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
              <ul>{
                comments &&
                  comments.map(comment => {
                    return  (
                      <li key={comment.id}>
                        <Comment comment_data={comment}/>
                      </li>
                    )
                  })
              }
              </ul>
            </section>
          </div>
        </div>

    )//return()
  }//render()
}//class Post

function mapStateToProps(state) {
  const { select_post_reducer, selected_post_comments_reducer } = state
  return {
    post: select_post_reducer.post,
    comments: selected_post_comments_reducer.comments
  }
}//mapStateToProps()

// function mapDispatchToProps(dispatch) {
//   return {
//     getSelectPostCommentsThunk: (parent_id) => dispatch(getSelectPostCommentsThunk(parent_id)),
//   }
// }

export default connect(mapStateToProps)(Post)
