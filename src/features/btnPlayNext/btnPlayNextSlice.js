import { 
    createSlice,  
    createSelector 
  } from '@reduxjs/toolkit';

  const initialState = false

  export const playNextSlice = createSlice({
    name: 'playNext',
    initialState,
    reducers: {
      setPlayNext: (state, action) => action.payload,
    }
  });
  
export default playNextSlice.reducer

export const { 
  setPlayNext
 } = playNextSlice.actions;
  
export const selectPlayNext = createSelector(
  (state) => state,
  (state) => state.playNext
)
