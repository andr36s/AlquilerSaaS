const ITarifaStrategy = require('./ITarifaStrategy');

class TarifaEconomica extends ITarifaStrategy {
  calcular(dias) { return dias * 50000; }
}

module.exports = new TarifaEconomica();
