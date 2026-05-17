const ReservaRepository  = require('../../infrastructure/repositories/ReservaRepository');
const VehiculoRepository = require('../../infrastructure/repositories/VehiculoRepository');
const emitter            = require('../../domain/patterns/observer/ReservaEventEmitter');
const { getEstado }      = require('../../domain/patterns/state/IEstadoVehiculo');

// Cargar estados en el registro
require('../../domain/patterns/state/Disponible');
require('../../domain/patterns/state/Reservado');
require('../../domain/patterns/state/EnMantenimiento');
require('../../domain/patterns/state/Inactivo');

const estrategias = {
  'Económico': require('../../domain/patterns/strategy/TarifaEconomica'),
  'SUV':       require('../../domain/patterns/strategy/TarifaSUV'),
  'Premium':   require('../../domain/patterns/strategy/TarifaPremium'),
};

const difDias = (a, b) =>
  Math.max(1, Math.ceil((new Date(b) - new Date(a)) / 86400000));

class ReservaService {
  async getAll(usuario) {
    const where = usuario.tipo === 'Cliente' ? { clienteId: usuario.id } : {};
    return ReservaRepository.findAll(where);
  }

  async crear({ vehiculoId, fechaInicio, fechaFin }, usuario) {
    // State pattern: verificar si el vehículo puede ser reservado
    const vehiculo = await VehiculoRepository.findById(vehiculoId);
    if (!vehiculo) throw { status: 404, message: 'Vehículo no encontrado' };

    const estado = getEstado(vehiculo.estado);
    if (!estado || !estado.puedeReservar()) {
      throw { status: 400, message: `El vehículo no está disponible (estado: ${vehiculo.estado})` };
    }

    // Anti doble-reserva: query con solapamiento de fechas
    const conflicto = await ReservaRepository.tieneConflicto(vehiculoId, fechaInicio, fechaFin);
    if (conflicto) throw { status: 409, message: 'El vehículo ya está reservado en esas fechas' };

    // Strategy pattern: calcular tarifa según categoría
    const nombreCategoria = vehiculo.categoriaId?.nombre || 'Económico';
    const estrategia = estrategias[nombreCategoria] || estrategias['Económico'];
    const dias = difDias(fechaInicio, fechaFin);
    const valorTotal = estrategia.calcular(dias);

    const reserva = await ReservaRepository.create(
      { vehiculoId, clienteId: usuario.id, fechaInicio, fechaFin, valorTotal, estado: 'Activa' }
    );

    // Observer pattern: notificar (estado del vehículo + auditoría)
    emitter.emit('reserva:creada', { reserva, usuario });

    return reserva;
  }

  async cambiarEstado(id, nuevoEstado, usuario) {
    const reserva = await ReservaRepository.findById(id);
    if (!reserva) throw { status: 404, message: 'Reserva no encontrada' };
    if (reserva.estado !== 'Activa') throw { status: 400, message: 'Solo se pueden modificar reservas activas' };

    await ReservaRepository.update(id, { estado: nuevoEstado });
    const actualizada = await ReservaRepository.findById(id);

    if (nuevoEstado === 'Cancelada')  emitter.emit('reserva:cancelada',  { reserva: actualizada, usuario });
    if (nuevoEstado === 'Completada') emitter.emit('reserva:completada', { reserva: actualizada, usuario });

    return actualizada;
  }
}

module.exports = new ReservaService();
