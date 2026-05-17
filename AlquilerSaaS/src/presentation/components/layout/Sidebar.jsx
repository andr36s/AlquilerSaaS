import { Badge } from '../ui/Badge';

const MENUS = [
  { id: 'dashboard',         icon: '📊', label: 'Dashboard',       permiso: null,                 roles: null },
  { id: 'vehiculos',         icon: '🚗', label: 'Vehículos',       permiso: 'ver_vehiculos',      roles: null },
  { id: 'reservas',          icon: '📅', label: 'Mis Reservas',    permiso: 'crear_reserva',      roles: ['Cliente'] },
  { id: 'gestionar_reservas',icon: '📋', label: 'Reservas',        permiso: 'gestionar_reservas', roles: ['Empleado', 'Administrador'] },
  { id: 'clientes',          icon: '👥', label: 'Clientes',        permiso: 'gestionar_clientes', roles: null },
  { id: 'empleados',         icon: '👔', label: 'Empleados',       permiso: '*',                  roles: ['Administrador'] },
  { id: 'auditoria',         icon: '🔍', label: 'Auditoría',       permiso: '*',                  roles: ['Administrador'] },
];

const ROLE_COLORS = {
  Administrador: '#6366f1',
  Empleado:      '#f59e0b',
  Cliente:       '#22c55e',
};

function puedeVer(menu, usuario) {
  if (!menu.permiso) return true;
  const tienePermiso =
    usuario.permisos.includes(menu.permiso) || usuario.permisos.includes('*');
  if (!tienePermiso) return false;
  if (menu.roles && !menu.roles.includes(usuario.tipo)) return false;
  return true;
}

export function Sidebar({ usuario, seccion, setSeccion, onLogout }) {
  const menus = MENUS.filter((m) => puedeVer(m, usuario));

  return (
    <div style={{
      width: 240, background: '#0a0f1e',
      borderRight: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', flexDirection: 'column',
      height: '100vh', position: 'fixed',
    }}>
      <div style={{ padding: '24px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>🚗</span>
          <div>
            <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 16 }}>SAV SaaS</div>
            <div style={{ color: '#64748b', fontSize: 11 }}>v1.0 – MVP</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 12px', marginBottom: 8 }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
            {usuario.nombre}
          </div>
          <Badge color={ROLE_COLORS[usuario.tipo] || '#6b7280'}>{usuario.tipo}</Badge>
        </div>
      </div>

      <nav style={{
        flex: 1, padding: '8px 12px',
        display: 'flex', flexDirection: 'column', gap: 2,
      }}>
        {menus.map((m) => (
          <button
            key={m.id}
            onClick={() => setSeccion(m.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', borderRadius: 10, border: 'none',
              cursor: 'pointer', textAlign: 'left',
              background: seccion === m.id ? 'rgba(99,102,241,0.2)' : 'transparent',
              color: seccion === m.id ? '#a5b4fc' : '#64748b',
              fontWeight: seccion === m.id ? 700 : 500,
              fontSize: 14, fontFamily: 'inherit', transition: 'all 0.15s',
            }}
          >
            <span style={{ fontSize: 16 }}>{m.icon}</span>
            {m.label}
          </button>
        ))}
      </nav>

      <div style={{ padding: '12px 12px 20px' }}>
        <button
          onClick={onLogout}
          style={{
            width: '100%', background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 10, padding: '10px 14px',
            color: '#f87171', fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          ↩ Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
