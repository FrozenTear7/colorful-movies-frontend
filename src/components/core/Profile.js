import React, { Component } from 'react'
import { fetchWithToken } from '../../utils/fetchExtended'
import MovieListRatings from '../movies/MovieListRatings'
import Loading from '../utils/Loading'
import Error from '../utils/Error'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movies: [],
      loading: false,
      error: null,
    }
  }

  fetchMovies () {
    this.setState({loading: true, error: null}, () => {
      fetchWithToken(`/users/${this.props.match.params.userid || localStorage.getItem('userId')}`, {method: 'GET'})
        .then(response => {

          return response.json()
        })
        .then(responseJson => {
          if (responseJson.Error)
            throw responseJson.Error

          this.setState({
            movies: responseJson.Result,
          })
        })
        .catch(error => {
          this.setState({error: error})
        })
        .finally(() => {
          this.setState({loading: false})
        })
    })
  }

  componentWillMount () {
    this.fetchMovies()
  }

  render () {
    if (this.state.loading)
      return <Loading/>

    if (this.state.error)
      return <Error error={this.state.error}/>

    return (
      <div className='container-fluid'>
        <h2>Movies: </h2>

        <MovieListRatings movies={this.state.movies}/>
      </div>
    )
  }
}

export default Profile
