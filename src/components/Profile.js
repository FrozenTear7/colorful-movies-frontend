import React, { Component } from 'react'
import { fetchWithToken } from '../utils/fetchExtended'
import Loading from './Loading'
import Error from './Error'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movies: {
        list: [],
        loading: false,
        error: null,
      },
    }
  }

  fetchMovies () {
    this.setState({movies: {...this.state.movies, loading: true, error: null}}, () => {
      fetchWithToken({method: 'GET'})
        .then(response => {
          return response.json()
        })
        .then(responseJson => {
          console.log(responseJson)
          if (responseJson.error)
            throw responseJson.error

          this.setState({movies: {...this.state.movies, list: responseJson.movies}})
        })
        .catch(error => {
          this.setState({movies: {...this.state.movies, error: error}})
        })
        .finally(() => {
          this.setState({movies: {...this.state.movies, loading: false}})
        })
    })
  }

  componentWillMount () {
    this.fetchMovies()
  }

  render () {
    return (
      <div className='container-fluid'>
        <h1>Your profile:</h1>

        <Loading loading={this.state.movies.loading}/>
        <Error error={this.state.movies.error}/>

        <h2>Movies: </h2>

        <table className='table'>
          <thead>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Year</th>
            <th scope='col'>Poster</th>
          </tr>
          </thead>
          <tbody>
          {this.state.movies.list && this.state.movies.list.map((movie, index) => <tr key={index}>
              <th scope='row'>{movie.Title}</th>
              <td>{movie.Year}</td>
              <td>{movie.Poster && movie.Poster !== 'N/A' &&
              <img alt='Poster' src={movie.Poster} style={{width: '20%'}}/>}</td>
            </tr>,
          )}
          </tbody>
        </table>
        <ul>
        </ul>
      </div>
    )
  }
}

export default Profile
