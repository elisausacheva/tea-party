"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Получаем пользователей, чтобы узнать их id
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`
    );

    const userRows = users[0];

    await queryInterface.bulkInsert("Posts", [
      {
        title: "Vova нащебетал",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzyy52vMUN6x3M4Dg3PodOoVxHnAa-AFgtqA&s",
        desc: "Очень много написано, но не понятно",
        like: 1305,
        authorId: userRows[0].id, // например, Alice
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Artur нащебетал",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe2NamcepPXNzBY81SVp2NLHvzcyM_DIMYJw&s",
        desc: "Красиво написано, но фото не очень",
        like: 4504,
        authorId: userRows[2].id, // например, Alice
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Sanya",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVnhmMd0BtjG4YyaSpe6feLtMIUkuK07-iLSM3I9jrgywGc3JnoxyOCBg&s",
        desc: "Очень крутые фото",
        like: 1,
        authorId: userRows[1].id, // например, Bob
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Posts", null, {});
  },
};
