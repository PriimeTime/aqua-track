import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { UserAuth } from "@/models/UserAuth";
import { UserData } from "@/models/UserData";
import { UserMetrics } from "@/models/UserMetrics";

const initialState: UserData = {
  userMetrics: {
    age: null,
    gender: null,
    height: null,
    weight: null,
    exerciseLvl: null,
  },
  userAuth: {
    userName: null,
    isLoggedIn: false,
    email: null,
    uid: null,
  },
  userAuthTokens: {
    accessToken: null,
    refreshToken: null,
  },
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserMetrics>) => {
      state.userMetrics = action.payload;
    },
    setUserMetrics: (state, action: PayloadAction<UserMetrics>) => {
      state.userMetrics = { ...state.userMetrics, ...action.payload };
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.userAuth.userName = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.userMetrics.gender = action.payload;
    },
    setWeight: (state, action: PayloadAction<number>) => {
      state.userMetrics.weight = action.payload;
    },
    setExerciseLvl: (state, action: PayloadAction<string>) => {
      state.userMetrics.exerciseLvl = action.payload;
    },
    setUserAuth: (state, action: PayloadAction<UserAuth>) => {
      state.userAuth = { ...state.userAuth, ...action.payload };
    },
    setUserAccessToken: (state, action: PayloadAction<string | null>) => {
      state.userAuthTokens.accessToken = action.payload;
    },
    setUserRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.userAuthTokens.refreshToken = action.payload;
    },
    setUserLoginState: (state, action: PayloadAction<boolean>) => {
      state.userAuth.isLoggedIn = action.payload;
    },
    setUserUID: (state, action: PayloadAction<string | null>) => {
      state.userAuth.uid = action.payload;
    },
  },
});

export const {
  setUserMetrics,
  setUsername,
  setGender,
  setWeight,
  setExerciseLvl,
  setUserAuth,
  setUserAccessToken,
  setUserRefreshToken,
  setUserLoginState,
  setUserUID,
  setUserData,
} = userDataSlice.actions;

export default userDataSlice.reducer;
