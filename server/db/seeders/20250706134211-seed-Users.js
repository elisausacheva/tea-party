module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Vova",
        email: "v@example.com",
        password: "hashedpassword1", // предположим, пароль уже хеширован
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sanya",
        email: "s@example.com",
        password: "hashedpassword2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Artur",
        email: "a@example.com",
        password: "hashedpassword2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
