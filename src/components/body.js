import React, { Component } from 'react'
import PostHeader from './post-header'
import { connect } from 'react-redux'
import { selectCategoryThunk } from '../actions'
import sortBy from 'sort-by'
import * as _ from 'underscore'
import escapeRegExp from 'escape-string-regexp'

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

    const { current_category, search_key_word } = this.props
    let showing_posts

    //sort by value
    if(!_.isEmpty(current_category)) {
      showing_posts = current_category.sort(sortBy(this.props.sort_param))
    }

    //search by author, title
    if(!_.isEmpty(search_key_word)) {
      const match = new RegExp(escapeRegExp(search_key_word), "i")
      showing_posts = current_category.filter(post =>
        match.test(post.title) || match.test(post.author)
      )
    } else {
      showing_posts = current_category
    }

    return(
      <div className="home-page-body">
        <ul>
          { !(_.isEmpty(showing_posts)) &&
            showing_posts.map((post) => (
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
  const { set_search_key_word_reducer } = state
  return {
    current_category: category_posts_reducer.category_posts,
    sort_param: sort_posts_reducer.sort_param,
    search_key_word: set_search_key_word_reducer.search_key_word
  }
}//mapStateToProps()

function mapDispatchToProps(dispatch) {
  return {
    selectCategoryThunk: (category) => dispatch(selectCategoryThunk(category)),
  }
}//mapDispatchToProps()

export default connect(mapStateToProps, mapDispatchToProps)(Body)
