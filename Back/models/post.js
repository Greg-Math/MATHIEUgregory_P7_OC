'use strict';

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER,
  })
  Post.associate = models => {
    models.Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    }),
    models.Post.hasMany(models.Like, {
      onDelete: "cascade",
      hooks: true
    }),
    models.Post.hasMany(models.Comment, {
      onDelete: "cascade",
      hooks: true
    })
  }
  return Post
}