const { Activity } = require("../models");

const createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);

    res.status(201).json({
      message: "Actividad creada",
      activity
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al crear actividad"
    });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();

    res.json(activities);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener actividades"
    });
  }
};

const deleteActivity = async (req, res) => {
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
  createActivity,
  getActivities,
  deleteActivity
};