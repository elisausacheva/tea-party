const postRouter = require('express').Router();
const PostController = require("../controllers/PostController");
const validateId = require("../middlewares/validateId");
const verifyAccessToken = require("../middlewares/verifyAccessToken");



// const {
//   verifyRefreshToken,
//   verifyAccessToken,
// } = require("../middlewares/verifyTokens");

// экземляр маршрута

postRouter.get("/", PostController.getPosts);

postRouter.post("/", verifyAccessToken, PostController.createPost);
postRouter.delete("/:id", verifyAccessToken, PostController.deletePost);
postRouter.get("/:id",  PostController.getPostById);
postRouter.get("/user/:authorId",  PostController.postsByUser);

// console.log(validateId, "+++++++++VAL++++++++123");

postRouter.put(
  "/:id",
  verifyAccessToken,
  validateId,
  PostController.updatePost
);


module.exports = postRouter;
