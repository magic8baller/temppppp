const API_URL = 'https://api.spotify.com/v1'
const sp = {
  async savePlaylist(token, name, trackUris) {
    if (!name || !trackUris.length) {
      return
    }

    const accessToken = token
    const headers = { Authorization: `Bearer ${token}` }
    let userId

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

export default sp
