import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './header'
import Body from './body'
import Footer from './footer'
import Post from './post'
import {connect} from 'react-redux'
import {selectCategoryThunk} from '../actions'
// import * as readableAPI from '../utils/readableAPI'
// import _ from 'underscore'


class HomePage extends Component {

  componentWillMount() {
    this.props.selectCategoryThunk("home")

  }

  printHistory(history){
    console.log("L26 home-page ", history.location);
  }

  render(){

    console.log("L40 HomePage this.props = ", this.props);
    // console.log("L41 HomePage React this.state = ", this.state);

    let post_category, post_id
    if(this.props.selected_post){
      post_category = this.props.selected_post.category
      post_id = this.props.selected_post.id
      // post = this.props.selected_post.post
    }
    const { current_category } = this.props

    return(
      <div>
        <Header />
        <Switch>
          <Route exact path="/"
           render={() => <Body category_posts={current_category} />}
          />
          <Route exact path="/udacity"
           render={() => <Body category_posts={current_category} />}
          />
          <Route exact path="/react"
           render={() => <Body category_posts={current_category} />}
          />
          <Route exact path="/redux"
           render={() => <Body category_posts={current_category} />}
          />
          <Route exact path="/create"
           render={() => <Body category_posts={current_category} />}
          />
          <Route exact path={`/${post_category}/${post_id}`}
          render={({history}) =>
            <Post
              history={this.printHistory(history)}
            />
          }
          />
        </Switch>
        <Footer />
      </div>
    )//return()
  }//render()
}//class HomePage

function mapStateToProps(state) {
  const {category_posts_reducer, select_post_reducer} = state
  return {
    current_category: category_posts_reducer.category_posts,
    selected_post: select_post_reducer.post
  }

}//mapStateToProps()

function mapDispatchToProps(dispatch) {
  return {
    selectCategoryThunk: (category) => dispatch(selectCategoryThunk(category)),
  }
}//mapDispatchToProps()

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
