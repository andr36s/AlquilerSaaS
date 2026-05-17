export const ClienteFactory = {
  crear: (datos) => ({
    ...datos,
    tipo: 'Cliente',
    permisos: ['ver_vehiculos', 'crear_reserva', 'ver_historial'],
    activo: datos.activo ?? true,
  }),
};
