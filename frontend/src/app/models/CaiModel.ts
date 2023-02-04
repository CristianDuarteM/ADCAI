import { User } from "./User";

export interface CaiModel {
  id: string;
  anno: string;
  semestre: string;
  inicio: string;
  limite: string;
  estado: boolean;
  teacher: User;
}
