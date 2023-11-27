import { 
    createSlice,  
    createSelector 
  } from '@reduxjs/toolkit';

  const initialState = false

  export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      setSearch: (state, action) => action.payload,
    }
  });
  
export default searchSlice.reducer

export const { 
  setSearch
} = searchSlice.actions;
  
export const selectSearch = createSelector(
  (state) => state,
  (state) => state.search
)