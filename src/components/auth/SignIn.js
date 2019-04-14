import React, { Component } from 'react'

class SignIn extends Component {
  render () {
    return (
      <div className='container-fluid center-window'>
        <h1>Sign in</h1> <br/>
        <form>
          <div className='form-group'>
            <label htmlFor='inputEmail'>Email address</label>
            <input type='email' className='form-control' id='inputEmail' placeholder='Enter username'/>
          </div>
          <div className='form-group'>
            <label htmlFor='inputPassword'>Password</label>
            <input type='password' className='form-control' id='inputPassword' placeholder='Enter password'/>
          </div>
          <button type='submit' className='btn btn-primary' onClick={() => localStorage.setItem('userId', '0')}>
            Sign in
          </button>
        </form>
      </div>
    )
  }
}

export default SignIn
