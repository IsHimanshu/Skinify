import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import RegistrationForm from './views/Registration';
import LoginForm from './views/login';

import './style.css'
import Home from './views/home'
import NotFound from './views/not-found'
import UploadPhoto from './views/upload';
const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route path="/register" component={RegistrationForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/upload" component={UploadPhoto} />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
