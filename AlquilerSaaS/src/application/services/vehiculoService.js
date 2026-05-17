import { vehiculoRepository } from '../../infrastructure/repositories/vehiculoRepository';
import { EstadosVehiculo } from '../../domain/patterns/state/IEstadoVehiculo';

export const vehiculoService = {
  getVehiculos: (vehiculos) => vehiculoRepository.findAll(vehiculos),

  getVehiculosDisponibles: (vehiculos) =>
    vehiculoRepository.findByEstado(vehiculos, 'Disponible'),

  getEstadoInfo: (estado) => EstadosVehiculo[estado],

  actualizarVehiculo: (vehiculos, vehiculo) =>
    vehiculoRepository.update(vehiculos, vehiculo),

  avanzarEstado(vehiculos, vehiculoId) {
    const v = vehiculoRepository.findById(vehiculos, vehiculoId);
    const siguiente = EstadosVehiculo[v?.estado]?.siguiente;
    if (!siguiente) return vehiculos;
    return vehiculoRepository.updateEstado(vehiculos, vehiculoId, siguiente);
  },
};
