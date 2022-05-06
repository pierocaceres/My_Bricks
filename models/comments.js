'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      Comments.belongsTo(models.Lego_set, {
        foreignKey: 'lego_set_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Comments.init({
    response: DataTypes.TEXT,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
	  },
    lego_set_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'lego_sets',
        key: 'id'
      }
	  }
  }, {
    sequelize,
    modelName: 'Comments',
	  tableName: 'comments'
  });
  return Comments;
};