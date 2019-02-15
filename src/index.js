import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './index.css'
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'
import App from '../src/components/App/App'
import Home from '../src/components/Home/Home'

const routing = (
  <Router>
    <div>
      {' '}
      <Link to="/profile">Profile</Link>
      ..|||.. <Link to="/">Home</Link>
      ..|||..
      <a href="https://open.spotify.com/collection/playlists">Spotify</a>
      ..|||..
      <a href="window.location='http://www.spotify.com/logout'">LogOut</a>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/profile" component={Home} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
