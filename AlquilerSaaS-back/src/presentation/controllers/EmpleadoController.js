const UsuarioService = require('../../application/services/UsuarioService');

class EmpleadoController {
  async listar(req, res, next) {
    try {
      res.json(await UsuarioService.getByTipo('Empleado'));
    } catch (e) { next(e); }
  }

  async crear(req, res, next) {
    try {
      const u = await UsuarioService.crear('Empleado', req.body);
      res.status(201).json({ id: u.id, nombre: u.nombre, correo: u.correo, tipo: u.tipo });
    } catch (e) { next(e); }
  }

  async actualizar(req, res, next) {
    try {
      const u = await UsuarioService.actualizar(req.params.id, req.body);
      if (!u) return res.status(404).json({ message: 'Empleado no encontrado' });
      res.json(u);
    } catch (e) { next(e); }
  }

  async eliminar(req, res, next) {
    try {
      await UsuarioService.softDelete(req.params.id);
      res.json({ message: 'Empleado desactivado' });
    } catch (e) { next(e); }
  }
}

module.exports = new EmpleadoController();
