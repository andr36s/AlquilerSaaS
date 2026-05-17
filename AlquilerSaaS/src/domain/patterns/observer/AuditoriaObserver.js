export const AuditoriaObserver = {
  notificar(auditoria, reserva, usuario, accion, detalle) {
    const registro = {
      id: Date.now(),
      entidad: 'Reserva',
      accion,
      usuario: usuario.nombre,
      fecha: new Date().toLocaleString('es-CO'),
      detalle: detalle || `Reserva #${reserva.id} - ${accion}`,
    };
    return [...auditoria, registro];
  },
};
