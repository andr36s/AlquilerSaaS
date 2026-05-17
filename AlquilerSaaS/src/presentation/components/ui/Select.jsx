export function Select({ label, children, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{
          fontSize: 12, fontWeight: 600, color: '#94a3b8',
          letterSpacing: 0.5, textTransform: 'uppercase',
        }}>
          {label}
        </label>
      )}
      <select
        {...props}
        style={{
          background: '#1e293b',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10, padding: '10px 14px',
          color: '#f1f5f9', fontSize: 14, outline: 'none',
          fontFamily: 'inherit',
        }}
      >
        {children}
      </select>
    </div>
  );
}
