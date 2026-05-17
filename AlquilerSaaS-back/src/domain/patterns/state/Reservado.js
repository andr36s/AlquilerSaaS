const { IEstadoVehiculo, registrar } = require('./IEstadoVehiculo');

class Reservado extends IEstadoVehiculo {
  puedeReservar() { return false; }
  siguiente()     { return 'EnMantenimiento'; }
  get label()     { return 'Reservado'; }
  get color()     { return '#f59e0b'; }
}

const instancia = new Reservado();
registrar('Reservado', instancia);
module.exports = instancia;
