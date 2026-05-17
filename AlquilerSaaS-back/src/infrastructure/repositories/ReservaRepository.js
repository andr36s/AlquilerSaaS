const { Reserva } = require('../../domain/entities');

class ReservaRepository {
  findAll(where = {}) {
    return Reserva.find(where)
      .populate('clienteId', 'nombre correo tipo')
      .populate({ path: 'vehiculoId', populate: { path: 'categoriaId' } })
      .sort({ createdAt: -1 });
  }

  findById(id) {
    return Reserva.findById(id)
      .populate('clienteId', 'nombre correo tipo')
      .populate({ path: 'vehiculoId', populate: { path: 'categoriaId' } });
  }

  async tieneConflicto(vehiculoId, fechaInicio, fechaFin) {
    const count = await Reserva.countDocuments({
      vehiculoId,
      estado:      'Activa',
      fechaInicio: { $lt: fechaFin },
      fechaFin:    { $gt: fechaInicio },
    });
    return count > 0;
  }

  create(datos) {
    return Reserva.create(datos);
  }

  async update(id, datos) {
    return Reserva.findByIdAndUpdate(id, datos, { new: true });
  }
}

module.exports = new ReservaRepository();
