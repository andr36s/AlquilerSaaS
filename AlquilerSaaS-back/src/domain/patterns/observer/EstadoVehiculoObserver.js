const emitter = require('./ReservaEventEmitter');

emitter.on('reserva:creada', async ({ reserva }) => {
  try {
    const { Vehiculo } = require('../../entities');
    await Vehiculo.findByIdAndUpdate(reserva.vehiculoId, { estado: 'Reservado' });
  } catch (e) {
    console.error('[EstadoVehiculoObserver] reserva:creada', e.message);
  }
});

emitter.on('reserva:cancelada', async ({ reserva }) => {
  try {
    const { Vehiculo } = require('../../entities');
    await Vehiculo.findByIdAndUpdate(reserva.vehiculoId, { estado: 'Disponible' });
  } catch (e) {
    console.error('[EstadoVehiculoObserver] reserva:cancelada', e.message);
  }
});

emitter.on('reserva:completada', async ({ reserva }) => {
  try {
    const { Vehiculo } = require('../../entities');
    await Vehiculo.findByIdAndUpdate(reserva.vehiculoId, { estado: 'Disponible' });
  } catch (e) {
    console.error('[EstadoVehiculoObserver] reserva:completada', e.message);
  }
});
