import { login, registered, valiEmail, refreshToken, forget } from '@/services/index.js';
import { setToken, removeToken } from '@/utils/auth';
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
    FedLogOut: ({commit}) => {
      return new Promise(() => {
        return new Promise(resolve => {
          window.sessionStorage.clear();
          removeToken();
          resolve();
        });
      });
    },
    getReferToken: () => {
      const rToken = JSON.parse(window.sessionStorage.getItem('user')).refreshToken;
      setToken(rToken);
      return new Promise((resolve, reject) => {
        refreshToken().then(res => {
          setToken(res.data);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getForget: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        forget(payload).then(res => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default Login;
