const teaRouter = require("express").Router();
const TeaController = require("../controllers/TeaController");
const validateId = require("../middlewares/validateId");
const verifyAccessToken = require("../middlewares/verifyAccessToken");

// const {
//   verifyRefreshToken,
//   verifyAccessToken,
// } = require("../middlewares/verifyTokens");

// экземляр маршрута

teaRouter.get("/", TeaController.getTeas);

teaRouter.post("/", verifyAccessToken, TeaController.createTeas);
teaRouter.delete("/:id", verifyAccessToken, TeaController.deleteTea);
teaRouter.get("/:id", TeaController.getTeaById);
teaRouter.get("/user/:userID", TeaController.teasByUser);

// console.log(validateId, "+++++++++VAL++++++++123");

teaRouter.put("/:id", verifyAccessToken, validateId, TeaController.updateTea);

module.exports = teaRouter;
