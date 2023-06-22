import { createSlice, createSelector } from '@reduxjs/toolkit';

const categories = [
    'Музыка',
    'Дикие животные',
    'Сейчас в эфире',
    'Джемы',
    'Туристические направления',
    'Домашние животные',
    'Кулинария',
    'Политика',
    'Автомобили',
    'Танцы',
]

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: categories,
    reducers: { },
  });

  export default categoriesSlice.reducer;

  export const selectCategories = createSelector(
    (state) => state,
    state => state.categories,
  );


  