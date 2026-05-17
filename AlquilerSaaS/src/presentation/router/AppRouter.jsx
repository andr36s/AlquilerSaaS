import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Dashboard }       from '../pages/Dashboard';
import { Vehiculos }       from '../pages/Vehiculos';
import { MisReservas }     from '../pages/MisReservas';
import { GestionReservas } from '../pages/GestionReservas';
import { Clientes }        from '../pages/Clientes';
import { Empleados }       from '../pages/Empleados';
import { Auditoria }       from '../pages/Auditoria';

export function AppRouter({
  usuario,
  onLogout,
  vehiculos,
  categorias,
  actualizarVehiculo,
  avanzarEstado,
  reservas,
  crearReserva,
  cancelarReserva,
  completarReserva,
  usuarios,
  crearCliente,
  crearEmpleado,
  toggleActivo,
  auditoria,
}) {
  const [seccion, setSeccion] = useState('dashboard');

  const PAGES = {
    dashboard: (
      <Dashboard
        usuario={usuario}
        vehiculos={vehiculos}
        reservas={reservas}
        usuarios={usuarios}
      />
    ),
    vehiculos: (
      <Vehiculos
        vehiculos={vehiculos}
        categorias={categorias}
        usuario={usuario}
        reservas={reservas}
        crearReserva={crearReserva}
        actualizarVehiculo={actualizarVehiculo}
        avanzarEstado={avanzarEstado}
      />
    ),
    reservas: (
      <MisReservas
        usuario={usuario}
        reservas={reservas}
        cancelarReserva={cancelarReserva}
      />
    ),
    gestionar_reservas: (
      <GestionReservas
        reservas={reservas}
        cancelarReserva={cancelarReserva}
        completarReserva={completarReserva}
        usuario={usuario}
      />
    ),
    clientes: (
      <Clientes
        usuarios={usuarios}
        crearCliente={crearCliente}
        toggleActivo={toggleActivo}
      />
    ),
    empleados: (
      <Empleados
        usuarios={usuarios}
        crearEmpleado={crearEmpleado}
        toggleActivo={toggleActivo}
      />
    ),
    auditoria: <Auditoria auditoria={auditoria} />,
  };

  return (
    <MainLayout
      usuario={usuario}
      seccion={seccion}
      setSeccion={setSeccion}
      onLogout={onLogout}
    >
      {PAGES[seccion] || (
        <div style={{ color: '#64748b' }}>Sección no disponible</div>
      )}
    </MainLayout>
  );
}
