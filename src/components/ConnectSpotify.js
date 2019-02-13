import React, { Component } from 'react'
// import './ConnectSpotify.css'
import * as SpotifyFunctions from './spotifyFunctions.js'

class ConnectSpotify extends Component {
  render() {
    return (
      <div className="ConnectSpotify">
        <button
          onClick={() => {
            window.location = 'http://localhost:3001/login'
          }}
        >
          Connect to Spotify
        </button>
      </div>
    )
  }
}

export default ConnectSpotify
