import React, { Component } from 'react'
import { fetchWithApiKey } from '../../utils/fetchExtended'
import MovieList from './MovieList'

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
        <form className='form-inline' onSubmit={this.handleSubmit}>
            <input className='form-control mr-3' type='text' value={this.state.searchName}
                   onChange={this.handleNameChange}
                   style={{maxWidth: '50%'}}
                   placeholder='Name'/>
            <input className='form-control mr-3' type='number' value={this.state.searchYear}
                   onChange={this.handleYearChange}
                   style={{minWidth: '100px', maxWidth: '100px'}}
                   placeholder='Year'/>
            <input className='btn btn-primary' type='submit' value='Submit'/>
        </form>

        <hr/>

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

        <MovieList movies={this.state.movies.list} loading={this.state.movies.loading} error={this.state.movies.error}/>

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
      </div>
    )
  }
}

export default Movies
