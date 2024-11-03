import { NetworkStatus } from "@/models/NetworkStatus";
import { AppState } from "@/models/AppState";

export interface General {
  networkStatus: NetworkStatus;
  appState: AppState;
}
