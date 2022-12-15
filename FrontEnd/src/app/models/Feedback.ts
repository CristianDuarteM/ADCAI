import { User } from "./User";

export interface Feedback {
  id: number;
  id_periodo_docente: number;
  id_usuario: number;
  docencia: string;
  investigacion: string;
  extension: string;
  administracion: string;
  otras: string;
  representacion: string;
  rol: string;
  usuario: User;
}
