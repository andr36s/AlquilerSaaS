class IEstadoVehiculo {
  puedeReservar() { return false; }
  siguiente()     { return null; }
  get label()     { return ''; }
  get color()     { return ''; }
}

const _registro = {};

function registrar(nombre, instancia) {
  _registro[nombre] = instancia;
}

function getEstado(nombre) {
  return _registro[nombre] || null;
}

module.exports = { IEstadoVehiculo, registrar, getEstado };
