<template>
  <div class="container">
    <bs-header></bs-header>
    <el-container>
      <el-aside>
        <p class="notice-line">公告</p>
        <ul class="noticeCointer">
          <li v-for="(item, index) of allNotice" :key="index">
            <p>            
              <i class="el-icon-edit" style="color: red"></i>
              {{item.title}}
            </p>
            <el-button type="text" style="color: #F56C6C"  @click="handleNoticeDetail(item)">详情</el-button>
          </li>
        </ul>
      </el-aside>
      <el-main>
        <template>
          <el-carousel indicator-position="outside" class="carousel">
            <el-carousel-item v-for="item in cardImg" :key="item">
              <img :src="item">
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-main>
    </el-container>
    <el-dialog
      :title="detailBook.bookname"
      :visible.sync="centerDialogVisible"
      width="80%"
      center>
      <el-row>
        <el-col>
          <p class="title">作者：{{detailBook.bookAutor}}所属分类：<el-tag size="mini">{{detailBook.bookCategory}}</el-tag></p>  
          <p class="title">图书简介：{{detailBook.bookInstroduce}}</p>
          <p class="name">
            <time class="time">价格：￥{{detailBook.bookPrice}}</time>
          </p>
          <p class="author">
            <time class="time">典藏数量：{{detailBook.bookCount}}</time>
          </p>
          <p class="author">
            <time class="time">借阅人数：{{detailBook.isleave}}</time>
          </p>
          <p class="author">
            <time class="time">图书位置：{{detailBook.bookPosition}}</time>
          </p>
          <p>
            <a :href="detailBook.EbooksUrl">电子版下载</a>
          </p>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      :title="detailNotice.title"
      :visible.sync="noticeDialogVisible"
      width="80%"
      center>
      <el-row>
        <el-col>
          <div v-html="detailNotice.noticeValue"></div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-container style="border-top: 1px solid #e6e6e6;">
    <div class="clc_list">
      <h2 class="clc_tit">中图法分类</h2>
      <ul>
        <li :class="[{'current': index== activeIndex}]" 
            @click="findBooks(item.label, index)"
            class="sortLi"
            v-for="(item, index) of options"
            :key="index"
            :title="item.label"
          >
          {{item.label}}
        </li>
      </ul>
    </div>
    <div class="clc_sublist">
      <div class="clc_container">
        <el-input
            class="searchInput"
            placeholder="请输入内容"
            v-model="searchBookname">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        <el-button @click="filterBook()">确定</el-button>
        <el-pagination
          class="pagination"
          background
          layout="total, prev, pager, next, jumper"
          :page-count="Math.ceil(bookList.count / 10)"
          v-if="bookList.count > 10"
          :pager-count="7"
          :current-page.sync="bookList.p"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <ul class="bookContainer" v-if="bookList.count > 0">
        <li class="bookli" v-for="(item, index) in bookList.data" :key="index">
          <el-card>
            <img :src="item.bookUrl" class="image" style="cursor:pointer" @click="handleDetail(item)">
            <div>
              <div class="bottom clearfix">
                <p class="name"> 
                  <a title="查看详情" @click="handleDetail(item)">{{item.bookname}}</a>
                </p>
                <p class="name">
                  <time class="time">{{item.bookAutor}}</time>
                  <time class="time">￥{{item.bookPrice}}</time>
                </p>
                <p class="author">
                  <time class="time">典藏数量&nbsp;{{item.bookCount}}</time>
                </p>
                <el-button type="text" class="button" @click.stop="handleBorrowing(item._id)">借阅</el-button>
              </div>
            </div>
          </el-card>
        </li>
      </ul>
      <div class="noResult" v-else>
        <img :src="noResult">
        <p>没有找到相关的书</p>
      </div>
        <el-pagination
          class="paginationBottom"
          background
          layout="total, prev, pager, next, jumper"
          :page-count="Math.ceil(bookList.count / 10)"
          v-if="bookList.count > 10"
          :pager-count="7"
          :current-page.sync="bookList.p"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
    </div>
    </el-container>
    <bs-footer></bs-footer>
  </div>
</template>

<script>
import bsHeader from "../../common/layout/header";
import bsContainer from "../../common/layout/center";
import bsFooter from "../../common/layout/footer";
import pic1 from "../../assets/baseImage/tushuguan.jpg";
import pic2 from "../../assets/baseImage/2wpansb62m.jpg";
import pic3 from "../../assets/baseImage/2d7eo87635.jpg";
import pic4 from "../../assets/baseImage/shujia.jpg";
import mainHeader from "../../common/layout/header";
import constData from "../../utils/constData";
import noResult from "../../assets/baseImage/no_result.png";
export default {
  data() {
    return {
      cardImg: [pic1, pic2, pic3, pic4],
      bookList: {},
      detailBook: {},
      allNotice: [],
      noResult: noResult,
      centerDialogVisible: false,
      noticeDialogVisible: false,
      detailNotice: {},
      bookCategory: "",
      searchBookname: "",
      options: constData.options,
      activeIndex: 0
    };
  },
  beforeMount() {
    // 初始化store
    this.$store.commit("list/updateConditions", {
        bookCategory: this.options[0].label,
        searchBookname: this.searchBookname,
        p: 1
    });
    this.handleGetBookList();
    this.handleGetAllNotice();
  },
  methods: {
    // 筛选图书
    filterBook() {
      this.$store.commit("list/updateConditions", {
        bookCategory: this.bookCategory,
        searchBookname: this.searchBookname
      });
      this.handleGetBookList();
    },
    findBooks(item, index) {
      this.activeIndex = index;
      this.$store.commit("list/updateConditions", {
        bookCategory: item,
        searchBookname: this.searchBookname,
        p: 1
      });
      this.handleGetBookList();
    },
    handleCurrentChange(page) {
      this.$store.commit("list/updateConditions", { p: page });
      this.handleGetBookList();
    },
    handleGetBookList() {
      let t = this;
      t.$store.dispatch("list/getBookList").then(function(res) {
        t.bookList = res.data;
      });
    },
    handleGetAllNotice() {
      let t = this;
      t.$store.dispatch("notice/getAllNotice").then(function(res) {
        if (res.type) {
          t.$message({
            message: res.message,
            type: "success"
          });
          t.allNotice = res.data;
        } else {
          t.$message({
            message: res.message,
            type: "danger"
          });
        }
      });
    },
    handleBorrowing(id) {
      let t = this;
      t.$store.dispatch("list/browrringById", { id: id }).then(function(res) {
        if (res.type) {
          t.$message({
            type: "success",
            message: res.message
          });
          t.handleGetBookList();
        } else {
          t.$message({
            type: "danger",
            message: res.message
          });
        }
      });
    },
    handleDetail(item) {
      this.detailBook = item;
      this.centerDialogVisible = !this.centerDialogVisible;
    },
    handleNoticeDetail(item) {
      this.detailNotice = item;
      this.noticeDialogVisible = !this.noticeDialogVisible;
    }
  },
  components: {
    "bs-header": bsHeader,
    "bs-container": bsContainer,
    "bs-footer": bsFooter
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  width: 920px;
  height: 100%;
  margin: 0 auto;
  .current {
    background: #87ceff;
  }
  .clc_list {
    float: left;
    width: 237px;
    border-right: 1px solid #e6e6e6;
    padding-top: 20px;
    .clc_tit {
      font-weight: 400;
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      color: #409eff;
      padding-left: 10px;
      text-align: left;
    }
    .sortLi {
      text-indent: 10px;
      padding-left: 4px;
      padding-right: 4px;
      width: 90%;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .clc_sublist {
    float: left;
    width: auto;
    padding-left: 38px;
    padding-top: 20px;
    background: #ffffff;
    .clc_container {
      width: 100%;
      .searchInput {
        width: 568px !important;
      }
      .pagination {
        line-height: 30px;
        margin-top: 10px;
        margin-left: -12px;
      }
    }
    .paginationBottom {
      line-height: 30px;
      margin-top: 10px;
      margin-left: -12px;
    }
    .bookContainer {
      padding: 10px 0 0 0;
      overflow: hidden;
      width: 100%;
      box-sizing: border-box;
      .bookli {
        float: left;
        width: 194px;
        margin-right: 20px;
        box-sizing: border-box;
        margin-bottom: 30px;
        position: relative;
        .name {
          padding: 7px 20px 0;
          height: 18px;
          line-height: 18px;
          overflow: hidden;
          a {
            &:hover {
              cursor: pointer;
            }
          }
        }
        .author {
          padding: 0 20px;
          height: 24px;
          line-height: 24px;
          overflow: hidden;
          color: #aaa;
        }
        .time {
          height: 24px;
          line-height: 24px;
          overflow: hidden;
          color: #aaa;
        }
        .button {
          padding: 0;
          float: right;
        }
        .image {
          width: 150px;
          height: 150px;
          display: block;
          margin: 0 auto;
        }
      }
    }
  }
  .noResult {
    height: 100%;
    overflow: hidden;
    width: 100%;
    padding: 90px 0;
    box-sizing: border-box;
    img {
      display: block;
      margin: 0 auto;
    }
    p {
      text-align: center;
    }
  }
  .el-aside {
    width: 450px !important;
    height: 300px;
    padding-top: 20px;
    overflow: hidden;
    .notice-line {
      // background: #409EFF;
      line-height: 20px;
      border-bottom: 2px solid #409eff;
      text-align: center;
    }

    .noticeCointer {
      width: 100%;
      height: 280px;
      padding: 20px 0;
      box-sizing: border-box;
      overflow-y: scroll;
      li {
        P {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .el-main {
    width: 470px;
    height: 100%;
    overflow: hidden;
    .carousel {
      width: 470px;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
