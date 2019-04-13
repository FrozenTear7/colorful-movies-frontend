import React, { Component } from 'react'
import billyLogo from '../../images/billy.jpg'

class Panel extends Component {
  render () {
    return (
      <div className="center-window">
        <h2>Welcome to Afterimage!</h2>
        <img className='afterimage-logo mr-3' alt='logo' src={billyLogo}/>
      </div>
    )
  }
}

export default Panel
