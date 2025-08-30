import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  avatar: null,
  user: null,
  token: null,
  email : null,
  username : null,
  _id : null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.avatar = action.payload.avatar;
    },

    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.avatar = null;
    },
    changeAvatar : (state , action)=>{
      state.avatar = action.payload
    },

    setUser : (state , action) =>{
      state.email = action.payload.email
      state.username = action.payload.username
      state._id = action.payload._id
    }
  },
});


export const {login , logout , changeAvatar, setUser} = authSlice.actions

export default authSlice.reducer