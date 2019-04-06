import React, { Component } from 'react'
import { fetchWithToken } from '../../utils/fetchExtended'
import MovieList from '../movies/MovieList'

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
      fetchWithToken('http://localhost:3001/movies', {method: 'GET'})
        .then(response => {
          return response.json()
        })
        .then(responseJson => {
          if (responseJson.Error)
            throw responseJson.Error

          this.setState({movies: {...this.state.movies, list: responseJson.Result}})
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

        <h2>Movies: </h2>

        <MovieList movies={this.state.movies.list} loading={this.state.movies.loading} error={this.state.movies.error}/>
      </div>
    )
  }
}

export default Profile
