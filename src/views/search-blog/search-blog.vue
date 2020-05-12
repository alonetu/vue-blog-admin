<template>
  <div class="search-blog">
    <div class="search-header">
      <div class="search-header-datepicker">
        <div class="search-header-fun">
          <el-button
            type="text"
            size="samll"
            @click="showSaveName"
          >保存</el-button>
          <el-button
            type="text"
            size="samll"
            @click="updateSaveCondition"
          >更新</el-button>
          <el-button
            type="text"
            size="samll"
            @click="showSaveCondition"
          >打开</el-button>
        </div>
        <date-picker ref="datePicker" />
      </div>
      <el-select 
        v-model="activeSelect"
        size="small"
        filterable 
        class="search-header-select"
        placeholder="请选择"
      >
        <el-option
          v-for="item in department"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input 
        v-model.trim="keyword"
        size="small"
        @keyup.enter.native="searchBlog"
        class="search-header-input"
        placeholder="请输入关键字搜索"
      >
        <i
          class="el-icon-search el-input__icon" 
          slot="suffix"
          @click="searchBlog"
        ></i>
      </el-input>
      <el-button
        type="primary"
        size="small"
      >查询</el-button>
    </div>
    <div class="search-container">
      <template v-for="(item, index) in blogContent">
        <blog-item :key="`${item}${index}`" :blogContent="item"/>
      </template>
    </div>
    <save-name 
      :visible="showSaveConditionName" 
      :oncancel="hideSaveName"
      :keyword="keyword"
      :startTime="startTime"
      :endTime="endTime"
    />
    <save-condition 
      :visible="showSaveConditionContent" 
      :oncancel="hideSaveCondition"
    />
  </div>
</template>

<script>
import DatePicker from '@/components/date-picker'
import BlogItem from './components/blog-item'
import SaveName from './components/save-name'
import SaveCondition from './components/save-condition'
import {blogContent} from './data'
import API from './api'
import moment from 'moment'

export default {
  name: 'search-blog',
  components: {
    DatePicker,
    BlogItem,
    SaveName,
    SaveCondition
  },
  data() {
    return {
      department: [{
          value: '选项0',
          label: '全部'
        },{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      activeSelect: '全部',
      keyword: '',
      blogContent,
      showSaveConditionName: false,
      showSaveConditionContent: false,
      startTime: '',
      endTime: ''
    }
  },
  created() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      try {
        const {code, data} = await API.getArticle();
        if(200 !== code) { return }
        this.blogContent = data;
      }catch(err) {
        console.log(err)
      }finally {

      }
    },
    searchBlog() {},
    showSaveName() {
      this.showSaveConditionName = true;
      this.startTime = moment(this.$refs.datePicker.dateTime[0]).format("YYYY-MM-DD HH:mm:ss");
      this.endTime = moment(this.$refs.datePicker.dateTime[1]).format("YYYY-MM-DD HH:mm:ss");
    },
    hideSaveName() {
      this.showSaveConditionName = false;
    },
    updateSaveCondition() {},
    showSaveCondition() {
      this.showSaveConditionContent = true;
    },
    hideSaveCondition() {
      this.showSaveConditionContent = false;
    }
  }
}
</script>

<style lang="scss">
.search-blog {
  height: 100%;
  .search-header {
    height: 104px;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    background-color: #fff;
    .search-header-datepicker {
      display: flex;
      justify-content: space-between;
    }
    .search-header-select {
      width: 220px;
    }
    .search-header-input {
      width: calc(100% - 308px);
      margin: 0 16px;
    }
  }
  .search-container {
    margin-top: 16px;
    max-height: calc(100% - 120px);
    overflow: auto;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    background-color: #fff;
  }
}
</style>
