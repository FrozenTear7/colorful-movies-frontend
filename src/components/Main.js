import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Panel from './Panel'
import Movies from './Movies'
import NotFound from './NotFound'
import Profile from './Profile'
import SignUp from './SignUp'
import SignIn from './SignIn'

class Main extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Panel}/>
        <Route path='/movies' component={Movies}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/signin' component={SignIn}/>
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default Main