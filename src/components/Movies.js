import React, { Component } from 'react'
import { fetchWithApiKey } from '../utils/fetchExtended'
import Loading from './Loading'
import Error from './Error'
import { Link } from 'react-router-dom'

class Movies extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchName: '',
      searchYear: '',
      searchPage: 1,
      maxPages: 1,
      movies: {
        list: [],
        loading: false,
        error: null,
      },
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  fetchMovies (searchPage) {
    this.setState({
      searchPage: searchPage || this.state.searchPage,
      movies: {...this.state.movies, loading: true, error: null},
    }, () => {
      fetchWithApiKey({s: this.state.searchName, y: this.state.searchYear, page: this.state.searchPage})
        .then(response => {
          return response.json()
        })
        .then(responseJson => {
          if (responseJson.Response === 'False')
            throw responseJson.Error

          this.setState({
            maxPages: Math.ceil(responseJson.totalResults / 10),
            movies: {...this.state.movies, list: responseJson.Search},
          })
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

  }

  handleNameChange (event) {
    this.setState({searchName: event.target.value})
  }

  handleYearChange (event) {
    this.setState({searchYear: event.target.value})
  }

  handleSubmit (event) {
    this.fetchMovies(1)
    event.preventDefault()
  }

  changePage (value) {
    if (this.state.searchPage + value >= 1 && this.state.searchPage + value <= this.state.maxPages) {
      this.setState({...this.state, searchPage: this.state.searchPage + value}, () => this.fetchMovies())
    }
  }

  render () {
    return (
      <div className='container-fluid'>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label>Name:</label>
            <input className='form-control' type='text' value={this.state.searchName} onChange={this.handleNameChange}
                   style={{maxWidth: '50%'}}/>
          </div>
          <div className='form-group'>
            <label>Year:</label>
            <input className='form-control' type='number' value={this.state.searchYear} onChange={this.handleYearChange}
                   style={{minWidth: '100px', maxWidth: '100px'}}/>
          </div>
          <input className='btn btn-primary' type='submit' value='Submit'/>
        </form>

        <hr/>

        <Loading loading={this.state.movies.loading}/>
        <Error error={this.state.movies.error}/>

        <h2>Movies: </h2>

        {this.state.movies.list && this.state.maxPages !== 1 && <nav aria-label='Page navigation example'>
          <ul className='pagination'>
            <li className='page-item'>
              <button className='page-link' onClick={() => this.changePage(-1)}>Previous</button>
            </li>
            <li className='page-item'>
              <button className='page-link' onClick={() => this.changePage(1)}>Next</button>
            </li>
          </ul>
        </nav>}

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
              <th scope='row'><Link to={`/movies/${movie.imdbID}`}>{movie.Title}</Link></th>
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

export default Movies
