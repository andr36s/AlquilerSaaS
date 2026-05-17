import { useState } from 'react';
import { authService } from '../services/authService';

export function useAuth() {
  const [usuario, setUsuario] = useState(null);

  function login(correo, clave, usuarios) {
    const u = authService.login(correo, clave, usuarios);
    if (u) { setUsuario(u); return true; }
    return false;
  }

  function logout() {
    authService.logout();
    setUsuario(null);
  }

  function validarPermiso(permiso) {
    return authService.validarPermiso(permiso);
  }

  return { usuario, login, logout, validarPermiso };
}
