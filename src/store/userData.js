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
    uid: null,
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
    setUserAuth: (state, action) => {
      state.userAuth = { ...state.userAuth, ...action.payload };
    },
    setUserLoginState: (state, action) => {
      state.userAuth.isLoggedIn = action.payload;
    },
    setUserUID: (state, action) => {
      state.userAuth.uid = action.payload;
    },
  },
});

export const { setUserMetrics, setUserAuth, setUserLoginState, setUserUID } =
  userDataSlice.actions;

export default userDataSlice.reducer;
