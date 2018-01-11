import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {selectCategoryThunk, sortPosts} from '../actions'
import * as Fa from 'react-icons/lib/fa'
import '../style/header.css'

/**
*Header for the App. Has nav controls and sort selector.
*/

class Header extends Component {

  getCategory(category){
    switch (category) {
      case "react":
        category="react"
        break
      case "redux":
        category="redux"
        break
      case "udacity":
        category="udacity"
        break
      default:
        category="home"
        break
    }//switch
    this.props.selectCategoryThunk(category)
  }//getCategory()

  getSortSelection(selection) {
    this.props.sortPosts(selection)
    this.setState({selection})
  }//getSortSelection()


  componentWillMount() {
    if(this.props.select_value){
      this.getSortSelection(this.props.select_value)
    }else {
      this.getSortSelection("new")
    }
  }

  render() {
    // console.log("L47 header ", this.props);
    // console.log("L48 header ", this.state);

    return(
      <header className="App-header">
        <div className="nav-bar">
          <div className="App-title"><h1>Readable</h1></div>
          <nav className="categories-sort">
            <div>
              <span>Showing posts: </span>
              <select
                name="categories-sort"
                defaultValue={this.props.select_value}
                onChange={(event) => this.getSortSelection(event.target.value)}
              >
                <option value="new" >NEW</option>
                <option value="popular">POPULAR</option>
                <option value="author">AUTHOR</option>
                <option value="title">TITLE</option>
              </select>
            </div>
          </nav>
          <nav className="categories">
            <ul>
              <li>
                <NavLink
                  exact to="/"
                  onClick={ () => this.getCategory("home")}
                >
                  <Fa.FaHome size={30}/>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact to="/udacity"
                  onClick={ () => this.getCategory("udacity")}
                >
                  Udacity
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact to="/react"
                  onClick={ () => this.getCategory("react")}
                >
                  React
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact to="/redux"
                  onClick={ () => this.getCategory("redux")}
                >
                  Redux
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact to="/create"
                  onClick={ () => this.getCategory("create")}
                >
                  <Fa.FaEdit size={30} />
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )//return()
  }//render()
}

function mapStateToProps(state) {
  const {sort_posts_reducer} = state
  return {
    select_value: sort_posts_reducer.select_value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectCategoryThunk: (category) => {dispatch(selectCategoryThunk(category))},
    sortPosts: (sort_param) => {dispatch(sortPosts(sort_param))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
