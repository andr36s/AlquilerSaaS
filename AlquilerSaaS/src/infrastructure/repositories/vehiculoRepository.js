import { vehiculosIniciales } from '../data/initialData';

export const vehiculoRepository = {
  getInitialData: () => [...vehiculosIniciales],
  findAll:        (vehiculos) => vehiculos.filter((v) => v.activo),
  findById:       (vehiculos, id) => vehiculos.find((v) => v.id === id),
  findByEstado:   (vehiculos, estado) => vehiculos.filter((v) => v.estado === estado && v.activo),
  add:            (vehiculos, vehiculo) => [...vehiculos, vehiculo],
  update:         (vehiculos, vehiculo) => vehiculos.map((v) => v.id === vehiculo.id ? { ...v, ...vehiculo } : v),
  updateEstado:   (vehiculos, id, estado) => vehiculos.map((v) => v.id === id ? { ...v, estado } : v),
};
