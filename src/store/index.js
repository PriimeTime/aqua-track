import { configureStore } from "@reduxjs/toolkit";
import { asyncStorageMiddleware } from "../middleware/asyncStorageMiddleware";
import drinkHistoryReducer from "./drinkHistory";
import userDataReducer from "./userData";

const store = configureStore({
  reducer: {
    drinkHistory: drinkHistoryReducer,
    userData: userDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncStorageMiddleware),
});

export default store;
