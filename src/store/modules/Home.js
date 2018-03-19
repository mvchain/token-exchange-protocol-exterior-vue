import { projectList, projectInfo } from '@/services/index.js';
const Home = {
  state: {
    projectList: {},
    projectInfo: {}
  },

  mutations: {
    SET_PROJECT_LIST: (state, projectList) => {
      state.projectList = projectList;
    },
    SET_PROJECT_INFO: (state, projectInfo) => {
      state.projectList = projectInfo;
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
    }
  }
};

export default Home;
