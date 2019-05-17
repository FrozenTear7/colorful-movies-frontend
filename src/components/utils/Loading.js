import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'

class Loading extends Component {
  render () {
    return (
      <Spinner className='center-all' animation="border"/>
    )
  }
}

export default Loading
