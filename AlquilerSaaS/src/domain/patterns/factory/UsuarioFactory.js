import { ClienteFactory } from './ClienteFactory';
import { EmpleadoFactory } from './EmpleadoFactory';

const AdministradorFactory = {
  crear: (datos) => ({
    ...datos,
    tipo: 'Administrador',
    permisos: ['*'],
    activo: datos.activo ?? true,
  }),
};

export const UsuarioFactory = {
  crear(tipo, datos) {
    const factories = {
      Cliente:       ClienteFactory,
      Empleado:      EmpleadoFactory,
      Administrador: AdministradorFactory,
    };
    const factory = factories[tipo];
    if (!factory) throw new Error(`Tipo de usuario desconocido: ${tipo}`);
    return factory.crear(datos);
  },
};
