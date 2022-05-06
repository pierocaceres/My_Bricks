'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lego_set extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lego_set.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      Lego_set.hasMany(models.Comments, {
        foreignKey: 'lego_set_id',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    }
  }
  Lego_set.init({
    name: DataTypes.STRING,
    picture: DataTypes.TEXT,
    difficulty: DataTypes.INTEGER,
    theme: DataTypes.STRING,
    build_progress: DataTypes.TEXT,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
	  }
  }, {
    sequelize,
    modelName: 'Lego_set',
    tableName: 'lego_sets'
  });
  return Lego_set;
};