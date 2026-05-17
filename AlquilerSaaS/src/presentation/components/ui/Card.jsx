export function Card({ children, style = {}, ...rest }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      padding: 24,
      ...style,
    }} {...rest}>
      {children}
    </div>
  );
}
