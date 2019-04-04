import React, { Component } from 'react'

class Navbar extends Component {
  render () {
    return (
      <div>
        <div id='navbar' className='navbar'>
          <div className='navbar-block'>
            <a className='btn navbar-link' href='/'>
              <b>Afterimage</b>
            </a>
            <a className='btn navbar-link' href='/movies'>Rate a movie</a>
            <a className='btn navbar-link' href='/profile'>Profile</a>
          </div>
          <div className='navbar-block navbar-right'>
            <a className='btn navbar-link' href='/signup'>Sign up</a>
            <a className='btn navbar-link' href='/signin'>Sign in</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
