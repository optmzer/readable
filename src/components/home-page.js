import React, {Component} from 'react'
import Header from './header'
import Footer from './footer'
import PostHeader from './post-header'
import * as readableAPI from '../utils/readableAPI'

class HomePage extends Component {

  state = {
    backend: []
  }

  componentDidMount() {
    readableAPI.getAllPosts().then((posts) =>
      this.setState({
        backend: posts
      })
    )
  }//componentDidMount()

  getLogs(data) {
    console.log("Logs = ", data)
  }

  voteForPost() {
    var post_id = "8xf0y6ziyjabvozdd253nd"
    readableAPI.voteOnPost(post_id, "upVote")
    .then((resp)=>(console.log("L28 Vote ", resp)))
  }

  render(){

    console.log("L27 HomePage ", this.state.backend);

    const { backend } = this.state

    return(
      <div>
        <Header />
          <div className="home-page-body">
            <ul>
              {
                backend.map((post) => (
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

export default HomePage
