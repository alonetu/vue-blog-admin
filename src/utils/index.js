//guid
function getGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
    c
  ) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// 通过session获取所有已打开页面
function getAllOpenPage() {
  const firstPage = {
    icon: 'el-icon-data-analysis',
    label: '首页',
    path: '/home-page'
  }
  const state = sessionStorage.getItem('vuex');
  if(state && JSON.parse(state).allOpenPage) {
    return JSON.parse(state).allOpenPage;
  }
  return [firstPage];
}

export { getGuid, getAllOpenPage }