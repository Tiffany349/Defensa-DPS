const { SocialHours } = require("../models");

const obtenerHorasUsuario = async (req, res) => {
  try {

    const { usuario_id } = req.params;

    const horas = await SocialHours.findAll({
      where: { usuario_id }
    });

    res.json(horas);

  } catch (error) {

    res.status(500).json({
      message: "Error al obtener horas"
    });

  }
};

module.exports = {
  obtenerHorasUsuario
};