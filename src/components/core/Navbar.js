import React, { Component } from 'react'
import billyLogo from '../../images/billy.jpg'

class Navbar extends Component {
  render () {
    return (
      <div>
        <div id='navbar' className='navbar'>
          <div className='navbar-block'>
            <a className='navbar-link' href={'/colorful-movies-frontend/'}>
              <img className='navbar-logo mr-3' alt='logo' src={billyLogo}/>
            </a>
            <a className='btn navbar-link' href={'/colorful-movies-frontend/movies'}>Rate a movie</a>
            <a className='btn navbar-link'
               href={`/colorful-movies-frontend/profile`}>Profile</a>
          </div>
          <div className='navbar-block navbar-right'>
            {!localStorage.getItem('userId') &&
            <div><a className='btn navbar-link' href={'/colorful-movies-frontend/signup'}>Sign up</a>
              <a className='btn navbar-link' href={'/colorful-movies-frontend/signin'}>Sign in</a></div>}
            {localStorage.getItem('userId') &&
            <a className='btn navbar-link' href={'/colorful-movies-frontend/signin'}
               onClick={() => localStorage.removeItem('userId')}>
              Sign out
            </a>}
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
