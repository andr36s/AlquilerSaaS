const { IEstadoVehiculo, registrar } = require('./IEstadoVehiculo');

class Disponible extends IEstadoVehiculo {
  puedeReservar() { return true; }
  siguiente()     { return 'Reservado'; }
  get label()     { return 'Disponible'; }
  get color()     { return '#22c55e'; }
}

const instancia = new Disponible();
registrar('Disponible', instancia);
module.exports = instancia;
