<template>
  <div class="user-add">
    <el-form
      :model="editData"
      status-icon
      ref="editData"
      label-width="100px"
      class="user-add-ruleForm"
    >
      <el-form-item
        label="姓名"
        prop="user_cname"
        :rules="[
          { required: true, message: '姓名不能为空' }
        ]"
      >
        <el-input 
          type="text" 
          v-model="editData.user_cname" 
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="账号"
        prop="user_name"
        :rules="[
          { required: true, message: '账号不能为空' }
        ]"
      >
        <el-input 
          type="text" 
          v-model="editData.user_name" 
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="user_password"
        :rules="[
          { required: true, message: '密码不能为空' }
        ]"
      >
        <el-input 
          type="password" 
          v-model="editData.user_password" 
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="部门"
        prop="user_department"
        :rules="[
          { required: true, message: '部门必填项' }
        ]"
      > 
        <el-input v-model.number="editData.user_department"></el-input>
      </el-form-item>
      <el-form-item
        label="职位"
        prop="user_role"
        :rules="[
          { required: true, message: '职位必填项' }
        ]"
      >
        <el-input v-model.number="editData.user_role"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('editData', editData)">提交</el-button>
        <el-button @click="resetForm('editData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import API from "../api";
// 格式化时间组件
import moment from 'moment';

export default {
  name: "user-edit",
  props: {
    editData: {
      type: Object,
      default: () => {}
    },
    editType: {
      type: Number,
      default: null
    }
  },
  methods: {
    /**
     * 提交验证表单
     */
    submitForm(formName, data) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (2 === this.editType) {
            this.addUser(data);
          } else if (1 === this.editType) {
            this.updateUser(data);
          }
        } else {
          return false;
        }
        this.getUsers();
      });
    },
    /**
     * 添加用户
     * @param user_cname 用户中文名称
     * @param user_name 用户账号
     * @param user_password 用户密码
     * @param user_department 用户所在部门
     * @param user_role 用户角色
     * @param create_time 创建时间
     * @param update_time 更新时间
     */
    async addUser(data) {
      let params = {
        user_cname: data.user_cname,
        user_name: data.user_name,
        user_password: data.user_password,
        user_department: data.user_department,
        user_role: data.user_role,
        create_time: this.formatTime(new Date()),
        update_time: ''
      }
      try {
        let result = await API.addUser(params);
        let { code } = result;
        if (200 === code) {
          this.$notify.success({
            message: "添加用户成功",
            showClose: false,
            duration: 800
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * 更新用户
     * @param id 用户id
     * @param user_cname 用户中文名称
     * @param user_name 用户账号
     * @param user_password 用户密码
     * @param user_department 用户所在部门
     * @param user_role 用户角色
     * @param create_time 创建时间
     * @param update_time 更新时间
     */
    async updateUser(data) {
      let params = {
        id: data.id,
        user_cname: data.user_cname,
        user_name: data.user_name,
        user_password: data.user_password,
        user_department: data.user_department,
        user_role: data.user_role,
        create_time: data.create_time,
        update_time: this.formatTime(new Date())
      }
      try {
        let result = await API.updateUser(params);
        let { code } = result;
        if (200 === code) {
          this.$notify.success({
            message: "修改用户成功",
            showClose: false,
            duration: 800
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * 重置表格方法
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 父子组件传值
     * 向父组件发送事件，获取用户列表
     */
    getUsers() {
      this.$emit("getUserList");
    },
    /**
     * 格式化时间
     */
    formatTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>

<style lang="less">
.user-add {
  .user-add-ruleForm {
    input {
      width: 90%;
      height: 32px;
    }
  }
}
</style>