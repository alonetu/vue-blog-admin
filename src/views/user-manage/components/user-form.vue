<template>
  <el-dialog :title="editTitle" :visible="editVisible" @close="handleClose" width="30%">
    <el-form :model="formData" status-icon ref="formData" label-width="60px">
      <el-form-item
        label="姓名"
        prop="cname"
        :rules="[
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '姓名长度2-10位', trigger: 'blur' }
        ]"
      >
        <el-input type="text" v-model="formData.cname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="账号"
        prop="name"
        :rules="[
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 15, message: '账号长度3-10位', trigger: 'blur' }
        ]"
      >
        <el-input type="text" v-model="formData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, message: '密码长度最低3位', trigger: 'blur' }
        ]"
      >
        <el-input type="password" v-model="formData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="部门"
        prop="department"
        :rules="[
          { required: true, message: '部门必填项', trigger: 'blur' },
          { min: 2, message: '部门名称最低2位', trigger: 'blur' }
        ]"
      >
        <el-input v-model.number="formData.department"></el-input>
      </el-form-item>
      <el-form-item
        label="职位"
        prop="role"
        :rules="[
          { required: true, message: '职位必填项', trigger: 'blur' }
        ]"
      >
        <el-input v-model.number="formData.role"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submitForm('formData', formData)">提交</el-button>
        <el-button size="small" @click="resetForm('formData')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import API from "../api";
import { formatTime } from "@/utils/";

export default {
  name: "user-edit",
  props: {
    editTitle: {
      type: String,
    },
    editData: {
      type: Object,
      default: () => {},
    },
    editType: {
      type: Number,
      default: null,
    },
    editVisible: {
      type: Boolean,
      default: false,
    },
    oncancel: {
      type: Function,
      default: () => {},
    },
  },
  watch: {
    editData: {
      handler(val) {
        this.formData = JSON.parse(JSON.stringify(val)); // 使用深拷贝, 以免影响父组件中的数据
      },
      deep: true,
    },
  },
  data() {
    return {
      formData: {
        cname: "",
        department: "",
        name: "",
        password: "",
        role: "",
      },
    };
  },
  methods: {
    /**
     * 提交验证表单
     */
    submitForm(formName, data) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleUserInfo();
          // if (2 === this.editType) {
          //   this.addUser(data);
          // } else if (1 === this.editType) {
          //   this.updateUser(data);
          // }
        } else {
          return false;
        }
        this.getUsers();
      });
    },
    /**
     * 添加/修改用户
     * @param {number} id 用户id
     * @param {string} cname 用户中文名称
     * @param {string} name 用户账号
     * @param {string} password 用户密码
     * @param {string} department 用户所在部门
     * @param {string} role 用户角色
     * @param {string} createTime 创建时间
     * @param {string} updateTime 更新时间
     */
    async handleUserInfo() {
      let params = this.formData;
      if (params.id == null) {
        console.log("xinzeng");
      }
      console.log(params);
    },
    async addUser(data) {
      let params = {
        cname: data.cname,
        name: data.name,
        password: data.password,
        department: data.department,
        role: data.role,
        createTime: formatTime(new Date()),
        updateTime: "",
      };
      try {
        let result = await API.addUser(params);
        let { code } = result;
        if (200 === code) {
          this.$notify.success({
            message: "添加用户成功",
            showClose: false,
            duration: 800,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * 更新用户
     * @param {number} id 用户id
     * @param {string} cname 用户中文名称
     * @param {string} name 用户账号
     * @param {string} password 用户密码
     * @param {string} department 用户所在部门
     * @param {string} role 用户角色
     * @param {string} createTime 创建时间
     * @param {string} updateTime 更新时间
     */
    async updateUser(data) {
      let params = {
        id: data.id,
        cname: data.cname,
        name: data.name,
        password: data.password,
        department: data.department,
        role: data.role,
        createTime: data.createTime,
        updateTime: formatTime(new Date()),
      };
      try {
        let result = await API.updateUser(params);
        let { code } = result;
        if (200 === code) {
          this.$notify.success({
            message: "修改用户成功",
            showClose: false,
            duration: 800,
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
    handleClose() {
      this.resetForm("formData");
      this.oncancel();
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep input {
  width: 94%;
  height: 32px;
}
</style>
