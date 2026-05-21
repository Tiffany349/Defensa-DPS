const Inscription = require('../models/Inscription');

const User = require('../models/User');

const Activity = require('../models/Activity');

const SocialHours = require('../models/SocialHours');

exports.getInscriptions = async (req, res) => {

  try {

    const inscriptions = await Inscription.findAll({
      include: [
        {
          model: User
        },
        {
          model: Activity
        }
      ]
    });

    res.json(inscriptions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error al obtener inscripciones'
    });

  }

};

exports.createInscription = async (req, res) => {

  try {

    const {
      usuario_id,
      actividad_id
    } = req.body;

    const actividad = await Activity.findByPk(
      actividad_id
    );

    if (!actividad) {

      return res.status(404).json({
        message: 'Actividad no encontrada'
      });

    }

    const totalInscritos =
      await Inscription.count({
        where: {
          actividad_id
        }
      });

    if (totalInscritos >= actividad.cupos) {

      return res.status(400).json({
        message: 'Cupos llenos'
      });

    }

    const existe =
      await Inscription.findOne({
        where: {
          usuario_id,
          actividad_id
        }
      });

    if (existe) {

      return res.status(400).json({
        message: 'Ya estás inscrito'
      });

    }

    const inscription =
      await Inscription.create({
        usuario_id,
        actividad_id
      });

    res.status(201).json(inscription);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error al inscribirse'
    });

  }

};

exports.deleteInscription = async (req, res) => {

  try {

    const inscription =
      await Inscription.findByPk(req.params.id);

    if (!inscription) {

      return res.status(404).json({
        message: 'Inscripción no encontrada'
      });

    }

    await inscription.destroy();

    res.json({
      message: 'Inscripción eliminada'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error al cancelar inscripción'
    });

  }

};

exports.validarHoras = async (req, res) => {

  try {

    const inscription =
      await Inscription.findByPk(
        req.params.id,
        {
          include: Activity
        }
      );

    if (!inscription) {

      return res.status(404).json({
        message: 'Inscripción no encontrada'
      });

    }

    if (inscription.estado === 'completado') {

      return res.status(400).json({
        message: 'Horas ya validadas'
      });

    }

    inscription.estado = 'completado';

    await inscription.save();

    await SocialHours.create({
      usuario_id: inscription.usuario_id,
      actividad_id: inscription.actividad_id,
      horas: inscription.Activity.horas,
      fecha: new Date()
    });

    res.json({
      message: 'Horas validadas correctamente'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error al validar horas'
    });

  }

};