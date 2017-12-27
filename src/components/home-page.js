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

  render(){
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
