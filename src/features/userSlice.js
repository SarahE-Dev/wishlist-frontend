import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  user: null, // Store user details (e.g., username, id)
  token: null, // Store the JWT
};

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

// Export actions for dispatching
export const { login, logout, updateUser } = userSlice.actions;


export default userSlice.reducer; // Export reducer for store
