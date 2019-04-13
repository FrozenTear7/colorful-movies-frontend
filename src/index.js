import React from 'react'
import ReactDOM from 'react-dom'
import './stylesheets/index.scss'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './stylesheets/index.scss'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'))

registerServiceWorker()
