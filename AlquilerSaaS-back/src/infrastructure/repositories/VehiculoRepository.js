const { Vehiculo, Reserva } = require('../../domain/entities');

class VehiculoRepository {
  findAll(where = {}) {
    return Vehiculo.find({ activo: true, ...where }).populate('categoriaId');
  }

  findById(id) {
    return Vehiculo.findOne({ _id: id, activo: true }).populate('categoriaId');
  }

  async findDisponibles(fechaInicio, fechaFin) {
    const ocupados = await Reserva.find(
      { estado: 'Activa', fechaInicio: { $lt: fechaFin }, fechaFin: { $gt: fechaInicio } },
      'vehiculoId'
    );
    const idsOcupados = ocupados.map((r) => r.vehiculoId);

    return Vehiculo.find({
      activo: true,
      estado: 'Disponible',
      ...(idsOcupados.length ? { _id: { $nin: idsOcupados } } : {}),
    }).populate('categoriaId');
  }

  create(datos) {
    return Vehiculo.create(datos);
  }

  update(id, datos) {
    return Vehiculo.findByIdAndUpdate(id, datos, { new: true, runValidators: true })
      .populate('categoriaId');
  }

  softDelete(id) {
    return Vehiculo.findByIdAndUpdate(id, { activo: false });
  }
}

module.exports = new VehiculoRepository();
