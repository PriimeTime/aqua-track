import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { NetworkStatus } from "@/models/NetworkStatus";
import { General } from "@/models/General";

const initialState: General = {
  networkStatus: {
    isConnected: false,
    isReachable: false,
  },
  appState: {
    reset: false,
  },
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setNetworkStatus: (state, action: PayloadAction<NetworkStatus>) => {
      state.networkStatus = { ...action.payload };
    },
    setAppState: (state, action: PayloadAction<{ reset: boolean }>) => {
      state.appState = { ...action.payload };
    },
  },
});

export const { setNetworkStatus, setAppState } = generalSlice.actions;

export default generalSlice.reducer;
