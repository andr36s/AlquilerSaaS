const { Usuario } = require('../../domain/entities');

class UsuarioRepository {
  findAll(where = {}) {
    return Usuario.find({ activo: true, ...where });
  }

  findById(id) {
    return Usuario.findOne({ _id: id, activo: true });
  }

  findByCorreo(correo) {
    return Usuario.findOne({ correo }).select('+clave');
  }

  create(datos) {
    return Usuario.create(datos);
  }

  update(id, datos) {
    return Usuario.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
  }

  softDelete(id) {
    return Usuario.findByIdAndUpdate(id, { activo: false });
  }
}

module.exports = new UsuarioRepository();
