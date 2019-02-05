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
      <ul>
        <li>
          {' '}
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          {' '}
          <Link to="/">Home</Link>
        </li>

        <li>Spotify</li>
      </ul>

      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/profile" component={Home} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
