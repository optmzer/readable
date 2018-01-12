import React, {Component} from 'react'
import * as Fa from 'react-icons/lib/fa'

class Footer extends Component {
  render() {
    return(
      <footer className="main-footer">
        <div className="footer-social">
          <ul className="footer-social-logos">
            <li><Fa.FaFacebookOfficial size={35}/></li>
            <li><Fa.FaTwitter size={35}/></li>
            <li><Fa.FaYoutube size={35}/></li>
            <li><Fa.FaLinkedin size={35}/></li>
            <li><Fa.FaGithub size={35}/></li>

          </ul>
        </div>
        <div className="web-dev-logo">
          Web Dev | Alexander Frolov
        </div>
      </footer>
    )//return()
  }//render()
}//class Footer

export default Footer
