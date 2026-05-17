require('dotenv').config();
const app           = require('./app');
const { connect }   = require('./infrastructure/database/db');

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await connect();
    console.log('MongoDB conectado correctamente.');
    app.listen(PORT, () => {
      console.log(`SAV SaaS API corriendo en http://localhost:${PORT}`);
      console.log(`Health: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('No se pudo conectar a MongoDB:', err.message);
    process.exit(1);
  }
}

main();
