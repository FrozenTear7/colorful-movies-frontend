import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Panel from './Panel'
import Movies from './Movies'
import NotFound from './NotFound'

class Main extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Panel}/>
        <Route path='/movies' component={Movies}/>
        <Route component={NotFound}/>
      </Switch>
    )
  }
}

export default Main