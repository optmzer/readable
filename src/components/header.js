/**

 */

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {selectCategoryThunk} from '../actions'
import * as Fa from 'react-icons/lib/fa'
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


function mapDispatchToProps(dispatch) {
  return {
    selectCategoryThunk: (category) => {dispatch(selectCategoryThunk(category))},
    // reserved for filtering
  }
}

export default connect(null, mapDispatchToProps)(Header)
