import AuthService from '../../domain/patterns/singleton/AuthService';

export const authService = {
  login(correo, clave, usuarios) {
    return AuthService.obtenerInstancia().autenticar(correo, clave, usuarios);
  },
  logout() {
    AuthService.obtenerInstancia().cerrarSesion();
  },
  getSesion() {
    return AuthService.obtenerInstancia().obtenerSesion();
  },
  validarPermiso(permiso) {
    return AuthService.obtenerInstancia().validarPermiso(permiso);
  },
};
