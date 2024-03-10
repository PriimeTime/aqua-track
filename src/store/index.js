import { createSlice, configureStore } from "@reduxjs/toolkit";
import { asyncStorageMiddleware } from "../middleware/asyncStorageMiddleware";
import drinkHistoryReducer from "./drinkHistory";

const drinkTypeSlice = createSlice({
  name: "drinkType",
  initialState: {
    value: -1,
  },
  reducers: {
    setType: (state, action) => {
      state.value = action.payload;
    },
    resetType: (state) => {
      state.value = -1;
    },
  },
});

export const { setType, resetType } = drinkTypeSlice.actions;

const store = configureStore({
  reducer: {
    drinkType: drinkTypeSlice.reducer,
    drinkHistory: drinkHistoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncStorageMiddleware),
});

export default store;
