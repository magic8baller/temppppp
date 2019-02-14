import React from 'react'
import './Track.css'

class Track extends React.Component {
  addTrack = () => {
    this.props.onAdd(this.props.track)
  }

  playTrack = () => {
    this.props.onPlay(this.props.track)
  }

  removeTrack = () => {
    this.props.onRemove(this.props.track)
  }

  render() {
    return (
      <div className="Track">
        <div className="track-info">
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
          <button onClick={this.props.track.previewUrl}>play track</button>
        </div>
        <a
          className="Track-action"
          onClick={this.props.isRemoved ? this.removeTrack : this.addTrack}
        >
          {this.props.isRemoved ? '-' : '+'}
        </a>
      </div>
    )
  }
}

export default Track
