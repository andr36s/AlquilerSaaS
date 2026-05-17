import { Card } from '../components/ui/Card';

const fmt = (n) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0,
  }).format(n);

const ESTADOS = {
  Disponible:      { label: 'Disponible',      color: '#22c55e' },
  Reservado:       { label: 'Reservado',        color: '#f59e0b' },
  EnMantenimiento: { label: 'En Mantenimiento', color: '#3b82f6' },
  Inactivo:        { label: 'Inactivo',         color: '#ef4444' },
};

export function Dashboard({ usuario, vehiculos, reservas, usuarios }) {
  const isCliente = usuario.tipo === 'Cliente';
  const misReservas = reservas.filter((r) => r.clienteId === usuario.id);

  const stats = [
    { label: 'Vehículos Disponibles', value: vehiculos.filter((v) => v.estado === 'Disponible').length, icon: '🚗', color: '#22c55e' },
    { label: 'Reservas Activas',      value: reservas.filter((r) => r.estado === 'Activa').length,      icon: '📅', color: '#6366f1' },
    { label: 'Total Clientes',        value: usuarios.filter((u) => u.tipo === 'Cliente' && u.activo).length, icon: '👥', color: '#f59e0b' },
    { label: 'Ingresos (Total)',      value: fmt(reservas.reduce((a, r) => a + r.valorTotal, 0)), icon: '💰', color: '#a78bfa', isText: true },
  ];

  return (
    <div>
      <h2 style={{ color: '#f1f5f9', fontSize: 24, fontWeight: 800, margin: '0 0 8px' }}>
        Bienvenido, {usuario.nombre.split(' ')[0]} 👋
      </h2>
      <p style={{ color: '#64748b', margin: '0 0 28px', fontSize: 14 }}>
        {new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      {!isCliente ? (
        <>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 16, marginBottom: 28,
          }}>
            {stats.map((s) => (
              <Card key={s.label}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ color: '#64748b', fontSize: 12, fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {s.label}
                    </p>
                    <p style={{ color: s.color, fontSize: s.isText ? 20 : 32, fontWeight: 800, margin: 0 }}>
                      {s.value}
                    </p>
                  </div>
                  <span style={{ fontSize: 28 }}>{s.icon}</span>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <h3 style={{ color: '#f1f5f9', margin: '0 0 16px', fontSize: 16 }}>Estado de la Flota</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {Object.entries(ESTADOS).map(([k, v]) => (
                <div key={k} style={{
                  background: v.color + '11', border: `1px solid ${v.color}44`,
                  borderRadius: 10, padding: '10px 16px', textAlign: 'center',
                }}>
                  <div style={{ color: v.color, fontSize: 22, fontWeight: 800 }}>
                    {vehiculos.filter((veh) => veh.estado === k).length}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>{v.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </>
      ) : (
        <div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16, marginBottom: 24,
          }}>
            <Card>
              <p style={{ color: '#64748b', fontSize: 12, margin: '0 0 6px' }}>MIS RESERVAS</p>
              <p style={{ color: '#6366f1', fontSize: 28, fontWeight: 800, margin: 0 }}>{misReservas.length}</p>
            </Card>
            <Card>
              <p style={{ color: '#64748b', fontSize: 12, margin: '0 0 6px' }}>ACTIVAS</p>
              <p style={{ color: '#22c55e', fontSize: 28, fontWeight: 800, margin: 0 }}>
                {misReservas.filter((r) => r.estado === 'Activa').length}
              </p>
            </Card>
            <Card>
              <p style={{ color: '#64748b', fontSize: 12, margin: '0 0 6px' }}>VEHÍCULOS DISPONIBLES</p>
              <p style={{ color: '#f59e0b', fontSize: 28, fontWeight: 800, margin: 0 }}>
                {vehiculos.filter((v) => v.estado === 'Disponible').length}
              </p>
            </Card>
          </div>
          <Card>
            <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>
              ¡Hola! Consulta los vehículos disponibles y realiza tu reserva desde la sección{' '}
              <strong style={{ color: '#6366f1' }}>Vehículos</strong>. 🎉
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
