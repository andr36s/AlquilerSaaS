export function Modal({ title, onClose, children }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        zIndex: 999, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: 20,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: '#0f172a',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 20, padding: 28,
        width: '100%', maxWidth: 520, maxHeight: '85vh', overflowY: 'auto',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 20,
        }}>
          <h3 style={{ color: '#f1f5f9', fontSize: 18, fontWeight: 700, margin: 0 }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 20 }}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
