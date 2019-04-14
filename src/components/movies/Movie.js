import React, { Component } from 'react'
import { fetchWithApiKey, fetchWithToken } from '../../utils/fetchExtended'
import Loading from '../utils/Loading'
import Error from '../utils/Error'
import { SketchPicker } from 'react-color'

class Movie extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editedColor: null,
      movie: {
        movie: null,
        loading: false,
        error: null,
      },
      rating: {
        rating: ['#FFFFFF'],
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
      fetchWithToken(`/movies/${this.props.match.params.imdbID}`, {method: 'GET'})
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
      fetchWithToken(`/movies/${this.props.match.params.imdbID}`, {
        method: 'PUT',
        body: JSON.stringify({...this.state.movie.movie, Colors: this.state.rating.rating}),
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
      fetchWithToken(`/movies/${this.props.match.params.imdbID}`, {
        method: 'DELETE',
      })
        .then(response => {
          return response.json()
        })
        .then(responseJson => {
          if (responseJson.Error)
            throw responseJson.Error

          this.setState({rating: {...this.state.rating, rating: ['#FFFFFF']}})
        })
        .catch(error => {
          this.setState({rating: {...this.state.rating, error: error}})
        })
        .finally(() => {
          this.setState({rating: {...this.state.rating, loading: false}})
        })
    })
  }

  handleChangeComplete = (newColor) => {
    this.setState({
      rating: {
        ...this.state.rating,
        rating: this.state.rating.rating.map((color, i) => (i === this.state.editedColor) ? newColor.hex : color),
      },
    })
  }

  componentWillMount () {
    this.fetchMovie()
    this.fetchRating()
  }

  colorPicker (index) {
    return (
      <div className='container-fluid'>
        <button type='button' data-toggle='modal' data-target={`#ratingModal${index}`}
                onClick={() => this.setState({editedColor: index})}
                style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: this.state.rating.rating[index],
                  borderColor: '#000000',
                }}/>

        <div className='modal fade' id={`ratingModal${index}`} tabIndex='-1' role='dialog'
             aria-labelledby={`ratingModalLabel${index}`} aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id={`ratingModalLabel${index}`}>Rating</h5>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body center-window'>
                {index === this.state.editedColor &&
                <SketchPicker color={this.state.rating.rating[index]} onChangeComplete={this.handleChangeComplete}/>}
                <br/>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-dismiss='modal'>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  addColor () {
    this.setState({
      rating: {
        ...this.state.rating,
        rating: [...this.state.rating.rating, '#FFFFFF'],
      },
    })
  }

  render () {
    if (this.state.movie.loading) {
      return <Loading loading={this.state.movie.loading}/>
    }

    if (this.state.movie.error) {
      return <Error error={this.state.movie.error}/>
    }

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col col-8'>

            <div className='row'>
              <div className='col col-4'>
                <img className='movie-poster-big' alt='Poster' src={this.state.movie.movie.Poster}/>
              </div>
              <div className='col col-8'>
                <h1>{this.state.movie.movie.Title}</h1>
                <h2>Released: {this.state.movie.movie.Released}</h2>
                <h2>Runtime: {this.state.movie.movie.Runtime}</h2>
              </div>
            </div>
            <hr/>
            <h3>Director: {this.state.movie.movie.Director}</h3>
            <h3>Writer: {this.state.movie.movie.Writer}</h3>
            <h3>Actors: {this.state.movie.movie.Actors}</h3>
            <hr/>
            <h5>Plot: {this.state.movie.movie.Plot}</h5>
            <h4>Awards: {this.state.movie.movie.Awards}</h4>
            <h4>IMDB rating: {this.state.movie.movie.imdbRating}</h4>
          </div>
          <div className='col col-4'>
            <h1>Rating:</h1><br/>

            {this.state.rating.loading ? <Loading loading={this.state.rating.loading}/> :
              this.state.rating.loading ? <Error error={this.state.rating.error}/> : <div>
                <button className='btn btn-info mr-2' onClick={() => this.addColor()}>Add new color</button>
                <button className='btn btn-primary mr-2' onClick={() => this.addRating()}>Save ratings</button>
                <button className='btn btn-danger mr-2' onClick={() => this.deleteRating()}>Delete rating</button>

                <hr/>

                <ul className='list-inline'>
                  {this.state.rating.rating.map((color, i) => <li key={i}
                                                                  className='list-inline-item'>{this.colorPicker(i)}</li>)}
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Movie
