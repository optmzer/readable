import React, {Component} from 'react'
import Header from './header'
import Footer from './footer'
import PostHeader from './post-header'
import * as readableAPI from '../utils/readableAPI'

class HomePage extends Component {

  // state = {
  //   backend: []
  // }
  //
  // componentDidMount() {
  //   if(this.props.listOfPosts){
  //     this.setState({
  //       backend: this.props.listOfPosts
  //     })
  //   }
  // }//componentDidMount()

  getLogs(data) {
    console.log("Logs = ", data)
  }

  voteForPost() {
    var post_id = "8xf0y6ziyjabvozdd253nd"
    readableAPI.voteOnPost(post_id, "upVote")
    .then((resp)=>(console.log("L28 Vote ", resp)))
  }

  render(){

    // console.log("L27 HomePage ", this.props);

    // const { backend } = this.state

    return(
      <div>
        <Header
          selectCategory={
            (category, posts) => this.props.selectCategory(category, posts)
          }

        />
          <div className="home-page-body">
            <ul>
              { this.props.listOfPosts &&
                this.props.listOfPosts.map((post) => (
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
