const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database")

class User extends Model { }

User.init({
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
  password: { type: DataTypes.STRING, allowNull: false },
  firstAccess: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  sequelize,
  modelName: "user",
  timestamps: false
})

module.exports = User;