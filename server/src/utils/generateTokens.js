require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwtConfig");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

// * payload - полезная нагрузка - user { login, mail, ....}
const generateToken = (payload) => ({
  accessToken: jwt.sign(payload, ACCESS_TOKEN_SECRET, jwtConfig.access),
  refreshToken: jwt.sign(payload, REFRESH_TOKEN_SECRET, jwtConfig.refresh),
});

module.exports = generateToken;
