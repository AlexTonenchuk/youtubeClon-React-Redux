import { createSlice,  createEntityAdapter } from '@reduxjs/toolkit';

const videosAdapter = createEntityAdapter();

const initialState = videosAdapter.getInitialState();

export const listVideosSlice = createSlice({
    name: 'listVideos',
    initialState,
    reducers: {
      loaded: videosAdapter.addMany,
    }
});

export const { loaded } = listVideosSlice.actions;

export default listVideosSlice.reducer;

export const { 
    selectById: selectVideoById
  } = videosAdapter.getSelectors((state) => state.videos);
 
  
