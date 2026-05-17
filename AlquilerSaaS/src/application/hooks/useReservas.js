import { useState, useEffect } from 'react';
import { reservasApi } from '../../infrastructure/api/reservas.api';

export function useReservas(authenticated) {
  const [reservas, setReservas] = useState([]);

  async function refetch() {
    try {
      setReservas(await reservasApi.getAll());
    } catch (e) {
      console.error('[useReservas]', e.message);
    }
  }

  useEffect(() => {
    if (authenticated) refetch();
    else setReservas([]);
  }, [authenticated]);

  return { reservas, refetch };
}
