import { api } from './apiClient';

export const authApi = {
  login:    (correo, clave) => api.post('/auth/login',    { correo, clave }),
  register: (datos)         => api.post('/auth/register', datos),
};
