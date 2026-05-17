const { body, validationResult } = require('express-validator');

const crearUsuario = [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('correo').isEmail().withMessage('Correo inválido'),
  body('clave').isLength({ min: 4 }).withMessage('La clave debe tener al menos 4 caracteres'),
];

const login = [
  body('correo').isEmail().withMessage('Correo inválido'),
  body('clave').notEmpty().withMessage('La clave es requerida'),
];

const validar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

module.exports = { crearUsuario, login, validar };
