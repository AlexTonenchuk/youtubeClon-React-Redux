import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../features/filters/filtersSlice'
import videoListReduser from '../features/videoList/videoListSlice'
import autoplayReduser from '../features/btnAutoplay/btnAutoplaySlice'
import playNextReduser from '../features/btnPlayNext/btnPlayNextSlice'
import speedReduser from '../features/speedMenu/speedMenuSlice'
import settingsMenuReduser from '../features/btnSettings/btnSettingsSlice'
import screenSizeReduser from '../features/panScreenSize/panScreenSizeSlice';
import searchReduser from '../features/search/searchSlice'

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    videoList: videoListReduser,
    autoplay: autoplayReduser,
    playNext: playNextReduser,
    speed: speedReduser,
    settingsMenu: settingsMenuReduser,
    screenSize: screenSizeReduser,
    search: searchReduser,
  },
});
