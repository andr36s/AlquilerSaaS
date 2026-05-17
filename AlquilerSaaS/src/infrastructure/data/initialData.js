import { ClienteFactory } from '../../domain/patterns/factory/ClienteFactory';
import { EmpleadoFactory } from '../../domain/patterns/factory/EmpleadoFactory';

const administradorFactory = (datos) => ({
  ...datos,
  tipo: 'Administrador',
  permisos: ['*'],
  activo: true,
});

export const usuariosIniciales = [
  administradorFactory({
    id: 1, nombre: 'Admin Sistema', correo: 'admin@sav.co',
    clave: 'admin123', documento: '1000000001',
  }),
  EmpleadoFactory.crear({
    id: 2, nombre: 'Carlos Vélez', correo: 'empleado@sav.co',
    clave: 'emp123', documento: '1000000002', cargo: 'Asesor de Ventas',
  }),
  ClienteFactory.crear({
    id: 3, nombre: 'María Torres', correo: 'cliente@sav.co',
    clave: 'cli123', documento: '1000000003',
    telefono: '3001234567', direccion: 'Calle 50 #30-20',
  }),
  ClienteFactory.crear({
    id: 4, nombre: 'Juan Ramírez', correo: 'juan@sav.co',
    clave: 'juan123', documento: '1000000004',
    telefono: '3109876543', direccion: 'Carrera 80 #45-10',
  }),
];

export const vehiculosIniciales = [
  { id: 1, placa: 'ABC123', marca: 'Toyota',    modelo: 'Corolla',   anio: 2022, categoria: 'Económico', estado: 'Disponible',      activo: true, imagen: '🚗' },
  { id: 2, placa: 'XYZ789', marca: 'Ford',      modelo: 'Explorer',  anio: 2023, categoria: 'SUV',       estado: 'Disponible',      activo: true, imagen: '🚙' },
  { id: 3, placa: 'DEF456', marca: 'BMW',       modelo: 'Serie 5',   anio: 2023, categoria: 'Premium',   estado: 'Disponible',      activo: true, imagen: '🏎️' },
  { id: 4, placa: 'GHI321', marca: 'Chevrolet', modelo: 'Spark',     anio: 2021, categoria: 'Económico', estado: 'EnMantenimiento', activo: true, imagen: '🚗' },
  { id: 5, placa: 'JKL654', marca: 'Kia',       modelo: 'Sportage',  anio: 2022, categoria: 'SUV',       estado: 'Reservado',       activo: true, imagen: '🚙' },
  { id: 6, placa: 'MNO987', marca: 'Mercedes',  modelo: 'Clase C',   anio: 2024, categoria: 'Premium',   estado: 'Disponible',      activo: true, imagen: '🏎️' },
];

export const reservasIniciales = [
  { id: 1, clienteId: 3, vehiculoId: 5, fechaInicio: '2026-05-10', fechaFin: '2026-05-15', estado: 'Activa',     valorTotal: 425000, fechaCreacion: '2026-05-08' },
  { id: 2, clienteId: 4, vehiculoId: 1, fechaInicio: '2026-04-01', fechaFin: '2026-04-05', estado: 'Completada', valorTotal: 180000, fechaCreacion: '2026-03-28' },
];

export const auditoriaInicial = [
  { id: 1, entidad: 'Reserva', accion: 'CREAR', usuario: 'María Torres', fecha: '2026-05-08 10:30', detalle: 'Reserva #1 creada' },
  { id: 2, entidad: 'Reserva', accion: 'CREAR', usuario: 'Juan Ramírez', fecha: '2026-03-28 14:15', detalle: 'Reserva #2 creada' },
];
