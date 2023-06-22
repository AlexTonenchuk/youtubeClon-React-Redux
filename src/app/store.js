import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/categories/categoriesSlice';
import listVideosReduser from '../features/listVideos/listVideosSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    videos: listVideosReduser
  },
});
