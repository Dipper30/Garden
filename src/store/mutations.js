export const mutations = {
  // 存储当前token
  setToken: (state, token) => {
    state.token = token
  },
  setCurrentAccount: (state, account) => {
    state.currentAccount = account
  },
  setUser: (state, user) => {
    state.user = user
  },
  setCurrentRoom: (state, room) => {
    state.currentRoom = room
  },
  setCurrentRoomUsers: (state, users) => {
    state.currentRoomUsers = users
  },
  toggleTabbar: (state, ifShow) => {
    state.showTabbar = ifShow
  },
  setTabIndex: (state, index) => {
    state.tabIndex = index
  },
  setSwitchTab: (state, bool) => {
    state.isSwitchTab = bool
  }
}
