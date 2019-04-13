import React, { Component } from 'react'
import billyLogo from '../../images/billy.jpg'

class Navbar extends Component {
  render () {
    return (
      <div>
        <div id='navbar' className='navbar'>
          <div className='navbar-block'>
            <a className='navbar-link' href='/'>
              <img className='navbar-logo mr-3' alt='logo' src={billyLogo}/>
            </a>
            <a className='btn navbar-link' href={'/movies'}>Rate a movie</a>
            <a className='btn navbar-link' href={'/profile'}>Profile</a>
          </div>
          <div className='navbar-block navbar-right'>
            <a className='btn navbar-link' href={'/signup'}>Sign up</a>
            <a className='btn navbar-link' href={'/signin'}>Sign in</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
