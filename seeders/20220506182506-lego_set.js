'use strict';

const { User } = require('../models')

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
   const userID = await User.findByPk(1).id
   const userID2 = await User.findByPk(2).id

    return queryInterface.bulkInsert('lego_sets', [
      {
        name: "Millennium Falcon UC",
        picture: ["https://www.lego.com/cdn/cs/set/assets/blt178f9eb5874999f3/75192-201909-PDP-Hero1-Standard-Large.jpg?fit=crop&format=jpg&quality=80&width=1600&height=500&dpr=1"],
        difficulty: 5,
        theme: "Star Wars",
        build_progress: "It was a journey. Took 48 total hours in a span of 5 days.",
        user_id: await User.findByPk(1).id,
        // user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Harry, Hermione, Ron & Hagrid Brick Headz",
        picture: ["https://www.lego.com/cdn/cs/set/assets/bltbc78df8e2ce91566/40495.jpg?fit=bounds&format=jpg&quality=80&width=1600&height=1600&dpr=1"],
        difficulty: 2,
        theme: "Harry Potter",
        build_progress: "Multiple figures to build. Great to build with a S.O. of friend.",
        user_id: await User.findByPk(2).id,
        // user_id: 2,
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
     return queryInterface.bulkDelete('lego_sets')
  }
};
