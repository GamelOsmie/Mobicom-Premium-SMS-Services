import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notification: {
    type: '',
    message: '',
  },
};

export const notificationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = {
        type: action.payload.type,
        message: action.payload.message,
      };
    },
    clearNotification: (state) => {
      state.notification = {
        type: '',
        message: '',
      };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
