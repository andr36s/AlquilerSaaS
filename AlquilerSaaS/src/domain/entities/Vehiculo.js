export class Vehiculo {
  constructor({ id, placa, marca, modelo, anio, categoria, estado, activo, imagen }) {
    this.id = id;
    this.placa = placa;
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
    this.categoria = categoria;
    this.estado = estado ?? 'Disponible';
    this.activo = activo ?? true;
    this.imagen = imagen ?? '🚗';
  }
}
