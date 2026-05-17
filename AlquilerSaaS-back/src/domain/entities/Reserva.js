const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  clienteId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario',  required: true },
  vehiculoId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Vehiculo', required: true },
  fechaInicio: { type: String, required: true },
  fechaFin:    { type: String, required: true },
  estado:      { type: String, enum: ['Activa', 'Completada', 'Cancelada'], default: 'Activa' },
  valorTotal:  { type: Number },
}, { timestamps: true });

const isObjectId = (v) => v && typeof v.toHexString === 'function';

schema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    if (ret.clienteId) {
      if (isObjectId(ret.clienteId)) {
        ret.clienteId = ret.clienteId.toHexString();
      } else {
        ret.cliente   = ret.clienteId;
        ret.clienteId = ret.clienteId.id;
      }
    }
    if (ret.vehiculoId) {
      if (isObjectId(ret.vehiculoId)) {
        ret.vehiculoId = ret.vehiculoId.toHexString();
      } else {
        ret.vehiculo   = ret.vehiculoId;
        ret.vehiculoId = ret.vehiculoId.id;
      }
    }
    return ret;
  },
});

module.exports = mongoose.model('Reserva', schema);
