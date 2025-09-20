// Cargar variables de entorno
require('dotenv').config();

const mongoose = require('mongoose');
const Usuario = require('./models/Usuario');
const config = require('./config');

// Datos de ejemplo para poblar la base de datos
const usuariosEjemplo = [
  {
    username: 'alice_dev',
    email: 'alice@ejemplo.com',
    data: {
      nombre: 'Alice Johnson',
      edad: 28,
      ciudad: 'Madrid',
      profesion: 'Desarrolladora Frontend',
      habilidades: ['JavaScript', 'React', 'CSS'],
      preferencias: {
        tema: 'oscuro',
        idioma: 'es',
        notificaciones: true
      },
      redes: {
        github: 'alice-dev',
        linkedin: 'alice-johnson'
      }
    }
  },
  {
    username: 'bob_backend',
    email: 'bob@ejemplo.com',
    data: {
      nombre: 'Bob Smith',
      edad: 32,
      ciudad: 'Barcelona',
      profesion: 'Desarrollador Backend',
      habilidades: ['Node.js', 'Python', 'MongoDB'],
      preferencias: {
        tema: 'claro',
        idioma: 'en',
        notificaciones: false
      },
      proyectos: [
        { nombre: 'API REST', tecnologia: 'Node.js' },
        { nombre: 'Microservicios', tecnologia: 'Python' }
      ]
    }
  },
  {
    username: 'charlie_fullstack',
    email: 'charlie@ejemplo.com',
    data: {
      nombre: 'Charlie Brown',
      edad: 25,
      ciudad: 'Valencia',
      profesion: 'Desarrollador Full Stack',
      habilidades: ['React', 'Node.js', 'PostgreSQL'],
      preferencias: {
        tema: 'auto',
        idioma: 'es',
        notificaciones: true
      },
      experiencia: {
        años: 3,
        empresas: ['TechCorp', 'StartupXYZ']
      }
    }
  },
  {
    username: 'diana_ui',
    email: 'diana@ejemplo.com',
    data: {
      nombre: 'Diana Prince',
      edad: 30,
      ciudad: 'Sevilla',
      profesion: 'Diseñadora UI/UX',
      habilidades: ['Figma', 'Adobe XD', 'CSS'],
      preferencias: {
        tema: 'oscuro',
        idioma: 'es',
        notificaciones: true
      },
      portfolio: {
        proyectos: 15,
        especialidad: 'Mobile Design'
      }
    }
  },
  {
    username: 'eve_data',
    email: 'eve@ejemplo.com',
    data: {
      nombre: 'Eve Wilson',
      edad: 35,
      ciudad: 'Bilbao',
      profesion: 'Científica de Datos',
      habilidades: ['Python', 'R', 'Machine Learning'],
      preferencias: {
        tema: 'claro',
        idioma: 'en',
        notificaciones: false
      },
      investigacion: {
        area: 'Deep Learning',
        publicaciones: 8
      }
    }
  },
  {
    username: 'frank_devops',
    email: 'frank@ejemplo.com',
    data: {
      nombre: 'Frank Miller',
      edad: 40,
      ciudad: 'Málaga',
      profesion: 'DevOps Engineer',
      habilidades: ['Docker', 'Kubernetes', 'AWS'],
      preferencias: {
        tema: 'oscuro',
        idioma: 'en',
        notificaciones: true
      },
      certificaciones: [
        'AWS Solutions Architect',
        'Kubernetes Administrator'
      ]
    }
  },
  {
    username: 'grace_mobile',
    email: 'grace@ejemplo.com',
    data: {
      nombre: 'Grace Hopper',
      edad: 27,
      ciudad: 'Murcia',
      profesion: 'Desarrolladora Mobile',
      habilidades: ['React Native', 'Flutter', 'Swift'],
      preferencias: {
        tema: 'claro',
        idioma: 'es',
        notificaciones: true
      },
      apps: {
        publicadas: 5,
        plataformas: ['iOS', 'Android']
      }
    }
  },
  {
    username: 'henry_qa',
    email: 'henry@ejemplo.com',
    data: {
      nombre: 'Henry Ford',
      edad: 33,
      ciudad: 'Zaragoza',
      profesion: 'QA Engineer',
      habilidades: ['Selenium', 'Cypress', 'Jest'],
      preferencias: {
        tema: 'auto',
        idioma: 'es',
        notificaciones: false
      },
      testing: {
        tipos: ['Unit', 'Integration', 'E2E'],
        herramientas: ['Jest', 'Cypress', 'Postman']
      }
    }
  },
  {
    username: 'iris_security',
    email: 'iris@ejemplo.com',
    data: {
      nombre: 'Iris Security',
      edad: 29,
      ciudad: 'Palma',
      profesion: 'Security Engineer',
      habilidades: ['Penetration Testing', 'OWASP', 'Cryptography'],
      preferencias: {
        tema: 'oscuro',
        idioma: 'en',
        notificaciones: true
      },
      seguridad: {
        especialidad: 'Web Security',
        certificaciones: ['CEH', 'CISSP']
      }
    }
  },
  {
    username: 'jack_product',
    email: 'jack@ejemplo.com',
    data: {
      nombre: 'Jack Product',
      edad: 31,
      ciudad: 'Las Palmas',
      profesion: 'Product Manager',
      habilidades: ['Agile', 'Scrum', 'Analytics'],
      preferencias: {
        tema: 'claro',
        idioma: 'es',
        notificaciones: true
      },
      productos: {
        gestionados: 3,
        metodologia: 'Agile'
      }
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

// Función para insertar usuarios de ejemplo
async function insertarUsuarios() {
  try {
    const usuariosCreados = await Usuario.insertMany(usuariosEjemplo);
    console.log(`✅ ${usuariosCreados.length} usuarios creados exitosamente`);
    return usuariosCreados;
  } catch (error) {
    console.error('❌ Error al insertar usuarios:', error.message);
    throw error;
  }
}

// Función para mostrar estadísticas
async function mostrarEstadisticas() {
  try {
    const totalUsuarios = await Usuario.countDocuments();
    const usuariosPorCiudad = await Usuario.aggregate([
      { $group: { _id: '$data.ciudad', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📊 Estadísticas de la base de datos:');
    console.log(`Total de usuarios: ${totalUsuarios}`);
    console.log('\n👥 Usuarios por ciudad:');
    usuariosPorCiudad.forEach(ciudad => {
      console.log(`  ${ciudad._id}: ${ciudad.count} usuarios`);
    });
  } catch (error) {
    console.error('❌ Error al obtener estadísticas:', error.message);
  }
}

// Función principal
async function ejecutarSeed() {
  console.log('🌱 Iniciando seed de la base de datos...\n');
  
  try {
    // Conectar a la base de datos
    await conectarDB();
    
    // Limpiar datos existentes
    await limpiarBaseDeDatos();
    
    // Insertar usuarios de ejemplo
    const usuariosCreados = await insertarUsuarios();
    
    // Mostrar estadísticas
    await mostrarEstadisticas();
    
    console.log('\n🎉 Seed completado exitosamente!');
    console.log('\n📝 Usuarios creados:');
    usuariosCreados.forEach(usuario => {
      console.log(`  - ${usuario.username} (${usuario.email})`);
    });
    
  } catch (error) {
    console.error('❌ Error durante el seed:', error.message);
  } finally {
    // Cerrar conexión
    await mongoose.connection.close();
    console.log('\n🔌 Conexión a MongoDB cerrada');
    process.exit(0);
  }
}

// Ejecutar seed si el archivo se ejecuta directamente
if (require.main === module) {
  ejecutarSeed();
}

module.exports = {
  ejecutarSeed,
  usuariosEjemplo,
  limpiarBaseDeDatos,
  insertarUsuarios
};
