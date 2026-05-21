const { Activity } = require("../models");

const crearActividad = async (req, res) => {

  try {

    const {
      titulo,
      descripcion,
      fecha,
      horas,
      cupos,
      ubicacion
    } = req.body;

    if (
      !titulo ||
      !descripcion ||
      !fecha ||
      !horas ||
      !cupos ||
      !ubicacion
    ) {

      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
    }

    if (horas <= 0) {

      return res.status(400).json({
        message: "Las horas deben ser mayores a 0"
      });
    }

    if (cupos <= 0) {

      return res.status(400).json({
        message: "Los cupos deben ser mayores a 0"
      });
    }

    const actividad = await Activity.create({
      titulo,
      descripcion,
      fecha,
      horas,
      cupos,
      ubicacion
    });

    res.status(201).json(actividad);

  } catch (error) {

    res.status(500).json({
      message: "Error al crear actividad"
    });

  }
};

const obtenerActividades = async (req, res) => {

  try {

    const actividades = await Activity.findAll();

    res.json(actividades);

  } catch (error) {

    res.status(500).json({
      message: "Error al obtener actividades"
    });

  }
};

const eliminarActividad = async (req, res) => {

  try {

    const { id } = req.params;

    await Activity.destroy({
      where: { id }
    });

    res.json({
      message: "Actividad eliminada"
    });

  } catch (error) {

    res.status(500).json({
      message: "Error al eliminar actividad"
    });

  }
};

module.exports = {
  crearActividad,
  obtenerActividades,
  eliminarActividad
};