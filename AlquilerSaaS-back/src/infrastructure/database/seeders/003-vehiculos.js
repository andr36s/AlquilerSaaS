module.exports = {
  async up(queryInterface) {
    const now = new Date();
    // categoriaId: 1=Económico  2=SUV  3=Premium  (orden del seeder 001)
    await queryInterface.bulkInsert('vehiculos', [
      { placa: 'ABC123', marca: 'Toyota',   modelo: 'Corolla',  anio: 2022, imagen: '🚗', estado: 'Disponible',      categoriaId: 1, activo: true, createdAt: now, updatedAt: now },
      { placa: 'XYZ789', marca: 'Ford',     modelo: 'Explorer', anio: 2023, imagen: '🚙', estado: 'Disponible',      categoriaId: 2, activo: true, createdAt: now, updatedAt: now },
      { placa: 'DEF456', marca: 'BMW',      modelo: 'Serie 5',  anio: 2023, imagen: '🏎️', estado: 'Disponible',      categoriaId: 3, activo: true, createdAt: now, updatedAt: now },
      { placa: 'GHI321', marca: 'Chevrolet',modelo: 'Spark',    anio: 2021, imagen: '🚗', estado: 'EnMantenimiento', categoriaId: 1, activo: true, createdAt: now, updatedAt: now },
      { placa: 'JKL654', marca: 'Kia',      modelo: 'Sportage', anio: 2022, imagen: '🚙', estado: 'Disponible',      categoriaId: 2, activo: true, createdAt: now, updatedAt: now },
      { placa: 'MNO987', marca: 'Mercedes', modelo: 'Clase C',  anio: 2024, imagen: '🏎️', estado: 'Disponible',      categoriaId: 3, activo: true, createdAt: now, updatedAt: now },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('vehiculos', null, {});
  },
};
