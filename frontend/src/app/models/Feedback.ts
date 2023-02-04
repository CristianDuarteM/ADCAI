import { User } from "./User";

export class Feedback {
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

  constructor() {
    this.id = 0;
    this.id_periodo_docente = 0;
    this.id_usuario = 0;
    this.docencia = '';
    this.investigacion = '';
    this.extension = '';
    this.administracion = '';
    this.otras = '';
    this.representacion = '';
    this.rol = '';
    this.usuario = new User();
  }

}
