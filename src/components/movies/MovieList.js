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
      <div className='container-fluid'>
        <table className='table' style={{tableLayout: 'fixed', overflowX: 'auto'}}>
          <thead>
          <tr>
            <th scope='col'>Poster</th>
            <th scope='col'>Title</th>
            <th scope='col'>Year</th>
          </tr>
          </thead>
          <tbody>
          {this.props.movies.map((movie, index) => <tr key={index}>
              <td>{movie.Poster && movie.Poster !== 'N/A' &&
              <img alt='Poster' src={movie.Poster} className='img-fluid'/>}</td>
              <th scope='row'><Link to={`/colorful-movies-frontend/movies/${movie.imdbID}`}>{movie.Title}</Link></th>
              <td>{movie.Year}</td>
            </tr>,
          )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MovieList
