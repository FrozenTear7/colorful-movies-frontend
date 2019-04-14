import React, { Component } from 'react'
import { fetchWithToken } from '../../utils/fetchExtended'
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      loading: false,
      error: null,
    }

    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
  }

  handleChangeEmail (event) {
    this.setState({email: event.target.value})
  }

  handleChangePassword (event) {
    this.setState({password: event.target.value})
  }

  signIn () {
    console.log(this.state)

    this.setState({loading: true}, () => {
      fetchWithToken('/auth', {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.Error)
            throw responseJson.Error

          localStorage.setItem('userId', '0')
        })
        .catch((error) => {
          this.setState({error: error})
        })
        .finally(() => {
          this.setState({loading: false})
        })
    })
  }

  render () {
    if (localStorage.getItem('userId'))
      return <Redirect to='/colorful-movies-frontend'/>

    return (
      <div className='container-fluid center-window'>
        <h1>Sign in</h1> <br/>
        <form>
          <div className='form-group'>
            <label htmlFor='inputEmail'>Email address</label>
            <input type='email' className='form-control' id='inputEmail' placeholder='Enter email'
                   value={this.state.email} onChange={this.handleChangeEmail}/>
          </div>
          <div className='form-group'>
            <label htmlFor='inputPassword'>Password</label>
            <input type='password' className='form-control' id='inputPassword' placeholder='Enter password'
                   value={this.state.password} onChange={this.handleChangePassword}/>
          </div>
          <button type='button' className='btn btn-primary' onClick={() => this.signIn()}>
            Sign in
          </button>
        </form>
      </div>
    )
  }
}

export default SignIn
