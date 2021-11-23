import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    username: "User12345",
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.isLoggedIn = false
    },
    setUsername: (state, action) => {
      state.username = action.payload
    }
  },
})

export const { login, logout, setUsername } = userSlice.actions

export default userSlice.reducer