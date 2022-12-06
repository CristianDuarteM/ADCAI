import { UserModel } from "./UserModel";

export interface CaiModel {
  id: string;
  year: string;
  semester: string;
  date: Date;
  teacher: UserModel;
}
