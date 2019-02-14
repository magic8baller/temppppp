import React, { Component } from 'react'
import './TrackList.css'

import Track from '../Track/Track'

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return (
            <Track
              key={track.id}
              track={track}
              onAdd={this.props.onAdd}
              onRemove={this.props.onRemove}
              isRemoved={this.props.isRemoved}
              onPlay={this.props.onPlay}
            />
          )
        })}
      </div>
    )
  }
}

export default TrackList
