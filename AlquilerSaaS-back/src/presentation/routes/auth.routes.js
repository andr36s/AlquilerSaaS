const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const { login, crearUsuario, validar } = require('../validators/usuario.validator');

router.post('/login',    login,        validar, AuthController.login);
router.post('/register', crearUsuario, validar, AuthController.register);

module.exports = router;
