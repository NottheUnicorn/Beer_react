import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Name',
        email: 'Email',
        favorite_beer: 'Favorite_Beer'
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseEmail: (state, action) => { state.email = action.payload},
        chooseFavorite_Beer: (state, action) => { state.favorite_beer = action.payload},
        
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, chooseEmail, chooseFavorite_Beer } = rootSlice.actions;