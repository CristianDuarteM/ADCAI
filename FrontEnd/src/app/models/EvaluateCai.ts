export class EvaluateCaiModel {
  aprobado: boolean;
  docencia: string;
  investigacion: string;
  extension: string;
  administracion: string;
  representacion: string;
  otras: string;

  constructor(approved: boolean) {
    this.aprobado = approved;
    this.docencia = '';
    this.investigacion = '';
    this.extension = '';
    this.administracion = '';
    this.representacion = '';
    this.otras = '';
  }

}
