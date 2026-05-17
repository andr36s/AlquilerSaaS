const jwt = require('jsonwebtoken');

class AuthService {
  constructor() {
    if (AuthService._instancia) return AuthService._instancia;
    AuthService._instancia = this;
  }

  generarToken(usuario) {
    return jwt.sign(
      { id: usuario.id, tipo: usuario.tipo, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );
  }

  verificarToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = new AuthService();
