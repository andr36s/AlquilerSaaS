require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

// Registrar modelos
const { Categoria, Usuario, Vehiculo, Reserva, RegistroAuditoria } = require('../../domain/entities');

const h = (p) => bcrypt.hashSync(p, 10);

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'alquilersaas' });
  console.log('MongoDB conectado. Ejecutando seed...');

  // Limpiar colecciones
  await RegistroAuditoria.deleteMany({});
  await Reserva.deleteMany({});
  await Vehiculo.deleteMany({});
  await Usuario.deleteMany({});
  await Categoria.deleteMany({});

  // Categorías
  const categorias = await Categoria.insertMany([
    { nombre: 'Económico', tarifaDiaria: 50000 },
    { nombre: 'SUV',       tarifaDiaria: 120000 },
    { nombre: 'Premium',   tarifaDiaria: 250000 },
  ]);

  const eco = categorias.find((c) => c.nombre === 'Económico');
  const suv = categorias.find((c) => c.nombre === 'SUV');
  const pre = categorias.find((c) => c.nombre === 'Premium');

  // Usuarios — insertMany omite pre('save'), por eso se hashea manualmente
  await Usuario.insertMany([
    { nombre: 'Admin Sistema',  correo: 'admin@sav.co',    clave: h('admin123'), tipo: 'Administrador', activo: true },
    { nombre: 'Empleado Demo',  correo: 'empleado@sav.co', clave: h('emp123'),   tipo: 'Empleado', cargo: 'Agente de alquiler', activo: true },
    { nombre: 'Cliente Demo',   correo: 'cliente@sav.co',  clave: h('cli123'),   tipo: 'Cliente',  activo: true },
  ]);

  // Vehículos
  await Vehiculo.insertMany([
    { placa: 'ABC-123', marca: 'Toyota', modelo: 'Corolla',   anio: 2022, imagen: '🚗', estado: 'Disponible', categoriaId: eco._id, activo: true },
    { placa: 'DEF-456', marca: 'Toyota', modelo: 'Yaris',     anio: 2021, imagen: '🚗', estado: 'Disponible', categoriaId: eco._id, activo: true },
    { placa: 'GHI-789', marca: 'Ford',   modelo: 'Explorer',  anio: 2023, imagen: '🚙', estado: 'Disponible', categoriaId: suv._id, activo: true },
    { placa: 'JKL-012', marca: 'Jeep',   modelo: 'Cherokee',  anio: 2022, imagen: '🚙', estado: 'Disponible', categoriaId: suv._id, activo: true },
    { placa: 'MNO-345', marca: 'BMW',    modelo: 'Serie 5',   anio: 2024, imagen: '🏎️', estado: 'Disponible', categoriaId: pre._id, activo: true },
    { placa: 'PQR-678', marca: 'Mercedes', modelo: 'Clase C', anio: 2024, imagen: '🏎️', estado: 'Disponible', categoriaId: pre._id, activo: true },
  ]);

  console.log('✓ Seed completado correctamente.');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Error en seed:', err.message);
  process.exit(1);
});
