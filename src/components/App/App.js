import React, { Component } from 'react'
import './App.css'

// import Spotify from '../../services/Spotify'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Playlist from '../Playlist/Playlist'
import Home from '../Home/Home'
import Spotify from 'spotify-web-api-js'

const spotifyApi = new Spotify()

class App extends Component {
  state = {
    searchResults: [],
    playlistName: 'Name Your Playlist Here',
    playlistTracks: [],
    currentUser: {
      display_name: '',
      images: ''
    },
    accessToken: ''
  }

  async componentDidMount() {
    await spotifyApi.setAccessToken(this.props.accessToken)
    await spotifyApi.getMe().then(currentUser => {
      this.setState({ currentUser, accessToken: this.props.accessToken })
    })
    console.log(this.state.currentUser)
    // const playlists = await SpotifyFunctions.getUserPlaylists();
    // this.setState({playlists: playlists});
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

  search = term => {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults })
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.currentUser.display_name}'s spottifrenz</h1>
        <div className="App">
          <button>
            <a href={Home}>view profile!</a>
          </button>
          {/* <div>{this.state.currentUser.display_name}</div> */}
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
