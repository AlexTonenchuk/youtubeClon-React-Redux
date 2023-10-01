/* import { createSlice, createSelector } from '@reduxjs/toolkit';

const video = {
    autoplay: false,      // указывает на: будет ли запускаться след.видео по окончанию
    isPlay: false,
    muted: false,
    volume: 0.5,          // 0...1
    isSubtitles: true,
    speed: 1,
    quality: 480,         // 360, 480, 720
    size: 'normal',       // normal, mini, wide, full - !!! ПЕРЕДЕЛАТЬ так, а не wideScreen !!!!!!!!!!!!!
    currentTime: 0,
    duration: 0,
    paused: true,
    wideScreen: false,      // дублирование size
    focusId: undefined
  }

export const videoSlice = createSlice({
    name: 'video',
    initialState: video,
    reducers: {
        togglePlayPause (state, action){state.paused = !state.paused},
        setFocusId (state, action) {state.focusId = action.payload}
     },
  });

  export const {togglePlayPause, setFocusId} = videoSlice.actions

  export default videoSlice.reducer;

  export const selectPaused = createSelector(
    (state) => state,
    state => state.video.paused,
  );

  export const selectFocusId = createSelector(
    (state) => state,
    state => state.video.focusId,
  ); */