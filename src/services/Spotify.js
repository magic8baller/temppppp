const clientId = '2bb803854dae4494a2598e2fab28a489'
const redirectURI = 'http://localhost:3001/callback'
let accessToken

const API_URL = 'https://api.spotify.com/v1'

const Spotify = {
  //TODO: MOVE TO ADAPTER
  getAccessToken() {
    if (accessToken) {
      return accessToken
    }

    //THIS GOES IN
    const scopes =
      'user-read-playback-state user-modify-playback-state playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-follow-modify user-follow-read user-library-read user-library-modify   user-read-private user-read-birthdate user-read-email user-top-read'
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/)
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/)
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1]
      const expiresIn = Number(urlExpiresIn[1])
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000)
      window.history.pushState('Access Token', null, '/')
      return accessToken
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${scopes}&redirect_uri=${redirectURI}`
    }
  },

  //current user
  getUserInfo() {
    const accessToken = Spotify.getAccessToken()
    let user

    //TODO: MOVE FETCHES TO ADAPTER
    //TODO: CONSTANTS - BASE
    return fetch(`${API_URL}/me`, {
      //: HEADERS()
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(res => res.json())
      .then(jsonRes => {
        user = jsonRes
        return {
          id: user.id,
          display_name: user.display_name,
          image: user.images[0],
          href: user.href,
          uri: user.uri
        }
      })
  },

  search(query) {
    const accessToken = Spotify.getAccessToken()

    return fetch(`${API_URL}/search?type=track&q=${query}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (!jsonRes.tracks) {
          return []
        } else {
          return jsonRes.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            }
          })
        }
      })
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return
    }
    //TODO: MOVE TO ADAPTER!
    const accessToken = Spotify.getAccessToken()
    const headers = { Authorization: `Bearer ${accessToken}` }
    let userId

    //TODO: ADAPTER
    return fetch(`${API_URL}/me`, { headers: headers })
      .then(res => res.json())
      .then(jsonRes => {
        userId = jsonRes.id
        return fetch(`${API_URL}/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name })
        })
          .then(res => res.json())
          .then(jsonRes => {
            const playlistId = jsonRes.id
            return fetch(
              `${API_URL}/users/${userId}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: trackUris })
              }
            )
          })
      })
  }
}

export default Spotify
