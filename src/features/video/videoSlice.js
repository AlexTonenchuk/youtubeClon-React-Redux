/* import { 
  createSlice,  
  createSelector 
} from '@reduxjs/toolkit';

const initialState = {currentId: undefined} 

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setCurrentId: (stateSlice, action) => {
      stateSlice.currentId = action.payload
    },
  }
});

export default videoSlice.reducer

export const { 
  setCurrentId
} = videoSlice.actions;

export const selectCurrentId = createSelector(
  (state) => state.video,
  (video) => video.currentId
)  */