import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NetworkStatus {
  isConnected: boolean;
  isReachable: boolean;
}

interface General {
  networkStatus: {
    isConnected: boolean;
    isReachable: boolean;
  };
}

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
