import { UserAuth } from "./UserAuth";
import { UserMetrics } from "./UserMetrics";

export interface UserData {
  userMetrics: UserMetrics;
  userAuth: UserAuth;
}
