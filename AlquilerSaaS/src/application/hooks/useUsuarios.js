import { useState } from 'react';
import { usuarioRepository } from '../../infrastructure/repositories/usuarioRepository';
import { usuarioService } from '../services/usuarioService';

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState(usuarioRepository.getInitialData());

  function getClientes() {
    return usuarioService.getClientes(usuarios);
  }

  function getEmpleados() {
    return usuarioService.getEmpleados(usuarios);
  }

  return { usuarios, setUsuarios, getClientes, getEmpleados };
}
