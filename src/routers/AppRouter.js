import React from 'react'
import { Router, Route, Switch, Link } from 'react-router-dom'
const createHistory = require('history').createBrowserHistory // Use this per deprecation documentation

import MainPage from '../components/MainPage'
// Routes
// import PrivateRoute from './PrivateRoute'
// import PublicRoute from './PublicRoute'



export const history = createHistory()

// .....?key=value&key2=value2#someid is provided to children of Route

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path='/' component={MainPage} exact />
      </Switch>
    </div>
  </Router>
)

export default AppRouter