import React, {Component} from 'react'
import * as Fa from 'react-icons/lib/fa'

class Footer extends Component {
  render() {
    return(
      <footer className="main-footer">
        <div className="footer-social">
          <ul className="footer-social-logos">
            <li>
              <a href="https://github.com/optmzer"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
              >
                <Fa.FaGithub size={35}/>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/6mlnDollarMan"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              >
                <Fa.FaTwitter size={35}/>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/alexander-frolov-324051148/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <Fa.FaLinkedin size={35}/>
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/Udacity/"
               target="_blank"
               rel="noopener noreferrer"
               title="Udacity"
              >
                <Fa.FaFacebookOfficial size={35}/>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/user/Udacity"
                target="_blank"
                rel="noopener noreferrer"
                title="Udacity"
              >
              <Fa.FaYoutube size={35}/>
              </a>
            </li>
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
