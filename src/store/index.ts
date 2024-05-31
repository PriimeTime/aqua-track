import { configureStore } from "@reduxjs/toolkit";
import { asyncStorageMiddleware } from "../middleware/asyncStorageMiddleware";
import drinkHistoryReducer from "./drinkHistory";
import userDataReducer from "./userData";
import generalReducer from "./general";

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