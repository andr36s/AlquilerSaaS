import { useState, useEffect } from 'react';
import { usuariosApi } from '../../infrastructure/api/usuarios.api';

export function useUsuarios(authenticated) {
  const [usuarios, setUsuarios] = useState([]);

  async function refetch() {
    try {
      const [clientes, empleados] = await Promise.all([
        usuariosApi.getClientes(),
        usuariosApi.getEmpleados(),
      ]);
      setUsuarios([...clientes, ...empleados]);
    } catch (e) {
      console.error('[useUsuarios]', e.message);
    }
  }

  useEffect(() => {
    if (authenticated) refetch();
    else setUsuarios([]);
  }, [authenticated]);

  return { usuarios, refetch };
}
