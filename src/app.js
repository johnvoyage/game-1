import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { firebase } from '../src/firebase/firebase'

// Setting the data
// Authorization and loader
// normalize library
import 'normalize.css/normalize.css';
// My CSS
import './styles/styles.scss'
// Load firebase server
import './firebase/firebase'


const store = configureStore()

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))