const PostService = require("../services/PostService");
const formatResponse = require("../utils/formatResponse");
const isInvalidId = require("../utils/isInvalidId");
const PostValidator = require("../utils/PostValidator");

class PostController {
  static async getPosts(req, res) {
    try {
      const posts = await PostService.getAllPosts();
      console.log(posts, "=============");

      if (posts.length === 0) {
        return res.status(200).json(formatResponse(200, "Постов нет", []));
      };
      const sort = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return res.status(200).json(formatResponse(200, "Все посты", posts));
    } catch (error) {
      console.log(error, "GETPOSTS");
      return res.status(500).json(formatResponse(500, "Ошибка на скрвере"));
    }
  }

  static async createPost(req, res) {
    // console.log(res.locals.user, 'LOCALS++++++');
    
    // console.log(req.body, "POSTCONTROLLER");
    const { title, img, desc, like } = req.body;
    const { id: authorId } = res.locals.user;
    
    
    console.log("title, img, desc, like", title, img, desc, like);
    
    const { isValid, error } = PostValidator.validate({
      title,
      // img,
      desc,
      // like,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Валидация не пройдена", null, error));
    }

    try {
      const newPost = await PostService.addPost({
        title,
        img,
        desc,
        like,
        authorId,
      });
      console.log('NEWPOST');
      
      if (!newPost) {
        return res.status(400).json(formatResponse(400, "Создание сорвалось"));
      }
      return res
        .status(201)
        .json(formatResponse(201, "Свершилось чудо", newPost));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "Печалька на сервере"));
    }
  }

  static async postsByUser(req, res) {
    try {
      const { authorId } = req.params;
      const result = await PostService.getAllPostByUser(authorId);
      res
        .status(200)
        .json(
          formatResponse(200, "Комментарий одного пользователя", result, null)
        );
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(
          formatResponse(
            500,
            "Не удалось получить комментарий одного пользователя",
            null,
            "Не удалось получить комментарий одного пользователя"
          )
        );
    }
  }

  static async getPostById(req, res) {
    const { id } = req.params;
    try {
      const onePost = await PostService.getOnePost(id);
      if (!onePost) {
        return res.status(400).json(formatResponse(400, "Пост не найден"));
      }
      return res.status(200).json(formatResponse(200, "Пост найден", onePost));
    } catch (error) {
      console.log(error);
      returnres.status(500).json(formatResponse(500, "Ошибка на сервере"));
    }
  }

  static async updatePost(req, res) {
    console.log("res.locals=========>", res.locals);
    try {
      const { id } = res.locals;
      // const { id: authorId } = res.locals.user;
      const  data  = req.body;

      const { isValid, error } = PostValidator.validate(data );
      if (!isValid) {
        return res
          .status(400)
          .json(formatResponse(400, "Валидация провалена", null, error));
      }
      const updatedPost = await PostService.editPost(
        data,
        id,
        // authorId
      );
      if (!updatedPost) {
        return res.status(400).json(formatResponse(400, "ПОСТ НЕ НАЙДЕН"));
      }
      return res
        .status(200)
        .json(formatResponse(200, "Успешно обновлен", updatedPost));
    } catch (error) {
      console.log(error);
      return res.status(500).json(formatResponse(500, "fffffОшибка на сервере"));
    }
  }

  static async deletePost(req, res) {
    const { id } = req.params;
    console.log(id, 'DDDDD222222222222');
    
    const user = res.locals.user;
    console.log(user, "UUUUUUUUUUUUUUUUUUUUUUUUUU");
    if (isInvalidId(id)) {
      return res.status(400).json(formatResponse(400, "Не валидный пост ID"));
    }
    try {
      const post = await PostService.delete(id, user.id);
      console.log("ВЫШЛИ ИЗ ДЕЛИТ");
      
      if (!post) {
        return res.status(400).json(formatResponse(404, "Пост не найден"));
      }
      return res.status(200).json(formatResponse(200, "УСПЕШНО"))
    } catch (error) {
      if (error.message.includes("Unauthorized")) {
        return res
          .status(403)
          .json(
            formatResponse(
              403,
              "No rights to delete this post",
              null,
              error.message
            )
          );
      }

      // Внутренняя ошибка сервера
      console.log(error);
      return res
        .status(500)
        .json(
          formatResponse(500, "Internal server error", null, error.message)
        );
    }

  }
}
module.exports = PostController;
