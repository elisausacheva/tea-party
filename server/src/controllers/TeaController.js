const TeaService = require("../services/TeaService");
const formatResponse = require("../utils/formatResponse");
const isInvalidId = require("../utils/isInvalidId");
const TeaValidator = require("../utils/TeaValidator");

class TeaController {
  static async getTeas(req, res) {
    try {
      const teas = await TeaService.getAllTeas();
      //   console.log(teas, "=============");

      if (teas.length === 0) {
        return res.status(200).json(formatResponse(200, "Постов нет", []));
      }
      const sortTea = teas.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return res.status(200).json(formatResponse(200, "Все посты", sortTea));
    } catch (error) {
      console.log(error, "GETTEAS");
      return res.status(500).json(formatResponse(500, "Ошибка на скрвере"));
    }
  }

  static async createTeas(req, res) {
    // console.log(res.locals.user, 'LOCALS++++++');

    // console.log(req.body, "TEACONTROLLER");
    const { name, sort, location, img, desc } = req.body;
    const { id: userID } = res.locals.user;

    //console.log("title, img, desc, like", title, img, desc, like);

    const { isValid, error } = TeaValidator.validate({
      name,
      desc,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Валидация не пройдена", null, error));
    }

    try {
      const newTea = await TeaService.addTea({
        name,
        sort,
        location,
        img,
        desc,
        userID: userID,
      });
      console.log("NEWTEA");

      if (!newTea) {
        return res.status(400).json(formatResponse(400, "Создание сорвалось"));
      }
      return res.status(201).json(formatResponse(201, "Создали", newTea));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "Server Error"));
    }
  }

  static async teasByUser(req, res) {
    try {
      const { userID } = req.params;
      const result = await TeaService.getAllTeaByUser(userID);
      res
        .status(200)
        .json(
          formatResponse(200, "Чаи одного пользователя", result, null)
        );
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(
          formatResponse(
            500,
            "Не удалось получить чай одного пользователя",
            null,
            "Не удалось получить чай одного пользователя"
          )
        );
    }
  }

  static async getTeaById(req, res) {
    const { id } = req.params;
    try {
      const oneTea = await TeaService.getOneTea(id);
      if (!oneTea) {
        return res.status(400).json(formatResponse(400, "Чай не найден"));
      }
      return res.status(200).json(formatResponse(200, "Чай найден", oneTea));
    } catch (error) {
      console.log(error);
      returnres.status(500).json(formatResponse(500, "Server Error"));
    }
  }

  static async updateTea(req, res) {
    console.log("res.locals=========>", res.locals);
    try {
      const { id } = res.locals;
      // const { id: userID } = res.locals.user;
      const data = req.body;

      const { isValid, error } = TeaValidator.validate(data);
      if (!isValid) {
        return res
          .status(400)
          .json(formatResponse(400, "Валидация провалена", null, error));
      }
      const updatedTea = await TeaService.editTea(
        data,
        id
        // authorId
      );
      if (!updatedTea) {
        return res.status(400).json(formatResponse(400, "ЧАЙ НЕ НАЙДЕН"));
      }
      return res
        .status(200)
        .json(formatResponse(200, "Успешно обновлен", updatedTea));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "Server Error"));
    }
  }

  static async deleteTea(req, res) {
    const { id } = req.params;
    // console.log(id, "DDDDD222222222222");

    const user = res.locals.user;
    // console.log(user, "UUUUUUUUUUUUUUUUUUUUUUUUUU");
    if (isInvalidId(id)) {
      return res.status(400).json(formatResponse(400, "Не валидный ID"));
    }
    try {
      const tea = await TeaService.delete(id, user.id);
      //console.log("ВЫШЛИ ИЗ ДЕЛИТ");

      if (!tea) {
        return res.status(400).json(formatResponse(404, "Пост не найден"));
      }
      return res.status(200).json(formatResponse(200, "УСПЕШНО"));
    } catch (error) {
      if (error.message.includes("Unauthorized")) {
        return res
          .status(403)
          .json(
            formatResponse(403, "No rights to delete", null, error.message)
          );
      }

      // Внутренняя ошибка сервера
      console.log(error);
      return res
        .status(500)
        .json(
          formatResponse(500, "Internal server error", null, error.message)
        );
    }
  }
}
module.exports = TeaController;
