export class RegistroAuditoria {
  constructor({ id, entidad, accion, usuario, fecha, detalle }) {
    this.id = id;
    this.entidad = entidad;
    this.accion = accion;
    this.usuario = usuario;
    this.fecha = fecha ?? new Date().toLocaleString('es-CO');
    this.detalle = detalle;
  }
}
