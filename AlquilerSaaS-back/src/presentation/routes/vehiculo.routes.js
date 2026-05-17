const router = require('express').Router();
const VehiculoController = require('../controllers/VehiculoController');
const authMiddleware = require('../middlewares/authMiddleware');
const { rbac }       = require('../middlewares/rbacMiddleware');
const auditLogger    = require('../middlewares/auditLogger');
const { crearVehiculo, actualizarVehiculo, validar } = require('../validators/vehiculo.validator');

// Público
router.get('/',            VehiculoController.listar);
router.get('/disponibles', VehiculoController.disponibles);

// Empleado / Admin
router.post('/',
  authMiddleware, rbac('gestionar_vehiculos'),
  crearVehiculo, validar,
  auditLogger('Vehiculo', 'CREAR'),
  VehiculoController.crear
);
router.put('/:id',
  authMiddleware, rbac('gestionar_vehiculos'),
  actualizarVehiculo, validar,
  auditLogger('Vehiculo', 'ACTUALIZAR'),
  VehiculoController.actualizar
);
router.put('/:id/estado',
  authMiddleware, rbac('gestionar_vehiculos'),
  auditLogger('Vehiculo', 'CAMBIAR_ESTADO'),
  VehiculoController.cambiarEstado
);

// Solo Admin
router.delete('/:id',
  authMiddleware, rbac('gestionar_vehiculos'),
  auditLogger('Vehiculo', 'ELIMINAR'),
  VehiculoController.eliminar
);

module.exports = router;
