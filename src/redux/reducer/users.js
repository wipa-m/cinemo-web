import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  all: [],
  currentUser: { username: '' },
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    initial: (state, action) => {
      state.all = action.payload.all;
      state.currentUser = action.payload.currentUser;
    },
    resetUsers: (state) => {
      state = { ...initialState };
    },
  },
});

export const { initial, resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
