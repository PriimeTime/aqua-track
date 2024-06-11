import { UserAuth } from "@/models/UserAuth";
import { UserMetrics } from "@/models/UserMetrics";

export interface UserData {
  userMetrics: UserMetrics;
  userAuth: UserAuth;
}
