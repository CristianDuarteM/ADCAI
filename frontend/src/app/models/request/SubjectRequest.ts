export class SubjectRequest {
  id_programa: string;
  nombre: string;
  estado: boolean;
  creditos: string;
  horas_practicas: string;
  horas_teoricas: string;

  constructor() {
    this.id_programa = '';
    this.nombre = '';
    this.estado = true;
    this.creditos = '';
    this.horas_practicas = '';
    this.horas_teoricas = '';
  }

}
