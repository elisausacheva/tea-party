const jwt = require("jsonwebtoken");

const formatResponse = require("../utils/formatResponse");

const { ACCESS_TOKEN_SECRET } = process.env;

const verifyAccessToken = (req, res, next) => {
  // console.log("==================", req.headers.authorization);

  try {
    // * из заголовков по ключу authorization получаем строку `Bearer, ${accessToken}`
    // * сплитим её и достаё второй элемент
    const accessToken = req.headers.authorization.split(" ")[1];
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
        formatResponse({
          statusCode: 401,
          message: "Неверный аксесс токен",
          error: error.message,
        })
      );
  }
};

module.exports = verifyAccessToken;
