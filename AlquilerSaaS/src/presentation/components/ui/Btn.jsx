const estilos = {
  primary: { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', border: 'none' },
  danger:  { background: 'linear-gradient(135deg,#ef4444,#dc2626)', color: '#fff', border: 'none' },
  ghost:   { background: 'transparent', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.12)' },
  success: { background: 'linear-gradient(135deg,#22c55e,#16a34a)', color: '#fff', border: 'none' },
};

export function Btn({ children, onClick, variant = 'primary', small = false, disabled = false, style = {} }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...estilos[variant],
        borderRadius: 10,
        padding: small ? '6px 14px' : '10px 20px',
        fontSize: small ? 12 : 14,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'transform 0.1s, opacity 0.2s',
        fontFamily: 'inherit',
        ...style,
      }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = 'scale(0.97)')}
      onMouseUp={(e)   => !disabled && (e.currentTarget.style.transform = 'scale(1)')}
    >
      {children}
    </button>
  );
}
