import { axiosInstance } from "../../shared/lib/axiosInstance";

export class UserApi {
  static async getAll() {
    const { data } = await axiosInstance.get("/users");
    return data;
  }

  static async getOne(id) {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  }

  // stati

  static async delete(id) {
    return await axiosInstance.delete(`/users/${id}`)
    
  }

  //! Начали регистрацию

  static async register(inputs) {
    const { data } = await axiosInstance.post("/auth/register", inputs);
    return data;
  }

  static async login(inputs) {
    const { data } = await axiosInstance.post("/auth/login", inputs);
    return data;
  }

  static async logOut() {
    const { data } = await axiosInstance.get("/auth/logout");
    return data;
  }

  static async refresh() {
    const { data } = await axiosInstance.get("auth/refresh");
    return data;
  }
}
