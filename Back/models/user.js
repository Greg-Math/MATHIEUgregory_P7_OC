'use strict';

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    admin: DataTypes.BOOLEAN
  })
  User.associate = models => {
        models.User.hasMany(models.Post),
        models.User.hasMany(models.Like, {
          onDelete: "cascade",
          hooks: true
        }),
        models.User.hasMany(models.Comment)
      }
  return User
}