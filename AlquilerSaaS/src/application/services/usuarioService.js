import { usuarioRepository } from '../../infrastructure/repositories/usuarioRepository';
import { auditoriaRepository } from '../../infrastructure/repositories/auditoriaRepository';
import { ClienteFactory } from '../../domain/patterns/factory/ClienteFactory';
import { EmpleadoFactory } from '../../domain/patterns/factory/EmpleadoFactory';

export const usuarioService = {
  getClientes: (usuarios) => usuarioRepository.findByTipo(usuarios, 'Cliente'),

  getEmpleados: (usuarios) => usuarioRepository.findByTipo(usuarios, 'Empleado'),

  crearCliente({ usuarios, auditoria, datos, sesion }) {
    const nuevo = ClienteFactory.crear({ id: Date.now(), ...datos });
    return {
      usuarios: usuarioRepository.add(usuarios, nuevo),
      auditoria: auditoriaRepository.add(auditoria, {
        id: Date.now() + 1,
        entidad: 'Cliente',
        accion: 'CREAR',
        usuario: sesion.nombre,
        fecha: new Date().toLocaleString('es-CO'),
        detalle: `Cliente creado: ${nuevo.nombre}`,
      }),
    };
  },

  crearEmpleado({ usuarios, auditoria, datos, sesion }) {
    const nuevo = EmpleadoFactory.crear({ id: Date.now(), ...datos });
    return {
      usuarios: usuarioRepository.add(usuarios, nuevo),
      auditoria: auditoriaRepository.add(auditoria, {
        id: Date.now() + 1,
        entidad: 'Empleado',
        accion: 'CREAR',
        usuario: sesion.nombre,
        fecha: new Date().toLocaleString('es-CO'),
        detalle: `Empleado creado: ${nuevo.nombre}`,
      }),
    };
  },

  toggleActivo({ usuarios, auditoria, usuario, sesion }) {
    return {
      usuarios: usuarioRepository.toggleActivo(usuarios, usuario.id),
      auditoria: auditoriaRepository.add(auditoria, {
        id: Date.now(),
        entidad: usuario.tipo,
        accion: usuario.activo ? 'DESACTIVAR' : 'ACTIVAR',
        usuario: sesion.nombre,
        fecha: new Date().toLocaleString('es-CO'),
        detalle: `${usuario.tipo} ${usuario.activo ? 'desactivado' : 'activado'}: ${usuario.nombre}`,
      }),
    };
  },
};
