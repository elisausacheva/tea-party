const { Comment } = require('../../db/models/comment');

class CommentService { // Правильное название
    /**
     * Получить все комментарии по teaID
     * @param {string} teaId - ID чая
     */
    static async getAllComments(teaId) { // Добавляем параметр
        return Comment.findAll({
            where: { teaId }, // Добавляем where условие
            order: [['createdAt', 'DESC']] // Добавляем сортировку
        });
    }
    
    /**
     * Создать комментарий
     * @param {Object} data - данные комментария
     */
    static async createComment(data) { // Правильное название
        return Comment.create(data);
    }
}

module.exports = CommentService;