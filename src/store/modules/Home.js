import { projectList, projectInfo, balance, transaction } from '@/services/index.js';
const Home = {
  state: {
    projectList: {},
    projectInfo: {},
    balance: {}
  },

  mutations: {
    SET_PROJECT_LIST: (state, projectList) => {
      state.projectList = projectList;
    },
    SET_PROJECT_INFO: (state, projectInfo) => {
      state.projectInfo = projectInfo;
    },
    SET_BALANCE: (state, balance) => {
      state.balance = balance;
    }
  },

  actions: {
    getProjectList: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        projectList(payload).then(res => {
          commit('SET_PROJECT_LIST', res.data);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getProjectInfo: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        projectInfo(payload).then(res => {
          commit('SET_PROJECT_INFO', res.data);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getBalance: ({commit, state}) => {
      return new Promise((resolve, reject) => {
        balance().then(res => {
          commit('SET_BALANCE', res.data);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getTransaction: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        transaction(payload).then(() => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default Home;
