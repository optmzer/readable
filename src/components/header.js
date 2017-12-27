import React, { Component } from 'react'
import * as Md from 'react-icons/lib/md'
import '../style/header.css'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return(
      <header className="App-header">
        <div className="nav-bar">
          <div className="App-title"><h1>Readable</h1></div>
          <nav className="categories-sort">
            <ul >
              <li>sort: </li>
              <li className="active"><a>New</a></li>
              <li><a>Popular</a></li>
              <li><a>Author</a></li>
              <li><a>Title</a></li>
            </ul>
          </nav>
          <nav className="categories">
            <ul>
              <li className="active">
                <Link className="home" to="/">
                  <Md.MdHome size={30}/>
                </Link>
              </li>
              <li>
                <Link className="udacity" to="/udacity">
                  Udacity
                </Link>
              </li>
              <li>
                <Link className="react" to="/react">
                  React
                  </Link>
              </li>
              <li>
                <Link className="redux" to="/redux">
                  Redux
                </Link>
              </li>
              <li>
                <a><Md.MdAddBox className="create-post" size={30} /></a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )//return()
  }//render()
}

export default Header
