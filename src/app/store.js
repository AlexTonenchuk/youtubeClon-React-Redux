import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/categories/categoriesSlice'
import videoListReduser from '../features/videoList/videoListSlice'
import videoReduser from '../features/video/videoSlice'
import autoplayReduser from '../features/btnAutoplay/btnAutoplaySlice'
import screenSizeReduser from '../features/btnScreenSize/btnScreenSizeSlice'
import playNextReduser from '../features/btnPlayNext/btnPlayNextSlice'
import speedReduser from '../features/speedMenu/speedMenuSlice'
import settingsMenuReduser from '../features/btnSettings/btnSettingsSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    videoList: videoListReduser,
    autoplay: autoplayReduser,
    screenSize: screenSizeReduser,
    playNext: playNextReduser,
    speed: speedReduser,
    settingsMenu: settingsMenuReduser
    //video: videoReduser,
  },
});
