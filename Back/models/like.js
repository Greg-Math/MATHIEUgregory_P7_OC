'use strict';

module.exports = (sequelize, DataTypes) => {
  let Like = sequelize.define('Like')
  Like.associate = models => {
    models.Like.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
        onDelete: "cascade",
        hooks: true
      }
    }),
    models.Like.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        onDelete: "cascade",
        hooks: true
      }
    })
  }
  return Like
}
