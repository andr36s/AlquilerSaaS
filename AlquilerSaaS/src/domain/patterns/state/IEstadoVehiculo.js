export const IEstadoVehiculo = {
  label: '',
  color: '',
  puedeReservar: false,
  siguiente: null,
};

export const EstadosVehiculo = {
  Disponible:     { label: 'Disponible',       color: '#22c55e', puedeReservar: true,  siguiente: 'Reservado' },
  Reservado:      { label: 'Reservado',         color: '#f59e0b', puedeReservar: false, siguiente: 'EnMantenimiento' },
  EnMantenimiento:{ label: 'En Mantenimiento',  color: '#3b82f6', puedeReservar: false, siguiente: 'Disponible' },
  Inactivo:       { label: 'Inactivo',          color: '#ef4444', puedeReservar: false, siguiente: null },
};
