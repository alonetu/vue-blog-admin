export default {
  /** 登录信息 */
  login(state, obj) {
    state.user = obj;
  },
  /** 侧边栏是否展开状态 */
  collapse(state, collapse) {
    state.collapse = collapse;
  },
  /** 所有打开页面 */
  allOpenPage(state, allOpenPage) {
    state.allOpenPage = allOpenPage;
  }
}