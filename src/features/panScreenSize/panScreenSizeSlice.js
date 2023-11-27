import { 
    createSlice,  
    createSelector 
  } from '@reduxjs/toolkit';

  // В стейте будут 3 значения 'smallScreen' или 'bigScreen' или 'fullScreen'
  // изначальное значение 'smallScreen' 
  const initialState = 'smallScreen' 

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