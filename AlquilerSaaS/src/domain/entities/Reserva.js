export class Reserva {
  constructor({ id, clienteId, vehiculoId, fechaInicio, fechaFin, estado, valorTotal, fechaCreacion }) {
    this.id = id;
    this.clienteId = clienteId;
    this.vehiculoId = vehiculoId;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.estado = estado ?? 'Activa';
    this.valorTotal = valorTotal;
    this.fechaCreacion = fechaCreacion ?? new Date().toISOString().split('T')[0];
  }
}
