const DEFAULTS = {
  Cliente:       { tipo: 'Cliente',       activo: true },
  Empleado:      { tipo: 'Empleado',      activo: true },
  Administrador: { tipo: 'Administrador', activo: true },
};

class UsuarioFactory {
  crear(tipo, datos) {
    if (!DEFAULTS[tipo]) throw Object.assign(new Error(`Tipo de usuario desconocido: ${tipo}`), { status: 400 });
    return { ...datos, ...DEFAULTS[tipo] };
  }
}

module.exports = new UsuarioFactory();
