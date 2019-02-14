// import React, { Component } from 'react'
// import classes from './NavBar.css'
// import ConnectSpotify from './ConnectSpotify'
// import Spotify from 'spotify-web-api-js'
// import App from './App/App'
// import Home from './Home/Home'
// import { Link, Route } from 'react-router-dom'
// // import { setAccessToken } from '../spotifyFunctions'
// const spotifyApi = new Spotify()

// class NavBar extends Component {
//   renderLogInLogOut = () => {
//     const accessToken = this.props.accessToken
//     spotifyApi.setAccessToken(accessToken)
//     if ((this.props.currentUser !== null) & (accessToken !== null)) {
//       return (
//         <div className="avatar-logout">
//           <div
//             className="avatar"
//             style={{
//               backgroundImage: `url(${this.renderProfileImage()})`,
//               backgroundSize: 'cover',
//               height: 60,
//               width: 60,
//               border: '3px solid #d09ed4',
//               borderRadius: '50%'
//             }}
//           />
//           <p onClick={this.props.handleLogOut}>logout</p>
//         </div>
//       )
//     } else {
//       return <ConnectSpotify />
//     }
//   }
//   renderProfileImage = () => {
//     if (this.user.imageUrl) {
//       return this.user.imageUrl
//       // } else if (this.user.imageUrl) {
//       //   return this.user.imageUrl
//     } else {
//       return '../App/sandy.jpeg'
//     }
//   }
//   handleIconClick = event => {
//     event.preventDefault()
//     let hamburger = document.getElementById('hamburger')
//     if (hamburger.className === 'fa fa-bars') {
//       hamburger.className = 'fa fa-close'
//     } else {
//       hamburger.className = 'fa fa-bars'
//     }
//   }
//   handleMenuClick = event => {
//     event.target.className = 'active'
//   }
//   render() {
//     return (
//       <>
//         <Route exact path="/" component={Home} />
//         <Route path="/profile" component={App} />

//         <div className="topnav" id="top-nav-bar">
//           <div className="box-1">
//             <Link to="/" onClick={this.handleMenuClick}>
//               home
//             </Link>
//             <Link to="/profile" onClick={this.handleMenuClick}>
//               make a playlist
//             </Link>
//           </div>

//           <div className="box-2" />
//           <div className="box-3">
//             {this.renderLogInLogOut()}
//             <a href="" className="icon" onClick={this.handleIconClick}>
//               <i id="hamburger" className="fa fa-bars" />
//             </a>
//           </div>
//         </div>
//       </>
//     )
//   }
// }
// export default NavBar
