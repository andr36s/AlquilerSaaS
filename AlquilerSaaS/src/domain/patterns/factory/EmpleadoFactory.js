export const EmpleadoFactory = {
  crear: (datos) => ({
    ...datos,
    tipo: 'Empleado',
    permisos: ['gestionar_clientes', 'gestionar_vehiculos', 'ver_reservas', 'gestionar_reservas'],
    activo: datos.activo ?? true,
  }),
};
