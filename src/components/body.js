import React, { Component } from 'react'
import PostHeader from './post-header'
import { connect } from 'react-redux'
import { selectCategoryThunk, sortPosts } from '../actions'
import sortBy from 'sort-by'
import _ from 'underscore'
// import Modal from 'react-modal'

/**
*Make modal for post edit button. to see how it works.
*/

class Body extends Component {

state = {
  identifyModalOpened: false,
}

  componentWillMount() {
    if(this.props.match.url !== "/"){
      this.props.selectCategoryThunk(this.props.match.params.post_category)
    } else {
      this.props.selectCategoryThunk("home")
    }
  }

  render() {

    const { current_category } = this.props

    if(!(_.isEmpty(current_category))) {
      current_category.sort(sortBy(this.props.sort_param))
    }

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
  const { category_posts_reducer, sort_posts_reducer } = state
  return {
    current_category: category_posts_reducer.category_posts,
    sort_param: sort_posts_reducer.sort_param
  }
}//mapStateToProps()

function mapDispatchToProps(dispatch) {
  return {
    selectCategoryThunk: (category) => dispatch(selectCategoryThunk(category)),
    sortPosts: (sort_param) => dispatch(sortPosts(sort_param)),
  }
}//mapDispatchToProps()

export default connect(mapStateToProps, mapDispatchToProps)(Body)
