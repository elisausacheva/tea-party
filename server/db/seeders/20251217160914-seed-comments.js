"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Comments",
      [
        {
          text: "«Чашка чая — и мир становится чуть добрее»",
          userID: "2",
          teaID: "4",
        },
        {
          text: "«Лучший антидепрессант — ароматный чай и тихое утро».",
          userID: "2",
          teaID: "1",
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};
