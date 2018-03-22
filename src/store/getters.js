const getters = {
  projectList: state => state.Home.projectList,
  projectInfo: state => state.Home.projectInfo,
  balance: state => state.Home.balance,
  transactionProObj: state => state.Home.transactionProObj,
  tokenList: state => state.Home.tokenList,
  withdrawInfo: state => state.Home.withdrawInfo,
  historyList: state => state.Home.historyList,
  orderList: state => state.Home.orderList
};
export default getters;
