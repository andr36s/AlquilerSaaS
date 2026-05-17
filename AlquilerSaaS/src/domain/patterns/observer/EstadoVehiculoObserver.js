export const EstadoVehiculoObserver = {
  notificar(vehiculos, reserva, accion) {
    if (accion === 'CREAR') {
      return vehiculos.map(v =>
        v.id === reserva.vehiculoId ? { ...v, estado: 'Reservado' } : v
      );
    }
    if (accion === 'CANCELAR') {
      return vehiculos.map(v =>
        v.id === reserva.vehiculoId ? { ...v, estado: 'Disponible' } : v
      );
    }
    return vehiculos;
  },
};
