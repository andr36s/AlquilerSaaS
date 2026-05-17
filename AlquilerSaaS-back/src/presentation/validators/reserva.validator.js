const { body, validationResult } = require('express-validator');

const isObjectId = (val) => /^[a-f\d]{24}$/i.test(val);

const crearReserva = [
  body('vehiculoId')
    .custom(isObjectId).withMessage('vehiculoId inválido'),
  body('fechaInicio')
    .isDate().withMessage('fechaInicio debe ser una fecha válida (YYYY-MM-DD)'),
  body('fechaFin')
    .isDate().withMessage('fechaFin debe ser una fecha válida (YYYY-MM-DD)'),
  body('fechaFin').custom((val, { req }) => {
    if (new Date(val) <= new Date(req.body.fechaInicio))
      throw new Error('fechaFin debe ser posterior a fechaInicio');
    return true;
  }),
];

const validar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

module.exports = { crearReserva, validar };
