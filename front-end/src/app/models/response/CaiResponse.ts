export class CaiResponse {
  id: string;
  anno: string;
  semestre: string;
  fecha_inicio: string;
  fecha_limite: string;
  estado: boolean;

  constructor() {
    this.id = '';
    this.anno = '';
    this.semestre = '';
    this.fecha_inicio = '';
    this.fecha_limite = '';
    this.estado = false;
  }

}
