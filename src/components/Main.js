import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Panel from './core/Panel'
import Movies from './movies/Movies'
import NotFound from './utils/NotFound'
import Profile from './core/Profile'
import SignUp from './auth/SignUp'
import SignIn from './auth/SignIn'
import Movie from './movies/Movie'
import PrivateRoute from './utils/PrivateRoute'

class Main extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/colorful-movies-frontend/' component={Panel}/>
        <PrivateRoute exact path='/colorful-movies-frontend/movies' component={Movies}/>
        <PrivateRoute path='/colorful-movies-frontend/movies/:imdbID' component={Movie}/>
        <PrivateRoute path='/colorful-movies-frontend/profile' component={Profile}/>
        <Route path='/colorful-movies-frontend/signup' component={SignUp}/>
        <Route path='/colorful-movies-frontend/signin' component={SignIn}/>
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default Main