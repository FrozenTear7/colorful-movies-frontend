import React, { Component } from 'react'
import { fetchWithApiKey, fetchWithToken } from '../../utils/fetchExtended'
import Loading from '../utils/Loading'
import Error from '../utils/Error'
import { SketchPicker } from 'react-color'

class Movie extends Component {
  constructor (props) {
    super(props)

    this.state = {
      movie: {
        movie: null,
        loading: false,
        error: null,
      },
      rating: {
        rating: '#FFFFFF',
        loading: false,
        error: null,
      },
    }
  }

  fetchMovie () {
    this.setState({movie: {...this.state.movie, loading: true, error: null}}, () => {
      fetchWithApiKey({i: this.props.match.params.imdbID, plot: 'full'})
        .then(response => {
          return response.json()
        })
        .then(responseJson => {
          if (responseJson.Response === 'False')
            throw responseJson.Error

          this.setState({movie: {...this.state.movie, movie: responseJson}})
        })
        .catch(error => {
          this.setState({movie: {...this.state.movie, error: error}})
        })
        .finally(() => {
          this.setState({movie: {...this.state.movie, loading: false}})
        })
    })
  }

  fetchRating () {
    this.setState({rating: {...this.state.rating, loading: true, error: null}}, () => {
      fetchWithToken(`http://localhost:3001/movies/${this.props.match.params.imdbID}`, {method: 'GET'})
        .then(response => {
          return response.json()
        })
        .then(responseJson => {
          if (responseJson.Error)
            throw responseJson.Error

          if (responseJson.Result)
            this.setState({rating: {...this.state.rating, rating: responseJson.Result}})
        })
        .catch(error => {
          this.setState({rating: {...this.state.rating, error: error}})
        })
        .finally(() => {
          this.setState({rating: {...this.state.rating, loading: false}})
        })
    })
  }

  addRating () {
    this.setState({rating: {...this.state.rating, loading: true, error: null}}, () => {
      fetchWithToken(`http://localhost:3001/movies/${this.props.match.params.imdbID}`, {
        method: 'PUT',
        body: JSON.stringify({...this.state.movie.movie, Color: this.state.rating.rating}),
      })
        .then(response => {
          return response.json()
        })
        .then(responseJson => {
          if (responseJson.Error)
            throw responseJson.Error
        })
        .catch(error => {
          this.setState({rating: {...this.state.rating, error: error}})
        })
        .finally(() => {
          this.setState({rating: {...this.state.rating, loading: false}})
        })
    })
  }

  deleteRating () {
    this.setState({rating: {...this.state.rating, loading: true, error: null}}, () => {
      fetchWithToken(`http://localhost:3001/movies/${this.props.match.params.imdbID}`, {
        method: 'DELETE',
      })
        .then(response => {
          return response.json()
        })
        .then(responseJson => {
          if (responseJson.Error)
            throw responseJson.Error

          this.setState({rating: {...this.state.rating, rating: '#FFFFFF'}})
        })
        .catch(error => {
          this.setState({rating: {...this.state.rating, error: error}})
        })
        .finally(() => {
          this.setState({rating: {...this.state.rating, loading: false}})
        })
    })
  }

  handleChangeComplete = (color) => {
    this.setState({rating: {...this.state.rating, rating: color.hex}})
  }

  componentWillMount () {
    this.fetchMovie()
    this.fetchRating()
  }

  render () {
    if (this.state.movie.loading) {
      return <Loading loading={this.state.movie.loading}/>
    }

    if (this.state.movie.error) {
      return <Error error={this.state.movie.error}/>
    }

    if (this.state.rating.loading) {
      return <Loading loading={this.state.rating.loading}/>
    }

    if (this.state.rating.error) {
      return <Error error={this.state.rating.error}/>
    }

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col col-6'>
            <div className='row'>
              <div className='col col-6'>
                <h1>Title: {this.state.movie.movie.Title}</h1>
                <h2>Released: {this.state.movie.movie.Released}</h2>
                <h2>Runtime: {this.state.movie.movie.Runtime}</h2>
                <hr/>
                <h3>Director: {this.state.movie.movie.Director}</h3>
                <h3>Writer: {this.state.movie.movie.Writer}</h3>
                <h3>Actors: {this.state.movie.movie.Actors}</h3>
                <hr/>
                <h5>Plot: {this.state.movie.movie.Plot}</h5>
                <h4>Awards: {this.state.movie.movie.Awards}</h4>
                <h4>IMDB rating: {this.state.movie.movie.imdbRating}</h4>
              </div>
              <div className='col col-6'>
                <h1>Rating:</h1><br/>
                <SketchPicker color={this.state.rating.rating} onChangeComplete={this.handleChangeComplete}/> <br/>
                <button className='btn btn-primary' onClick={() => this.addRating()}>Rate</button>
                <button className='btn btn-danger' onClick={() => this.deleteRating()}>Delete rating</button>
              </div>
            </div>
          </div>
          <div className='col col-6 center-window'>
            <h4>Poster:</h4>
            <img alt='Poster' src={this.state.movie.movie.Poster}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Movie
