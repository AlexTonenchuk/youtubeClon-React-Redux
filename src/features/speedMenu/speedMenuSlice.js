import { 
    createSlice,  
    createSelector 
  } from '@reduxjs/toolkit';

  const initialState = 1

  export const speedSlice = createSlice({
    name: 'speed',
    initialState,
    reducers: {
      setSpeed: (state, action) => action.payload,
    }
  });
  
export default speedSlice.reducer

export const { 
  setSpeed
 } = speedSlice.actions;
  
export const selectSpeed = createSelector(
  (state) => state,
  (state) => state.speed
)
