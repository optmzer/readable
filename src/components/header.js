import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import * as _ from 'underscore'
import * as Fa from 'react-icons/lib/fa'
import '../style/header.css'
import {
  selectCategoryThunk,
  sortPosts,
  setUserLogin,
  openLoginModal,
  closeLoginModal,
  set_search_key_word
} from '../actions'

//style for user login Modal
let customStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    top                        : '35%',
    left                       : '20%',
    right                      : '20%',
    bottom                     : '35%',
    border                     : '1px solid #bbb',
    background                 : '#ddd',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
}//customStyle

/**
*Header for the App. Has nav controls and sort selector plus search bar.
*/

class Header extends Component {

  //sets search value for post search
  setSearchValue(event) {
    this.props.setSearchKeyWord(event.target.value)
  }

  //resets search value to empty string
  resetSearch(){
    this.props.setSearchKeyWord("")
  }

  //gets category name from NavLink
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

  //gets value from sort selector to sort posts
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

  // ========== MODAL =========
  componentDidMount() {
    Modal.setAppElement(".App-header")
  }

  //opens Identify modal if user_login is not set or empty
  openIdentifyModal(event){
    if(this.props.user_login === "" || _.isEmpty(this.props.user_login)){
      this.props.openLoginModal()
      //removes focus from the input othervise it stays focused
      //and the Modal stays opened.
      event.target.blur()
    }
  }//openIdentifyModal()

  //handles form of moda component
  handleModalInput(event) {
    event.preventDefault()
    this.props.setUserLogin(event.target[1].value)
  }

  render() {

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
                  title="Home"
                >
                  <Fa.FaHome size={30}/>
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact to="/udacity"
                  onClick={ () => this.getCategory("udacity")}
                  title="Category"
                >
                  Udacity
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact to="/react"
                  onClick={ () => this.getCategory("react")}
                  title="Category"
                >
                  React
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact to="/redux"
                  onClick={ () => this.getCategory("redux")}
                  title="Category"
                >
                  Redux
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact to="/create"
                  title="Create Post"
                >
                  <Fa.FaEdit size={30} />
                </NavLink>
              </li>
            </ul>
          </nav>
          <form className="search-bar">
            <input
              type="text"
              defaultValue={this.props.search_key_word}
              placeholder="Search key word..."
              onChange={(event) => this.setSearchValue(event)}
            />
            <button
              title="Reset search"
              onClick={() => this.resetSearch()}
            >
              <Fa.FaClose className="cancel-search" size={25}/>
            </button>
          </form>
        </div>
        <Modal
          className="modal"
          overlayClassName="overlay"
          isOpen={this.props.open_login_modal}
          onRequestClose={() => this.props.closeLoginModal()}
          style={customStyle}
        >
          <form
            className="modal-login-form"
            onSubmit={(event) => this.handleModalInput(event)}
          >
            <fieldset className="modal-fieldset">
            <legend>Please Identify</legend>
            <input
              id="modal-user-login-input"
              type="text"
              placeholder="Any ID Will Do"
            />
            <button
              className="modal-btn"
              type="submit"
              value="OK"
            >
              <Fa.FaCheck size={25}/>
            </button>
            <button
              className="modal-btn"
              onClick={() => this.props.closeLoginModal()}
            >
              <Fa.FaClose size={25}/>
            </button>
            </fieldset>
          </form>
        </Modal>
      </header>
    )//return()
  }//render()
}

function mapStateToProps(state) {
  const {sort_posts_reducer,user_login_reducer} = state
  const {set_search_key_word_reducer} = state
  return {
    select_value: sort_posts_reducer.select_value,
    user_login: user_login_reducer.user_login,
    open_login_modal: user_login_reducer.open_login_modal,
    search_key_word: set_search_key_word_reducer.search_key_word
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectCategoryThunk: (category) => {dispatch(selectCategoryThunk(category))},
    sortPosts: (sort_param) => {dispatch(sortPosts(sort_param))},
    setUserLogin: (login) => dispatch(setUserLogin(login)),
    closeLoginModal: () => dispatch(closeLoginModal()),
    openLoginModal: () => dispatch(openLoginModal()),
    setSearchKeyWord: (key_word) => dispatch(set_search_key_word(key_word))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
