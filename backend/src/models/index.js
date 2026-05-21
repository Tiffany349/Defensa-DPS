const User = require("./User");
const Activity = require("./Activity");
const Inscription = require("./Inscription");
const SocialHours = require("./SocialHours");

User.hasMany(Inscription, {
  foreignKey: "usuario_id"
});

Activity.hasMany(Inscription, {
  foreignKey: "actividad_id"
});

Inscription.belongsTo(User, {
  foreignKey: "usuario_id"
});

Inscription.belongsTo(Activity, {
  foreignKey: "actividad_id"
});

User.hasMany(SocialHours, {
  foreignKey: "usuario_id"
});

SocialHours.belongsTo(User, {
  foreignKey: "usuario_id"
});

Activity.hasMany(SocialHours, {
  foreignKey: "actividad_id"
});

SocialHours.belongsTo(Activity, {
  foreignKey: "actividad_id"
});

module.exports = {
  User,
  Activity,
  Inscription,
  SocialHours
};