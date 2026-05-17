module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('categorias', [
      { nombre: 'Económico', tarifaDiaria: 45000, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'SUV',       tarifaDiaria: 85000, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Premium',   tarifaDiaria: 150000,createdAt: new Date(), updatedAt: new Date() },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('categorias', null, {});
  },
};
