const authRouter = require("express").Router();
// const path = require("path");
const AuthController = require("../controllers/Auth.controller");
const { checkBody } = require("../middlewares/checkBody");
const verifyRefreshToken = require("../middlewares/verifyRefreshToken");

authRouter
  .post("/register", checkBody, AuthController.register)
  .post("/login", checkBody, AuthController.logIn)
  .get("/logout", AuthController.logOut)
  .get("/refresh", verifyRefreshToken, AuthController.refreshTokens);

module.exports = authRouter;
