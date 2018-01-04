/**
 * SVG pictures do not have id and className attribute
 they cannot be referenced via link, must be supplied from css as a background
 image.
 */

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {selectCategoryThunk} from '../actions'
// import { MdHome, MdAddBox} from 'react-icons/lib/md'
import '../style/header.css'

class Header extends Component {

  state = {
    sort_new: "active",
    sort_popular: "",
    sort_author: "",
    sort_title: ""
  }

  getCategory(category){
    this.props.selectCategoryThunk(category)
  }

  getSortSelection(selection) {
    switch (selection) {
      case "sort_popular":
        return this.setState({
          sort_new: "",
          sort_popular: "active",
          sort_author: "",
          sort_title: ""
        })
      case "sort_author":
        return this.setState({
          sort_new: "",
          sort_popular: "",
          sort_author: "active",
          sort_title: ""
        })
      case "sort_title":
        return this.setState({
          sort_new: "",
          sort_popular: "",
          sort_author: "",
          sort_title: "active"
        })
      default:
      this.setState({
        sort_new: "active",
        sort_popular: "",
        sort_author: "",
        sort_title: ""
      })
    }
  }


  render() {
    // console.log("L18 header ", this.props);

    // const { selectCategory } = this.props

    return(
      <header className="App-header">
        <div className="nav-bar">
          <div className="App-title"><h1>Readable</h1></div>
          <nav className="categories-sort">
            <ul >
              <li>sort: </li>
              <li className={this.state.sort_new}>
                <a
                  id="sort_new"
                  onClick={(event) => this.getSortSelection(event.target.id)}
                >New</a>
              </li>
              <li className={this.state.sort_popular}>
                <a
                  id="sort_popular"
                  onClick={(event) => this.getSortSelection(event.target.id)}
                >Popular</a>
              </li>
              <li className={this.state.sort_author}>
                <a
                  id="sort_author"
                  onClick={(event) => this.getSortSelection(event.target.id)}
                >Author</a>
              </li>
              <li className={this.state.sort_title}>
                <a
                  id="sort_title"
                  onClick={(event) => this.getSortSelection(event.target.id)}
                >Title</a>
              </li>
            </ul>
          </nav>
          <nav className="categories">
            <ul>
              <li>
                <NavLink
                  id="home"
                  exact to="/"
                  onClick={ (event) => this.getCategory(event.target.id)}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  id="udacity"
                  exact to="/udacity"
                  onClick={ (event) => this.getCategory(event.target.id)}
                >
                  Udacity
                </NavLink>
              </li>
              <li>
                <NavLink
                  id="react"
                  exact to="/react"
                  onClick={ (event) => this.getCategory(event.target.id)}
                >
                  React
                </NavLink>
              </li>
              <li>
                <NavLink
                  id="redux"
                  exact to="/redux"
                  onClick={ (event) => this.getCategory(event.target.id)}
                >
                  Redux
                </NavLink>
              </li>
              <li>
                <NavLink
                  id="create"
                  exact to="/create"

                >
                  Add Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )//return()
  }//render()
}


function mapDispatchToProps(dispatch) {
  return {
    selectCategoryThunk: (category) => {dispatch(selectCategoryThunk(category))},
    // reserved for filtering
  }
}

export default connect(null, mapDispatchToProps)(Header)
