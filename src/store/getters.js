export const getters = {
  getToken: state => {
    return state.token
  },
  getCurrentAccount: state => {
    return state.currentAccount
  },
  getUser: state => {
    return state.user
  },
  getUserID: state => {
    return state.user?.id
  },
  getCurrentRoom: state => {
    return state.currentRoom
  },
  getTabbar: state => {
    return state.showTabbar
  }
}
