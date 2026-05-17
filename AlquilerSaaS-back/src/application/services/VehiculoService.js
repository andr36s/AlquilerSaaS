const VehiculoRepository = require('../../infrastructure/repositories/VehiculoRepository');
const { getEstado } = require('../../domain/patterns/state/IEstadoVehiculo');

// Cargar estados en el registro
require('../../domain/patterns/state/Disponible');
require('../../domain/patterns/state/Reservado');
require('../../domain/patterns/state/EnMantenimiento');
require('../../domain/patterns/state/Inactivo');

class VehiculoService {
  getAll(filtros = {}) {
    const where = {};
    if (filtros.estado)      where.estado      = filtros.estado;
    if (filtros.categoriaId) where.categoriaId = filtros.categoriaId;
    return VehiculoRepository.findAll(where);
  }

  getDisponibles(fechaInicio, fechaFin) {
    if (!fechaInicio || !fechaFin) throw { status: 400, message: 'Se requieren fechaInicio y fechaFin' };
    return VehiculoRepository.findDisponibles(fechaInicio, fechaFin);
  }

  getById(id) {
    return VehiculoRepository.findById(id);
  }

  crear(datos) {
    return VehiculoRepository.create(datos);
  }

  actualizar(id, datos) {
    return VehiculoRepository.update(id, datos);
  }

  async cambiarEstado(id, nuevoEstado) {
    const vehiculo = await VehiculoRepository.findById(id);
    if (!vehiculo) throw { status: 404, message: 'Vehículo no encontrado' };

    // State pattern: validar transición
    const estadoActual = getEstado(vehiculo.estado);
    if (estadoActual && estadoActual.siguiente() !== nuevoEstado) {
      const sig = estadoActual.siguiente() || 'ninguno';
      throw { status: 400, message: `Transición inválida. Desde "${vehiculo.estado}" solo se puede ir a "${sig}"` };
    }

    return VehiculoRepository.update(id, { estado: nuevoEstado });
  }

  softDelete(id) {
    return VehiculoRepository.softDelete(id);
  }
}

module.exports = new VehiculoService();
