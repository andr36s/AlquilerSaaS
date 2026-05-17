const { IEstadoVehiculo, registrar } = require('./IEstadoVehiculo');

class EnMantenimiento extends IEstadoVehiculo {
  puedeReservar() { return false; }
  siguiente()     { return 'Disponible'; }
  get label()     { return 'En Mantenimiento'; }
  get color()     { return '#3b82f6'; }
}

const instancia = new EnMantenimiento();
registrar('EnMantenimiento', instancia);
module.exports = instancia;
