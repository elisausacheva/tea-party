const express = require("express");
const CommentsController = require('../controllers/Comments.controller');
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const router = express.Router();

// Получаем комментарии по teaId через query параметр
// GET /comment?teaId=123
router.get("/:teaID", CommentsController.getComments);

// Создаем комментарий с teaId в теле запроса
// POST /comment
router.post("/", verifyAccessToken, CommentsController.addComments);

module.exports = router;