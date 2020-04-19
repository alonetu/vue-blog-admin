export default {
  login(state, obj) {
    state.user = obj;
  },
  defaultMenu(state, path) {
    state.path = path;
  }
}