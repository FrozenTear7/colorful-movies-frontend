import React, { Component } from 'react'
import loadingLogo from '../../images/loading.gif'

class Loading extends Component {
  render () {
    return (
      <img className='center-all' alt='Loading...' src={loadingLogo}/>
    )
  }
}

export default Loading
