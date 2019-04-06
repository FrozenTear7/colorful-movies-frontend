import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Panel from './core/Panel'
import Movies from './movies/Movies'
import NotFound from './utils/NotFound'
import Profile from './core/Profile'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import Movie from './movies/Movie'

class Main extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Panel}/>
        <Route exact path='/movies' component={Movies}/>
        <Route path='/movies/:imdbID' component={Movie}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/signin' component={SignIn}/>
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default Main