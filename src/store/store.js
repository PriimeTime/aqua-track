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

export const { increment, reset } = waterIntakeSlice.actions;

const store = configureStore({
  reducer: { waterIntake: waterIntakeSlice.reducer },
});

export default store;
