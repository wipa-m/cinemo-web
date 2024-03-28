import { createSlice } from '@reduxjs/toolkit';

import { CINEMO_USERS } from 'src/utils/staticVariables';

import { getDataLocalStorage } from 'src/utils';

const initialState = {
  value: [],
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    update: (state, action) => {
      const { userList, token } = getDataLocalStorage();

      let newMovies = [];

      if (userList.length > 0 && token) {
        const currentUser = userList.find((user) => user.username === token);

        if (currentUser) {
          const favoriteIds = currentUser.favoriteIds || [];
          newMovies = action.payload.map((movie) => ({
            ...movie,
            isFavorite: favoriteIds.includes(movie.id),
          }));
        }
      }
      state.value = newMovies;
    },
    toggleFavorite: (state, action) => {
      const { userList, token } = getDataLocalStorage();

      let newMovies = [];
      if (userList.length > 0 && token) {
        const currentUser = userList.find((user) => user.username === token);

        if (currentUser) {
          const favoriteIds = currentUser.favoriteIds || [];
          newMovies = state.value.map((movie) => {
            if (movie.id === action.payload.id) {
              return {
                ...movie,
                isFavorite: !favoriteIds.includes(movie.id),
              };
            }
            return movie;
          });

          // Update to local storage
          const updatedFavoriteIds = newMovies
            .filter((movie) => movie.isFavorite)
            .map((item) => item.id);

          const updatedUsers = userList.map((user) => {
            if (user.username === token) {
              user.favoriteIds = [...updatedFavoriteIds];
            }

            return user;
          });
          localStorage.setItem(CINEMO_USERS, JSON.stringify(updatedUsers));
        }
      }

      state.value = newMovies;
    },
    resetMovies: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { update, toggleFavorite, resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
