import { AuthProvider } from '@pankod/refine-core';
import { notification } from '@pankod/refine-antd';

import decodeJwt from 'jwt-decode';
import { TOKEN_KEY } from '../constants';
import { Config } from '../config';
import axios from 'axios';

export const authProvider = (): AuthProvider => {
  return {
    login: async ({ email, password }) => {
      let formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      const response = await axios({
        method: 'post',
        url: `${Config.apiEndpoint}/token`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          if (response.status < 200 || response.status >= 300) {
            return Promise.reject(response.data.detail);
          } else {
            const decodedToken: any = decodeJwt(response.data.access_token);
            if (decodedToken.permissions !== 'admin') {
              return Promise.reject('Forbidden');
            }
            localStorage.setItem(TOKEN_KEY, response.data.access_token);
            localStorage.setItem('permissions', decodedToken.permissions);
            return Promise.resolve();
          }
        })
        .catch((error) => {
          return Promise.reject(error.response.data.detail);
        });
    },
    updatePassword: async () => {
      notification.success({
        message: 'Updated Password',
        description: 'Password updated successfully',
      });
      return Promise.resolve();
    },
    resetPassword: async ({ email }) => {
      notification.success({
        message: 'Reset Password',
        description: `Reset password link sent to "${email}"`,
      });
      return Promise.resolve();
    },
    logout: () => {
      localStorage.removeItem(TOKEN_KEY);
      return Promise.resolve();
    },
    checkError: (error) => {
      if (error && error.statusCode === 401) {
        return Promise.reject(error.message);
      }
      return Promise.resolve();
    },
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
      const decodedToken: any = decodeJwt(token);
      return Promise.resolve({
        ...decodedToken.user,
        name: `${decodedToken?.user?.first_name || ''} ${
          decodedToken?.user?.last_name || ''
        }`,
        avatar: 'https://i.pravatar.cc/150',
      });
    },
  };
};
