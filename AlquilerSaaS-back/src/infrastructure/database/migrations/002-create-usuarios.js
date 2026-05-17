module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id:        { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nombre:    { type: Sequelize.STRING,  allowNull: false },
      correo:    { type: Sequelize.STRING,  allowNull: false, unique: true },
      clave:     { type: Sequelize.STRING,  allowNull: false },
      documento: { type: Sequelize.STRING },
      tipo:      { type: Sequelize.ENUM('Cliente', 'Empleado', 'Administrador'), allowNull: false },
      cargo:     { type: Sequelize.STRING },
      telefono:  { type: Sequelize.STRING },
      direccion: { type: Sequelize.STRING },
      activo:    { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_usuarios_tipo";');
  },
};
