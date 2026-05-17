require('dotenv').config();
const express = require('express');
const cors    = require('cors');

// Registrar observadores (escuchan eventos del emitter)
require('./domain/patterns/observer/AuditoriaObserver');
require('./domain/patterns/observer/EstadoVehiculoObserver');

const authRoutes      = require('./presentation/routes/auth.routes');
const vehiculoRoutes  = require('./presentation/routes/vehiculo.routes');
const reservaRoutes   = require('./presentation/routes/reserva.routes');
const clienteRoutes   = require('./presentation/routes/cliente.routes');
const empleadoRoutes  = require('./presentation/routes/empleado.routes');
const auditoriaRoutes = require('./presentation/routes/auditoria.routes');
const errorHandler    = require('./presentation/middlewares/errorHandler');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth',      authRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/reservas',  reservaRoutes);
app.use('/api/clientes',  clienteRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/auditoria', auditoriaRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', ts: new Date() }));

app.use(errorHandler);

module.exports = app;
