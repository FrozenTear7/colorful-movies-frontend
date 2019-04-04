import React, { Component } from 'react'
import {fetchWithApiKey} from '../utils/fetchExtended'
import Loading from './Loading'
import Error from './Error'

class Movies extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchName: '',
      searchYear: '',
      searchPage: 1,
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

  fetchMovies (title, year, page) {
    this.setState({loading: true})

    fetchWithApiKey({s: title, y: year, page: page})
      .then(response => {
        return response.json()
      })
      .then(responseJson => {
        if (!responseJson.Response)
          throw responseJson.Error

        this.setState({movies: {...this.state.movies, list: responseJson.Search}})
      })
      .catch(error => {
        this.setState({movies: {...this.state.movies, error: error.error}})
      })
      .finally(() => {
        this.setState({movies: {...this.state.movies, loading: false}})
      })
  }

  componentWillMount () {
    // this.fetchMovies()
  }

  handleNameChange (event) {
    this.setState({searchName: event.target.value})
  }

  handleYearChange (event) {
    this.setState({searchYear: event.target.value})
  }

  handleSubmit (event) {
    this.fetchMovies(this.state.searchName, this.state.searchYear, this.state.searchPage)
    event.preventDefault()
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.searchName} onChange={this.handleNameChange}/>
          </label>
          <label>
            Year:
            <input type="number" value={this.state.searchYear} onChange={this.handleYearChange}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>

        <h2>Movies: </h2>
        <Loading loading={this.state.movies.loading}/>
        <Error error={this.state.movies.error}/>
        <ul>
          {this.state.movies.list.map(movie => <li key={movie.imdbID}>{movie.Title}</li>)}
        </ul>
      </div>
    )
  }
}

export default Movies
