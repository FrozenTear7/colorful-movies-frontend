import React, { Component } from 'react'

class SignUp extends Component {
  render () {
    return (
      <div className='container-fluid center-window'>
        <h1>Sign up</h1> <br/>
        <form>
          <div className='form-group'>
            <label htmlFor='inputUsername'>Username</label>
            <input type='text' className='form-control' id='inputUsername' placeholder='Enter email'/>
          </div>
          <div className='form-group'>
            <label htmlFor='inputEmail'>Email address</label>
            <input type='email' className='form-control' id='inputEmail' placeholder='Enter username'/>
          </div>
          <div className='form-group'>
            <label htmlFor='inputPassword'>Password</label>
            <input type='password' className='form-control' id='inputPassword' placeholder='Enter password'/>
          </div>
          <div className='form-group'>
            <label htmlFor='inputPassword2'>Confirm password</label>
            <input type='password' className='form-control' id='inputPassword2' placeholder='Confirm password'/>
          </div>
          <button type='submit' className='btn btn-primary'>Sign up</button>
        </form>
      </div>
    )
  }
}

export default SignUp
