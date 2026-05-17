import { useState } from 'react';
import { authApi }       from '../../infrastructure/api/auth.api';
import { setToken, clearToken } from '../../infrastructure/api/apiClient';

const PERMISOS_POR_ROL = {
  Cliente:       ['ver_vehiculos', 'crear_reserva', 'ver_mis_reservas'],
  Empleado:      ['ver_vehiculos', 'gestionar_vehiculos', 'ver_reservas', 'gestionar_reservas', 'gestionar_clientes'],
  Administrador: ['*'],
};

function enrichUser(u) {
  return { ...u, permisos: PERMISOS_POR_ROL[u.tipo] || [] };
}

export function useAuth() {
  const [usuario, setUsuario] = useState(null);

  async function login(correo, clave) {
    try {
      const result = await authApi.login(correo, clave);
      setToken(result.token);
      setUsuario(enrichUser(result.usuario));
      return true;
    } catch {
      return false;
    }
  }

  function logout() {
    clearToken();
    setUsuario(null);
  }

  return { usuario, login, logout };
}
