import { auditoriaRepository } from '../../infrastructure/repositories/auditoriaRepository';

export const auditoriaService = {
  getRegistros:        (auditoria) => auditoriaRepository.findAll(auditoria),
  getRegistrosInversos:(auditoria) => [...auditoria].reverse(),
};
