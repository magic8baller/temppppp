import React, { Component } from 'react'
import './App.css'

import Spot from '../../services/Spotify'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Home from '../Home/Home'
import Spotify from 'spotify-web-api-js'

const spotifyApi = new Spotify()

class App extends Component {
  state = {
    searchResults: [],
    playlistName: 'My New Playlist',
    playlistTracks: [],
    currentUser: {},
    accessToken: ''
  }
  async componentDidMount() {
    await spotifyApi.setAccessToken(this.props.accessToken)
    await spotifyApi.getMe().then(currentUser => {
      this.setState({
        currentUser: {
          username: currentUser.display_name,
          avatar: currentUser.images[0].url,
          href: currentUser.href,
          accessToken: this.props.accessToken
        },
        accessToken: this.props.accessToken
      })
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
    Spot.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'My New Playlist',
        playlistTracks: []
      })
    })
  }

  search = term => {
    Spot.search(term).then(searchResults => {
      this.setState({ searchResults })
    })
  }

  // currentUser = () => {
  //   this.setState({ currentUser })
  // }

  render() {
    const { username, avatar, href } = this.state.currentUser
    return (
      <div>
        <div className="clearfix">
          <h1>
            <span>
              <img className="avatar" src={avatar} width="60" height="60" />
            </span>
            {username}'s spottifrenz
          </h1>
        </div>
        <div className="App">
          <button>
            <a href="https://open.spotify.com/collection/playlists">
              view profile!
            </a>
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
              // onPlay={this.playTrack}
              accessToken={this.state.accessToken}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
