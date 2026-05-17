import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Btn } from '../components/ui/Btn';
import { Alert } from '../components/ui/Alert';

const fmt = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

const ESTADO_COLOR = { Activa: '#22c55e', Cancelada: '#ef4444', Completada: '#6366f1' };

export function GestionReservas({ reservas, cancelarReserva, completarReserva, usuario }) {
  const [alert, setAlert] = useState(null);

  async function handleCompletar(r) {
    try {
      await completarReserva(r.id, usuario);
      setAlert({ msg: 'Reserva completada', type: 'success' });
    } catch (e) {
      setAlert({ msg: e.message, type: 'error' });
    }
  }

  async function handleCancelar(r) {
    try {
      await cancelarReserva(r.id, usuario);
      setAlert({ msg: 'Reserva cancelada', type: 'info' });
    } catch (e) {
      setAlert({ msg: e.message, type: 'error' });
    }
  }

  return (
    <div>
      <Alert msg={alert?.msg} type={alert?.type} onClose={() => setAlert(null)} />
      <h2 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800, margin: '0 0 20px' }}>Gestión de Reservas</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {reservas.map((r) => {
          const v = r.vehiculo;
          const c = r.cliente;
          return (
            <Card key={r.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 22 }}>{v?.imagen || '🚗'}</span>
                    <div>
                      <div style={{ color: '#f1f5f9', fontWeight: 700 }}>
                        {v ? `${v.marca} ${v.modelo}` : 'Vehículo'}
                      </div>
                      <div style={{ color: '#64748b', fontSize: 12 }}>Cliente: {c?.nombre || 'N/A'}</div>
                    </div>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>📅 {r.fechaInicio} → {r.fechaFin}</div>
                  <div style={{ color: '#6366f1', fontWeight: 800, marginTop: 4 }}>{fmt(r.valorTotal)}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <Badge color={ESTADO_COLOR[r.estado] || '#6b7280'}>{r.estado}</Badge>
                  {r.estado === 'Activa' && (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Btn small variant="success" onClick={() => handleCompletar(r)}>✓ Completar</Btn>
                      <Btn small variant="danger"  onClick={() => handleCancelar(r)}>✕ Cancelar</Btn>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
        {reservas.length === 0 && (
          <Card>
            <p style={{ color: '#64748b', textAlign: 'center', margin: 0 }}>Sin reservas registradas.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
