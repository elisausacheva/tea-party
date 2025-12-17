const { Post } = require("../../db/models")

class PostService {
  static async getAllPosts() {
    return await Post.findAll();
  }

  static async getOnePost(id) {
    return await Post.findByPk(id);
  }

  static async addPost(data) {
    return await Post.create(data);
  }

  static async editPost(data, id) {
    const onePost = await PostService.getOnePost(id);
    // console.log(')))))))))))))))))))))))))))))))))',onePost);
    
    if (!onePost) {
      throw new Error("Статья не найдена");
    } 
    const newOnePost = await onePost.update(data)
    return newOnePost
    }
  
    // const oneArticle = await this.getOneArticle(id)
    // if (!oneArticle) {
    //   throw new Error('Статья не найдена');
    // }
    // const article = await oneArticle.update(data)
    // return article

  static async getAllPostByUser(authorId) {
    const reviews = await Post.findAll({
      where: { authorId },
    });
    return reviews;
  }

  static async delete(id, authorId) {
    // console.log(id, authorId, "---------11111CREATE--------");
    const post = await Post.findByPk(id);
    
    if (post) {
      if (post.authorId !== authorId) {
        throw new Error("Hельзя удалить чужой пост");
      }
      await post.destroy();
      // console.log(post, "---------DESTRROY1111111--------");
    }
    return post;
  }
}
module.exports = PostService;
