const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  placa:       { type: String, required: true, unique: true },
  marca:       { type: String, required: true },
  modelo:      { type: String, required: true },
  anio:        { type: Number },
  imagen:      { type: String, default: '🚗' },
  estado:      { type: String, enum: ['Disponible', 'Reservado', 'EnMantenimiento', 'Inactivo'], default: 'Disponible' },
  categoriaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  activo:      { type: Boolean, default: true },
}, { timestamps: true });

const isObjectId = (v) => v && typeof v.toHexString === 'function';

schema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;

    if (ret.categoriaId) {
      if (isObjectId(ret.categoriaId)) {
        ret.categoriaId = ret.categoriaId.toHexString();
      } else {
        ret.categoria   = ret.categoriaId;
        ret.categoriaId = ret.categoriaId.id;
      }
    }
    return ret;
  },
});

module.exports = mongoose.model('Vehiculo', schema);
