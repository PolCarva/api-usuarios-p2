# Servidor de Usuarios con Node.js y MongoDB

Un servidor simple que permite gestionar usuarios con operaciones CRUD completas.

## Características

- ✅ Obtener todos los usuarios
- ✅ Buscar usuario por username
- ✅ Buscar usuario por email
- ✅ Obtener un usuario por ID
- ✅ Crear nuevos usuarios (username y email)
- ✅ Actualizar usuarios existentes
- ✅ Eliminar usuarios
- ✅ Campo `data` flexible para cualquier información adicional

## Estructura del Usuario

```json
{
  "username": "string (requerido, único)",
  "email": "string (requerido, único)",
  "data": "object (opcional, sin restricciones)"
}
```

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Asegúrate de tener MongoDB ejecutándose en tu sistema:
```bash
# En macOS con Homebrew
brew services start mongodb-community

# O ejecutar directamente
mongod
```

3. Poblar la base de datos con datos de ejemplo (opcional):
```bash
# Seed completo con usuarios detallados
npm run seed

# Seed simple con usuarios básicos
npm run seed:simple
```

4. Iniciar el servidor:
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## 🌐 Servidor en Producción

El servidor también está disponible en producción en Railway:

**URL de Producción:** https://api-usuarios-p2.up.railway.app

**Documentación:** https://api-usuarios-p2.up.railway.app/docs

**API Base:** https://api-usuarios-p2.up.railway.app/api/usuarios

## 📚 Documentación Interactiva

Una vez que el servidor esté ejecutándose, puedes acceder a la documentación completa de la API visitando:

**http://localhost:3000/docs**

Esta página muestra toda la documentación de la API con:
- ✅ Formato HTML elegante y responsive
- ✅ Ejemplos de código con syntax highlighting
- ✅ Navegación fácil entre secciones
- ✅ Diseño moderno y profesional

## Endpoints Disponibles

### GET /api/usuarios
Obtiene todos los usuarios
```javascript
const response = await fetch('http://localhost:3000/api/usuarios');
const data = await response.json();
console.log(data);
```

### GET /api/usuarios/search/username/:username
Busca un usuario por username
```javascript
const username = 'juan123';
const response = await fetch(`http://localhost:3000/api/usuarios/search/username/${username}`);
const data = await response.json();
console.log(data);
```

### GET /api/usuarios/search/email/:email
Busca un usuario por email
```javascript
const email = 'juan@ejemplo.com';
const response = await fetch(`http://localhost:3000/api/usuarios/search/email/${email}`);
const data = await response.json();
console.log(data);
```

### GET /api/usuarios/:id
Obtiene un usuario específico por ID
```javascript
const userId = '64f8a1b2c3d4e5f6a7b8c9d0';
const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`);
const data = await response.json();
console.log(data);
```

### POST /api/usuarios
Crea un nuevo usuario
```javascript
const nuevoUsuario = {
  username: "juan123",
  email: "juan@ejemplo.com",
  data: {
    edad: 25,
    ciudad: "Madrid",
    preferencias: {
      tema: "oscuro",
      idioma: "es"
    }
  }
};

const response = await fetch('http://localhost:3000/api/usuarios', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(nuevoUsuario)
});

const data = await response.json();
console.log(data);
```

### PUT /api/usuarios/:id
Actualiza un usuario existente
```javascript
const userId = '64f8a1b2c3d4e5f6a7b8c9d0';
const datosActualizados = {
  username: "juan456",
  data: {
    edad: 26,
    nuevoCampo: "cualquier valor"
  }
};

const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(datosActualizados)
});

const data = await response.json();
console.log(data);
```

### DELETE /api/usuarios/:id
Elimina un usuario
```javascript
const userId = '64f8a1b2c3d4e5f6a7b8c9d0';
const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
  method: 'DELETE'
});

const data = await response.json();
console.log(data);
```

## Ejemplos Completos con Manejo de Errores

### Función para obtener todos los usuarios
```javascript
async function obtenerUsuarios() {
  try {
    const response = await fetch('http://localhost:3000/api/usuarios');
    const data = await response.json();
    
    if (data.success) {
      console.log(`Se encontraron ${data.count} usuarios:`, data.data);
      return data.data;
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error de conexión:', error);
  }
}
```

### Función para crear un usuario
```javascript
async function crearUsuario(username, email, dataExtra = {}) {
  try {
    const nuevoUsuario = {
      username,
      email,
      data: dataExtra
    };

    const response = await fetch('http://localhost:3000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoUsuario)
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('Usuario creado:', data.data);
      return data.data;
    } else {
      console.error('Error al crear usuario:', data.message);
    }
  } catch (error) {
    console.error('Error de conexión:', error);
  }
}

// Ejemplo de uso
crearUsuario('maria123', 'maria@ejemplo.com', {
  edad: 30,
  ciudad: 'Barcelona',
  hobbies: ['leer', 'cocinar']
});
```

### Función para buscar usuario por username
```javascript
async function buscarPorUsername(username) {
  try {
    const response = await fetch(`http://localhost:3000/api/usuarios/search/username/${username}`);
    const data = await response.json();
    
    if (data.success) {
      console.log('Usuario encontrado:', data.data);
      return data.data;
    } else {
      console.log('Usuario no encontrado:', data.message);
      return null;
    }
  } catch (error) {
    console.error('Error de conexión:', error);
  }
}
```

## Ejemplos de Respuestas

### Crear Usuario (POST)
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "username": "juan123",
    "email": "juan@ejemplo.com",
    "data": {
      "edad": 25,
      "ciudad": "Madrid"
    },
    "createdAt": "2023-09-05T10:30:00.000Z",
    "updatedAt": "2023-09-05T10:30:00.000Z"
  }
}
```

### Obtener Usuarios (GET)
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "username": "juan123",
      "email": "juan@ejemplo.com",
      "data": {
        "edad": 25,
        "ciudad": "Madrid"
      },
      "createdAt": "2023-09-05T10:30:00.000Z",
      "updatedAt": "2023-09-05T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

## Configuración

Puedes modificar la configuración en `config.js`:
- `PORT`: Puerto del servidor (por defecto: 3000)
- `MONGODB_URI`: URL de conexión a MongoDB (por defecto: mongodb://localhost:27017/usuarios_db)

## Notas Importantes

- El campo `data` acepta cualquier tipo de objeto JSON sin restricciones
- Los campos `username` y `email` son únicos en la base de datos
- El servidor incluye validaciones básicas y manejo de errores
- Se incluyen timestamps automáticos (`createdAt`, `updatedAt`)
