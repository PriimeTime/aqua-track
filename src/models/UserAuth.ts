import { type UserUID } from "@/types/UserUID";

export interface UserAuth {
  isLoggedIn: boolean;
  userName: string | null;
  email: string | null;
  uid: UserUID;
  firstLogin?: boolean;
}
