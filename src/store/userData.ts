import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { UserAuth } from "@/models/UserAuth";
import { UserData } from "@/models/UserData";
import { UserMetrics } from "@/models/UserMetrics";

import { initialUserAuth, initialUserMetrics } from "@/utils/constants";

import { Gender } from "@/enums/settings/Gender";
import { ExerciseLevel } from "@/enums/settings/ExerciseLevel";

const initialState: UserData = {
  userMetrics: initialUserMetrics,
  userAuth: initialUserAuth,
  userAuthTokens: {
    accessToken: null,
    refreshToken: null,
  },
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userMetrics = {
        ...state.userMetrics,
        ...action.payload.userMetrics,
      };
      state.userAuth = { ...state.userAuth, ...action.payload.userAuth };
      state.userAuthTokens = {
        ...state.userAuthTokens,
        ...action.payload.userAuthTokens,
      };
    },
    setUserMetrics: (state, action: PayloadAction<Partial<UserMetrics>>) => {
      state.userMetrics = { ...state.userMetrics, ...action.payload };
    },
    setDailyHydrationGoal: (state, action: PayloadAction<number>) => {
      state.userMetrics.dailyHydrationGoal = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.userAuth.userName = action.payload;
    },
    setGender: (state, action: PayloadAction<Gender>) => {
      state.userMetrics.gender = action.payload;
    },
    setWeight: (state, action: PayloadAction<number>) => {
      state.userMetrics.weight = action.payload;
    },
    setExerciseLvl: (state, action: PayloadAction<ExerciseLevel>) => {
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
  setDailyHydrationGoal,
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
