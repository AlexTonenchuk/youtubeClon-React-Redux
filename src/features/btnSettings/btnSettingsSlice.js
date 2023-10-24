import { 
    createSlice,  
    createSelector 
  } from '@reduxjs/toolkit';

  const initialState = 'nothing'

  export const btnSettingsSlice = createSlice({
    name: 'settingsMenu',
    initialState,
    reducers: {
      setSettingsMenu: (state, action) => action.payload,
    }
  });
  
export default btnSettingsSlice.reducer

export const { 
  setSettingsMenu
 } = btnSettingsSlice.actions;
  
export const selectSettingsMenu = createSelector(
  (state) => state,
  (state) => state.settingsMenu
)