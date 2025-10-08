const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// GET /api/usuarios - Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find({});
    res.json({
      success: true,
      data: usuarios,
      count: usuarios.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: error.message
    });
  }
});

// GET /api/usuarios/search/username/:username - Buscar usuario por username
router.get('/search/username/:username', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ username: req.params.username });
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado con ese username'
      });
    }
    res.json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar usuario por username',
      error: error.message
    });
  }
});

// GET /api/usuarios/search/email/:email - Buscar usuario por email
router.get('/search/email/:email', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.params.email });
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado con ese email'
      });
    }
    res.json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar usuario por email',
      error: error.message
    });
  }
});

// GET /api/usuarios/:id - Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    res.json({
      success: true,
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuario',
      error: error.message
    });
  }
});

// POST /api/usuarios - Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { username, email, data } = req.body;
    
    // Validaciones básicas
    if (!username || !email) {
      return res.status(400).json({
        success: false,
        message: 'Username y email son requeridos'
      });
    }

    const nuevoUsuario = new Usuario({
      username,
      email,
      data: data || {}
    });

    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: usuarioGuardado
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'El username o email ya existe'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al crear usuario',
      error: error.message
    });
  }
});

// PUT /api/usuarios/:id - Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const { username, email, data } = req.body;
    
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      {
        ...(username && { username }),
        ...(email && { email }),
        ...(data !== undefined && { data })
      },
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: usuarioActualizado
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'El username o email ya existe'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al actualizar usuario',
      error: error.message
    });
  }
});

// PATCH /api/usuarios/:id - Actualización parcial de un usuario
router.patch('/:id', async (req, res) => {
  try {
    const { username, email, data } = req.body;
    
    // Construir objeto de actualización solo con los campos proporcionados
    const updateData = {};
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    
    // Manejar actualizaciones parciales del campo data
    if (data !== undefined) {
      if (typeof data === 'object' && data !== null) {
        // Para actualizaciones parciales de data, necesitamos obtener el documento actual
        // y hacer una fusión de los datos
        const usuarioActual = await Usuario.findById(req.params.id);
        if (!usuarioActual) {
          return res.status(404).json({
            success: false,
            message: 'Usuario no encontrado'
          });
        }
        
        // Fusionar los datos existentes con los nuevos
        const dataActualizado = { ...usuarioActual.data, ...data };
        updateData.data = dataActualizado;
      } else {
        // Si data no es un objeto, reemplazar completamente
        updateData.data = data;
      }
    }
    
    // Si no hay campos para actualizar, retornar error
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se proporcionaron campos para actualizar'
      });
    }

    // Usar $set para actualizaciones parciales
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: usuarioActualizado
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'El username o email ya existe'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al actualizar usuario',
      error: error.message
    });
  }
});

// DELETE /api/usuarios/:id - Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    
    if (!usuarioEliminado) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Usuario eliminado exitosamente',
      data: usuarioEliminado
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar usuario',
      error: error.message
    });
  }
});

module.exports = router;
