import { configureStore } from '@reduxjs/toolkit';

import userReducer from 'src/redux/reducer/users';
import moviesReducer from 'src/redux/reducer/movies';

export default configureStore({
  reducer: {
    users: userReducer,
    movies: moviesReducer,
  },
});
