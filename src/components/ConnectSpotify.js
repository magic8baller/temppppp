import React, { Component } from 'react'
import './ConnectSpotify.css'
import * as SpotifyFunctions from './spotifyFunctions.js'

class ConnectSpotify extends Component {
  render() {
    return (
      <div>
        <div>
          <div class="hero" />
          <div class="button__outer">
            <button
              className="button button--spotify"
              onClick={() => {
                window.location = 'http://localhost:3001/login'
              }}
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ConnectSpotify
