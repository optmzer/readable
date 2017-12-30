import React, {Component} from 'react'
import Header from './header'
import Footer from './footer'
import PostHeader from './post-header'
import * as readableAPI from '../utils/readableAPI'
import {connect} from 'react-redux'
import {select_category} from '../actions'

class HomePage extends Component {

  getLogs(data) {
    console.log("Logs = ", data)
  }

  voteForPost() {
    var post_id = "8xf0y6ziyjabvozdd253nd"
    readableAPI.voteOnPost(post_id, "upVote")
    .then((resp)=>(console.log("L28 Vote ", resp)))
  }

  render(){

    console.log("L27 HomePage ", this.props);

    const { category_posts } = this.props.category_posts_reducer

    return(
      <div>
        <Header
          selectCategory={
            (category, posts) => this.props.select_category(category, posts)
          }

        />
          <div className="home-page-body">
            <ul>
              { category_posts &&
                category_posts.map((post) => (
                  <li key={post.id}>
                    <PostHeader
                      onVote={this.voteForPost}
                      title={post.title}
                      author={post.author}
                      voteScore={post.voteScore}
                      commentCount={post.commentCount}
                    />
                  </li>
                ))
              }
            </ul>
          </div>
        <Footer />
      </div>
    )//return()
  }//render()
}//class HomePage

function mapStateToProps({category_posts_reducer}) {
  return {
    category_posts_reducer
  }
}//mapStateToProps()

function mapDispatchToProps(dispatch) {
  return {
    select_category: (category, posts) => dispatch(select_category(category, posts))
  }
}//mapDispatchToProps()

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
