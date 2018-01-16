import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './header'
import Body from './body'
import Footer from './footer'
import Post from './post'
import Create from './create'

class HomePage extends Component {

  render(){

    return(
      <div>

        < Route
        component={({location}) => <Header location={location}/>}
        />
        <Switch>
          <Route exact path="/"
           component={({match}) => <Body match={match} />}
          />
          <Route exact path="/create"
            component={
              ({match, history}) =>
              <Create match={match} history={history} />
            }
          />
          <Route exact path="/:post_category"
            component={({match}) => <Body match={match} />}
          />
          <Route exact path={"/:post_category/:post_id"}
            component={({match}) => <Post match={match} />
            }
          />
        </Switch>
        <Footer />

      </div>
    )//return()
  }//render()
}//class HomePage

export default HomePage
