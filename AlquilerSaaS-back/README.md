# AlquilerSaaS-back

Backend REST — SAV SaaS: Sistema de Alquiler de Vehículos  
Stack: Node.js 20 · Express 4 · Mongoose 8 · MongoDB

## Puesta en marcha

### 1. Variables de entorno
```bash
cp .env.example .env
# Edita .env con tu cadena de conexión MongoDB
```

### 2. Instalar dependencias
```bash
cd AlquilerSaaS-back
npm install
```

### 3. Asegúrate de tener MongoDB corriendo
```bash
# Opción local (MongoDB Community)
mongod --dbpath /data/db

# O usa MongoDB Atlas: ajusta MONGODB_URI en .env
```

### 4. Cargar datos semilla
```bash
npm run db:seed
```

### 5. Iniciar servidor
```bash
npm run dev       # desarrollo (nodemon)
npm start         # producción
```

El servidor queda en: **http://localhost:3000**  
Health check: **http://localhost:3000/api/health**

---

## Endpoints principales

| Método | Ruta                          | Acceso             |
|--------|-------------------------------|--------------------|
| POST   | /api/auth/login               | Público            |
| POST   | /api/auth/register            | Público            |
| GET    | /api/vehiculos                | Público            |
| GET    | /api/vehiculos/disponibles    | Público            |
| POST   | /api/vehiculos                | Empleado / Admin   |
| PUT    | /api/vehiculos/:id            | Empleado / Admin   |
| PUT    | /api/vehiculos/:id/estado     | Empleado / Admin   |
| DELETE | /api/vehiculos/:id            | Empleado / Admin   |
| GET    | /api/reservas                 | Autenticado        |
| POST   | /api/reservas                 | Cliente            |
| PUT    | /api/reservas/:id/estado      | Empleado / Admin   |
| GET    | /api/clientes                 | Empleado / Admin   |
| POST   | /api/clientes                 | Admin              |
| GET    | /api/empleados                | Admin              |
| POST   | /api/empleados                | Admin              |
| GET    | /api/auditoria                | Admin              |

## Credenciales demo
| Rol           | Correo             | Clave     |
|---------------|--------------------|-----------|
| Administrador | admin@sav.co       | admin123  |
| Empleado      | empleado@sav.co    | emp123    |
| Cliente       | cliente@sav.co     | cli123    |

## Reset completo
```bash
npm run db:seed   # re-ejecutar el seed limpia y vuelve a poblar
```
