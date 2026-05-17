const { RegistroAuditoria } = require('../../domain/entities');

class AuditoriaRepository {
  findAll() {
    return RegistroAuditoria.find()
      .populate('usuarioId', 'nombre tipo')
      .sort({ createdAt: -1 });
  }

  create(datos) {
    return RegistroAuditoria.create(datos);
  }
}

module.exports = new AuditoriaRepository();
