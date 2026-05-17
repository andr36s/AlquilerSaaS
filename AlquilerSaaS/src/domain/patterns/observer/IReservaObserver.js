export const IReservaObserver = {
  notificar: (_state, _reserva, _usuario, _accion, _detalle) => {
    throw new Error('notificar() debe ser implementado por el observador concreto');
  },
};
