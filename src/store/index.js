import { configureStore } from "@reduxjs/toolkit";
import { asyncStorageMiddleware } from "../middleware/asyncStorageMiddleware";
import drinkHistoryReducer from "./drinkHistory";

const store = configureStore({
  reducer: {
    drinkHistory: drinkHistoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncStorageMiddleware),
});

export default store;
