const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inscription = sequelize.define("Inscription", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  estado: {
    type: DataTypes.ENUM(
      "inscrito",
      "completado",
      "cancelado"
    ),
    defaultValue: "inscrito"
  }
}, {
  tableName: "inscripciones"
});

module.exports = Inscription;