import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'
import App from '../src/components/App/App'
import Home from '../src/components/Home/Home'

const routing = (
  <Router>
    <div>
      {' '}
      <Link to="/profile">Profile</Link>
      {'               '}
      <Link to="/">Home</Link>{' '}
      <a href="https://open.spotify.com/collection/playlists">Spotify</a>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={App} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
