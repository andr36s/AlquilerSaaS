const AuditoriaService = require('../../application/services/AuditoriaService');

class AuditoriaController {
  async listar(req, res, next) {
    try {
      res.json(await AuditoriaService.getAll());
    } catch (e) { next(e); }
  }
}

module.exports = new AuditoriaController();
