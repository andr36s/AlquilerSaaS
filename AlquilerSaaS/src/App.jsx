import { useAuth }      from './application/hooks/useAuth';
import { useVehiculos } from './application/hooks/useVehiculos';
import { useReservas }  from './application/hooks/useReservas';
import { useUsuarios }  from './application/hooks/useUsuarios';
import { useAuditoria } from './application/hooks/useAuditoria';
import { reservasApi }  from './infrastructure/api/reservas.api';
import { usuariosApi }  from './infrastructure/api/usuarios.api';
import { AppRouter }    from './presentation/router/AppRouter';
import { Login }        from './presentation/pages/Login';

export default function App() {
  const { usuario, login, logout } = useAuth();
  const authenticated = !!usuario;

  const { vehiculos, categorias, actualizarVehiculo, avanzarEstado, refetch: refetchVehiculos } = useVehiculos(authenticated);
  const { reservas,  refetch: refetchReservas  } = useReservas(authenticated);
  const { usuarios,  refetch: refetchUsuarios  } = useUsuarios(authenticated);
  const { auditoria, refetch: refetchAuditoria } = useAuditoria(authenticated);

  // ── Coordinación cross-domain: reservas ──────────────────────────────────
  async function crearReserva(vehiculo, _usr, fechaInicio, fechaFin) {
    await reservasApi.crear({ vehiculoId: vehiculo.id, fechaInicio, fechaFin });
    await Promise.all([refetchReservas(), refetchVehiculos(), refetchAuditoria()]);
  }

  async function cancelarReserva(reservaId, _usr) {
    await reservasApi.cambiarEstado(reservaId, 'Cancelada');
    await Promise.all([refetchReservas(), refetchVehiculos(), refetchAuditoria()]);
  }

  async function completarReserva(reservaId, _usr) {
    await reservasApi.cambiarEstado(reservaId, 'Completada');
    await Promise.all([refetchReservas(), refetchVehiculos(), refetchAuditoria()]);
  }

  // ── Coordinación cross-domain: usuarios ──────────────────────────────────
  async function crearCliente(datos) {
    await usuariosApi.createCliente(datos);
    await Promise.all([refetchUsuarios(), refetchAuditoria()]);
  }

  async function crearEmpleado(datos) {
    await usuariosApi.createEmpleado(datos);
    await Promise.all([refetchUsuarios(), refetchAuditoria()]);
  }

  async function toggleActivo(usr) {
    const patch = { activo: !usr.activo };
    if (usr.tipo === 'Cliente') {
      await usuariosApi.updateCliente(usr.id, patch);
    } else {
      await usuariosApi.updateEmpleado(usr.id, patch);
    }
    await Promise.all([refetchUsuarios(), refetchAuditoria()]);
  }

  if (!usuario) {
    return <Login onLogin={login} />;
  }

  return (
    <AppRouter
      usuario={usuario}
      onLogout={logout}
      vehiculos={vehiculos}
      categorias={categorias}
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
