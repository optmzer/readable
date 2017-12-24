import React, { Component } from 'react'
import * as Md from 'react-icons/lib/md'

class Header extends Component {
  render() {
    return(
      <header className="App-header">
        <nav className="nav-bar">
          <h1 className="App-title">Readable</h1>
          <div className="categories-sort">
            <ul >
              <li>sort: </li>
              <li className="active">All</li>
              <li>New</li>
              <li>Popular</li>
              <li>Author</li>
              <li>Title</li>
            </ul>
          </div>
          <div className="categories">
            <ul className="categories">
              <li className="active"><Md.MdHome size={30}/></li>
              <li>Udacity</li>
              <li>React</li>
              <li>Redux</li>
              <li>
                <Md.MdAddBox className="create-post" size={30} />
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )//return()
  }//render()
}

export default Header
