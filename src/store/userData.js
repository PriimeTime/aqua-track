import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userMetrics: {
    age: "",
    gender: null,
    height: "",
    weight: "",
    exerciseLvl: null,
  },
  userAuth: {
    isLoggedIn: false,
  },
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userMetrics = action.payload;
    },
    setUserMetrics: (state, action) => {
      state.userMetrics = { ...state.userMetrics, ...action.payload };
    },
    setUserLoginState: (state, action) => {
      state.userAuth = { ...state.userAuth, ...action.payload };
    },
  },
});

export const { setUserMetrics, setUserLoginState } = userDataSlice.actions;

export default userDataSlice.reducer;
