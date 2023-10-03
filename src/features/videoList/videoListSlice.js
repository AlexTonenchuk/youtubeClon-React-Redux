import { 
  createSlice,  
  createEntityAdapter, 
  createSelector 
} from '@reduxjs/toolkit';

const videosAdapter = createEntityAdapter();

const initialState = videosAdapter.getInitialState();

export const videoListSlice = createSlice({
  name: 'videoList',
  initialState,
  reducers: {
    loaded: videosAdapter.addMany,
    playOn: (state, action) => {
      const id = action.payload
      state.entities[id].played = true
    },
    playOff: (state, action) => {
      const id = action.payload
      state.entities[id].played = false
    },
    togglePlay: (state, action) => {
      const id = action.payload
      state.entities[id].played = !state.entities[id].played
    },
    muteOn: (state, action) => {
      const id = action.payload
      state.entities[id].mute = true
    },
    muteOff: (state, action) => {
      const id = action.payload
      state.entities[id].mute = false
    },
    toggleMute: (state, action) => {
      const id = action.payload
      state.entities[id].mute = !state.entities[id].mute
    },
    setVolume: (state, action) => {
      state.entities[action.payload.id].volume = action.payload.volume
    },
    writeCurrentTime: (state, action) => {
      state.entities[action.payload.id].currentTime = action.payload.currentTime
    },
    setSpecifiedTime: (state, action) => {
      state.entities[action.payload.id].specifiedTime = action.payload.specifiedTime
    },
    writeDuration: (state, action) => {
      state.entities[action.payload.id].duration = action.payload.duration
    },


    

  }
});

export const { 
  loaded, 
  playOn, 
  playOff, 
  togglePlay,
  muteOn,
  muteOff,
  toggleMute,
  setVolume,
  writeCurrentTime,
  setSpecifiedTime,
  writeDuration
} = videoListSlice.actions;

export default videoListSlice.reducer;

// Получаем файл video 
export const selectVideoFile = createSelector(
  (state) => state,
  (state, id) => id,
  (state, id) => state.videoList.entities[id].video
)

// получаем флаг видеоИграет?
export const selectPlayed = createSelector(
  (state) => state,
  (state, id) => id,
  (state, id) => state.videoList.entities[id].played
)

//получаем флаг громкостьВыключена?
export const selectMute = createSelector(
  (state, id) => state,
  (state, id) => id,
  (state, id) => state.videoList.entities[id].mute
)

//получаем уровень громкости (от 0 до 1)
export const selectVolume = createSelector(
  (state, id) => state,
  (state, id) => id,
  (state, id) => state.videoList.entities[id].volume
)

//получаем текущее время
export const selectCurrentTime = createSelector(
  (state, id) => state,
  (state, id) => id,
  (state, id) => state.videoList.entities[id].currentTime
)

//получаем  время на которое хотим перемотать видео
export const selectSpecifiedTime = createSelector(
  (state, id) => state,
  (state, id) => id,
  (state, id) => state.videoList.entities[id].specifiedTime
)

//получаем  длительность видео
export const selectDuration= createSelector(
  (state, id) => state,
  (state, id) => id,
  (state, id) => state.videoList.entities[id].duration
)




