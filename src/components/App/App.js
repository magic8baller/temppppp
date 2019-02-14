import React, { Component } from 'react'
import './App.css'
import Track from '../Track/Track'
// import Spotify from '../../services/Spotify'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Home from '../Home/Home'
import Spotify from 'spotify-web-api-js'
import * as spot from '../spotifyFunctions'
import sp from '../spot'

const spotifyApi = new Spotify()

class App extends Component {
  state = {
    searchResults: [],
    playlist: {},
    playlistName: 'Name Your Playlist Here',
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
    console.log(this.state.currentUser)
    // const playlists = await SpotifyFunctions.getUserPlaylists();
    // this.setState({playlists: playlists});
  }

  addTrack = track => {
    const { playlistTracks } = this.state
    if (!playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      this.setState({ playlistTracks: [...playlistTracks, track] })
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

  // savePlaylist = () => {
  //   const { playlistTracks, accessToken, playlistName } = this.state
  //   const trackUris = playlistTracks.map(track => track.uri)
  //   spot.savePlaylist(accessToken, playlistName, trackUris).then(() => {
  //     this.setState({
  //       playlistName: 'Name Your New Playlist!',
  //       playlistTracks: []
  //     })
  //   })
  // }

  playTrack = track => {
    spotifyApi.setAccessToken(this.state.accessToken)
    spotifyApi.play(
      `{"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:${
        track.id
      }"]}`
    )
  }
  savePlaylist = (token, name, trackUris) => {
    console.log('saving pl')
    return sp.savePlaylist(token, name, trackUris)
  }
  search = term => {
    const accessToken = this.state.accessToken
    spotifyApi.setAccessToken(accessToken)
    spot.search(term, accessToken).then(searchResults => {
      this.setState({ searchResults })
    })
  }

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
              onPlay={this.playTrack}
              accessToken={this.state.accessToken}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
