import React, {Component} from 'react'
import Header from './header'
import PostHeader from './post-header'
import Footer from './footer'

class HomePage extends Component {
  render(){
    return(
      <div>
        <Header />
        <ul className="main-page">
        <li><PostHeader /></li>
        <li><PostHeader /></li>
        <li><PostHeader /></li>
        <li><PostHeader /></li>
        <li><PostHeader /></li>
        <li><PostHeader /></li>
        </ul>
        <Footer />
      </div>
    )//return()
  }//render()
}//class HomePage

export default HomePage
