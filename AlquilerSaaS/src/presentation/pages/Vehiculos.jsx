import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Btn } from '../components/ui/Btn';
import { Modal } from '../components/ui/Modal';
import { Alert } from '../components/ui/Alert';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';

const ESTADOS = {
  Disponible:      { label: 'Disponible',      color: '#22c55e', puedeReservar: true,  siguiente: 'Reservado' },
  Reservado:       { label: 'Reservado',        color: '#f59e0b', puedeReservar: false, siguiente: 'EnMantenimiento' },
  EnMantenimiento: { label: 'En Mantenimiento', color: '#3b82f6', puedeReservar: false, siguiente: 'Disponible' },
  Inactivo:        { label: 'Inactivo',         color: '#ef4444', puedeReservar: false, siguiente: null },
};

const TARIFAS = { 'Económico': 45000, 'SUV': 85000, 'Premium': 150000 };

const fmt = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

const difDias = (a, b) =>
  Math.max(1, Math.ceil((new Date(b) - new Date(a)) / 86400000));

const CATEGORIAS = ['Todos', 'Económico', 'SUV', 'Premium'];

export function Vehiculos({ vehiculos, usuario, reservas, crearReserva, actualizarVehiculo, avanzarEstado }) {
  const [filtro, setFiltro]           = useState('Todos');
  const [modalReserva, setModalReserva] = useState(null);
  const [modalEditar, setModalEditar]   = useState(null);
  const [fechaInicio, setFechaInicio]   = useState('');
  const [fechaFin, setFechaFin]         = useState('');
  const [alert, setAlert]               = useState(null);

  const puedeReservar = usuario.permisos.includes('crear_reserva');
  const puedeGestionar = usuario.permisos.includes('gestionar_vehiculos') || usuario.permisos.includes('*');

  const filtrados = vehiculos.filter(
    (v) => v.activo && (filtro === 'Todos' || v.categoria === filtro)
  );

  function handleReservar() {
    if (!fechaInicio || !fechaFin)
      return setAlert({ msg: 'Selecciona fechas', type: 'error' });
    if (new Date(fechaFin) <= new Date(fechaInicio))
      return setAlert({ msg: 'La fecha fin debe ser posterior al inicio', type: 'error' });
    try {
      crearReserva(modalReserva, usuario, fechaInicio, fechaFin);
      const dias = difDias(fechaInicio, fechaFin);
      const total = (TARIFAS[modalReserva.categoria] || 45000) * dias;
      setModalReserva(null); setFechaInicio(''); setFechaFin('');
      setAlert({ msg: `Reserva creada exitosamente por ${fmt(total)}`, type: 'success' });
    } catch (e) {
      setAlert({ msg: e.message, type: 'error' });
    }
  }

  function handleGuardarVehiculo(v) {
    actualizarVehiculo(v);
    setModalEditar(null);
    setAlert({ msg: 'Vehículo actualizado', type: 'success' });
  }

  return (
    <div>
      <Alert msg={alert?.msg} type={alert?.type} onClose={() => setAlert(null)} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <h2 style={{ color: '#f1f5f9', fontSize: 22, fontWeight: 800, margin: 0 }}>Catálogo de Vehículos</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              onClick={() => setFiltro(c)}
              style={{
                padding: '7px 16px', borderRadius: 20, border: '1px solid',
                borderColor: filtro === c ? '#6366f1' : 'rgba(255,255,255,0.12)',
                background: filtro === c ? 'rgba(99,102,241,0.2)' : 'transparent',
                color: filtro === c ? '#a5b4fc' : '#64748b',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {filtrados.map((v) => {
          const estado = ESTADOS[v.estado];
          return (
            <Card
              key={v.id}
              style={{ position: 'relative', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12 }}>{v.imagen}</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 16 }}>{v.marca} {v.modelo}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>Placa: {v.placa} · {v.anio}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <Badge color={estado.color}>{estado.label}</Badge>
                <Badge color="#a78bfa">{v.categoria}</Badge>
              </div>
              <div style={{ color: '#6366f1', fontWeight: 800, fontSize: 15, marginBottom: 14 }}>
                {fmt(TARIFAS[v.categoria] || 45000)} / día
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {puedeReservar && estado.puedeReservar && (
                  <Btn small onClick={() => setModalReserva(v)} style={{ flex: 1 }}>📅 Reservar</Btn>
                )}
                {puedeGestionar && (
                  <>
                    {estado.siguiente && (
                      <Btn small variant="ghost" onClick={() => avanzarEstado(v.id)}>→ Estado</Btn>
                    )}
                    <Btn small variant="ghost" onClick={() => setModalEditar(v)}>✏️</Btn>
                  </>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {modalReserva && (
        <Modal title={`Reservar: ${modalReserva.marca} ${modalReserva.modelo}`} onClose={() => setModalReserva(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'rgba(99,102,241,0.1)', borderRadius: 12, padding: 16 }}>
              <div style={{ color: '#a5b4fc', fontSize: 13 }}>
                Categoría: <strong>{modalReserva.categoria}</strong>
              </div>
              {fechaInicio && fechaFin && new Date(fechaFin) > new Date(fechaInicio) && (
                <div style={{ color: '#22c55e', fontSize: 18, fontWeight: 800, marginTop: 8 }}>
                  Total: {fmt((TARIFAS[modalReserva.categoria] || 45000) * difDias(fechaInicio, fechaFin))}
                  <span style={{ color: '#64748b', fontSize: 13, fontWeight: 400 }}>
                    {' '}({difDias(fechaInicio, fechaFin)} días)
                  </span>
                </div>
              )}
            </div>
            <Input
              label="Fecha de inicio" type="date" value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
            <Input
              label="Fecha de fin" type="date" value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              min={fechaInicio || new Date().toISOString().split('T')[0]}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <Btn onClick={handleReservar} style={{ flex: 1 }}>Confirmar Reserva</Btn>
              <Btn variant="ghost" onClick={() => setModalReserva(null)}>Cancelar</Btn>
            </div>
          </div>
        </Modal>
      )}

      {modalEditar && (
        <ModalEditarVehiculo
          vehiculo={modalEditar}
          onClose={() => setModalEditar(null)}
          onSave={handleGuardarVehiculo}
        />
      )}
    </div>
  );
}

function ModalEditarVehiculo({ vehiculo, onClose, onSave }) {
  const [form, setForm] = useState({ ...vehiculo });
  return (
    <Modal title="Editar Vehículo" onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Input label="Marca"  value={form.marca}  onChange={(e) => setForm((p) => ({ ...p, marca:  e.target.value }))} />
        <Input label="Modelo" value={form.modelo} onChange={(e) => setForm((p) => ({ ...p, modelo: e.target.value }))} />
        <Input label="Año" type="number" value={form.anio} onChange={(e) => setForm((p) => ({ ...p, anio: +e.target.value }))} />
        <Select label="Categoría" value={form.categoria} onChange={(e) => setForm((p) => ({ ...p, categoria: e.target.value }))}>
          {['Económico', 'SUV', 'Premium'].map((c) => <option key={c}>{c}</option>)}
        </Select>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn onClick={() => onSave(form)} style={{ flex: 1 }}>Guardar</Btn>
          <Btn variant="ghost" onClick={onClose}>Cancelar</Btn>
        </div>
      </div>
    </Modal>
  );
}
