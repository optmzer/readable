/**
 * SVG pictures do not have id and className attribute
 they cannot be referenced via link, must be supplied from css as a background
 image.
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {selectCategoryThunk} from '../actions'
// import { MdHome, MdAddBox} from 'react-icons/lib/md'
import '../style/header.css'

class Header extends Component {

  state = {
    category_home: "active",
    category_react: "",
    category_redux: "",
    category_udacity: "",
    category_create: "",
    sort_new: "active",
    sort_popular: "",
    sort_author: "",
    sort_title: ""
  }

  getCategory(category){
    switch (category) {
      case "react":
        this.setState({
          category_home: "",
          category_react: "active",
          category_redux: "",
          category_udacity: "",
          category_create: "",
        })
        this.props.selectCategoryThunk(category)
        break
      case "redux":
        this.setState({
          category_home: "",
          category_react: "",
          category_redux: "active",
          category_udacity: "",
          category_create: "",
        })
        this.props.selectCategoryThunk(category)
        break
      case "udacity":
        this.setState({
          category_home: "",
          category_react: "",
          category_redux: "",
          category_udacity: "active",
          category_create: "",
        })
        this.props.selectCategoryThunk(category)
        break
      case "create":
        this.setState({
          category_home: "",
          category_react: "",
          category_redux: "",
          category_udacity: "",
          category_create: "active",
        })
        this.props.selectCategoryThunk(category)
        break
      default:
        this.setState({
          category_home: "active",
          category_react: "",
          category_redux: "",
          category_udacity: "",
          category_create: "",
        })
        this.props.selectCategoryThunk(category)
        break
    }//switch
  }//getCategory()

  getSortSelection(selection) {
    switch (selection) {
      case "sort_popular":
        this.setState({
          sort_new: "",
          sort_popular: "active",
          sort_author: "",
          sort_title: ""
        })
        break
      case "sort_author":
        this.setState({
          sort_new: "",
          sort_popular: "",
          sort_author: "active",
          sort_title: ""
        })
        break
      case "sort_title":
        this.setState({
          sort_new: "",
          sort_popular: "",
          sort_author: "",
          sort_title: "active"
        })
        break
      default:
      this.setState({
        sort_new: "active",
        sort_popular: "",
        sort_author: "",
        sort_title: ""
      })
    }//switch
  }//getSortSelection()


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
                <Link
                  id="home"
                  className={this.state.category_home}
                  to="/"
                  onClick={ (event) => this.getCategory(event.target.id)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  id="udacity"
                  className={this.state.category_udacity}
                  to="/udacity"
                  onClick={ (event) => this.getCategory(event.target.id)}
                >
                  Udacity
                </Link>
              </li>
              <li>
                <Link
                  id="react"
                  to="/react"
                  className={this.state.category_react}
                  onClick={ (event) => this.getCategory(event.target.id)}
                >
                  React
                </Link>
              </li>
              <li>
                <Link
                  id="redux"
                  className={this.state.category_redux}
                  to="/redux"
                  onClick={ (event) => this.getCategory(event.target.id)}
                >
                  Redux
                </Link>
              </li>
              <li>
                <Link
                  id="create"
                  className={this.state.category_create}
                  to="/create"
                  onClick={ (event) => this.getCategory(event.target.id)}
                >
                  Add Post
                </Link>
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
