import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const ACCION_COLOR = {
  CREAR:      '#22c55e',
  CANCELAR:   '#ef4444',
  COMPLETADA: '#6366f1',
  DESACTIVAR: '#f59e0b',
  ACTIVAR:    '#22c55e',
};

export function Auditoria({ auditoria }) {
  const registros = [...auditoria].reverse();

  return (
    <div>
      <h2 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800, margin: '0 0 20px' }}>
        Registro de Auditoría
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {registros.map((a) => (
          <Card key={a.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <Badge color={ACCION_COLOR[a.accion] || '#6b7280'}>{a.accion}</Badge>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#f1f5f9', fontSize: 14, fontWeight: 600 }}>{a.detalle}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>
                Entidad: {a.entidad} · Usuario: {a.usuario} · {a.fecha}
              </div>
            </div>
          </Card>
        ))}
        {auditoria.length === 0 && (
          <Card>
            <p style={{ color: '#64748b', textAlign: 'center', margin: 0 }}>Sin registros aún.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
