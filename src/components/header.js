import React, { Component } from 'react'
import * as Md from 'react-icons/lib/md'
import '../style/header.css'

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
              <li className="active"><a><Md.MdHome size={30}/></a></li>
              <li><a>Udacity</a></li>
              <li><a>React</a></li>
              <li><a>Redux</a></li>
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
