import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  networkStatus: {
    isConnected: false,
    isReachable: false,
  },
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setNetworkStatus: (state, action) => {
      state.networkStatus = { ...action.payload };
    },
  },
});

export const { setNetworkStatus } = generalSlice.actions;

export default generalSlice.reducer;
