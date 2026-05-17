const UsuarioRepository = require('../../infrastructure/repositories/UsuarioRepository');
const authService       = require('../../domain/patterns/singleton/AuthService');
const UsuarioFactory    = require('../../domain/patterns/factory/UsuarioFactory');

class AuthAppService {
  async login(correo, clave) {
    const usuario = await UsuarioRepository.findByCorreo(correo);
    if (!usuario || !usuario.activo) throw { status: 401, message: 'Credenciales incorrectas' };

    const valida = await usuario.verificarClave(clave);
    if (!valida) throw { status: 401, message: 'Credenciales incorrectas' };

    const token = authService.generarToken(usuario);
    return {
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, tipo: usuario.tipo },
    };
  }

  async registrarCliente(datos) {
    const ya = await UsuarioRepository.findByCorreo(datos.correo);
    if (ya) throw { status: 409, message: 'El correo ya está registrado' };

    const datosConRol = UsuarioFactory.crear('Cliente', datos);
    const nuevo = await UsuarioRepository.create(datosConRol);
    return { id: nuevo.id, nombre: nuevo.nombre, correo: nuevo.correo, tipo: nuevo.tipo };
  }
}

module.exports = new AuthAppService();
