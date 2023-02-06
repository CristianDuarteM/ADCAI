import { Dean } from "../Dean";

export class FacultyResponse {
  id: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
  decano: Dean;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.estado = false;
    this.decano = new Dean();
  }

}
