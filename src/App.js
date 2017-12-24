import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Fa from 'react-icons/lib/fa'
import * as IoAndroid from 'react-icons/lib/io'
import * as Md from 'react-icons/lib/md'

class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Readable React App</h1>
          <nav className="nav-bar">
            <ul className="categories-sort">
              <li>Categories sort by: </li>
              <li>All</li>
              <li>New</li>
              <li>Populat</li>
              <li>Author</li>
              <li>Title</li>
            </ul>
            <ul className="categories">
              <li>Categories: </li>
              <li>All</li>
              <li>Udacity</li>
              <li>React</li>
              <li>Redux</li>
              <li>
                Add Post <Md.MdAddCircle className="create-post" size={50} />
              </li>
            </ul>

          </nav>
        </header>

        <div className="user-info">
        <div className="voting-block">
          <a className="vote-up"><Fa.FaArrowUp size={22}/></a>
          <p className="vote-count">120</p>
          <a className="vote-down"><Fa.FaArrowDown size={22}/></a>
        </div>
        <span className="user-avatar">
          <Fa.FaFileImageO size={70}/>
        </span>
          <div className="post-info">
            <div>Author:</div>
            <div>
              <span>
                <h3>Title: Some killer header goes in here</h3>
              </span>
            </div>
            <div>
              <span className="published-time">published on Time: </span>
              <span className="comments-count">Comments count:</span></div>
          </div>
        <div className="edit-tools">
          <IoAndroid.IoEdit className="edit-btn" size={25} />
          <IoAndroid.IoAndroidDelete className="delete-btn" size={25} />
        </div>
        </div>

        <div className="post-block">
            <div className="post-title">
              <h2>Lorem ipsum dolor sit amet</h2>
            </div>
            <p>
              Lorem ipsum dolor sit amet, vis ne aperiri inciderint,
              pro in epicuri perpetua. Viris maiorum vulputate id sed, eius libris
              blandit has in, mea graece utroque blandit ea. Saperet praesent
              molestiae eam an. Vim ex dico accumsan praesent, unum elitr
              molestiae ne sit. Vel sale paulo scripta ea.
            </p>

            <p>
              Lorem ipsum dolor sit amet, vis ne aperiri inciderint,
              pro in epicuri perpetua. Viris maiorum vulputate id sed, eius libris
              blandit has in, mea graece utroque blandit ea. Saperet praesent
              molestiae eam an. Vim ex dico accumsan praesent, unum elitr
              molestiae ne sit. Vel sale paulo scripta ea.
            </p>

            <p>
              Lorem ipsum dolor sit amet, vis ne aperiri inciderint,
              pro in epicuri perpetua. Viris maiorum vulputate id sed, eius libris
              blandit has in, mea graece utroque blandit ea. Saperet praesent
              molestiae eam an. Vim ex dico accumsan praesent, unum elitr
              molestiae ne sit. Vel sale paulo scripta ea.
            </p>

            <p>
              Lorem ipsum dolor sit amet, vis ne aperiri inciderint,
              pro in epicuri perpetua. Viris maiorum vulputate id sed, eius libris
              blandit has in, mea graece utroque blandit ea. Saperet praesent
              molestiae eam an. Vim ex dico accumsan praesent, unum elitr
              molestiae ne sit. Vel sale paulo scripta ea.
            </p>

        </div>


      </div>
    );
  }
}

export default App;
