import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";

import { type UID } from "@/types/UID";

const initialState: DrinkHistoryItem[] = [];

const drinkHistorySlice = createSlice({
  name: "drinkHistory",
  initialState,
  reducers: {
    setHistory: (_, action: PayloadAction<DrinkHistoryItem[]>) => {
      return action.payload;
    },
    addToHistory: (state, action: PayloadAction<DrinkHistoryItem>) => {
      state.push(action.payload);
    },
    removeFromHistory: (state, action: PayloadAction<UID>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToHistory, setHistory, removeFromHistory } =
  drinkHistorySlice.actions;

export default drinkHistorySlice.reducer;
