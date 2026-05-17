import { auditoriaInicial } from '../data/initialData';

export const auditoriaRepository = {
  getInitialData: () => [...auditoriaInicial],
  findAll:        (auditoria) => [...auditoria],
  add:            (auditoria, registro) => [...auditoria, registro],
};
