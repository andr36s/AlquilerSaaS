import { api } from './apiClient';

const normalize = (a) => ({
  ...a,
  usuario: a.usuario?.nombre ?? a.usuarioId ?? 'Sistema',
  fecha:   a.createdAt
    ? new Date(a.createdAt).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' })
    : '',
});

export const auditoriaApi = {
  getAll: () => api.get('/auditoria').then((l) => l.map(normalize)),
};
