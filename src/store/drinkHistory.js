import { createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";

const initialState = [];

const drinkHistorySlice = createSlice({
  name: "drinkHistory",
  initialState,
  reducers: {
    setHistory: (state, action) => {
      return action.payload;
    },
    addToHistory: (state, action) => {
      const id = uid(6);
      state.push({ id, ...action.payload });
    },
    removeFromHistory: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToHistory, setHistory, removeFromHistory } =
  drinkHistorySlice.actions;

export default drinkHistorySlice.reducer;
