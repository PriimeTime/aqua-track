import { configureStore } from "@reduxjs/toolkit";

import { asyncStorageMiddleware } from "@/middleware/asyncStorageMiddleware";

import drinkHistoryReducer from "@/store/drinkHistory";
import userDataReducer from "@/store/userData";
import generalReducer from "@/store/general";

const store = configureStore({
  reducer: {
    drinkHistory: drinkHistoryReducer,
    userData: userDataReducer,
    general: generalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncStorageMiddleware),
});

export default store;
