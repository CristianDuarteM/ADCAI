import { User } from "./User";

export interface Auth {
  esCompleto: boolean;
  token: string;
  usuario: User;
}
