import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/categories/categoriesSlice'
import videoListReduser from '../features/videoList/videoListSlice'
import videoReduser from '../features/video/videoSlice'
import autoplayReduser from '../features/btnAutoplay/btnAutoplaySlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    videoList: videoListReduser,
    autoplay: autoplayReduser,
    //video: videoReduser,
  },
});
