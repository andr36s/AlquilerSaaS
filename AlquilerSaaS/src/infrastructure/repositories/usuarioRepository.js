import { usuariosIniciales } from '../data/initialData';

export const usuarioRepository = {
  getInitialData: () => [...usuariosIniciales],
  findAll:        (usuarios) => [...usuarios],
  findById:       (usuarios, id) => usuarios.find((u) => u.id === id),
  findByCorreo:   (usuarios, correo) => usuarios.find((u) => u.correo === correo),
  findByTipo:     (usuarios, tipo) => usuarios.filter((u) => u.tipo === tipo),
  findActivos:    (usuarios) => usuarios.filter((u) => u.activo),
  add:            (usuarios, usuario) => [...usuarios, usuario],
  update:         (usuarios, usuario) => usuarios.map((u) => u.id === usuario.id ? { ...u, ...usuario } : u),
  toggleActivo:   (usuarios, id) => usuarios.map((u) => u.id === id ? { ...u, activo: !u.activo } : u),
};
