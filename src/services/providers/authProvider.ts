import { AuthProvider } from "@pankod/refine-core";
import { notification } from "@pankod/refine-antd";

import decodeJwt from "jwt-decode";
import { TOKEN_KEY, API_URL } from "../constants";
import axios from "axios";

export const authProvider = (): AuthProvider => {
  return {
    login: async ({ email, password }) => {
      let formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      axios({
        method: "post",
        url: `${API_URL}/token`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          if (response.status < 200 || response.status >= 300) {
            Promise.reject(response.statusText);
            //   throw new Error(response.statusText);
          }
          return response;
        })
        .then((response: any) => {
          const decodedToken: any = decodeJwt(response.data.access_token);
          if (decodedToken.permissions !== "admin") {
            Promise.reject("Forbidden");
            //   throw new Error("Forbidden");
          }
          localStorage.setItem(TOKEN_KEY, response.data.access_token);
          localStorage.setItem("permissions", decodedToken.permissions);
          return Promise.resolve();
        });
    },
    updatePassword: async () => {
      notification.success({
        message: "Updated Password",
        description: "Password updated successfully",
      });
      return Promise.resolve();
    },
    resetPassword: async ({ email }) => {
      notification.success({
        message: "Reset Password",
        description: `Reset password link sent to "${email}"`,
      });
      return Promise.resolve();
    },
    logout: () => {
      localStorage.removeItem(TOKEN_KEY);
      return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        return Promise.resolve();
      }

      return Promise.reject();
    },
    getPermissions: () => Promise.resolve(),
    getUserIdentity: async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        return Promise.reject();
      }

      return Promise.resolve({
        id: 1,
        name: "James Sullivan",
        avatar: "https://i.pravatar.cc/150",
      });
    },
  };
};
