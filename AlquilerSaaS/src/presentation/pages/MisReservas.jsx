import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Btn } from '../components/ui/Btn';
import { Alert } from '../components/ui/Alert';

const fmt = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

const difDias = (a, b) =>
  Math.max(1, Math.ceil((new Date(b) - new Date(a)) / 86400000));

const ESTADO_COLOR = { Activa: '#22c55e', Cancelada: '#ef4444', Completada: '#6366f1' };

export function MisReservas({ usuario, reservas, vehiculos, cancelarReserva }) {
  const [alert, setAlert] = useState(null);

  const misReservas = reservas.filter((r) => r.clienteId === usuario.id);

  function handleCancelar(r) {
    cancelarReserva(r.id, usuario);
    setAlert({ msg: 'Reserva cancelada', type: 'info' });
  }

  return (
    <div>
      <Alert msg={alert?.msg} type={alert?.type} onClose={() => setAlert(null)} />
      <h2 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800, margin: '0 0 20px' }}>Mis Reservas</h2>

      {misReservas.length === 0 ? (
        <Card>
          <p style={{ color: '#64748b', textAlign: 'center', margin: 0 }}>
            No tienes reservas. Ve a Vehículos para reservar. 🚗
          </p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {misReservas.map((r) => {
            const v = vehiculos.find((x) => x.id === r.vehiculoId);
            return (
              <Card key={r.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 24 }}>{v?.imagen || '🚗'}</span>
                      <div>
                        <div style={{ color: '#f1f5f9', fontWeight: 700 }}>
                          {v ? `${v.marca} ${v.modelo}` : 'Vehículo'}
                        </div>
                        <div style={{ color: '#64748b', fontSize: 12 }}>Placa: {v?.placa}</div>
                      </div>
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: 13 }}>
                      📅 {r.fechaInicio} → {r.fechaFin} · {difDias(r.fechaInicio, r.fechaFin)} días
                    </div>
                    <div style={{ color: '#6366f1', fontWeight: 800, marginTop: 4 }}>{fmt(r.valorTotal)}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
                    <Badge color={ESTADO_COLOR[r.estado] || '#6b7280'}>{r.estado}</Badge>
                    {r.estado === 'Activa' && (
                      <Btn small variant="danger" onClick={() => handleCancelar(r)}>Cancelar</Btn>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
