const {
  Inscription,
  Activity
} = require('../models');

const crearInscripcion = async (req, res) => {

  try {

    const {
      usuario_id,
      actividad_id
    } = req.body;

    const actividad =
      await Activity.findByPk(actividad_id);

    if (!actividad) {

      return res.status(404).json({
        message: 'Actividad no encontrada'
      });

    }

    if (actividad.cupos <= 0) {

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

    const nuevaInscripcion =
      await Inscription.create({
        usuario_id,
        actividad_id
      });

    await actividad.update({
      cupos: actividad.cupos - 1
    });

    res.status(201).json({
      message: 'Inscripción creada',
      nuevaInscripcion
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error al inscribirse'
    });

  }
};

const obtenerInscripciones = async (req, res) => {

  try {

    const inscripciones =
      await Inscription.findAll();

    res.json(inscripciones);

  } catch (error) {

    res.status(500).json({
      message: 'Error al obtener inscripciones'
    });

  }
};

const eliminarInscripcion = async (req, res) => {

  try {

    const { id } = req.params;

    const inscripcion =
      await Inscription.findByPk(id);

    if (!inscripcion) {

      return res.status(404).json({
        message: 'Inscripción no encontrada'
      });

    }

    const actividad =
      await Activity.findByPk(
        inscripcion.actividad_id
      );

    if (actividad) {

      await actividad.update({
        cupos: actividad.cupos + 1
      });

    }

    await inscripcion.destroy();

    res.json({
      message: 'Inscripción eliminada'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error al eliminar inscripción'
    });

  }
};

module.exports = {
  crearInscripcion,
  obtenerInscripciones,
  eliminarInscripcion
};