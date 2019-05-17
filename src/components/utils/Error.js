import React, { Component } from 'react'

class Error extends Component {
  render () {
    if (this.props.error)
      return (
        <div className="container-fluid alert alert-danger center-all">
          {this.props.error}
        </div>
      )
    else
      return <span/>
  }
}

export default Error
