import { useState, useEffect, useMemo } from 'react';
import { vehiculosApi } from '../../infrastructure/api/vehiculos.api';

const TRANSICION = {
  Disponible:      'Reservado',
  Reservado:       'EnMantenimiento',
  EnMantenimiento: 'Disponible',
};

export function useVehiculos(authenticated) {
  const [vehiculos, setVehiculos] = useState([]);

  async function refetch() {
    try {
      setVehiculos(await vehiculosApi.getAll());
    } catch (e) {
      console.error('[useVehiculos]', e.message);
    }
  }

  useEffect(() => {
    if (authenticated) refetch();
    else setVehiculos([]);
  }, [authenticated]);

  const categorias = useMemo(() => {
    const seen = new Set();
    return vehiculos.reduce((acc, v) => {
      if (!seen.has(v.categoriaId)) {
        seen.add(v.categoriaId);
        acc.push({ id: v.categoriaId, nombre: v.categoria });
      }
      return acc;
    }, []);
  }, [vehiculos]);

  async function actualizarVehiculo(datos) {
    await vehiculosApi.update(datos.id, {
      marca:       datos.marca,
      modelo:      datos.modelo,
      anio:        datos.anio,
      categoriaId: datos.categoriaId,
    });
    await refetch();
  }

  async function avanzarEstado(vehiculo) {
    const siguiente = TRANSICION[vehiculo.estado];
    if (!siguiente) return;
    await vehiculosApi.cambiarEstado(vehiculo.id, siguiente);
    await refetch();
  }

  return { vehiculos, categorias, actualizarVehiculo, avanzarEstado, refetch };
}
