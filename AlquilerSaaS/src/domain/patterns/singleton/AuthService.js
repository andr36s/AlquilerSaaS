const AuthService = (() => {
  let _instancia = null;

  function _crear() {
    let _sesion = null;
    return {
      autenticar(correo, clave, usuarios) {
        const u = usuarios.find(
          (x) => x.correo === correo && x.clave === clave && x.activo
        );
        if (u) { _sesion = u; return u; }
        return null;
      },
      cerrarSesion() { _sesion = null; },
      obtenerSesion() { return _sesion; },
      validarPermiso(permiso) {
        if (!_sesion) return false;
        return _sesion.permisos.includes(permiso) || _sesion.permisos.includes('*');
      },
    };
  }

  return {
    obtenerInstancia() {
      if (!_instancia) _instancia = _crear();
      return _instancia;
    },
  };
})();

export default AuthService;
