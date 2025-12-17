const UserService = require('../services/User.service')
const formatResponse = require('../utils/formatResponse')

class UserController{

    static async getAll(req, res) {
        try {
            const users = await UserService.getAllUsers()
            res
            .status(200)
                .json(formatResponse(
                    200, "Данных успешно получены", users));
        } catch ({message}) {
            console.log('GETALL', message);
            res
            .status(500)
            .json(
                formatResponse(
                500,
                "Внутренняя ошибка сервера GetAll",
                null,
                message
                )
            );
            
        }
    }

    static async getOne(req, res) {
        try {
            const { id } = req.params
            const user = await UserService.getOneUser(id)
            res
            .status(200)
            .json(formatResponse(200, "Пользователь получен", user));
        } catch ({ message }) {
            console.log(message);
            res
            .status(500)
            .json(
                formatResponse(
                500,
                "Не удалось получить пользователя",
                null,
                message
                )
            );
            
            
        }
    }

    static async update(req,res) {
        try {
            const { id } = req.params
            const { name, email, password } = req.body
            const updateUser = await UserService.updateUser(id, { name, email, password }) 
            res
            .status(200)
                .json(formatResponse(
                    200, 'Пользователь успешно обновлён', updateUser));
        } catch (error) {
            res.status(500),
            json(
                formatResponse(
                500,
                "Не удалось обновить пользователя",
                error.message
                )
            );
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params
            const result = await UserService.deleteUser(id)
            res
            .status(200)
                .json(formatResponse(
                    200, "Успешно удален"));
        } catch (error) {
            res
              .status(500)
              .json(formatResponse(500, "Ошибка на сервере", error.message));
        }
    }

}
module.exports = UserController