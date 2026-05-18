const {
  Inscription,
  User,
  Activity,
  SocialHours
} = require("../models");

const inscribirse = async (req, res) => {
  try {
    const { usuario_id, actividad_id } = req.body;

    const existe = await Inscription.findOne({
      where: { usuario_id, actividad_id }
    });

    if (existe) {
      return res.status(400).json({
        message: "Ya estás inscrito"
      });
    }

    await Inscription.create({
      usuario_id,
      actividad_id,
      estado: "inscrito"
    });

    res.status(201).json({
      message: "Inscripción realizada"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al inscribirse"
    });
  }
};

const obtenerInscritos = async (req, res) => {
  try {
    const inscritos = await Inscription.findAll({
      include: [User, Activity]
    });

    res.json(inscritos);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener inscritos"
    });
  }
};

const validarHoras = async (req, res) => {
  try {
    const { id } = req.params;

    const inscripcion = await Inscription.findByPk(id, {
      include: [Activity]
    });

    inscripcion.estado = "completado";
    await inscripcion.save();

    await SocialHours.create({
      usuario_id: inscripcion.usuario_id,
      horas: inscripcion.Activity.horas,
      fecha: new Date()
    });

    res.json({
      message: "Horas validadas"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al validar"
    });
  }
};

const cancelarInscripcion = async (req, res) => {
  try {
    const { id } = req.params;

    await Inscription.destroy({
      where: { id }
    });

    res.json({
      message: "Inscripción cancelada"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al cancelar"
    });
  }
};

module.exports = {
  inscribirse,
  obtenerInscritos,
  validarHoras,
  cancelarInscripcion
};