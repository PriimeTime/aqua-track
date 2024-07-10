import { type UserUID } from "@/types/UserUID";

export interface AuthData {
  accessToken: string;
  userName: string;
  email: string;
  uid: UserUID;
}
