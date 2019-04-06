import React, { Component } from 'react'
import Navbar from './core/Navbar'
import Main from './Main'

class App extends Component {
  render () {
    return (
      <div>
        <Navbar/> <br/>
        <Main/>
      </div>
    )
  }
}

export default App
