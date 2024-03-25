import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userMetrics: {
    age: "",
    gender: null,
    height: "",
    weight: "",
    exerciseLvl: null,
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
  },
});

export const { setUserMetrics } = userDataSlice.actions;

export default userDataSlice.reducer;
