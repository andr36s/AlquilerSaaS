import { Usuario } from './Usuario';

export class Cliente extends Usuario {
  constructor(datos) {
    super({
      ...datos,
      tipo: 'Cliente',
      permisos: ['ver_vehiculos', 'crear_reserva', 'ver_historial'],
    });
    this.telefono = datos.telefono;
    this.direccion = datos.direccion;
  }
}
