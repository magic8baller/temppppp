import React from 'react'
import './Track.css'

class Track extends React.Component {
  // renderAction(){
  //   if (this.props.isRemoved) {
  //     return (<a className="Track-action" onClick={this.removeTrack}>-</a>);
  //   } else {
  //     return (<a className="Track-action" onClick={this.addTrack}>+</a>);
  //   }
  // }

  addTrack() {
    this.props.onAdd(this.props.track)
  }

  removeTrack() {
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
        </div>
        <a
          className="Track-action"
          onClick={
            this.props.isRemoved
              ? this.removeTrack.bind(this)
              : this.addTrack.bind(this)
          }
        >
          {this.props.isRemoved ? '-' : '+'}
        </a>
      </div>
    )
  }
}

export default Track
