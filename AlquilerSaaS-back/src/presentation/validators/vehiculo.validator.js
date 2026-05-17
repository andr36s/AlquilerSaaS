const { body, validationResult } = require('express-validator');

const isObjectId = (val) => /^[a-f\d]{24}$/i.test(val);

const crearVehiculo = [
  body('placa').notEmpty().withMessage('La placa es requerida'),
  body('marca').notEmpty().withMessage('La marca es requerida'),
  body('modelo').notEmpty().withMessage('El modelo es requerido'),
  body('categoriaId')
    .custom(isObjectId).withMessage('categoriaId inválido'),
];

const actualizarVehiculo = [
  body('marca').optional().notEmpty().withMessage('La marca no puede estar vacía'),
  body('modelo').optional().notEmpty().withMessage('El modelo no puede estar vacío'),
  body('anio').optional().isInt({ min: 1900 }).withMessage('Año inválido'),
  body('categoriaId').optional().custom(isObjectId).withMessage('categoriaId inválido'),
];

const validar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

module.exports = { crearVehiculo, actualizarVehiculo, validar };
