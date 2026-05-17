import { Usuario } from './Usuario';

export class Administrador extends Usuario {
  constructor(datos) {
    super({ ...datos, tipo: 'Administrador', permisos: ['*'] });
  }
}
