const colores = { success: '#22c55e', error: '#ef4444', info: '#6366f1' };
const iconos  = { success: '✓', error: '✕', info: 'ℹ' };

export function Alert({ msg, type = 'success', onClose }) {
  if (!msg) return null;
  return (
    <div style={{
      position: 'fixed', top: 20, right: 20, zIndex: 9999,
      background: '#0f172a', border: `1px solid ${colores[type]}`,
      borderRadius: 12, padding: '14px 20px', color: colores[type],
      fontSize: 14, fontWeight: 600, maxWidth: 340,
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <span>{iconos[type]}</span>
      <span style={{ flex: 1 }}>{msg}</span>
      <button
        onClick={onClose}
        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
      >
        ✕
      </button>
    </div>
  );
}
