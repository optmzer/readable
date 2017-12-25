import React, {Component} from 'react'
import Header from './header'
import Footer from './footer'
import Post from './post'

class HomePage extends Component {
  render(){
    return(
      <div>
        <Header />
          <Post />
        <Footer />
      </div>
    )//return()
  }//render()
}//class HomePage

export default HomePage
