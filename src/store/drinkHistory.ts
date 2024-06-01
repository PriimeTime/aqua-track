import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { uid } from "uid";
import { type UID } from "@/types/UID";
import { DrinkHistoryItem } from "@/models/DrinkHistoryItem";
import { DrinkHistoryItemWithoutID } from "@/models/DrinkHistoryItemWithoutID";

const initialState: DrinkHistoryItem[] = [];

const drinkHistorySlice = createSlice({
  name: "drinkHistory",
  initialState,
  reducers: {
    setHistory: (_, action: PayloadAction<DrinkHistoryItem[]>) => {
      return action.payload;
    },
    addToHistory: (state, action: PayloadAction<DrinkHistoryItemWithoutID>) => {
      const id: UID = uid(6);
      state.push({ id, ...action.payload });
    },
    removeFromHistory: (state, action: PayloadAction<UID>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToHistory, setHistory, removeFromHistory } =
  drinkHistorySlice.actions;

export default drinkHistorySlice.reducer;
