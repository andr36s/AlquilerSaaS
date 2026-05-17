module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('registro_auditorias', {
      id:        { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      entidad:   { type: Sequelize.STRING },
      accion:    { type: Sequelize.STRING },
      usuarioId: {
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      detalle:   { type: Sequelize.TEXT },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('registro_auditorias');
  },
};
