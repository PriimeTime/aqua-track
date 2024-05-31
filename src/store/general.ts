import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type NetworkStatus = {
  isConnected: boolean;
  isReachable: boolean;
};

type General = {
  networkStatus: {
    isConnected: boolean;
    isReachable: boolean;
  };
};

const initialState: General = {
  networkStatus: {
    isConnected: false,
    isReachable: false,
  },
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setNetworkStatus: (state, action: PayloadAction<NetworkStatus>) => {
      state.networkStatus = { ...action.payload };
    },
  },
});

export const { setNetworkStatus } = generalSlice.actions;

export default generalSlice.reducer;
