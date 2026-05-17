import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Btn } from '../components/ui/Btn';

const DEMOS = [
  { label: 'Admin',    correo: 'admin@sav.co',    clave: 'admin123' },
  { label: 'Empleado', correo: 'empleado@sav.co', clave: 'emp123' },
  { label: 'Cliente',  correo: 'cliente@sav.co',  clave: 'cli123' },
];

export function Login({ onLogin }) {
  const [correo, setCorreo]   = useState('');
  const [clave, setClave]     = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!correo || !clave) return setError('Ingresa correo y contraseña');
    setLoading(true);
    setError('');
    const ok = await onLogin(correo, clave);
    setLoading(false);
    if (!ok) setError('Credenciales incorrectas o usuario inactivo');
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#020617',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Sora','Segoe UI',sans-serif",
    }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '-10%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '5%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
        }} />
      </div>

      <div style={{ position: 'relative', width: '100%', maxWidth: 420, padding: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚗</div>
          <h1 style={{ color: '#f1f5f9', fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
            SAV <span style={{ color: '#6366f1' }}>SaaS</span>
          </h1>
          <p style={{ color: '#64748b', margin: '8px 0 0', fontSize: 14 }}>
            Sistema de Alquiler de Vehículos
          </p>
        </div>

        <Card style={{ backdropFilter: 'blur(20px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input
              label="Correo electrónico"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="usuario@sav.co"
            />
            <Input
              label="Contraseña"
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
            {error && <p style={{ color: '#ef4444', fontSize: 13, margin: 0 }}>{error}</p>}
            <Btn onClick={handleLogin} disabled={loading} style={{ marginTop: 8 }}>
              {loading ? 'Ingresando...' : 'Iniciar Sesión'}
            </Btn>
          </div>

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ color: '#64748b', fontSize: 12, margin: '0 0 10px', textAlign: 'center', fontWeight: 600 }}>
              ACCESOS DEMO
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {DEMOS.map((d) => (
                <button
                  key={d.label}
                  onClick={() => { setCorreo(d.correo); setClave(d.clave); setError(''); }}
                  style={{
                    flex: 1, background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.3)',
                    borderRadius: 8, padding: '8px 4px',
                    color: '#a5b4fc', fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
