import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../utils/Loading'
import Error from '../utils/Error'

class MovieListRatings extends Component {
  render () {
    if (this.props.loading)
      return <Loading/>

    if (this.props.error)
      return <Error error={this.props.error}/>

    return (
      <div className='container-fluid'>
        <table className='table' style={{tableLayout: 'fixed'}}>
          <thead>
          <tr>
            <th scope='col'>Poster</th>
            <th scope='col'>Title</th>
            <th scope='col'>Year</th>
            <th scope='col'>Ratings</th>
          </tr>
          </thead>
          <tbody>
          {this.props.movies.map((record, index) => <tr style={{height: '300px'}} key={index}>
              <td>{record.movie.Poster && record.movie.Poster !== 'N/A' &&
              <img alt='Poster' src={record.movie.Poster} className='movie-poster'/>}</td>
              <th scope='row'><Link
                to={`/colorful-movies-frontend/movies/${record.movie.imdbID}`}>{record.movie.Title}</Link></th>
              <td>{record.movie.Year}</td>
              <td>
                <ul className='list-inline'>
                  {record.ratings.Colors.map((color, i) => <li key={i}
                                                        className='list-inline-item'>
                    <button type='button' disabled
                            style={{
                              width: '50px',
                              height: '50px',
                              backgroundColor: color,
                              borderColor: '#000000',
                            }}/>
                  </li>)}
                </ul>
              </td>
            </tr>,
          )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MovieListRatings
