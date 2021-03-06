import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MovieListRatings extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <table className='table' style={{tableLayout: 'fixed'}}>
          <thead>
          <tr>
            <th scope='col'>Poster</th>
            <th scope='col'>Title</th>
            <th scope='col'>Ratings</th>
          </tr>
          </thead>
          <tbody>
          {this.props.movies.map((record, index) => <tr style={{height: '300px'}} key={index}>
              <td>{record.movie.Poster && record.movie.Poster !== 'N/A' &&
              <img alt='Poster' src={record.movie.Poster} className='img-fluid'/>}</td>
              <th scope='row'><Link
                to={`/colorful-movies-frontend/movies/${record.movie.imdbID}`}>{record.movie.Title}</Link></th>
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
                              borderRadius: '50%'
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
