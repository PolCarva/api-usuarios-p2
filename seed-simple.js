const mongoose = require('mongoose');
const Usuario = require('./models/Usuario');
const config = require('./config');

// Datos simples para pruebas básicas
const usuariosSimples = [
  {
    username: 'admin',
    email: 'admin@ejemplo.com',
    data: {
      rol: 'administrador',
      activo: true
    }
  },
  {
    username: 'usuario1',
    email: 'usuario1@ejemplo.com',
    data: {
      nombre: 'Usuario Uno',
      edad: 25
    }
  },
  {
    username: 'usuario2',
    email: 'usuario2@ejemplo.com',
    data: {
      nombre: 'Usuario Dos',
      edad: 30
    }
  },
  {
    username: 'test',
    email: 'test@ejemplo.com',
    data: {
      tipo: 'prueba',
      creado: new Date().toISOString()
    }
  }
];

// Función para conectar a la base de datos
async function conectarDB() {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error.message);
    process.exit(1);
  }
}

// Función para limpiar la base de datos
async function limpiarBaseDeDatos() {
  try {
    await Usuario.deleteMany({});
    console.log('🧹 Base de datos limpiada');
  } catch (error) {
    console.error('❌ Error al limpiar la base de datos:', error.message);
  }
}

// Función para insertar usuarios simples
async function insertarUsuariosSimples() {
  try {
    const usuariosCreados = await Usuario.insertMany(usuariosSimples);
    console.log(`✅ ${usuariosCreados.length} usuarios simples creados`);
    return usuariosCreados;
  } catch (error) {
    console.error('❌ Error al insertar usuarios:', error.message);
    throw error;
  }
}

// Función principal
async function ejecutarSeedSimple() {
  console.log('🌱 Iniciando seed simple...\n');
  
  try {
    await conectarDB();
    await limpiarBaseDeDatos();
    const usuariosCreados = await insertarUsuariosSimples();
    
    console.log('\n📝 Usuarios creados:');
    usuariosCreados.forEach(usuario => {
      console.log(`  - ${usuario.username} (${usuario.email})`);
    });
    
    console.log('\n🎉 Seed simple completado!');
    
  } catch (error) {
    console.error('❌ Error durante el seed:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Conexión cerrada');
    process.exit(0);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  ejecutarSeedSimple();
}

module.exports = {
  ejecutarSeedSimple,
  usuariosSimples
};
