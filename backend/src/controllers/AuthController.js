const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const register = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
    }

    const usuarioExistente = await User.findOne({
      where: { correo }
    });

    if (usuarioExistente) {
      return res.status(400).json({
        message: "El correo ya existe"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await User.create({
      nombre,
      correo,
      password: passwordHash,
      rol: rol || "voluntario"
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      usuario: nuevoUsuario
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al registrar usuario"
    });
  }
};

const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const usuario = await User.findOne({
      where: { correo }
    });

    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!passwordValida) {
      return res.status(401).json({
        message: "Contraseña incorrecta"
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        correo: usuario.correo,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al iniciar sesión"
    });
  }
};

module.exports = {
  register,
  login
};