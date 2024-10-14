import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { NetworkStatus } from "@/models/NetworkStatus";
import { General } from "@/models/General";

const initialState: General = {
  networkStatus: {
    isConnected: false,
    isReachable: false,
  },
  alreadyHasAccount: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setNetworkStatus: (state, action: PayloadAction<NetworkStatus>) => {
      state.networkStatus = { ...action.payload };
    },
    setAlreadyHasAccount: (state, action: PayloadAction<boolean>) => {
      state.alreadyHasAccount = action.payload;
    },
  },
});

export const { setNetworkStatus, setAlreadyHasAccount } = generalSlice.actions;

export default generalSlice.reducer;
