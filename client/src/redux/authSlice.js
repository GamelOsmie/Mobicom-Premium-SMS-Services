import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loggedIn: true,
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setUserIsLoggedIn: (state) => {
      state.loggedIn = true;
    },
    setUserIsLoggedOut: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { setUser, clearUser, setUserIsLoggedIn, setUserIsLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
