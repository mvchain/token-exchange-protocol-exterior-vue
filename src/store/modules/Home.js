import { projectList, projectInfo, balance, transaction, transactionPro, tokenList, withdrawInfo, withdraw, getHistory, modifyEmail, modifyPwd, modifyTx, orderServer } from '@/services/index.js';
const Home = {
  state: {
    projectList: {},
    projectInfo: {},
    balance: [],
    transactionProObj: {},
    tokenList: [],
    withdrawInfo: {},
    historyList: {},
    orderList: {}
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
    },
    SET_TRANSACTION_OBJ: (state, transactionProObj) => {
      state.transactionProObj = transactionProObj;
    },
    SET_TOKEN_LIST: (state, tokenList) => {
      state.tokenList = tokenList;
    },
    SET_WITHDRAW_INFO: (state, withdrawInfo) => {
      state.withdrawInfo = withdrawInfo;
    },
    SET_HISTORY_LIST: (state, historyList) => {
      state.historyList = historyList;
    },
    SET_ORDER_LIST: (state, orderList) => {
      state.orderList = orderList;
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
    },
    getTransactionPro: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        transactionPro(payload).then((res) => {
          commit('SET_TRANSACTION_OBJ', res.data);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getTokenList: ({commit, state}) => {
      return new Promise((resolve, reject) => {
        tokenList().then((res) => {
          commit('SET_TOKEN_LIST', res.data);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getWithdrawInfo: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        withdrawInfo(payload).then((res) => {
          commit('SET_WITHDRAW_INFO', res.data);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getWithdraw: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        withdraw(payload).then(() => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getctHistory: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        getHistory(payload).then((res) => {
          commit('SET_HISTORY_LIST', res.data);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    modifyEmail: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        modifyEmail(payload).then(() => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    modifyPwdHandler: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        modifyPwd(payload).then(() => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    modifyTxHandler: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        modifyTx(payload).then(() => {
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    getOrderList: ({commit, state}, payload) => {
      return new Promise((resolve, reject) => {
        orderServer(payload).then((res) => {
          commit('SET_ORDER_LIST', res.data);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default Home;
