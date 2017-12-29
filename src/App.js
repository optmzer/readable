import React, { Component } from 'react';
import './style/App.css';
import HomePage from './components/home-page'
import {connect} from 'react-redux'
import {select_category} from './actions'

class App extends Component {

  render() {
    // console.log("L10 App ", this.props);
    const {select_category, category_posts_reducer} = this.props

    return (
      <div className="App">
      <HomePage
        selectCategory={(category, posts) => select_category(category, posts)}
        listOfPosts={category_posts_reducer.category_posts}
      />
      </div>
    )
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
