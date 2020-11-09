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
        prop="cname"
        :rules="[
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '姓名长度2-10位', trigger: 'blur' }
        ]"
      >
        <el-input type="text" v-model="editData.cname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="账号"
        prop="name"
        :rules="[
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { min: 3, max: 15, message: '账号长度3-10位', trigger: 'blur' }
        ]"
      >
        <el-input type="text" v-model="editData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, message: '密码长度最低3位', trigger: 'blur' }
        ]"
      >
        <el-input type="password" v-model="editData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="部门"
        prop="department"
        :rules="[
          { required: true, message: '部门必填项', trigger: 'blur' },
          { min: 2, message: '部门名称最低2位', trigger: 'blur' }
        ]"
      >
        <el-input v-model.number="editData.department"></el-input>
      </el-form-item>
      <el-form-item
        label="职位"
        prop="role"
        :rules="[
          { required: true, message: '职位必填项', trigger: 'blur' }
        ]"
      >
        <el-input v-model.number="editData.role"></el-input>
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
import { formatTime, resetForm } from "@/utils/";

export default {
  name: "user-edit",
  props: {
    editData: {
      type: Object,
      default: () => {},
    },
    getUserList: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    // 提交验证表单
    submitForm(formName, data) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addOrUpdateUser(data);
        } else {
          return false;
        }
        // 获取用户列表
        this.getUserList();
      });
    },
    /**
     * 添加或修改用户
     * @param {number} id 用户id
     * @param {string} cname 用户中文名称
     * @param {string} name 用户账号
     * @param {string} password 用户密码
     * @param {string} department 用户所在部门
     * @param {string} role 用户角色
     * @param {string} createTime 创建时间
     * @param {string} updateTime 更新时间
     */
    async addOrUpdateUser(data) {
      let params = data;
      try {
        let result = {};
        let resMessage = "";
        // id不存在时即为添加，存在则是修改
        if (undefined == data.id) {
          params.createTime = params.updateTime = formatTime(new Date());
          result = await API.addUser(params);
          resMessage = "添加";
        } else {
          params.updateTime = formatTime(new Date());
          result = await API.updateUser(params);
          resMessage = "修改";
        }
        let { code } = result;
        if (0 === code) {
          this.$notify.success({
            message: `${resMessage}用户成功`,
            showClose: false,
            duration: 800,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss">
.user-add {
  .user-add-ruleForm {
    input {
      width: 90%;
      height: 32px;
    }
  }
}
</style>
