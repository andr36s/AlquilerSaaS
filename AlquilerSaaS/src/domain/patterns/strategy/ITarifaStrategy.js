export const ITarifaStrategy = {
  calcular: (_dias) => {
    throw new Error('calcular(dias) debe ser implementado por la estrategia concreta');
  },
};
