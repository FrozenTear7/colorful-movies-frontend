import React, { Component } from 'react'
import Navbar from './core/Navbar'
import Main from './Main'

class App extends Component {
    componentWillMount(){
        var url_string = window.location.href
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        if(id){
            if(id==='0'){
                localStorage.removeItem('userId')
            }
            else{
                localStorage.setItem('userId', id)
            }
            window.location.href = "http://localhost:3000/colorful-movies-frontend/"
        }
    }
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
