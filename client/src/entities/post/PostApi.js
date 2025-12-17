import { axiosInstance } from "../../shared/lib/axiosInstance";

export class PostApi {
  static async getAll() {
    const { data } = await axiosInstance.get("/posts");
    return data;
  }

  static async getPostById(id) {
    const { data } = await axiosInstance.get(`/posts/${id}`);
    return data;
  }

  static async update(id, postData) {
    const { data } = await axiosInstance.put(`/posts/${id}`, postData);

    console.log("UPDATE==========>", postData);
    
    return data;
  }

  static async create(postData) {
    // console.log(postData, 'POSTDATA++++++++++++++');
    
    const { data } = await axiosInstance.post("/posts", postData);
    return data;
  }

  static async getAllByUser(authorId) {
    const { data } = await axiosInstance.get(`/posts/user/${authorId}`);
    return data;
  }

  static async delete(id) {
    
    const { data } = await axiosInstance.delete(`/posts/${id}`);
    return data;
  }
}