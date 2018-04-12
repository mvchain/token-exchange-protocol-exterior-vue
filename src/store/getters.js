const getters = {
  projectList: state => state.Home.projectList,
  projectInfo: state => state.Home.projectInfo,
  balance: state => state.Home.balance,
  transactionProObj: state => state.Home.transactionProObj,
  tokenList: state => state.Home.tokenList,
  withdrawInfo: state => state.Home.withdrawInfo,
  historyList: state => state.Home.historyList,
  orderList: state => state.Home.orderList,
  timeTxt: state => state.Home.timeTxt,
  tokenAddr: state => state.Home.tokenAddr,
  languageVal: state => state.Home.languageVal
};
export default getters;
