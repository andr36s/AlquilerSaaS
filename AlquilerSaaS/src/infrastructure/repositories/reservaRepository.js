import { reservasIniciales } from '../data/initialData';

export const reservaRepository = {
  getInitialData: () => [...reservasIniciales],
  findAll:        (reservas) => [...reservas],
  findById:       (reservas, id) => reservas.find((r) => r.id === id),
  findByCliente:  (reservas, clienteId) => reservas.filter((r) => r.clienteId === clienteId),
  findByVehiculo: (reservas, vehiculoId) => reservas.filter((r) => r.vehiculoId === vehiculoId),
  findActivas:    (reservas) => reservas.filter((r) => r.estado === 'Activa'),

  tieneConflicto(reservas, vehiculoId, fechaInicio, fechaFin) {
    return reservas.some(
      (r) =>
        r.vehiculoId === vehiculoId &&
        r.estado === 'Activa' &&
        !(new Date(fechaFin) <= new Date(r.fechaInicio) ||
          new Date(fechaInicio) >= new Date(r.fechaFin))
    );
  },

  add:          (reservas, reserva) => [...reservas, reserva],
  updateEstado: (reservas, id, estado) => reservas.map((r) => r.id === id ? { ...r, estado } : r),
};
