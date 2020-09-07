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
            @click="showSaveCondition"
          >打开</el-button>
        </div>
        <date-picker ref="datePicker" :datePicker="dateTime"/>
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
        clearable
      >
        <i
          class="el-icon-search el-input__icon" 
          style="cursor:pointer;"
          slot="suffix"
          @click="searchBlog"
        ></i>
      </el-input>
      <el-button
        type="primary"
        size="small"
        @click="searchBlog"
      >查询</el-button>
    </div>
    <div class="search-container">
      <template v-for="(item, index) in blogContent">
        <blog-item :key="`${item}${index}`" :blogContent="item"/>
      </template>
      <el-button
        class="more-blog"
        :loading="moreLoading"
        @click="loadMore"
      >查看更多</el-button>
    </div>
    <save-name 
      :visible="showSaveConditionName" 
      :oncancel="hideSaveName"
      :department="activeSelect"
      :keyword="keyword"
      :startTime="startTime"
      :endTime="endTime"
    />
    <save-condition 
      :visible="showSaveConditionContent"
      :oncancel="hideSaveCondition"
      @reSearch="reSearch"
    />
  </div>
</template>

<script>
import DatePicker from "@/components/date-picker";
import BlogItem from "./components/blog-item";
import SaveName from "./components/save-name";
import SaveCondition from "./components/save-condition";

import API from "./api";
import { formatTime } from '@/utils/';

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
          value: 'all',
          label: '全部'
        },{
          value: 'dev',
          label: '研发部'
        }, {
          value: 'design',
          label: '设计部'
        }, {
          value: 'test',
          label: '测试部'
        }, {
          value: 'person',
          label: '人事部'
        }],
      activeSelect: 'all',
      keyword: '',
      blogContent: [],
      showSaveConditionName: false,
      showSaveConditionContent: false,
      startTime: '',
      endTime: '',
      moreLoading: false,
      dateTime: []
    }
  },
  created() {
    this.getArticle();
  },
  methods: {
    // 获取所有博客信息
    async getArticle() {
      try {
        const {code, data} = await API.getArticle();
        if(200 !== code) { return }
        this.blogContent = data;
      }catch(err) {
        this.$notify.error({
          message: err,
          duration: 1200,
          showClose: false
        })
      }finally {}
    },
    // 搜索博客
    searchBlog() {
      this.getArticle();
    },
    // 打开保存名称
    showSaveName() {
      this.showSaveConditionName = true;
      this.startTime = formatTime(this.$refs.datePicker.dateTime[0]);
      this.endTime = formatTime(this.$refs.datePicker.dateTime[1]);
    },
    // 隐藏保存名称
    hideSaveName() {
      this.showSaveConditionName = false;
    },
    // 打开保存条件
    showSaveCondition() {
      this.showSaveConditionContent = true;
    },
    // 隐藏保存条件
    hideSaveCondition() {
      this.showSaveConditionContent = false;
    },
    // 加载更多
    loadMore() {
      this.moreLoading = true;
      setTimeout(() => {
        this.moreLoading = false;
      }, 1000);
    },
    /**
     * 点击保存条件后进行搜索
     * @param {object} val 当前点击条件
     */
    reSearch(val) {
      this.activeSelect = val.department;
      this.keyword = val.keyword;
      this.dateTime = JSON.parse(val.dateTime);
      this.$nextTick(() => {
        this.getArticle();
      })
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
    height: calc(100% - 120px);
    max-height: calc(100% - 120px);
    overflow: auto;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    background-color: #fff;
    .more-blog {
      display: flex;
      justify-content: center;
      border-radius: 20px;
      height: 32px;
      width: 780px;
      margin: 32px auto;
      background-color: #888888;
      color: #fff;
    }
  }
}
</style>
