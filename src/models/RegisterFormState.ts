import { LoginFormState } from "./LoginFormState";

export interface RegisterFormState extends LoginFormState {
  confirmPassword: string;
}
