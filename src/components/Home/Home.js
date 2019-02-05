import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    const { id, display_name, image, href } = this.props
    console.log('props are', this.props)
    return (
      <div>
        <h2>{`Logged in as ${display_name}`}</h2>
        <div className="user-content">
          <img src={image} alt={image} />
          <ul>
            <li>
              <span>Display name</span>
              <span>{display_name}</span>
            </li>
            <li>
              <span>Id</span>
              <span>{id}</span>
            </li>

            <li>
              <span>Link</span>
              <span>
                <a href={href}>{href}</a>
              </span>
            </li>
            <li>
              <span>Profile Image</span>
              <span>
                <a href={image}>{image}</a>
              </span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
