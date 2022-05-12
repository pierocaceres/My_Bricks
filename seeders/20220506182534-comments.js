'use strict';

const { User, Lego_set } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('comments', [
        {
          response: `Glad to see these figures aren't hard to Build. Will definitely grab to build with the kids.`,
          // user_id: User.findByPk(1).id,
          // lego_set_id: Lego_set.findByPk(2).id,
          user_id: 1,
          lego_set_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          response: `Most impressive! I've seen that in person and it looks challenging. I don't think I can tackle a huge set like that....yet. In due time.`,
          // user_id: User.findByPk(2).id,
          // lego_set_id: Lego_set.findByPk(2).id,
          user_id: 2,
          lego_set_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('comments')
  }
};
