const indexRouter = require("express").Router();
const postRouter = require("../routes/postRouter");
const formatResponse = require("../utils/formatResponse");
const authRouter = require("./auth.router");
const teaRouter = require("./tea.router");
const userRouter = require("./user.router");
const commentsRouter = require('../routes/coments.router')

indexRouter.use("/posts", postRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/users", userRouter);
indexRouter.use('/comments', commentsRouter);

indexRouter.use((req, res) => {
  res.status(404).json(formatResponse(404, "НЕ НАЙДЕН123"));
});
module.exports = indexRouter;
