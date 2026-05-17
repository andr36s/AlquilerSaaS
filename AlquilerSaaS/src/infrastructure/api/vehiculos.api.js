import { api } from './apiClient';

const normalize = (v) => ({
  ...v,
  categoria:    v.categoria?.nombre    ?? v.categoria    ?? 'Económico',
  tarifaDiaria: v.categoria?.tarifaDiaria ?? v.tarifaDiaria ?? 50000,
});

export const vehiculosApi = {
  getAll:       ()            => api.get('/vehiculos').then((list) => list.map(normalize)),
  getDisponibles: (fi, ff)    => api.get(`/vehiculos/disponibles?fechaInicio=${fi}&fechaFin=${ff}`).then((l) => l.map(normalize)),
  update:       (id, datos)   => api.put(`/vehiculos/${id}`, datos).then(normalize),
  cambiarEstado:(id, estado)  => api.put(`/vehiculos/${id}/estado`, { estado }).then(normalize),
  softDelete:   (id)          => api.delete(`/vehiculos/${id}`),
};
