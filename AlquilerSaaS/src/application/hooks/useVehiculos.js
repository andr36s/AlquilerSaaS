import { useState } from 'react';
import { vehiculoRepository } from '../../infrastructure/repositories/vehiculoRepository';
import { vehiculoService } from '../services/vehiculoService';

export function useVehiculos() {
  const [vehiculos, setVehiculos] = useState(vehiculoRepository.getInitialData());

  function actualizarVehiculo(vehiculo) {
    setVehiculos((prev) => vehiculoService.actualizarVehiculo(prev, vehiculo));
  }

  function avanzarEstado(vehiculoId) {
    setVehiculos((prev) => vehiculoService.avanzarEstado(prev, vehiculoId));
  }

  return { vehiculos, setVehiculos, actualizarVehiculo, avanzarEstado };
}
