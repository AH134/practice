import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const displayNotification = (notification, seconds) => {
  return (dispatch) => {
    dispatch(setNotification(notification));
    const timeout = seconds * 1000;
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout);
  };
};

export default notificationSlice.reducer;
