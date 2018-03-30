import { login, registered, valiEmail, refreshToken, forget } from '@/services/index.js';
import { removeAll, getToken, setToken, setToken2, setToken3 } from '@/utils/auth';
const Login = {
  state: {
  },
  mutations: {
  },
  actions: {
    getLogin: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        login(payload).then(res => {
          setToken3(payload.username);
          setToken(res.data.refreshToken);
          setToken2(res.data.token);
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
      return new Promise((resolve, reject) => {
        removeAll();
        resolve();
      });
    },
    getReferToken: () => {
      const rToken = getToken();
      setToken2(rToken);
      return new Promise((resolve, reject) => {
        refreshToken().then(res => {
          setToken2(res.data);
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
