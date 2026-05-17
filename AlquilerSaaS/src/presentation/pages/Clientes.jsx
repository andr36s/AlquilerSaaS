import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Btn } from '../components/ui/Btn';
import { Modal } from '../components/ui/Modal';
import { Alert } from '../components/ui/Alert';
import { Input } from '../components/ui/Input';

const FORM_INICIAL = { nombre: '', correo: '', documento: '', telefono: '', direccion: '', clave: '' };

export function Clientes({ usuarios, crearCliente, toggleActivo }) {
  const [modal, setModal]   = useState(false);
  const [form, setForm]     = useState(FORM_INICIAL);
  const [alert, setAlert]   = useState(null);

  const clientes = usuarios.filter((u) => u.tipo === 'Cliente');

  async function guardar() {
    if (!form.nombre || !form.correo || !form.clave)
      return setAlert({ msg: 'Nombre, correo y clave son requeridos', type: 'error' });
    try {
      await crearCliente(form);
      setModal(false);
      setForm(FORM_INICIAL);
      setAlert({ msg: 'Cliente registrado exitosamente', type: 'success' });
    } catch (e) {
      setAlert({ msg: e.message, type: 'error' });
    }
  }

  async function handleToggle(c) {
    try {
      await toggleActivo(c);
    } catch (e) {
      setAlert({ msg: e.message, type: 'error' });
    }
  }

  return (
    <div>
      <Alert msg={alert?.msg} type={alert?.type} onClose={() => setAlert(null)} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800, margin: 0 }}>Clientes</h2>
        <Btn onClick={() => setModal(true)}>+ Nuevo Cliente</Btn>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {clientes.map((c) => (
          <Card key={c.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ color: '#f1f5f9', fontWeight: 700, marginBottom: 4 }}>{c.nombre}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>📧 {c.correo}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>🪪 {c.documento}</div>
                {c.telefono && <div style={{ color: '#64748b', fontSize: 12 }}>📱 {c.telefono}</div>}
              </div>
              <Badge color={c.activo ? '#22c55e' : '#ef4444'}>{c.activo ? 'Activo' : 'Inactivo'}</Badge>
            </div>
            <div style={{ marginTop: 14 }}>
              <Btn small variant={c.activo ? 'danger' : 'success'} onClick={() => handleToggle(c)}>
                {c.activo ? 'Desactivar' : 'Activar'}
              </Btn>
            </div>
          </Card>
        ))}
      </div>

      {modal && (
        <Modal title="Nuevo Cliente" onClose={() => setModal(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input label="Nombre completo" value={form.nombre}    onChange={(e) => setForm((p) => ({ ...p, nombre:    e.target.value }))} />
            <Input label="Correo" type="email" value={form.correo} onChange={(e) => setForm((p) => ({ ...p, correo:    e.target.value }))} />
            <Input label="Contraseña" type="password" value={form.clave} onChange={(e) => setForm((p) => ({ ...p, clave: e.target.value }))} />
            <Input label="Documento"  value={form.documento} onChange={(e) => setForm((p) => ({ ...p, documento:  e.target.value }))} />
            <Input label="Teléfono"   value={form.telefono}  onChange={(e) => setForm((p) => ({ ...p, telefono:   e.target.value }))} />
            <Input label="Dirección"  value={form.direccion} onChange={(e) => setForm((p) => ({ ...p, direccion:  e.target.value }))} />
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn onClick={guardar} style={{ flex: 1 }}>Registrar Cliente</Btn>
              <Btn variant="ghost" onClick={() => setModal(false)}>Cancelar</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
