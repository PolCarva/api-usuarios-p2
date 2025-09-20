// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const config = require('./config');
const conectarDB = require('./database');
const usuariosRoutes = require('./routes/usuarios');
const docsRoutes = require('./routes/docs');

// Conectar a la base de datos
conectarDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/users', usuariosRoutes);
app.use('/docs', docsRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'Servidor de usuarios funcionando correctamente',
    documentation: 'Visita /docs para ver la documentación completa de la API',
    endpoints: {
      'GET /api/users': 'Obtener todos los usuarios',
      'GET /api/users/search/username/:username': 'Buscar usuario por username',
      'GET /api/users/search/email/:email': 'Buscar usuario por email',
      'GET /api/users/:id': 'Obtener un usuario por ID',
      'POST /api/users': 'Crear un nuevo usuario',
      'PUT /api/users/:id': 'Actualizar un usuario',
      'DELETE /api/users/:id': 'Eliminar un usuario'
    },
    links: {
      documentation: '/docs',
      api_base: '/api/users'
    }
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: error.message
  });
});

const PORT = config.PORT;

const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor ejecutándose en ${HOST}:${PORT}`);
  console.log(`📊 Base de datos: ${config.MONGODB_URI}`);
  console.log(`🌐 Entorno: ${process.env.NODE_ENV || 'development'}`);
});
