import { Usuario } from './Usuario';

export class Empleado extends Usuario {
  constructor(datos) {
    super({
      ...datos,
      tipo: 'Empleado',
      permisos: ['gestionar_clientes', 'gestionar_vehiculos', 'ver_reservas', 'gestionar_reservas'],
    });
    this.cargo = datos.cargo;
  }
}
