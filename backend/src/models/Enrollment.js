const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Enrollment = sequelize.define("Enrollment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  estado: {
    type: DataTypes.ENUM("inscrito", "completado", "cancelado"),
    defaultValue: "inscrito"
  }
}, {
  tableName: "inscripciones"
});

module.exports = Enrollment;