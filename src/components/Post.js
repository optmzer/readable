import React, {Component} from 'react'
import PostHeader from './post-header'
import Comment from './comment'
import '../style/post.css'
// import * as readableAPI from '../utils/readableAPI'
import { connect } from 'react-redux'
import { selectPostThunk, getSelectPostCommentsThunk } from '../actions'


/**
 * Post can be done as a stand alone React app because I will only see
 comments when I see the post. And when I vote the server reterns new comment
 anyway.
 */

class Post extends Component {


  componentWillMount() {
    if(!this.props.post){
      this.props.selectPostThunk(this.props.match.params.post_id)
      this.props.getSelectPostCommentsThunk(this.props.match.params.post_id)
      //by connecting actions. because I already have props inhere
      //get selected post from match.params.post_category match.params.post_id
      //And
      //get comments for this post.
    }
  }

  render(){
  // console.log("L23 Post this.props = ", this.props);
  // console.log("L24 Post this.props.match = ", this.props.match);
  // console.log("L25 Post this.state = ", this.state);


  const { post, comments } = this.props


  return(
        <div className="post">
          <PostHeader post_data={post} className="post-header" />
          <div className="post-block">
              {
                post &&
                <section>
                <div className="post-title">
                  <h2>{post.title}</h2>
                </div>
                <div className="post-body">
                  <article className="post-text">
                    {post.body}
                  </article>
                </div>
                </section>
              }
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

function mapDispatchToProps(dispatch) {
  return {
    getSelectPostCommentsThunk: (post_id) => dispatch(getSelectPostCommentsThunk(post_id)),
    selectPostThunk: (post_id) => dispatch(selectPostThunk(post_id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
