import { Sidebar } from './Sidebar';

export function MainLayout({ children, usuario, seccion, setSeccion, onLogout }) {
  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: '#020617',
      fontFamily: "'Sora','Segoe UI',sans-serif",
      color: '#f1f5f9',
    }}>
      <Sidebar
        usuario={usuario}
        seccion={seccion}
        setSeccion={setSeccion}
        onLogout={onLogout}
      />
      <main style={{ marginLeft: 240, flex: 1, padding: 32, minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}
