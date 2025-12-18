const jwt = require("jsonwebtoken");

const formatResponse = require("../utils/formatResponse");

const { ACCESS_TOKEN_SECRET } = process.env;

const verifyAccessToken = (req, res, next) => {
  // console.log("==================", req.headers.authorization);

  try {
    // * проверяем наличие заголовка authorization
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json(
          formatResponse(401, "Токен доступа не предоставлен", null, "Authorization header is missing")
        );
    }

    // * из заголовков по ключу authorization получаем строку `Bearer ${accessToken}`
    // * сплитим её и достаём второй элемент
    const accessToken = req.headers.authorization.split(" ")[1];
    
    if (!accessToken) {
      return res
        .status(401)
        .json(
          formatResponse(401, "Токен доступа не найден", null, "Access token is missing")
        );
    }

    // console.log(" 12accessToken:", accessToken);
    const { user } = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    // console.log("==================", user);
    res.locals.user = user;

    next();
  } catch (error) {
    console.log("Invalid access token", error);
    res
      .status(401)
      .clearCookie("refreshTokenWhales")
      .json(
        formatResponse(401, "Неверный аксесс токен", null, error.message)
      );
  }
};

module.exports = verifyAccessToken;
