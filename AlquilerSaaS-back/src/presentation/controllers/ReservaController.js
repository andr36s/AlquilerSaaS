const ReservaService = require('../../application/services/ReservaService');

class ReservaController {
  async listar(req, res, next) {
    try {
      const data = await ReservaService.getAll(req.usuario);
      res.json(data);
    } catch (e) { next(e); }
  }

  async crear(req, res, next) {
    try {
      const reserva = await ReservaService.crear(req.body, req.usuario);
      res.status(201).json(reserva);
    } catch (e) { next(e); }
  }

  async cambiarEstado(req, res, next) {
    try {
      const r = await ReservaService.cambiarEstado(req.params.id, req.body.estado, req.usuario);
      res.json(r);
    } catch (e) { next(e); }
  }
}

module.exports = new ReservaController();
