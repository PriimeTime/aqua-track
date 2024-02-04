import { createSlice, configureStore } from "@reduxjs/toolkit";
import { uid } from "uid";
import { asyncStorageMiddleware } from "../middleware/asyncStorageMiddleware";

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
      state.value = { id: -1 };
    },
  },
});

const drinkHistorySlice = createSlice({
  name: "drinkHistory",
  initialState: [],
  reducers: {
    setHistory: (state, action) => {
      return action.payload;
    },
    addToHistory: (state, action) => {
      const id = uid(6);
      state.push({ id, ...action.payload });
    },
    // TODO: removeItem
    resetHistory: (state) => {
      return [];
    },
  },
});

export const { setType, resetType } = drinkTypeSlice.actions;
export const { addToHistory, resetHistory, setHistory } =
  drinkHistorySlice.actions;

const store = configureStore({
  reducer: {
    drinkType: drinkTypeSlice.reducer,
    drinkHistory: drinkHistorySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(asyncStorageMiddleware),
});

export default store;
