module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehiculos', {
      id:          { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      placa:       { type: Sequelize.STRING,  allowNull: false, unique: true },
      marca:       { type: Sequelize.STRING,  allowNull: false },
      modelo:      { type: Sequelize.STRING,  allowNull: false },
      anio:        { type: Sequelize.INTEGER },
      imagen:      { type: Sequelize.STRING,  defaultValue: '🚗' },
      estado: {
        type: Sequelize.ENUM('Disponible', 'Reservado', 'EnMantenimiento', 'Inactivo'),
        defaultValue: 'Disponible',
      },
      categoriaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categorias', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      activo:    { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vehiculos');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_vehiculos_estado";');
  },
};
