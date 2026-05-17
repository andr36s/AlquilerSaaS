const emitter = require('./ReservaEventEmitter');

emitter.on('reserva:creada', async ({ reserva, usuario }) => {
  try {
    const { RegistroAuditoria } = require('../../entities');
    await RegistroAuditoria.create({
      entidad:   'Reserva',
      accion:    'CREAR',
      usuarioId: usuario.id,
      detalle:   `Reserva #${reserva.id} creada — vehículo ${reserva.vehiculoId} — $${Number(reserva.valorTotal).toLocaleString('es-CO')} COP`,
    });
  } catch (e) {
    console.error('[AuditoriaObserver] reserva:creada', e.message);
  }
});

emitter.on('reserva:cancelada', async ({ reserva, usuario }) => {
  try {
    const { RegistroAuditoria } = require('../../entities');
    await RegistroAuditoria.create({
      entidad:   'Reserva',
      accion:    'CANCELAR',
      usuarioId: usuario.id,
      detalle:   `Reserva #${reserva.id} cancelada por ${usuario.nombre}`,
    });
  } catch (e) {
    console.error('[AuditoriaObserver] reserva:cancelada', e.message);
  }
});

emitter.on('reserva:completada', async ({ reserva, usuario }) => {
  try {
    const { RegistroAuditoria } = require('../../entities');
    await RegistroAuditoria.create({
      entidad:   'Reserva',
      accion:    'COMPLETAR',
      usuarioId: usuario.id,
      detalle:   `Reserva #${reserva.id} completada`,
    });
  } catch (e) {
    console.error('[AuditoriaObserver] reserva:completada', e.message);
  }
});
