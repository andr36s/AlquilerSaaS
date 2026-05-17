import { api } from './apiClient';

export const usuariosApi = {
  getClientes:    ()          => api.get('/clientes'),
  createCliente:  (datos)     => api.post('/clientes', datos),
  updateCliente:  (id, datos) => api.put(`/clientes/${id}`, datos),

  getEmpleados:   ()          => api.get('/empleados'),
  createEmpleado: (datos)     => api.post('/empleados', datos),
  updateEmpleado: (id, datos) => api.put(`/empleados/${id}`, datos),
};
