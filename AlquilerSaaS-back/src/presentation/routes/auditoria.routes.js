const router = require('express').Router();
const AuditoriaController = require('../controllers/AuditoriaController');
const authMiddleware      = require('../middlewares/authMiddleware');
const { rbac }            = require('../middlewares/rbacMiddleware');

router.get('/', authMiddleware, rbac('*'), AuditoriaController.listar);

module.exports = router;
