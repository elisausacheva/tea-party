import { axiosInstance } from "../../shared/lib/axiosInstance";

export class TeaApi {
  static async getAll() {
    const { data } = await axiosInstance.get("/teas");
    return data; 
  }

  static async getTeaById(id) {
    const { data } = await axiosInstance.get(`/teas/${id}`);
    return data;
  }

  static async update(id, teaData) {
    const { data } = await axiosInstance.put(`/teas/${id}`, teaData);
    return data;
  }

  static async create(teaData) {
    const { data } = await axiosInstance.post("/teas", teaData);
    return data;
  }

  static async delete(id) {
    const { data } = await axiosInstance.delete(`/teas/${id}`);
    return data;
  }
}
