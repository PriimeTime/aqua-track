import { UserAuth } from "@/models/UserAuth";
import { UserMetrics } from "@/models/UserMetrics";
import { UserAuthTokens } from "./UserAuthTokens";

export interface UserData {
  userMetrics: UserMetrics;
  userAuth: UserAuth;
  userAuthTokens: UserAuthTokens;
}
