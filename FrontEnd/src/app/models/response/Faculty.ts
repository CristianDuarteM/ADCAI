import { Dean } from "../Dean";

export interface Faculty {
    id: number;
    nombre: string;
    descripcion: string;
    estado: boolean;
    decano: Dean;
  }
