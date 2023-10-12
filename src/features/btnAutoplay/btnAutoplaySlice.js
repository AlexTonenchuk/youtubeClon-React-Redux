import { 
    createSlice,  
    createSelector 
  } from '@reduxjs/toolkit';

  const initialState = {
    isOn: false, 
    videoIsOver: false 
  }

  export const autoplaySlice = createSlice({
    name: 'autoplay',
    initialState,
    reducers: {
      toggleAutoplayIsOn: (state, action) => {
        state.isOn = !state.isOn
      },
      toggleVideoIsOver: (state, action) => {
        state.videoIsOver = !state.videoIsOver
      },
    }
  });
  
export default autoplaySlice.reducer

export const { 
  toggleAutoplayIsOn,
  toggleVideoIsOver
 } = autoplaySlice.actions;
  
export const selectAutoplayIsOn = createSelector(
  (state) => state,
  (state) => state.autoplay.isOn
)

export const selectVideoIsOver = createSelector(
  (state) => state,
  (state) => state.autoplay.videoIsOver
)

