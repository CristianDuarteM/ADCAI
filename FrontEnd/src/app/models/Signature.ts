export class Signature {
  id: number;
  ruta_firma: string;
  periodo_docente_firma: {[rol: string]: string};

  constructor() {
    this.id = 0;
    this.ruta_firma = '';
    this.periodo_docente_firma = {};
  }

}
