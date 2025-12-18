import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

let accessToken = "";

export function setAccessToken(token) {
  accessToken = token;
}

axiosInstance.interceptors.request.use((config) => {
  // console.log(
  //   "axiosInstance.interceptors.request config, accessToken",
  //   config,
  //   accessToken
  // );
  if (!config.headers.authorization && accessToken) {
    // console.log("axiosInstance.interceptors.request accessToken", accessToken);

    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response?.status === 403 && !prevRequest.sent) {
      try {
        const response = await axiosInstance.get("/auth/refresh");
        const newAccessToken = response.data.data.accessToken;
        setAccessToken(newAccessToken);
        prevRequest.sent = true;
        prevRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(prevRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
