const ITarifaStrategy = require('./ITarifaStrategy');

class TarifaSUV extends ITarifaStrategy {
  calcular(dias) { return dias * 120000; }
}

module.exports = new TarifaSUV();
