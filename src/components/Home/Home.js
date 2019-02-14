import React, { Component } from 'react'

import Paper from '@material-ui/core/Paper'
import ConnectSpotify from '../ConnectSpotify'

import * as SpotifyFunctions from '../spotifyFunctions'
import App from '../App/App'

import Spotify from 'spotify-web-api-js'

const spotifyApi = new Spotify()
class SpotifyContainer extends Component {
  state = {
    loggedInToSpotify: false,
    accessToken: null
  }

  componentDidMount() {
    const accessToken = SpotifyFunctions.checkUrlForSpotifyAccessToken()
    if (accessToken) {
      this.setState({ loggedInToSpotify: true, accessToken: accessToken })
    } else {
      this.setState({ loggedInToSpotify: false, accessToken: null })
    }
  }

  handleLogOut = () => {
    window.location = 'https://www.spotify.com/logout/'
    window.location = 'http://localhost:3001/'
  }

  render() {
    return (
      <div className="SpotifyContainer">
        <Paper>
          {!this.state.loggedInToSpotify ? (
            <ConnectSpotify />
          ) : (
            <>
              <App accessToken={this.state.accessToken} />
            </>
          )}
        </Paper>
      </div>
    )
  }
}

export default SpotifyContainer
