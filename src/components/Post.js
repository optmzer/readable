import React, {Component} from 'react'
import PostHeader from './post-header'
import Comment from './comment'
import Header from './header'
import Footer from './footer'
import '../style/post.css'

class Post extends Component {
  render(){
    return(
        <div className="post">
          <Header />
          <PostHeader className="post-header" />
          <div className="post-block">
            <div className="post-title">
              <h2>Lorem ipsum dolor sit amet</h2>
            </div>
            <div className="post-text">
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
            <section className="comment-section">
              <ul>
                <li>
                  <Comment />
                </li>
                <li>
                  <Comment />
                </li>
                <li>
                  <Comment />
                </li>
                <li>
                  <Comment />
                </li>
                <li>
                  <Comment />
                </li>
                <li>
                  <Comment />
                </li>
              </ul>
            </section>
          </div>
          <Footer />
        </div>

    )//return()
  }//render()
}//class Post


export default Post
