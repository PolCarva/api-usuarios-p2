# Ejemplos con cURL - Servidor de Usuarios

Esta documentación contiene ejemplos de cómo usar la API del servidor de usuarios utilizando cURL desde la terminal.

## Requisitos

- Tener cURL instalado (viene preinstalado en macOS y Linux)
- Servidor ejecutándose en `http://localhost:3000` (local) o usar la versión en producción

## 🌐 Servidor en Producción

El servidor está disponible en Railway: **https://api-usuarios-p2.up.railway.app**

Puedes usar los ejemplos de cURL directamente con esta URL sin necesidad de ejecutar el servidor localmente.

## Endpoints Disponibles

### GET /api/users
Obtiene todos los usuarios

**Local:**
```bash
curl http://localhost:3000/api/users
```

**Producción (Railway):**
```bash
curl https://api-usuarios-p2.up.railway.app/api/users
```

### GET /api/users/search/username/:username
Busca un usuario por username
```bash
curl http://localhost:3000/api/users/search/username/juan123
```

### GET /api/users/search/email/:email
Busca un usuario por email
```bash
curl http://localhost:3000/api/users/search/email/juan@ejemplo.com
```

### GET /api/users/:id
Obtiene un usuario específico por ID
```bash
curl http://localhost:3000/api/users/64f8a1b2c3d4e5f6a7b8c9d0
```

### POST /api/users
Crea un nuevo usuario
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

### PUT /api/users/:id
Actualiza un usuario existente
```bash

```

### DELETE /api/users/:id
Elimina un usuario
```bash
curl -X DELETE http://localhost:3000/api/users/64f8a1b2c3d4e5f6a7b8c9d0
```

## Ejemplos con Variables

### Usando variables para IDs y datos
```bash
# Definir variables
USER_ID="64f8a1b2c3d4e5f6a7b8c9d0"
USERNAME="maria123"
EMAIL="maria@ejemplo.com"

# Buscar por username
curl http://localhost:3000/api/users/search/username/$USERNAME

# Buscar por email
curl http://localhost:3000/api/users/search/email/$EMAIL

# Obtener usuario por ID
curl http://localhost:3000/api/users/$USER_ID

# Crear usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"$USERNAME\",
    \"email\": \"$EMAIL\",
    \"data\": {
      \"edad\": 30,
      \"ciudad\": \"Barcelona\"
    }
  }"

# Actualizar usuario
curl -X PUT http://localhost:3000/api/users/$USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "edad": 31,
      "ciudad": "Barcelona",
      "nuevoCampo": "valor"
    }
  }'

# Eliminar usuario
curl -X DELETE http://localhost:3000/api/users/$USER_ID
```

## Ejemplos con Respuestas Formateadas

### Mostrar respuestas con formato JSON
```bash
# Instalar jq si no lo tienes: brew install jq (macOS) o apt-get install jq (Ubuntu)

# Obtener usuarios con formato
curl -s http://localhost:3000/api/users | jq '.'

# Crear usuario y mostrar respuesta formateada
curl -s -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test123",
    "email": "test@ejemplo.com",
    "data": {"edad": 25}
  }' | jq '.'
```

## Scripts de Prueba Completos

### Script para probar todos los endpoints
```bash
#!/bin/bash

BASE_URL="http://localhost:3000/api/users"

echo "=== Probando API de Usuarios ==="

# 1. Obtener todos los usuarios
echo "1. Obteniendo todos los usuarios..."
curl -s "$BASE_URL" | jq '.'

# 2. Crear un usuario de prueba
echo -e "\n2. Creando usuario de prueba..."
RESPONSE=$(curl -s -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario_prueba",
    "email": "prueba@ejemplo.com",
    "data": {
      "edad": 25,
      "ciudad": "Madrid"
    }
  }')

echo "$RESPONSE" | jq '.'

# Extraer ID del usuario creado
USER_ID=$(echo "$RESPONSE" | jq -r '.data._id')
echo "ID del usuario creado: $USER_ID"

# 3. Buscar por username
echo -e "\n3. Buscando por username..."
curl -s "$BASE_URL/search/username/usuario_prueba" | jq '.'

# 4. Buscar por email
echo -e "\n4. Buscando por email..."
curl -s "$BASE_URL/search/email/prueba@ejemplo.com" | jq '.'

# 5. Obtener usuario por ID
echo -e "\n5. Obteniendo usuario por ID..."
curl -s "$BASE_URL/$USER_ID" | jq '.'

# 6. Actualizar usuario
echo -e "\n6. Actualizando usuario..."
curl -s -X PUT "$BASE_URL/$USER_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "edad": 26,
      "ciudad": "Barcelona",
      "actualizado": true
    }
  }' | jq '.'

# 7. Eliminar usuario
echo -e "\n7. Eliminando usuario..."
curl -s -X DELETE "$BASE_URL/$USER_ID" | jq '.'

echo -e "\n=== Pruebas completadas ==="
```

### Script para crear múltiples usuarios
```bash
#!/bin/bash

BASE_URL="http://localhost:3000/api/users"

usuarios=(
  '{"username": "alice", "email": "alice@ejemplo.com", "data": {"edad": 28, "ciudad": "Madrid"}}'
  '{"username": "bob", "email": "bob@ejemplo.com", "data": {"edad": 32, "ciudad": "Barcelona"}}'
  '{"username": "charlie", "email": "charlie@ejemplo.com", "data": {"edad": 25, "ciudad": "Valencia"}}'
)

echo "Creando usuarios de prueba..."

for usuario in "${usuarios[@]}"; do
  echo "Creando usuario: $usuario"
  curl -s -X POST "$BASE_URL" \
    -H "Content-Type: application/json" \
    -d "$usuario" | jq '.data.username, .data.email'
  echo "---"
done

echo "Usuarios creados exitosamente!"
```

## Comandos Útiles

### Verificar que el servidor está funcionando
```bash
curl http://localhost:3000/
```

### Probar conectividad
```bash
curl -I http://localhost:3000/api/users
```

### Ver solo headers de respuesta
```bash
curl -I http://localhost:3000/api/users
```

### Guardar respuesta en archivo
```bash
curl http://localhost:3000/api/users -o usuarios.json
```

### Usar timeout
```bash
curl --max-time 10 http://localhost:3000/api/users
```

### Verbose mode (ver detalles de la conexión)
```bash
curl -v http://localhost:3000/api/users
```

## Notas Importantes

- Reemplaza `64f8a1b2c3d4e5f6a7b8c9d0` con IDs reales de tu base de datos
- Los ejemplos asumen que el servidor está ejecutándose en `localhost:3000`
- Para usar `jq`, instálalo con `brew install jq` (macOS) o `apt-get install jq` (Ubuntu)
- Los scripts pueden ser guardados como archivos `.sh` y ejecutados con `bash script.sh`
