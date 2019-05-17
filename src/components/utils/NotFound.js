import React, { Component } from 'react'

class NotFound extends Component {
  render () {
    return (
      <div className="container-fluid center-window">
        <h1>Page not found!</h1>
        <img src="https://i.kym-cdn.com/entries/icons/original/000/001/420/977.jpg" alt="404"  style={{width: '100%', height: 'auto'}}/>
      </div>
    )
  }
}

export default NotFound
