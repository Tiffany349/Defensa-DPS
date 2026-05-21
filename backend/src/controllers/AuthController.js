const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

const register = async (req, res) => {

  try {

    let {
      nombre,
      correo,
      password,
      rol
    } = req.body;

    nombre = nombre.trim();
    correo = correo.trim();
    password = password.trim();

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

    console.log(error);

    res.status(500).json({
      message: "Error al registrar usuario"
    });

  }
};

const login = async (req, res) => {

  try {

    let {
      correo,
      password
    } = req.body;

    correo = correo.trim();
    password = password.trim();

    console.log("CORREO:", correo);
    console.log("PASSWORD:", password);

    const usuario = await User.findOne({
      where: { correo }
    });

    if (!usuario) {

      return res.status(404).json({
        message: "Usuario no encontrado"
      });

    }

    console.log("USUARIO ENCONTRADO:", usuario.correo);

    const passwordValida = await bcrypt.compare(
      password,
      usuario.password
    );

    console.log("PASSWORD VALIDA:", passwordValida);

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

    console.log(error);

    res.status(500).json({
      message: "Error al iniciar sesión"
    });

  }
};

module.exports = {
  register,
  login
};