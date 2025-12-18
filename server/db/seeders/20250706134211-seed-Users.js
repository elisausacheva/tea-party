module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "admin",
        email: "admin@mail.ru",
        password: "Qwerty123!", // предположим, пароль уже хеширован
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
       {
        name: "Test",
        email: "test@mail.ru",
        password: "Qwerty123!", // предположим, пароль уже хеширован
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
