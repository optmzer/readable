import React, { Component } from 'react'
import PostHeader from './post-header'
// import * as readableAPI from '../utils/readableAPI'
import _ from 'underscore'

class Body extends Component {

  render() {

    const { category_posts } = this.props

    // console.log("L12 body = ", this.props)

    return(
      <div className="home-page-body">
        <ul>
          { !(_.isEmpty(category_posts)) &&
            category_posts.map((post) => (
              <li key={post.id}>
                <PostHeader
                  post_data={{
                    id: post.id,
                    category: post.category,
                    title: post.title,
                    author: post.author,
                    voteScore: post.voteScore,
                    commentCount: post.commentCount,
                    timestamp: post.timestamp
                  }}
                />
              </li>
            ))
          }
        </ul>
      </div>
    )//return()
  }//render()
}//class Body

export default Body
