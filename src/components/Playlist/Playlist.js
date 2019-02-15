import React, { Component } from 'react'
import './Playlist.css'

import TrackList from '../TrackList/TrackList'

class Playlist extends Component {
  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }

  render() {
    return (
      <div className="Playlist">
        <input
          value={this.props.playlistName}
          onChange={this.handleNameChange.bind(this)}
        />
        <TrackList
          tracks={this.props.tracks}
          isRemoved={true}
          onRemove={this.props.onRemove}
        />
        <a className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </a>
        <br />
        <br />
        <br />
        <br />
        <a
          className="Playlist-save"
          href="https://open.spotify.com/collection/playlists"
          target="_blank"
          style={{ backgroundColor: 'green' }}
        >
          CHECK OUT YOUR PLAYLIST ON SPOTIFY
        </a>
      </div>
    )
  }
}

export default Playlist
