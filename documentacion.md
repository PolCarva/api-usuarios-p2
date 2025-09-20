# Documentación de la API - Servidor de Usuarios

## Información General

**Base URL:** `https://api-usuarios-p2.up.railway.app/api/users`

**Formato de respuesta:** JSON

**Estructura estándar de respuesta:**
```json
{
  "success": boolean,
  "message": "string",
  "data": object | array,
  "count": number (solo en listados)
}
```

## Modelo de Usuario

### Estructura del Usuario
```json
{
  "_id": "string (MongoDB ObjectId)",
  "username": "string (requerido, único)",
  "email": "string (requerido, único)",
  "data": "object (opcional, sin restricciones)",
  "createdAt": "string (ISO 8601)",
  "updatedAt": "string (ISO 8601)"
}
```

### Campos Requeridos
- `username`: Nombre de usuario único
- `email`: Dirección de correo electrónico única

### Campos Opcionales
- `data`: Objeto flexible para información adicional

## Endpoints

### 1. Obtener Todos los Usuarios

**GET** `/api/users`

**Descripción:** Retorna una lista de todos los usuarios registrados.

**Parámetros:** Ninguno

**Respuesta exitosa (200):**
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

**Ejemplo JavaScript:**
```javascript
const response = await fetch('https://api-usuarios-p2.up.railway.app/api/users');
const data = await response.json();
```

**Ejemplo cURL:**
```bash
curl https://api-usuarios-p2.up.railway.app/api/users
```

---

### 2. Buscar Usuario por Username

**GET** `/api/users/search/username/:username`

**Descripción:** Busca un usuario específico por su nombre de usuario.

**Parámetros:**
- `username` (path): Nombre de usuario a buscar

**Respuesta exitosa (200):**
```json
{
  "success": true,
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

**Respuesta de error (404):**
```json
{
  "success": false,
  "message": "Usuario no encontrado con ese username"
}
```

**Ejemplo JavaScript:**
```javascript
const username = 'juan123';
const response = await fetch(`https://api-usuarios-p2.up.railway.app/api/users/search/username/${username}`);
const data = await response.json();
```

**Ejemplo cURL:**
```bash
curl https://api-usuarios-p2.up.railway.app/api/users/search/username/juan123
```

---

### 3. Buscar Usuario por Email

**GET** `/api/users/search/email/:email`

**Descripción:** Busca un usuario específico por su dirección de correo electrónico.

**Parámetros:**
- `email` (path): Dirección de correo electrónico a buscar

**Respuesta exitosa (200):**
```json
{
  "success": true,
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

**Respuesta de error (404):**
```json
{
  "success": false,
  "message": "Usuario no encontrado con ese email"
}
```

**Ejemplo JavaScript:**
```javascript
const email = 'juan@ejemplo.com';
const response = await fetch(`https://api-usuarios-p2.up.railway.app/api/users/search/email/${email}`);
const data = await response.json();
```

**Ejemplo cURL:**
```bash
curl https://api-usuarios-p2.up.railway.app/api/users/search/email/juan@ejemplo.com
```

---

### 4. Obtener Usuario por ID

**GET** `/api/users/:id`

**Descripción:** Obtiene un usuario específico por su ID de MongoDB.

**Parámetros:**
- `id` (path): ID único del usuario (MongoDB ObjectId)

**Respuesta exitosa (200):**
```json
{
  "success": true,
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

**Respuesta de error (404):**
```json
{
  "success": false,
  "message": "Usuario no encontrado"
}
```

**Ejemplo JavaScript:**
```javascript
const userId = '64f8a1b2c3d4e5f6a7b8c9d0';
const response = await fetch(`https://api-usuarios-p2.up.railway.app/api/users/${userId}`);
const data = await response.json();
```

**Ejemplo cURL:**
```bash
curl https://api-usuarios-p2.up.railway.app/api/users/64f8a1b2c3d4e5f6a7b8c9d0
```

---

### 5. Crear Usuario

**POST** `/api/users`

**Descripción:** Crea un nuevo usuario en el sistema.

**Parámetros del cuerpo (JSON):**
- `username` (string, requerido): Nombre de usuario único
- `email` (string, requerido): Dirección de correo electrónico única
- `data` (object, opcional): Información adicional del usuario

**Ejemplo de cuerpo de petición:**
```json
{
  "username": "juan123",
  "email": "juan@ejemplo.com",
  "data": {
    "edad": 25,
    "ciudad": "Madrid",
    "preferencias": {
      "tema": "oscuro",
      "idioma": "es"
    }
  }
}
```

**Respuesta exitosa (201):**
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
      "ciudad": "Madrid",
      "preferencias": {
        "tema": "oscuro",
        "idioma": "es"
      }
    },
    "createdAt": "2023-09-05T10:30:00.000Z",
    "updatedAt": "2023-09-05T10:30:00.000Z"
  }
}
```

**Respuesta de error (400):**
```json
{
  "success": false,
  "message": "Username y email son requeridos"
}
```

**Respuesta de error (400) - Duplicado:**
```json
{
  "success": false,
  "message": "El username o email ya existe"
}
```

**Ejemplo JavaScript:**
```javascript
const nuevoUsuario = {
  username: "juan123",
  email: "juan@ejemplo.com",
  data: {
    edad: 25,
    ciudad: "Madrid"
  }
};

const response = await fetch('https://api-usuarios-p2.up.railway.app/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(nuevoUsuario)
});

const data = await response.json();
```

**Ejemplo cURL:**
```bash
curl -X POST https://api-usuarios-p2.up.railway.app/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "juan123",
    "email": "juan@ejemplo.com",
    "data": {
      "edad": 25,
      "ciudad": "Madrid"
    }
  }'
```

---

### 6. Actualizar Usuario

**PUT** `/api/users/:id`

**Descripción:** Actualiza un usuario existente.

**Parámetros:**
- `id` (path): ID único del usuario (MongoDB ObjectId)

**Parámetros del cuerpo (JSON):**
- `username` (string, opcional): Nuevo nombre de usuario
- `email` (string, opcional): Nueva dirección de correo electrónico
- `data` (object, opcional): Nueva información adicional

**Ejemplo de cuerpo de petición:**
```json
{
  "username": "juan456",
  "data": {
    "edad": 26,
    "ciudad": "Barcelona",
    "nuevoCampo": "valor"
  }
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario actualizado exitosamente",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "username": "juan456",
    "email": "juan@ejemplo.com",
    "data": {
      "edad": 26,
      "ciudad": "Barcelona",
      "nuevoCampo": "valor"
    },
    "createdAt": "2023-09-05T10:30:00.000Z",
    "updatedAt": "2023-09-05T11:45:00.000Z"
  }
}
```

**Respuesta de error (404):**
```json
{
  "success": false,
  "message": "Usuario no encontrado"
}
```

**Respuesta de error (400) - Duplicado:**
```json
{
  "success": false,
  "message": "El username o email ya existe"
}
```

**Ejemplo JavaScript:**
```javascript
const userId = '64f8a1b2c3d4e5f6a7b8c9d0';
const datosActualizados = {
  username: "juan456",
  data: {
    edad: 26,
    ciudad: "Barcelona"
  }
};

const response = await fetch(`https://api-usuarios-p2.up.railway.app/api/users/${userId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(datosActualizados)
});

const data = await response.json();
```

**Ejemplo cURL:**
```bash
curl -X PUT https://api-usuarios-p2.up.railway.app/api/users/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -d '{
    "username": "juan456",
    "data": {
      "edad": 26,
      "ciudad": "Barcelona"
    }
  }'
```

---

### 7. Eliminar Usuario

**DELETE** `/api/users/:id`

**Descripción:** Elimina un usuario del sistema.

**Parámetros:**
- `id` (path): ID único del usuario (MongoDB ObjectId)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario eliminado exitosamente",
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

**Respuesta de error (404):**
```json
{
  "success": false,
  "message": "Usuario no encontrado"
}
```

**Ejemplo JavaScript:**
```javascript
const userId = '64f8a1b2c3d4e5f6a7b8c9d0';
const response = await fetch(`https://api-usuarios-p2.up.railway.app/api/users/${userId}`, {
  method: 'DELETE'
});

const data = await response.json();
```

**Ejemplo cURL:**
```bash
curl -X DELETE https://api-usuarios-p2.up.railway.app/api/users/64f8a1b2c3d4e5f6a7b8c9d0
```

## Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Usuario creado exitosamente |
| 400 | Bad Request - Datos inválidos o duplicados |
| 404 | Not Found - Usuario no encontrado |
| 500 | Internal Server Error - Error del servidor |

## Manejo de Errores

### Estructura de Error
```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalles técnicos del error (solo en desarrollo)"
}
```

### Errores Comunes

1. **Campos requeridos faltantes (400)**
   ```json
   {
     "success": false,
     "message": "Username y email son requeridos"
   }
   ```

2. **Usuario duplicado (400)**
   ```json
   {
     "success": false,
     "message": "El username o email ya existe"
   }
   ```

3. **Usuario no encontrado (404)**
   ```json
   {
     "success": false,
     "message": "Usuario no encontrado"
   }
   ```

4. **Error interno del servidor (500)**
   ```json
   {
     "success": false,
     "message": "Error interno del servidor",
     "error": "Detalles del error"
   }
   ```

## Notas Importantes

- Todos los endpoints requieren el header `Content-Type: application/json` para operaciones POST y PUT
- Los campos `username` y `email` son únicos en toda la base de datos
- El campo `data` acepta cualquier estructura de objeto JSON
- Los timestamps `createdAt` y `updatedAt` se generan automáticamente
- Los IDs son ObjectIds de MongoDB en formato hexadecimal de 24 caracteres
