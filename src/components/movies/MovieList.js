import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../utils/Loading'
import Error from '../utils/Error'

class MovieList extends Component {
  render () {
    if (this.props.loading)
      return <Loading/>

    if (this.props.error)
      return <Error error={this.props.error}/>

    return (
      <div>
        <table className='table text-center' style={{tableLayout: 'fixed'}}>
          <thead>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Year</th>
            <th scope='col'>Poster</th>
          </tr>
          </thead>
          <tbody>
          {this.props.movies.map((movie, index) => <tr style={{height: '300px'}} key={index}>
              <th scope='row'><Link to={`/colorful-movies-frontend/movies/${movie.imdbID}`}>{movie.Title}</Link></th>
              <td>{movie.Year}</td>
              <td>{movie.Poster && movie.Poster !== 'N/A' &&
              <img alt='Poster' src={movie.Poster} className='movie-poster'/>}</td>
            </tr>,
          )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MovieList
