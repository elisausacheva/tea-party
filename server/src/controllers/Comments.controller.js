const CommentService = require("../services/CommentsService"); // Исправляем название
const formatResponse = require("../utils/formatResponse");
const { Comment } = require("../../db/models");

class CommentController {
  static async getComments(req, res) {
    try {
      const { teaID } = req.params; // Получаем teaId из query параметров
      if (!teaID) {
        return res.status(400).json(formatResponse(400, "Не указан teaId"));
      }

      const comments = await CommentService.getAllComments(teaID); // Передаем teaID

      if (comments.length === 0) {
        return res.json(formatResponse(200, "Комментариев нет"));
      }

      return res.status(200).json(formatResponse(200, "Успешно", comments));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "Server Error"));
    }
  }

  static async addComments(req, res) {
    try {
      const { user } = res.locals;

      if (!req.body) {
        return res.status(400).json(formatResponse(400, "Заполни данные"));
      }

      const { text, teaID } = req.body; // teaId, а не teaID.id

      // Валидация через модель Comment (если есть метод validate)
      if (!text || text.trim().length === 0) {
        return res
          .status(400)
          .json(formatResponse(400, "Комментарий не может быть пустым"));
      }

      // Создаем комментарий
      const newComment = await CommentService.createComment({
        text,
        userID: user.id,
        teaID, // Просто teaId из req.body
      });

      return res
        .status(201)
        .json(formatResponse(201, "Комментарий создан", newComment));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "Server Error"));
    }
  }
}

module.exports = CommentController;
