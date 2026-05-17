const UsuarioRepository = require('../../infrastructure/repositories/UsuarioRepository');
const UsuarioFactory    = require('../../domain/patterns/factory/UsuarioFactory');

class UsuarioService {
  getByTipo(tipo) {
    return UsuarioRepository.findAll({ tipo });
  }

  getById(id) {
    return UsuarioRepository.findById(id);
  }

  async crear(tipo, datos) {
    const ya = await UsuarioRepository.findByCorreo(datos.correo);
    if (ya) throw { status: 409, message: 'El correo ya está registrado' };
    const datosConRol = UsuarioFactory.crear(tipo, datos);
    return UsuarioRepository.create(datosConRol);
  }

  actualizar(id, datos) {
    return UsuarioRepository.update(id, datos);
  }

  softDelete(id) {
    return UsuarioRepository.softDelete(id);
  }
}

module.exports = new UsuarioService();
