<template>
  <div class="search-blog">
    <div class="search-header">
      <div class="search-header-datepicker">
        <div class="search-header-fun">
          <el-button
            type="text"
            size="samll"
          >保存</el-button>
          <el-button
            type="text"
            size="samll"
          >更新</el-button>
          <el-button
            type="text"
            size="samll"
          >打开</el-button>
        </div>
        <date-picker/>
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
        class="search-header-input"
        placeholder="请输入关键字搜索"
      >
        <i
          class="el-icon-search el-input__icon" 
          slot="suffix"
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
  </div>
</template>

<script>
import DatePicker from '@/components/date-picker'
import BlogItem from './components/blog-item'
import {blogContent} from './data'
import API from './api'

export default {
  name: 'search-blog',
  components: {
    DatePicker,
    BlogItem
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
      blogContent
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
    }
  }
}
</script>

<style lang="scss">
.search-blog {
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
    overflow: auto;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    background-color: #fff;
  }
}
</style>
