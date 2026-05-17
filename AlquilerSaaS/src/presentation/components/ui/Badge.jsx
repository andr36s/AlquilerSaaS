export function Badge({ children, color = '#6b7280' }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', padding: '2px 10px',
      borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
      background: color + '22', color, border: `1px solid ${color}44`,
    }}>
      {children}
    </span>
  );
}
