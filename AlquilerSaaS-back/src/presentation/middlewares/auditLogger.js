const AuditoriaRepository = require('../../infrastructure/repositories/AuditoriaRepository');

function auditLogger(entidad, accion) {
  return (req, res, next) => {
    const originalJson = res.json.bind(res);

    res.json = function (body) {
      if (res.statusCode >= 200 && res.statusCode < 300 && req.usuario) {
        AuditoriaRepository.create({
          entidad,
          accion,
          usuarioId: req.usuario.id,
          detalle:   `${accion} ${entidad}${req.params.id ? ' #' + req.params.id : ''}`,
        }).catch((e) => console.error('[auditLogger]', e.message));
      }
      return originalJson(body);
    };

    next();
  };
}

module.exports = auditLogger;
