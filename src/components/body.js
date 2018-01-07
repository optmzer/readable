import React, { Component } from 'react'
import PostHeader from './post-header'
import { connect } from 'react-redux'
import { selectCategoryThunk } from '../actions'
// import * as readableAPI from '../utils/readableAPI'
import _ from 'underscore'

class Body extends Component {

  componentWillMount() {
    if(this.props.match.url !== "/"){
      this.props.selectCategoryThunk(this.props.match.params.post_category)
    } else {
      this.props.selectCategoryThunk("home")
    }
  }

  render() {

    const { current_category } = this.props

    // console.log("L12 body = ", this.props)

    return(
      <div className="home-page-body">
        <ul>
          { !(_.isEmpty(current_category)) &&
            current_category.map((post) => (
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

function mapStateToProps(state) {
  const {category_posts_reducer} = state
  return {
    current_category: category_posts_reducer.category_posts,
  }
}//mapStateToProps()

function mapDispatchToProps(dispatch) {
  return {
    selectCategoryThunk: (category) => dispatch(selectCategoryThunk(category)),
  }
}//mapDispatchToProps()

export default connect(mapStateToProps, mapDispatchToProps)(Body)
