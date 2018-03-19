import { login, registered, valiEmail, refreshToken } from '@/services/index.js';
import { setToken, getToken } from '@/utils/auth';
const Login = {
  state: {
  },
  mutations: {
  },
  actions: {
    getLogin: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        login(payload).then(res => {
          window.sessionStorage.setItem('user', JSON.stringify({refreshToken: res.data.refreshToken, username: payload.username}));
          setToken(res.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getRegistered: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        registered(payload).then(res => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getValiEmail: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        valiEmail(payload).then(res => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    FedLogOut: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        valiEmail(payload).then(res => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getReferToken: () => {
      const rToken = getToken();
      let user = JSON.parse(window.sessionStorage.getItem('user'));
      return new Promise((resolve, reject) => {
        refreshToken(rToken).then(res => {
          window.sessionStorage.setItem('user', JSON.stringify({refreshToken: res.data.refreshToken, username: user.username}));
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default Login;
