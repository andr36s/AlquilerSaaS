const router = require('express').Router();
const EmpleadoController = require('../controllers/EmpleadoController');
const authMiddleware     = require('../middlewares/authMiddleware');
const { rbac }           = require('../middlewares/rbacMiddleware');
const auditLogger        = require('../middlewares/auditLogger');
const { crearUsuario, validar } = require('../validators/usuario.validator');

router.get('/',       authMiddleware, rbac('*'), EmpleadoController.listar);
router.post('/',      authMiddleware, rbac('*'), crearUsuario, validar, auditLogger('Empleado','CREAR'),    EmpleadoController.crear);
router.put('/:id',    authMiddleware, rbac('*'), auditLogger('Empleado','ACTUALIZAR'), EmpleadoController.actualizar);
router.delete('/:id', authMiddleware, rbac('*'), auditLogger('Empleado','ELIMINAR'), EmpleadoController.eliminar);

module.exports = router;
