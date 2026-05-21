const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SocialHours = sequelize.define("SocialHours", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  actividad_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  horas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  }

}, {
  tableName: "horas_sociales"
});

module.exports = SocialHours;