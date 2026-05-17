const router = require('express').Router();
const ClienteController = require('../controllers/ClienteController');
const authMiddleware    = require('../middlewares/authMiddleware');
const { rbac }          = require('../middlewares/rbacMiddleware');
const auditLogger       = require('../middlewares/auditLogger');
const { crearUsuario, validar } = require('../validators/usuario.validator');

router.get('/',    authMiddleware, rbac('gestionar_clientes'), ClienteController.listar);
router.post('/',   authMiddleware, rbac('gestionar_clientes'), crearUsuario, validar, auditLogger('Cliente','CREAR'),    ClienteController.crear);
router.put('/:id', authMiddleware, rbac('gestionar_clientes'), auditLogger('Cliente','ACTUALIZAR'), ClienteController.actualizar);
router.delete('/:id', authMiddleware, rbac('gestionar_clientes'), auditLogger('Cliente','ELIMINAR'), ClienteController.eliminar);

module.exports = router;
