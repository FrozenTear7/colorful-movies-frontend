import React, { Component } from 'react'
import billyLogo from '../../images/billy.jpg'
import { Link } from 'react-router-dom'

class Panel extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userId: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    this.setState({userId: event.target.value})
  }

  render () {
    return (
      <div className="container-fluid center-window welcome-fade">
        <h2>Welcome to Afterimage!</h2> <br/>
        <img className='afterimage-logo mr-3' alt='logo' src={billyLogo}/>

        {localStorage.getItem('userId') && <div>
          <br/>
          <hr/>
          <div className='row'>
            <div className='col col-4'>
              Rate a movie <br/>
              <Link className='btn-sm btn-secondary'
                    to={`/colorful-movies-frontend/movies`}>Profile</Link>
            </div>
            <div className='col col-4'>
              Check other user's ratings <br/>
              <div className='row'>
                <div className='col col-8'>
                  <input type='text' className='form-control' id='inputPassword' placeholder='User id'
                         onChange={this.handleChange}/>
                </div>
                <div className='col col-4'>
                  <Link className='btn-sm btn-secondary' to={`/colorful-movies-frontend/users/${this.state.userId}`}>Search</Link>
                </div>
              </div>
            </div>
            <div className='col col-4'>
              Check your profile <br/>
              <Link className='btn-sm btn-secondary'
                    to={`/colorful-movies-frontend/users/${localStorage.getItem('userId')}`}>Profile</Link>
            </div>
          </div>
        </div>}
      </div>
    )
  }
}

export default Panel
