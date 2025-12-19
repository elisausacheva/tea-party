import { axiosInstance } from "../../shared/lib/axiosInstance";

export class CommentApi {
  static async getComments(teaID) {
    try {
      const response = await axiosInstance.get(`/comments/${teaID}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return { error: error.response?.data?.message || "Ошибка получения комментариев" };
    }
  }

  static async create(data) {
    try {
      // data должно содержать { text, teaID }
      const response = await axiosInstance.post("/comments", data); 
      return response.data;
    } catch (error) {
      console.error("Error creating comment:", error);
      return { error: error.response?.data?.message || "Ошибка при отправке" };
    }
  }
}