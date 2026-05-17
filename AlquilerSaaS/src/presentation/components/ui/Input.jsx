export function Input({ label, ...props }) {
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
      <input
        {...props}
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10, padding: '10px 14px',
          color: '#f1f5f9', fontSize: 14, outline: 'none',
          transition: 'border 0.2s', fontFamily: 'inherit',
          ...(props.style || {}),
        }}
        onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
      />
    </div>
  );
}
