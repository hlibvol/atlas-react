import { HttpError } from "@pankod/refine-core";
import axios, { AxiosRequestConfig } from "axios";
import { TOKEN_KEY } from "../constants";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    if (request.headers) {
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      request.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message || error.response?.data?.detail,
      statusCode: error.response?.status || error.response?.statusCode,
    };

    return Promise.reject(customError);
  }
);

export default axiosInstance;
