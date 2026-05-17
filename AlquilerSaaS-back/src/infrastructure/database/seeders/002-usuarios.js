const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const h = (p) => bcrypt.hashSync(p, 10);
    const now = new Date();
    await queryInterface.bulkInsert('usuarios', [
      {
        nombre: 'Admin Sistema', correo: 'admin@sav.co', clave: h('admin123'),
        documento: '1000000001', tipo: 'Administrador',
        activo: true, createdAt: now, updatedAt: now,
      },
      {
        nombre: 'Carlos Vélez', correo: 'empleado@sav.co', clave: h('emp123'),
        documento: '1000000002', tipo: 'Empleado', cargo: 'Asesor de Ventas',
        activo: true, createdAt: now, updatedAt: now,
      },
      {
        nombre: 'María Torres', correo: 'cliente@sav.co', clave: h('cli123'),
        documento: '1000000003', tipo: 'Cliente',
        telefono: '3001234567', direccion: 'Calle 50 #30-20',
        activo: true, createdAt: now, updatedAt: now,
      },
      {
        nombre: 'Juan Ramírez', correo: 'juan@sav.co', clave: h('juan123'),
        documento: '1000000004', tipo: 'Cliente',
        telefono: '3109876543', direccion: 'Carrera 80 #45-10',
        activo: true, createdAt: now, updatedAt: now,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('usuarios', null, {});
  },
};
