const router = require('express').Router();
const ReservaController = require('../controllers/ReservaController');
const authMiddleware    = require('../middlewares/authMiddleware');
const { rbac }          = require('../middlewares/rbacMiddleware');
const { crearReserva, validar } = require('../validators/reserva.validator');

// Admin/Empleado ven todas; Cliente ve las suyas (filtrado en servicio)
router.get('/', authMiddleware, ReservaController.listar);

// Cliente autenticado
router.post('/',
  authMiddleware, rbac('crear_reserva'),
  crearReserva, validar,
  ReservaController.crear
);

// Empleado / Admin
router.put('/:id/estado',
  authMiddleware, rbac('gestionar_reservas'),
  ReservaController.cambiarEstado
);

module.exports = router;
