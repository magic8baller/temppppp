export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_UPDATE = 'SEARCH_UPDATE'
export const PROFILE_REQUEST = 'PROFILE_REQUEST'
export const MY_PLAYLIST_REQUEST = 'MY_PLAYLIST_REQUEST'
export const MY_PLAYLIST_UPDATE = 'MY_PLAYLIST_UPDATE'
export const ADD_TRACK_TO_PLAYLIST = 'ADD_TRACK_TO_PLAYLIST'
export const PLAY_TRACK = 'PLAY_TRACK'
export const PREVIEW_TRACK = 'PREVIEW_TRACK'
export const RECOMMENDATION_REQUEST = 'RECOMMENDATION_REQUEST'
export const RECOMMENDATION_UPDATE = 'RECOMMENDATION_UPDATE'
export const LOGGED_IN = 'LOGGED_IN'
export const SPOTIFY_AUTH_REQUEST = 'SPOTIFY_AUTH_REQUEST'
export const SPOTIFY_AUTH_OK = 'SPOTIFY_AUTH_OK'
export const SPOTIFY_AUTH_INIT = 'SPOTIFY_AUTH_INIT'
export const LOGGED_OUT = 'LOGGED_OUT'
export const SPOTIFY_AUTH_ERROR = 'SPOTIFY_AUTH_ERROR'

//DEVICES_REQUEST, DEVICES_UPDATE ?
// PLAYER_STATE_REQUEST, PLAYER_STATE_UPDATE ?
//SWITCH_DEVICE ?

export const actions = {
  LOGGED_IN,
  LOGGED_OUT,
  SPOTIFY_AUTH_REQUEST,
  SPOTIFY_AUTH_OK,
  SPOTIFY_AUTH_ERROR,
  SPOTIFY_AUTH_INIT,
  SEARCH_REQUEST,
  SEARCH_UPDATE,
  PROFILE_REQUEST,
  MY_PLAYLIST_REQUEST,
  MY_PLAYLIST_UPDATE,
  ADD_TRACK_TO_PLAYLIST,
  PLAY_TRACK,
  PREVIEW_TRACK,
  RECOMMENDATION_REQUEST,
  RECOMMENDATION_UPDATE
}

// default spotify state ?

const defaultState = {
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  searchResults: {}, // {query, apiresult}
  tracks: {},
  recommendations: [],
  devices: [], //tbd
  player: {}
}

//action creators ?

export const spotifyAuthRequired = () => ({
  type: SPOTIFY_AUTH_REQUIRED
})

export const spotifyAuthInit = ({ accessToken, refreshToken, expires }) => ({
  type: SPOTIFY_AUTH_INIT,
  payload: { accessToken, refreshToken, expires }
})

export const spotifyAuthOK = profile => ({
  type: SPOTIFY_AUTH_OK,
  payload: { profile }
})

export const spotifyProfileRequest = () => ({
  type: SPOTIFY_PROFILE_REQUEST
})

export const spotifyPlayerStateRequest = () => ({
  type: SPOTIFY_PLAYER_STATE_REQUEST,
  payload: { updateRequestedAt: moment().valueOf() }
})

export const spotifyPlayerStateUpdate = playerState => ({
  type: SPOTIFY_PLAYER_STATE_UPDATE,
  payload: { playerState }
})

export const spotifyDevicesRequest = () => ({
  type: SPOTIFY_DEVICES_REQUEST
})

export const spotifyDevicesUpdate = devices => ({
  type: SPOTIFY_DEVICES_UPDATE,
  payload: { devices }
})

export const spotifySearchRequest = query => ({
  type: SPOTIFY_SEARCH_REQUEST,
  payload: { query }
})

export const spotifySearchUpdate = ({ query, apiResult }) => ({
  type: SPOTIFY_SEARCH_UPDATE,
  payload: { query, apiResult }
})

export const spotifyPlayTrack = ({ trackId, offset }) => ({
  type: SPOTIFY_PLAY_TRACK,
  payload: { trackId, offset }
})

export const spotifyPreviewTrack = (trackId, offset = 0) => ({
  type: SPOTIFY_PREVIEW_TRACK,
  payload: { trackId, offset }
})

export const spotifySwitchDevice = deviceId => ({
  type: SPOTIFY_SWITCH_DEVICE,
  payload: { deviceId }
})

export const spotifyMyPlaylistsRequest = options => ({
  type: SPOTIFY_MY_PLAYLISTS_REQUEST,
  payload: options
})

export const spotifyMyPlaylistsUpdate = playlists => ({
  type: SPOTIFY_MY_PLAYLISTS_UPDATE,
  payload: { playlists }
})

export const spotifyAddTrackToPlaylist = ({ playlistId, trackId }) => ({
  type: SPOTIFY_ADD_TRACK_TO_PLAYLIST,
  payload: { playlistId, trackId }
})

export const spotifyRecommendationsRequest = ({
  trackIds,
  tuneableAttributes
}) => ({
  type: SPOTIFY_RECOMMENDATIONS_REQUEST,
  payload: { trackIds, tuneableAttributes }
})

export const spotifyRecommendationsUpdate = ({ tracks }) => ({
  type: SPOTIFY_RECOMMENDATIONS_UPDATE,
  payload: { tracks }
})

//ACTION HANDLERZZZ

// idk exactly... merge against dupes?
const mergeTracks = ({ state, tracks }) => {
  let existingTracks = state.tracks
  const updateCommand = {}
  // don't want to overwrite tracks if already have more info
  for (let track of tracks) {
    if (existingTracks[track.id]) {
      track = { ...existingTracks[track.id], ...track }
    }
    updateCommand[track.id] = { $set: track }
  }
  return {
    ...state,
    tracks: update(state.tracks, updateCommand)
  }
}

const ACTION_HANDLERS = {
  [SPOTIFY_AUTH_INIT]: (state, { payload }) => ({
    ...state,
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken
  }),
  [SPOTIFY_AUTH_OK]: (state, { payload }) => ({
    ...state,
    isLoggedIn: true
  }),
  [SPOTIFY_PLAYER_STATE_REQUEST]: (state, { payload }) => ({
    ...state,
    player: {
      ...state.player,
      updateRequestedAt: payload.updateRequestedAt
    }
  }),
  [SPOTIFY_PLAYER_STATE_UPDATE]: (state, { payload }) => {
    const { item } = payload.playerState
    const newState = {
      ...state,
      player: {
        ...payload.playerState,
        updateRequestedAt: state.player.updateRequestedAt
      }
    }

    // this might be a new track that we haven't seen before, check if it's in our
    // track state already
    if (item && item.type !== 'track') {
      // we're only set up to deal with spotify playing tracks
      throw new Error(`Unexpected spotify player item type (${item.type})`)
    }

    if (!state.tracks[item.id]) {
      // add track to state
      newState.tracks = update(state.tracks, { [item.id]: { $set: item } })
    } else {
      // update existing info with our info (we may have requested more details already, so
      // don't want to overwrite the existing track.
      newState.tracks[item.id] = { ...newState.tracks[item.id], ...item }
    }
    return newState
  },
  [SPOTIFY_DEVICES_UPDATE]: (state, { payload }) => ({
    ...state,
    devices: payload.devices
  }),
  [SPOTIFY_SEARCH_UPDATE]: (state, { payload }) => {
    // merge any track data from search results
    const { query, apiResult } = payload
    if (!apiResult) {
      return state
    }
    const { tracks } = apiResult
    const newState = {
      ...state,
      searchResults: { ...state.searchResults, [query]: apiResult }
    }

    if (tracks && tracks.items) {
      return mergeTracks({ state: newState, tracks: tracks.items })
    }
    return newState
  },
  [SPOTIFY_MY_PLAYLISTS_UPDATE]: (state, { payload: { playlists } }) => ({
    ...state,
    myPlaylists: [...state.myPlaylists, ...playlists]
  }),
  [SPOTIFY_RECOMMENDATIONS_REQUEST]: (state, { payload }) => ({
    ...state,
    recommendations: 'loading'
  }),
  [SPOTIFY_RECOMMENDATIONS_UPDATE]: (state, { payload: { tracks } }) => {
    const newState = {
      ...state,
      recommendations: tracks
    }
    if (tracks) {
      return mergeTracks({ state: newState, tracks })
    }
    return newState
  }
}

//IF I DO SOCKETS... BASED ON TRACK DATA FROM SYNC (MERGE)

//REDUCER

export default function spotifyReducer(state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

// //users --- mostly for websockets
// import update from 'react-addons-update';

// import {ROOM_FULL_SYNC} from './shared/room';
// import {SOCKET_ROOM_EVENT} from './socket';

// // ------------------------------------
// // Constants
// // ------------------------------------
// export const USER_SET_CURRENT = 'USER_SET_CURRENT';
// export const USER_SET_CURRENT_PREFS = 'USER_SET_CURRENT_PREFS';

// export const actions = {
// 	USER_SET_CURRENT,
// 	USER_SET_CURRENT_PREFS
// };

// // ------------------------------------
// // Default state
// // ------------------------------------
// const defaultState = {
// 	currentUserId: null,
// 	users: {}
// };

// // ------------------------------------
// // Action Creators
// // ------------------------------------
// export const setCurrentUser = (user) => ({
// 	type: USER_SET_CURRENT,
// 	payload: {user}
// });

// export const setCurrentUserPrefs = (prefs) => ({
// 	type: USER_SET_CURRENT_PREFS,
// 	payload: {prefs}
// });

// // ------------------------------------
// // Selectors
// // ------------------------------------
// export const selectCurrentUser = (state) => (
// 	selectUser(state, state.users.currentUserId)
// );

// export const selectUser = (state, userid) => (
// 	userid ? state.users.users[userid] : null
// );

// export const selectUsers = (state, userIds) => (
// 	userIds.map(userId => selectUser(state, userId))
// );

// // ------------------------------------
// // Action Handlers
// // ------------------------------------
// const mergeUsers = ({state, users}) => {
// 	let existingUsers = state.users;
// 	const updateCommand = {};

// 	// don't want to overwrite users if already have more info
// 	for (let user of users) {
// 		if (existingUsers[user.id]) {
// 			user = {...existingUsers[user.id], ...user};
// 		}
// 		updateCommand[user.id] = {$set: user};
// 	}

// 	return {
// 		...state,
// 		users: update(state.users, updateCommand)
// 	};
// };

// const ACTION_HANDLERS = {
// 	[USER_SET_CURRENT]: (state, {payload}) => {
// 		const {user} = payload;
// 		return {
// 			...state,
// 			currentUserId: user.id,
// 			users: update(state.users, {[user.id]: {$set: user}})
// 		};
// 	},
// 	[ROOM_FULL_SYNC]: (state, {payload}) => {
// 		let {users} = payload.fullSync;
// 		return mergeUsers({state, users});
// 	},
// 	[SOCKET_ROOM_EVENT]: (state, {payload}) => {
// 		let {users} = payload;
// 		return users ? mergeUsers({state, users}) : state;
// 	},
// 	[USER_SET_CURRENT_PREFS]: (state, {payload}) => {
// 		const {prefs} = payload;
// 		return {
// 			...state, users: update(state.users, {
// 				[state.currentUserId]: {prefs: {$set: prefs}}
// 			})
// 		};
// 	}
// };

// // ------------------------------------
// // Reducer
// // ------------------------------------

// export default function usersReducer(state = defaultState, action) {
// 	const handler = ACTION_HANDLERS[action.type];
// 	return handler ? handler(state, action) : state;
// }
