const { IEstadoVehiculo, registrar } = require('./IEstadoVehiculo');

class Inactivo extends IEstadoVehiculo {
  puedeReservar() { return false; }
  siguiente()     { return null; }
  get label()     { return 'Inactivo'; }
  get color()     { return '#ef4444'; }
}

const instancia = new Inactivo();
registrar('Inactivo', instancia);
module.exports = instancia;
