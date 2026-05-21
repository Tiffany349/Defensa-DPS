const Activity = require('../models/Activity');

exports.getActivities = async (req, res) => {

  try {

    const activities = await Activity.findAll();

    res.json(activities);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error al obtener actividades'
    });

  }

};

exports.createActivity = async (req, res) => {

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
        message: 'Completa todos los campos'
      });

    }

    const activity = await Activity.create({
      titulo,
      descripcion,
      fecha,
      horas,
      cupos,
      ubicacion
    });

    res.status(201).json(activity);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error al crear actividad'
    });

  }

};

exports.updateActivity = async (req, res) => {

  try {

    const activity = await Activity.findByPk(
      req.params.id
    );

    if (!activity) {

      return res.status(404).json({
        message: 'Actividad no encontrada'
      });

    }

    await activity.update(req.body);

    res.json({
      message: 'Actividad actualizada'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error al actualizar actividad'
    });

  }

};

exports.deleteActivity = async (req, res) => {

  try {

    const activity = await Activity.findByPk(
      req.params.id
    );

    if (!activity) {

      return res.status(404).json({
        message: 'Actividad no encontrada'
      });

    }

    await activity.destroy();

    res.json({
      message: 'Actividad eliminada'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error al eliminar actividad'
    });

  }

};