export class Usuario {
  constructor({ id, nombre, correo, clave, documento, tipo, permisos, activo }) {
    this.id = id;
    this.nombre = nombre;
    this.correo = correo;
    this.clave = clave;
    this.documento = documento;
    this.tipo = tipo;
    this.permisos = permisos;
    this.activo = activo ?? true;
  }

  tienePermiso(permiso) {
    return this.permisos.includes(permiso) || this.permisos.includes('*');
  }
}
