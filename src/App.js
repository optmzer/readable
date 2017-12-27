import React, { Component } from 'react';
import './style/App.css';
import HomePage from './components/home-page'

class App extends Component {

  render() {

    // console.log("L23 App ,", this.state.backend);

    return (
      <div className="App">

        <HomePage />

      </div>
    )
  }
}

export default App;
