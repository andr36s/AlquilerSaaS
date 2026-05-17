import { api } from './apiClient';

const normalizeVehiculo = (v) => v
  ? { ...v, categoria: v.categoria?.nombre ?? v.categoria ?? 'Económico' }
  : v;

const normalize = (r) => ({
  ...r,
  vehiculo: normalizeVehiculo(r.vehiculo),
});

export const reservasApi = {
  getAll:       ()                    => api.get('/reservas').then((l) => l.map(normalize)),
  crear:        (datos)               => api.post('/reservas', datos).then(normalize),
  cambiarEstado:(id, estado)          => api.put(`/reservas/${id}/estado`, { estado }).then(normalize),
};
