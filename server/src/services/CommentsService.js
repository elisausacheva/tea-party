const { Comment, User } = require('../../db/models');

class CommentService { // Правильное название
    /**
     * Получить все комментарии по teaID
     * @param {string} teaId - ID чая
     */
    static async getAllComments(teaID) { // Добавляем параметр
        return Comment.findAll({
            where: { teaID }, // Добавляем where условие
            order: [['createdAt', 'ASC']], // Добавляем сортировку
            include: [ // Подтягиваем данные автора
                {
                    model: User,
                    attributes: ['id', 'name', 'email']
                }
            ]
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