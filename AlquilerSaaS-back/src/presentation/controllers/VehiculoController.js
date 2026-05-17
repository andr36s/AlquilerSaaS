const VehiculoService = require('../../application/services/VehiculoService');

class VehiculoController {
  async listar(req, res, next) {
    try {
      const filtros = {};
      if (req.query.estado)      filtros.estado      = req.query.estado;
      if (req.query.categoriaId) filtros.categoriaId = req.query.categoriaId;
      const data = await VehiculoService.getAll(filtros);
      res.json(data);
    } catch (e) { next(e); }
  }

  async disponibles(req, res, next) {
    try {
      const data = await VehiculoService.getDisponibles(req.query.fechaInicio, req.query.fechaFin);
      res.json(data);
    } catch (e) { next(e); }
  }

  async crear(req, res, next) {
    try {
      const v = await VehiculoService.crear(req.body);
      res.status(201).json(v);
    } catch (e) { next(e); }
  }

  async actualizar(req, res, next) {
    try {
      const v = await VehiculoService.actualizar(req.params.id, req.body);
      if (!v) return res.status(404).json({ message: 'Vehículo no encontrado' });
      res.json(v);
    } catch (e) { next(e); }
  }

  async cambiarEstado(req, res, next) {
    try {
      const v = await VehiculoService.cambiarEstado(req.params.id, req.body.estado);
      res.json(v);
    } catch (e) { next(e); }
  }

  async eliminar(req, res, next) {
    try {
      await VehiculoService.softDelete(req.params.id);
      res.json({ message: 'Vehículo desactivado' });
    } catch (e) { next(e); }
  }
}

module.exports = new VehiculoController();
