const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nombre:       { type: String, required: true, unique: true },
  tarifaDiaria: { type: Number, required: true },
}, { timestamps: true });

schema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Categoria', schema);
