import { useState, useEffect } from 'react';
import { auditoriaApi } from '../../infrastructure/api/auditoria.api';

export function useAuditoria(authenticated) {
  const [auditoria, setAuditoria] = useState([]);

  async function refetch() {
    try {
      setAuditoria(await auditoriaApi.getAll());
    } catch (e) {
      console.error('[useAuditoria]', e.message);
    }
  }

  useEffect(() => {
    if (authenticated) refetch();
    else setAuditoria([]);
  }, [authenticated]);

  return { auditoria, refetch };
}
