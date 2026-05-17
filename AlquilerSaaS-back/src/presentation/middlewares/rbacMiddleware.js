const PERMISOS = {
  Cliente:       ['ver_vehiculos', 'crear_reserva', 'ver_mis_reservas'],
  Empleado:      ['ver_vehiculos', 'gestionar_vehiculos', 'ver_reservas', 'gestionar_reservas', 'gestionar_clientes'],
  Administrador: ['*'],
};

function rbac(permiso) {
  return (req, res, next) => {
    const tipo     = req.usuario?.tipo;
    const lista    = PERMISOS[tipo] || [];
    const permitido = lista.includes('*') || lista.includes(permiso);
    if (!permitido) return res.status(403).json({ message: 'Acceso denegado: permiso insuficiente' });
    next();
  };
}

module.exports = { rbac, PERMISOS };
