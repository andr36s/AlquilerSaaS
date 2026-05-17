const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const schema = new mongoose.Schema({
  nombre:    { type: String, required: true },
  correo:    { type: String, required: true, unique: true, lowercase: true },
  clave:     { type: String, required: true, select: false },
  documento: { type: String },
  tipo:      { type: String, enum: ['Cliente', 'Empleado', 'Administrador'], required: true },
  cargo:     { type: String },
  telefono:  { type: String },
  direccion: { type: String },
  activo:    { type: Boolean, default: true },
}, { timestamps: true });

schema.pre('save', async function () {
  if (!this.isModified('clave')) return;
  this.clave = await bcrypt.hash(this.clave, 10);
});

schema.methods.verificarClave = function (clave) {
  return bcrypt.compare(clave, this.clave);
};

schema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.clave;
    return ret;
  },
});

module.exports = mongoose.model('Usuario', schema);
