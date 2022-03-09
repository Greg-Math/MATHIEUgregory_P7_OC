'use strict';

module.exports = (sequelize, DataTypes) => {
  let Comment = sequelize.define('Comment', {
    content: DataTypes.STRING
  })
  Comment.associate = models => {
    models.Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    }),
    models.Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Comment
}