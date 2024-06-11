import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { NetworkStatus } from "@/models/NetworkStatus";
import { General } from "@/models/General";

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
