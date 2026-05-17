import { useState } from 'react';
import { reservaRepository } from '../../infrastructure/repositories/reservaRepository';

export function useReservas() {
  const [reservas, setReservas] = useState(reservaRepository.getInitialData());

  function getByCliente(clienteId) {
    return reservaRepository.findByCliente(reservas, clienteId);
  }

  return { reservas, setReservas, getByCliente };
}
