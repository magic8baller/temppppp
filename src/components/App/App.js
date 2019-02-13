import React, { Component } from 'react'
import './App.css'

import Spotify from '../../services/Spotify'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Home from '../Home/Home'
import {
  checkUrlForSpotifyAccessToken,
  hashParams
} from '../../services/SpotifyFunctions'
import spot from '../../services/spot'
import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi()
class App extends Component {
  state = {
    searchResults: [],
    playlistName: 'Name Your Playlist Here',
    playlistTracks: [],
    currentUser: null,
    accessToken: '',
    loggedIn: false
  }

  componentDidMount() {
    const accessToken = checkUrlForSpotifyAccessToken()
    fetch('https://www.spotify.com/api/v1/me', {
      Authorization: `Bearer: ${accessToken}`
    })
      .then(r => r.json())
      .then(currentUser => {
        this.setState({ currentUser, loggedIn: true, accessToken: accessToken })
      })
  }

  addTrack = track => {
    if (
      !this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)
    ) {
      this.setState({ playlistTracks: [...this.state.playlistTracks, track] })
    }
  }

  removeTrack = track => {
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(
        playlistTrack => playlistTrack.id !== track.id
      )
    })
  }

  updatePlaylistName = name => {
    this.setState({ playlistName: name })
  }

  savePlaylist = () => {
    const trackUris = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'Name Your New Playlist!',
        playlistTracks: []
      })
    })
  }

  search = query => {
    const accessToken = checkUrlForSpotifyAccessToken()
    spotifyApi.setAccessToken(accessToken)
    spotifyApi.searchTracks(query).then(trackData => {
      this.setState({ trackData })
    })
  }

  render() {
    return (
      <div>
        <h1>spottifrenz</h1>
        <div className="App">
          <button>
            <a href={Home}>view profile!</a>
          </button>
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              tracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
