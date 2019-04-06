import React, { Component } from 'react'

class Error extends Component {
  render () {
    if (this.props.error)
      return (
        <div className="alert alert-danger">
          {this.props.error}
        </div>
      )
    else
      return <span/>
  }
}

export default Error
