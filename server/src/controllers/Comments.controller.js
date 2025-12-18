const CommentService = require('../services/CommentsService'); // Исправляем название
const formatResponse = require("../utils/formatResponse");
const { Comment } = require('../../db/models/comment');

class CommentController {
    static async getComments(req, res) {
        try {
            const { teaId } = req.query; // Получаем teaId из query параметров
            if (!teaId) {
                return res.status(400).json(formatResponse(400, "Не указан teaId"));
            }
            
            const comments = await CommentService.getAllComments(teaId); // Передаем teaId
            
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
            
            const { text, teaId } = req.body; // teaId, а не teaID.id
            
            // Валидация через модель Comment (если есть метод validate)
            if (Comment.validate) {
                const { isValid, err } = Comment.validate({ text });
                if (!isValid) {
                    return res.status(400).json(formatResponse(400, "Валидация не прошла", null, err));
                }
            }
            
            // Создаем комментарий
            const newComment = await CommentService.createComment({
                text,
                userId: user.id,
                teaId // Просто teaId из req.body
            });
            
            return res.status(201).json(formatResponse(201, "Комментарий создан", newComment));
        } catch (error) {
            console.log(error);
            return res.status(500).json(formatResponse(500, "Server Error"));
        }
    }
}

module.exports = CommentController;