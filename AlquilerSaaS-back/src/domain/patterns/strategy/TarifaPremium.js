const ITarifaStrategy = require('./ITarifaStrategy');

class TarifaPremium extends ITarifaStrategy {
  calcular(dias) { return dias * 250000; }
}

module.exports = new TarifaPremium();
