module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservas', {
      id:          { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      clienteId:   {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'usuarios',   key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT',
      },
      vehiculoId:  {
        type: Sequelize.INTEGER, allowNull: false,
        references: { model: 'vehiculos',  key: 'id' },
        onUpdate: 'CASCADE', onDelete: 'RESTRICT',
      },
      fechaInicio: { type: Sequelize.DATEONLY, allowNull: false },
      fechaFin:    { type: Sequelize.DATEONLY, allowNull: false },
      estado: {
        type: Sequelize.ENUM('Activa', 'Completada', 'Cancelada'),
        defaultValue: 'Activa',
      },
      valorTotal:  { type: Sequelize.DECIMAL(12,0) },
      createdAt:   { type: Sequelize.DATE, allowNull: false },
      updatedAt:   { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reservas');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_reservas_estado";');
  },
};
