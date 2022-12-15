export class UserResponse {
  id: number;
  correo: string;
  nombre: string;
  apellido: string;
  realizaCai: boolean;
  codigo: string;
  estaActivo: boolean;
  id_departamento: number;
  id_firma: number;

  constructor() {
    this.id = 0;
    this.correo = '';
    this.nombre = '';
    this.apellido = '';
    this.realizaCai = true;
    this.codigo = '';
    this.estaActivo = false;
    this.id_departamento = 0;
    this.id_firma = 0;
  }

}
