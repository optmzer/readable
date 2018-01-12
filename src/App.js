import React, { Component } from 'react';
import './style/App.css';
import HomePage from './components/home-page'

class App extends Component {

  render() {

    return (
      <div className="App">
        <HomePage id="home-page"/>
      </div>
    )
  }
}

export default App
