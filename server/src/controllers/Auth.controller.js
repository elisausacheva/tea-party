const bcrypt = require('bcrypt')
const UserService = require('../services/User.service')
const formatResponse = require('../utils/formatResponse')

const UserValidator = require('../utils/User.validator')
const cookieConfig = require('../configs/cookieConfig')
const generateToken = require('../utils/generateTokens')

class AuthController {
static async refreshTokens(req, res) {
    try {
    const { user } = res.locals;
    console.log("-----вход--------", user);
    const { accessToken, refreshToken } = generateToken({
        user,
    });
    return res
        .status(200)
        .cookie("refreshTokenWhales", refreshToken, cookieConfig.refresh)
        .json(
        formatResponse(200, "Успешно продлена пользовательская сессия", {
            user,
            accessToken,
        })
        );
    } catch ({ message }) {
    console.log(
        "=============AuthController.refreshTokens=============",
        message
    );
    return res
        .status(401)
        .json(formatResponse(401, "Invalid refreshToken", null, message));
    }
}

static async register(req, res) {
    try {
    const { name, email, password } = req.body;
    const { isValid, error } = UserValidator.validate({
        name,
        email,
        password,
    });
    if (!isValid) {
        return res
        .status(400)
        .json(formatResponse(400, "Валидация не прошла", null, error));
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const normalizedEmail = email.toLowerCase();

        const userFound = await UserService.getByEmail(normalizedEmail);
        if (userFound) {
        return res
            .status(400)
            .json(
            formatResponse(
                400,
                "Пользователь с таким email уже существует",
                null,
                "Пользователь с таким email уже существует"
            )
            );
        } else {
        const user = await UserService.registerUser({
            name,
            email: normalizedEmail,
            password: hashedPassword,
        });
          // * Удаление пароля
        delete user.password;
        console.log(" user:+++++++++++", user);
          // ! Заталкивай user в generateToken через объект
        const { accessToken, refreshToken } = generateToken({ user });

        return res
            .status(200)
            .cookie("refreshTokenWhales", refreshToken, cookieConfig.refresh)
            .json(
            formatResponse(200, "Пользователь успешно зарегистрирован", {
                accessToken,
                user,
            })
            );
        }
    }
    } catch (error) {
    console.log(error);
    return res
        .status(500)
        .json(
        formatResponse(500, "Не удалось создать пользователя", null, error.message)
        );
    }
}

static async logIn(req, res) {
    try {
    const { email, password } = req.body;
// console.log('ПОЧТА ПАРОЛЬ',email, password);

    const { isValid, error } = UserValidator.validateIn({
      email,
      password,
    });
    console.log("++++++++++++++isvalid", isValid);

    if (!isValid) {
        return res
        .status(400)
        .json(
            formatResponse(400, "А вот не войдешь, не войдешь", null, error)
        );
    }

    const normalizedEmail = email.toLowerCase();

    const userFound = await UserService.getByEmail(normalizedEmail);

    if (!userFound) {
        return res
        .status(400)
        .json(
            formatResponse(
            400,
            "Пользователь с такой почтой не найден",
            null,
            "Пользователь с такой почтой не найден"
            )
        );
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        userFound.password
    );

    if (!isPasswordValid) {
        return res
        .status(400)
        .json(
            formatResponse(400, "Неверный пароль", null, "Неверный пароль")
        );
    }

    delete userFound.password;

    const { accessToken, refreshToken } = generateToken({
        user: userFound,
    });

    return res
        .status(200)
        .cookie("refreshTokenWhales", refreshToken, cookieConfig.refresh)
        .json(
        formatResponse(200, "Успешный вход", { user: userFound, accessToken })
        );
    } catch ({ message }) {
    console.log(message);
    return res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
}

static logOut(req, res) {
    try {
    res
        .clearCookie("refreshTokenWhales")
        .json(formatResponse(200, "Успешно вышли"));
    } catch ({ message }) {
    console.log("=============UserController.signOut=============", message);
    return res
        .status(500)
        .json(formatResponse(500, "Внутренняя ошибка сервера", null, message));
    }
}
}
module.exports = AuthController;