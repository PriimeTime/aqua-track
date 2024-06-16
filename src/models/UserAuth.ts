import { type UserUID } from "@/types/UserUID";

export interface UserAuth {
  isLoggedIn: boolean;
  uid: UserUID;
}
