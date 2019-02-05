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
      </div>
    )
  }
}

export default Playlist
