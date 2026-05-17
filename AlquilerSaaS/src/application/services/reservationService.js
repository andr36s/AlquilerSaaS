import { reservaRepository } from '../../infrastructure/repositories/reservaRepository';
import { TarifaEconomica } from '../../domain/patterns/strategy/TarifaEconomica';
import { TarifaSUV } from '../../domain/patterns/strategy/TarifaSUV';
import { TarifaPremium } from '../../domain/patterns/strategy/TarifaPremium';
import { AuditoriaObserver } from '../../domain/patterns/observer/AuditoriaObserver';
import { EstadoVehiculoObserver } from '../../domain/patterns/observer/EstadoVehiculoObserver';

const estrategias = {
  'Económico': TarifaEconomica,
  'SUV':       TarifaSUV,
  'Premium':   TarifaPremium,
};

const difDias = (a, b) =>
  Math.max(1, Math.ceil((new Date(b) - new Date(a)) / 86400000));

const fmt = (n) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0,
  }).format(n);

export const reservationService = {
  calcularTarifa(categoria, dias) {
    return (estrategias[categoria] || TarifaEconomica).calcular(dias);
  },

  calcularTarifaParaFechas(categoria, fechaInicio, fechaFin) {
    const dias = difDias(fechaInicio, fechaFin);
    return { dias, total: this.calcularTarifa(categoria, dias) };
  },

  crearReserva({ reservas, vehiculos, auditoria, vehiculo, usuario, fechaInicio, fechaFin }) {
    if (reservaRepository.tieneConflicto(reservas, vehiculo.id, fechaInicio, fechaFin)) {
      throw new Error('El vehículo ya está reservado en esas fechas');
    }
    const dias = difDias(fechaInicio, fechaFin);
    const valorTotal = this.calcularTarifa(vehiculo.categoria, dias);
    const nuevaReserva = {
      id: Date.now(),
      clienteId: usuario.id,
      vehiculoId: vehiculo.id,
      fechaInicio,
      fechaFin,
      estado: 'Activa',
      valorTotal,
      fechaCreacion: new Date().toISOString().split('T')[0],
    };
    return {
      reservas:  reservaRepository.add(reservas, nuevaReserva),
      vehiculos: EstadoVehiculoObserver.notificar(vehiculos, nuevaReserva, 'CREAR'),
      auditoria: AuditoriaObserver.notificar(
        auditoria, nuevaReserva, usuario, 'CREAR',
        `Reserva creada por ${usuario.nombre} — ${fmt(valorTotal)}`
      ),
    };
  },

  cancelarReserva({ reservas, vehiculos, auditoria, reservaId, usuario }) {
    const reserva = reservaRepository.findById(reservas, reservaId);
    return {
      reservas:  reservaRepository.updateEstado(reservas, reservaId, 'Cancelada'),
      vehiculos: EstadoVehiculoObserver.notificar(vehiculos, reserva, 'CANCELAR'),
      auditoria: AuditoriaObserver.notificar(
        auditoria, reserva, usuario, 'CANCELAR',
        `Reserva cancelada por ${usuario.nombre}`
      ),
    };
  },

  completarReserva({ reservas, vehiculos, auditoria, reservaId, usuario }) {
    const reserva = reservaRepository.findById(reservas, reservaId);
    return {
      reservas:  reservaRepository.updateEstado(reservas, reservaId, 'Completada'),
      vehiculos: EstadoVehiculoObserver.notificar(vehiculos, reserva, 'CANCELAR'),
      auditoria: AuditoriaObserver.notificar(
        auditoria, reserva, usuario, 'COMPLETADA',
        `Reserva #${reserva.id} marcada como completada`
      ),
    };
  },
};
