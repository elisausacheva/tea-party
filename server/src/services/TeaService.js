const { Tea } = require("../../db/models");

class TeaService {
  static async getAllTeas() {
    return await Tea.findAll();
  }
  static async getOneTea(id) {
    return await Tea.findByPk(id);
  }

  static async addTea({ name, sort, location, img, desc, userID }) {
    return await Tea.create({ name, sort, location, img, desc, userID });
  }

  static async editTea(data, id) {
    const oneTea = await TeaService.getOneTea(id);
    // console.log(')))))))))))))))))))))))))))))))))',oneTea);

    if (!oneTea) {
      throw new Error("Статья не найдена");
    }
    const newOneTea = await oneTea.update(data);
    return newOneTea;
  }

  // const oneArticle = await this.getOneArticle(id)
  // if (!oneArticle) {
  //   throw new Error('Статья не найдена');
  // }
  // const article = await oneArticle.update(data)
  // return article

  static async getAllTeaByUser(userID) {
    const reviews = await Tea.findAll({
      where: { userID },
    });
    return reviews;
  }

  static async delete(id, userID) {
    // console.log(id, userID, "---------11111CREATE--------");
    const tea = await Tea.findByPk(id);

    if (tea) {
      if (tea.authorId !== userID) {
        throw new Error("Hельзя удалить чужой");
      }
      await tea.destroy();
      // console.log(post, "---------DESTRROY1111111--------");
    }
    return tea;
  }
}
module.exports = TeaService;
