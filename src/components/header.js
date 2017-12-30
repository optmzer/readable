/**
 * SVG pictures do not have id and className attribute
 they cannot be referenced via link, must be supplied from css as a background
 image.
 */

import React, { Component } from 'react'
// import { MdHome, MdAddBox} from 'react-icons/lib/md'
import '../style/header.css'
import { Link } from 'react-router-dom'
import * as readableAPI from '../utils/readableAPI'

class Header extends Component {

  state = {
    home: "active",
    udacity: "",
    react: "",
    redux: "",
    create: "",
    sort_new: "active",
    sort_popular: "",
    sort_author: "",
    sort_title: ""
  }

  componentDidMount() {
    this.getCategory("home")
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
/**
 * parameter string
 */
  getCategory(selection) {
    let selected = "home"
    if(selection === "home") {
      readableAPI.getAllPosts()
      .then((posts) => {
        this.props.selectCategory(selection, posts)
      })
    } else {
      selected = selection.toLowerCase()
      readableAPI.getPostsFromCategory(selected)
      .then( (posts) => {
        this.props.selectCategory(selected, posts)
      })
    }

    this.getCategorySelection(selected)

  }//getCategory()

  /**
   * parameter string
   */
  getCategorySelection(selection) {

    switch (selection) {
      case "udacity":
        this.setState({
          home: "",
          udacity: "active",
          react: "",
          redux: "",
          create: "",
        })
        break
      case "react":
        this.setState({
          home: "",
          udacity: "",
          react: "active",
          redux: "",
          create: "",
        })
        break
      case "redux":
        this.setState({
          home: "",
          udacity: "",
          react: "",
          redux: "active",
          create: "",
        })
        break
      case "create":
        this.setState({
          home: "",
          udacity: "",
          react: "",
          redux: "",
          create: "active",
        })
        break
      default:
        this.setState({
          home: "active",
          udacity: "",
          react: "",
          redux: "",
          create: "",
        })
        break
    }
  }//getCategorySelection()

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
                  className={`${this.state.home} home`} to="/"
                  onClick={ (event) => this.getCategory(event.target.id)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  id="udacity"
                  className={`${this.state.udacity} udacity`} to="/udacity"
                  onClick={ (event) => this.getCategory(event.target.id)}
                >
                  Udacity
                </Link>
              </li>
              <li>
                <Link
                  id="react"
                  className={`${this.state.react} react`} to="/react"
                  onClick={ (event) => this.getCategory(event.target.id)}
                >
                  React
                </Link>
              </li>
              <li>
                <Link
                  id="redux"
                  className={`${this.state.redux} redux`}
                  to="/redux"
                  onClick={ (event) => this.getCategory(event.target.id)}
                >
                  Redux
                </Link>
              </li>
              <li>
                <Link
                  id="create"
                  className={`${this.state.create} create-post`}
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

export default Header
