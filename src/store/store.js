import { createSlice, configureStore } from "@reduxjs/toolkit";

const waterIntakeSlice = createSlice({
  name: "waterIntake",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

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

export const { increment, reset } = waterIntakeSlice.actions;
export const { setType, resetType } = drinkTypeSlice.actions;

const store = configureStore({
  reducer: {
    waterIntake: waterIntakeSlice.reducer,
    drinkType: drinkTypeSlice.reducer,
  },
});

export default store;
