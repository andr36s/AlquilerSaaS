module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categorias', {
      id:           { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nombre:       { type: Sequelize.STRING,        allowNull: false, unique: true },
      tarifaDiaria: { type: Sequelize.DECIMAL(10,0), allowNull: false },
      createdAt:    { type: Sequelize.DATE, allowNull: false },
      updatedAt:    { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('categorias');
  },
};
