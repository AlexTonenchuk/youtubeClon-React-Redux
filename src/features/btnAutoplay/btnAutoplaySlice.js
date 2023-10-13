import { 
    createSlice,  
    createSelector 
  } from '@reduxjs/toolkit';

  const initialState = false

  export const autoplaySlice = createSlice({
    name: 'autoplay',
    initialState,
    reducers: {
      setAutoplay: (state, action) => {
        state = action.payload
      },
    }
  });
  
export default autoplaySlice.reducer

export const { 
  setAutoplay
 } = autoplaySlice.actions;
  
export const selectAutoplay = createSelector(
  (state) => state,
  (state) => state.autoplay
)
