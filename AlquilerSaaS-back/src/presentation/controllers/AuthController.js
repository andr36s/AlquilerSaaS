const AuthAppService = require('../../application/services/AuthAppService');

class AuthController {
  async login(req, res, next) {
    try {
      const result = await AuthAppService.login(req.body.correo, req.body.clave);
      res.json(result);
    } catch (e) { next(e); }
  }

  async register(req, res, next) {
    try {
      const result = await AuthAppService.registrarCliente(req.body);
      res.status(201).json(result);
    } catch (e) { next(e); }
  }
}

module.exports = new AuthController();
