import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => {
    // Todo - delete once authorization is implemented
    if (localStorage.getItem('userId'))
      return <Component {...props} />
    else
      return <Redirect to='/colorful-movies-frontend/signin'/>
  }}/>
)

export default PrivateRoute