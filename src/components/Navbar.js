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
            <div>
              <a className='btn navbar-link' href='/movies'>Rate a movie</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
