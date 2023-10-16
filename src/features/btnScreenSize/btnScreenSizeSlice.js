import { 
    createSlice,  
    createSelector 
  } from '@reduxjs/toolkit';

  const initialState = 'small'

  export const screenSizeSlice = createSlice({
    name: 'screenSize',
    initialState,
    reducers: {
      setScreenSize: (state, action) => action.payload,
    }
  });
  
export default screenSizeSlice.reducer

export const { 
  setScreenSize
 } = screenSizeSlice.actions;
  
export const selectScreenSize = createSelector(
  (state) => state,
  (state) => state.screenSize
)
