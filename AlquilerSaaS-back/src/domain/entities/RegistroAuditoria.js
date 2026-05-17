const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  entidad:   { type: String },
  accion:    { type: String },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  detalle:   { type: String },
}, { timestamps: true });

const isObjectId = (v) => v && typeof v.toHexString === 'function';

schema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    if (ret.usuarioId) {
      if (isObjectId(ret.usuarioId)) {
        ret.usuarioId = ret.usuarioId.toHexString();
      } else {
        ret.usuario   = ret.usuarioId;
        ret.usuarioId = ret.usuarioId.id;
      }
    }
    return ret;
  },
});

module.exports = mongoose.model('RegistroAuditoria', schema);
