import { createSlice, createSelector } from '@reduxjs/toolkit';

const filters ={
  filters: [
    'Все',
    'Thrash metall',
    'Punk',
    'Rap rock',
    'Grunge',
    'Heavy metall',
    'Nu metalcore',
    'Hard rock',
  ],
  currentFilter: 'Все'
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState: filters,
    reducers: { 
      setFilter: (state, action)=>{
        state.currentFilter=action.payload
      } 
    },
});

export const {setFilter} =filtersSlice.actions

export default filtersSlice.reducer;

export const selectFilters = createSelector(
  (state) => state,
  state => state.filters.filters,
);

export const selectCurrentFilter = createSelector(
  (state) => state,
  state => state.filters.currentFilter,
);



  