import React, { Component } from 'react'
import { fetchWithApiKey } from '../utils/fetchExtended'
import Loading from './Loading'
import Error from './Error'

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

  fetchMovies () {
    this.setState({movies: {...this.state.movies, loading: true}})

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
    this.fetchMovies()
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
          <div className="form-group">
            <label>Year:</label>
            <input className='form-control' type='number' value={this.state.searchYear} onChange={this.handleYearChange}
                   style={{maxWidth: '15%'}}/>
          </div>
          <input className='btn btn-primary' type='submit' value='Submit'/>
        </form>

        <hr/>

        <b>Movies: </b>

        <Loading loading={this.state.movies.loading}/>
        <Error error={this.state.movies.error}/>

        {this.state.movies.list && this.state.maxPages !== 1 && <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link" onClick={() => this.changePage(-1)}>Previous</button>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={() => this.changePage(1)}>Next</button>
            </li>
          </ul>
        </nav>}

        <table className="table">
          <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Year</th>
            <th scope="col">Poster</th>
          </tr>
          </thead>
          <tbody>
          {this.state.movies.list && this.state.movies.list.map(movie => <tr key={movie.imdbID}>
              <th scope="row">{movie.Title}</th>
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
