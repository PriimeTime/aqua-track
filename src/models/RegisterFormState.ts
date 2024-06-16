import { LoginFormState } from "@/models/LoginFormState";

export interface RegisterFormState extends LoginFormState {
  confirmPassword: string;
}
