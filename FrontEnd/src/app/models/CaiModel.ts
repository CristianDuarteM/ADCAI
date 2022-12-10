import { UserModel } from "./UserModel";

export interface CaiModel {
  id: string;
  anno: string;
  semestre: string;
  inicio: string;
  limite: string;
  estado: boolean;
  teacher: UserModel;
}
