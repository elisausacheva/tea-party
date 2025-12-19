import axios from "../../shared/lib/axiosInstance";

export const TeaApi = {
  async getAll() {
    try {
      const response = await axios.get("/api/teas");
      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      return {
        statusCode: error.response?.status || 500,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  async create(teaData) {
    try {
      const response = await axios.post("/api/teas", teaData);
      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      return {
        statusCode: error.response?.status || 500,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  async update(id, teaData) {
    try {
      const response = await axios.put(`/api/teas/${id}`, teaData);
      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      return {
        statusCode: error.response?.status || 500,
        error: error.response?.data?.message || error.message,
      };
    }
  },

  async delete(id) {
    try {
      const response = await axios.delete(`/api/teas/${id}`);
      return {
        statusCode: response.status,
        data: response.data,
      };
    } catch (error) {
      return {
        statusCode: error.response?.status || 500,
        error: error.response?.data?.message || error.message,
      };
    }
  },
};
