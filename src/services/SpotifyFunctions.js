import Spotify from 'spotify-web-api-js'
// import uniq from 'lodash.uniq'
// import flatten from 'lodash.flatten'
// import chunk from 'lodash.chunk'

const spotifyApi = new Spotify()

//waiting for the API to be fixed so can't use spotify-web-api-js library
//for playlist stuff. Creating this global variable to hold the accessToken
//and use it manually for our temporary playlist function
let globalAccessToken = ''

export function redirectUrlToSpotifyForLogin() {
  // const scopes = [
  // 	"user-modify-playback-state",
  // 	"user-library-read",
  // 	"user-library-modify",
  // 	"playlist-read-private",
  // 	"playlist-modify-public",
  // 	"playlist-modify-private"
  // ];

  return 'http://localhost:3001/login'
}

export function checkUrlForSpotifyAccessToken() {
  const accessToken = hashParams().get('access_token')
  if (!accessToken) {
    return false
  } else {
    return accessToken
  }
}
export function hashParams() {
  return new URLSearchParams(window.location.hash.substring(1))
}

export function setAccessToken(accessToken) {
  //since using spotifyApi as helper library you can set the access code once
  //you get it and then not have to include it in every request
  spotifyApi.setAccessToken(accessToken)
  globalAccessToken = accessToken
}
//current user
// export function userInfo() {
//     // const accessToken = Spotify.getAccessToken()
//     // let user

//    try {
//     const user = spotifyApi.getMe()
//      .then((userRes) => userRes)

//    } catch (err) {
//      console.error("can't get user info!")
//    }

// }

export function search(query) {
  spotifyApi.searchTracks(query).then(trackData => {
    if (!trackData.tracks) {
      return []
    } else {
      return trackData.tracks.items.map(track => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artist,
          album: track.album,
          uri: track.uri
        }
      })
    }
  })
}

//TODO: componentdidmount

// handleLogin = async () => {
//   let results = await userInfo()
//   if (results.type !== 'success') {
//     this.setState({didError: true})
// } else {
//   const user =
// }
// }

// export async function getUserPlaylists() {
//   //returns an array of objects with playlist name (like "Favorite Smashing Pumpkins jamz")
//   //and the id of the playlist. Use this to feed the playlists selection list
//   try {
//     const playlistsResponse = await spotifyApi.getUserPlaylists()
//     //playlistsResponse.items are the actual playlist objects
//     const playlists = playlistsResponse.items.map(playlistObject => {
//       const { id, name } = playlistObject
//       return { id: id, playlistName: name }
//     })
//     return playlists
//   } catch (err) {
//     //return default array with note that can't download playlists
//     console.error('Error: Attempting to get user playlists', err)
//     console.error(err.stack)
//     return [{ id: null, playlistName: "Can't Download your Playlists!" }]
//   }
// }

// async savePlaylist(name, trackUris) {
//   if (!name || !trackUris.length) {
//     return
//   }

//   // const accessToken = Spotify.getAccessToken()
//   // const headers = { Authorization: `Bearer ${accessToken}` }
//   // let userId

//   // return fetch(`${API_URL}/me`, { headers: headers })
//   //   .then(res => res.json())
//     // .then(jsonRes => {
//     //   userId = jsonRes.id
//     //   return fetch(`${API_URL}/users/${userId}/playlists`, {
//     //     headers: headers,
//     //     method: 'POST',
//     //     body: JSON.stringify({ name: name })
//     //   })
//     //     .then(res => res.json())
//     spotifyApi.getMe()
//     .then(res => {
//       const userId = res.id
//     })
//     spotifyApi.getUserPlaylists()
//         .then(jsonRes => {
//           const playlistId = jsonRes.id
//           // return fetch(
//           //   `${API_URL}/users/${userId}/playlists/${playlistId}/tracks`,
//           //   {
//           //     headers: headers,
//           //     method: 'POST',
//           //     body: JSON.stringify({ uris: trackUris })
//           //   }
//           // )
//           spotifyApi.addTracksToPlaylist
//         })
//     })
// }
