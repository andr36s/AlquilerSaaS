import { useState } from 'react';
import { useAuth }     from './application/hooks/useAuth';
import { useVehiculos } from './application/hooks/useVehiculos';
import { useReservas }  from './application/hooks/useReservas';
import { useUsuarios }  from './application/hooks/useUsuarios';
import { auditoriaRepository } from './infrastructure/repositories/auditoriaRepository';
import { reservationService }  from './application/services/reservationService';
import { usuarioService }      from './application/services/usuarioService';
import { AppRouter } from './presentation/router/AppRouter';
import { Login }     from './presentation/pages/Login';

export default function App() {
  const { usuario, login, logout } = useAuth();
  const { vehiculos, setVehiculos, actualizarVehiculo, avanzarEstado } = useVehiculos();
  const { reservas, setReservas } = useReservas();
  const { usuarios, setUsuarios } = useUsuarios();
  const [auditoria, setAuditoria] = useState(auditoriaRepository.getInitialData());

  // ── Coordinación cross-domain: reservas ──────────────────────
  function crearReserva(vehiculo, usr, fechaInicio, fechaFin) {
    const result = reservationService.crearReserva({
      reservas, vehiculos, auditoria, vehiculo, usuario: usr, fechaInicio, fechaFin,
    });
    setReservas(result.reservas);
    setVehiculos(result.vehiculos);
    setAuditoria(result.auditoria);
  }

  function cancelarReserva(reservaId, usr) {
    const result = reservationService.cancelarReserva({
      reservas, vehiculos, auditoria, reservaId, usuario: usr,
    });
    setReservas(result.reservas);
    setVehiculos(result.vehiculos);
    setAuditoria(result.auditoria);
  }

  function completarReserva(reservaId, usr) {
    const result = reservationService.completarReserva({
      reservas, vehiculos, auditoria, reservaId, usuario: usr,
    });
    setReservas(result.reservas);
    setVehiculos(result.vehiculos);
    setAuditoria(result.auditoria);
  }

  // ── Coordinación cross-domain: usuarios ──────────────────────
  function crearCliente(datos, sesion) {
    const result = usuarioService.crearCliente({ usuarios, auditoria, datos, sesion });
    setUsuarios(result.usuarios);
    setAuditoria(result.auditoria);
  }

  function crearEmpleado(datos, sesion) {
    const result = usuarioService.crearEmpleado({ usuarios, auditoria, datos, sesion });
    setUsuarios(result.usuarios);
    setAuditoria(result.auditoria);
  }

  function toggleActivo(usr, sesion) {
    const result = usuarioService.toggleActivo({ usuarios, auditoria, usuario: usr, sesion });
    setUsuarios(result.usuarios);
    setAuditoria(result.auditoria);
  }

  if (!usuario) {
    return <Login onLogin={login} usuarios={usuarios} />;
  }

  return (
    <AppRouter
      usuario={usuario}
      onLogout={logout}
      vehiculos={vehiculos}
      actualizarVehiculo={actualizarVehiculo}
      avanzarEstado={avanzarEstado}
      reservas={reservas}
      crearReserva={crearReserva}
      cancelarReserva={cancelarReserva}
      completarReserva={completarReserva}
      usuarios={usuarios}
      crearCliente={crearCliente}
      crearEmpleado={crearEmpleado}
      toggleActivo={toggleActivo}
      auditoria={auditoria}
    />
  );
}
