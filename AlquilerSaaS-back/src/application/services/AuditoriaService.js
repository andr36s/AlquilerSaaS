const AuditoriaRepository = require('../../infrastructure/repositories/AuditoriaRepository');

class AuditoriaService {
  getAll() {
    return AuditoriaRepository.findAll();
  }
}

module.exports = new AuditoriaService();
