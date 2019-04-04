import React, { Component } from 'react'

class Loading extends Component {
  render () {
    if (this.props.loading)
      return (
        <div className="alert alert-info">
          LOADING...
        </div>
      )
    else
      return <span/>
  }
}

export default Loading
