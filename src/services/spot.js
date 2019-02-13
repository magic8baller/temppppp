// export function checkUrlForSpotifyAccessToken() {
//   const accessToken = hashParams().get('access_token')
//   if (!accessToken) {
//     return false
//   } else {
//     return accessToken
//   }
// }
// export function hashParams() {
//   return new URLSearchParams(window.location.hash.substring(1))
// }

// export function search(query) {
//   spotifyApi.searchTracks(query).then(trackData => {
//     if (!trackData.tracks) {
//       return []
//     } else {
//       return trackData.tracks.items.map(track => {
//         return {
//           id: track.id,
//           name: track.name,
//           artist: track.artist,
//           album: track.album,
//           uri: track.uri
//         }
//       })
//     }
//   })
// }
