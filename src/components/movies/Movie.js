import React, {Component} from 'react'
import {fetchWithToken} from '../../utils/fetchExtended'
import Loading from '../utils/Loading'
import Error from '../utils/Error'
import {SketchPicker} from 'react-color'
import {Button, OverlayTrigger, Popover} from 'react-bootstrap'

class Movie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editedColor: null,
            movie: {
                movie: null,
                loading: false,
                error: null,
            },
            rating: {
                rating: [],
                loading: false,
                error: null,
            },
        }
    }

    fetchMovie() {
        this.setState({movie: {...this.state.movie, loading: true, error: null}}, () => {
            fetchWithToken(`/findMovie/${this.props.match.params.imdbID}`, {method: 'GET'})
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

    fetchRating() {
        this.setState({rating: {...this.state.rating, loading: true, error: null}}, () => {
            fetchWithToken(`/movies/${this.props.match.params.imdbID}`, {method: 'GET'})
                .then(response => {
                    return response.json()
                })
                .then(responseJson => {
                    if (responseJson.Error)
                        throw responseJson.Error

                    if (responseJson.Result)
                        this.setState({
                            rating: {
                                ...this.state.rating, rating: responseJson.Result.map((rating, i) => {
                                    return {
                                        color: rating,
                                        id: i,
                                    }
                                }),
                            },
                        })
                })
                .catch(error => {
                    this.setState({rating: {...this.state.rating, error: error}})
                })
                .finally(() => {
                    this.setState({rating: {...this.state.rating, loading: false}})
                })
        })
    }

    addRating() {
        this.setState({rating: {...this.state.rating, loading: true, error: null}}, () => {
            fetchWithToken(`/movies/${this.props.match.params.imdbID}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...this.state.movie.movie,
                    Colors: this.state.rating.rating.map(color => color.color),
                }),
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

    deleteRating() {
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

                    this.setState({rating: {...this.state.rating, rating: []}})
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
                rating: this.state.rating.rating.map(color => (color.id === this.state.editedColor) ? {
                    color: newColor.hex,
                    id: color.id,
                } : color),
            },
        })
    }

    componentWillMount() {
        this.fetchMovie()
        this.fetchRating()
    }

    colorPicker(color) {
        return (
            <div>
                <OverlayTrigger trigger='click' placement='bottom' rootClose={true} overlay={
                    <Popover id='popover-basic' title='Change rating'>
                        <SketchPicker color={color.color} onChangeComplete={this.handleChangeComplete}/>
                        <button type='button' className='btn btn-danger' data-dismiss='modal' onClick={() => {
                            this.setState({
                                rating: {
                                    ...this.state.rating,
                                    rating: this.state.rating.rating.filter(arrayColor => arrayColor.id !== color.id),
                                },
                            })
                        }}>Remove color
                        </button>
                    </Popover>
                }>
                    <Button variant='success' onClick={() => this.setState({editedColor: color.id})} style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: color.color,
                        borderColor: '#000000',
                        borderRadius: '50%',
                    }}/>
                </OverlayTrigger>
            </div>
        )
    }

    addColor() {
        this.setState({
            rating: {
                ...this.state.rating,
                rating: [...this.state.rating.rating, {id: this.state.rating.rating.length, color: '#FFFFFF'}],
            },
        })
    }

    render() {
        if (this.state.movie.loading) {
            return <Loading loading={this.state.movie.loading}/>
        }

        if (this.state.movie.error) {
            return <Error error={this.state.movie.error}/>
        }

        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <img className='img-thumbnail' alt='Poster' src={this.state.movie.movie.Poster}
                             style={{minWidth: '200px', minHeight: '200px'}}/>
                    </div>
                    <div className='col'>
                        <b>Rating:</b>

                        {this.state.rating.loading ? <Loading loading={this.state.rating.loading}/> :
                            this.state.rating.error ? <Error error={this.state.rating.error}/> : <div>
                                <button className='btn-sm btn-info mr-2' onClick={() => this.addColor()}>+</button>
                                <button className='btn-sm btn-primary mr-2' onClick={() => this.addRating()}>Save
                                </button>
                                <button className='btn-sm btn-danger mr-2' onClick={() => this.deleteRating()}>Delete
                                </button>

                                <hr/>

                                <ul className='list-inline'>
                                    {this.state.rating.rating.map(color => <li key={color.id}
                                                                               className='list-inline-item'>{this.colorPicker(color)}</li>)}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
                <br/> <br/>
                <h1>{this.state.movie.movie.Title}</h1>
                <hr/>
                <h3>Released: {this.state.movie.movie.Released} </h3>
                <h3>Runtime: {this.state.movie.movie.Runtime} </h3>
                <hr/>
                <h4><b>Director:</b> {this.state.movie.movie.Director} </h4>
                <h4><b>Writer:</b> {this.state.movie.movie.Writer} </h4>
                <h4><b>Actors:</b> {this.state.movie.movie.Actors}</h4>
                <hr/>
                <h5><b>Plot: </b> {this.state.movie.movie.Plot}</h5>
                <hr/>
                <h4><b>Awards:</b> {this.state.movie.movie.Awards} </h4>
                <h4><b>IMDB rating:</b> {this.state.movie.movie.imdbRating}</h4>
            </div>
        )
    }
}

export default Movie
