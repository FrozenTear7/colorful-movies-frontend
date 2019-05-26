import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Panel from './core/Panel'
import Movies from './movies/Movies'
import NotFound from './utils/NotFound'
import Profile from './core/Profile'
import Movie from './movies/Movie'
import PrivateRoute from './utils/PrivateRoute'

class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/colorful-movies-frontend/' component={Panel}/>
                <Route exact path='/colorful-movies-frontend/movies' component={Movies}/>
                <Route path='/colorful-movies-frontend/movies/:imdbID' component={Movie}/>
                <Route path='/colorful-movies-frontend/profile' component={Profile}/>
                <Route path='/colorful-movies-frontend/users/:userid' component={Profile}/>
                {/*<PrivateRoute exact path='/colorful-movies-frontend/movies' component={Movies}/>*/}
                {/*<PrivateRoute path='/colorful-movies-frontend/movies/:imdbID' component={Movie}/>*/}
                {/*<PrivateRoute path='/colorful-movies-frontend/profile' component={Profile}/>*/}
                {/*<PrivateRoute path='/colorful-movies-frontend/users/:userid' component={Profile}/>*/}
                <Route component={NotFound}/>
            </Switch>
        )
    }
}

export default Main
