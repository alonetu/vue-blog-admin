import moment from "moment";

// guid
function getGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
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

// 格式化时间
function formatTime(time) {
  // 时间戳格式化
  if(typeof time === 'number') {
    return moment(new Date(time)).format('YYYY-MM-DD HH:mm:ss');
  }
  return moment(time).format('YYYY-MM-DD HH:mm:ss');
}

// 重置表格方法
function resetForm(formName) {
  this.$refs[formName].resetFields();
}

export { getGuid, getAllOpenPage, formatTime, resetForm }