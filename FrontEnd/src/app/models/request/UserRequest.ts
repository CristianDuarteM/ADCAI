export class UserRequest {
  id: number;
  nombre: string;
  apellido: string;
  codigo: string;
  id_departamento: number;
  realizaCai: boolean;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.apellido = '';
    this.codigo = '';
    this.id_departamento = 0;
    this.realizaCai = true;
  }

}
