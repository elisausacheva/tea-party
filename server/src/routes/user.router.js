const userRouter = require('express').Router()
const path = require('path')
const { checkId } = require('../middlewares/checkBody')
const UserController = require('../controllers/User.controller')
const verifyAccessToken = require('../middlewares/verifyAccessToken')

// userRouter.get("/register", (req, res) => {
//   console.log(req.query);
//   res.status(200).sendFile(path.resolve(__dirname, "../registerForm.html"));
// });

userRouter
  .get("/", UserController.getAll)
  .get("/:id", UserController.getOne)
  .delete("/:id", verifyAccessToken, checkId, UserController.delete)
  .put("/:id", verifyAccessToken, UserController.update);

module.exports = userRouter;

