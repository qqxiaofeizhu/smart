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
            <el-button type="text" style="color: #F56C6C"  @click="handleDetail(item)">详情</el-button>
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
      :title="detailNotice.title"
      :visible.sync="centerDialogVisible"
      width="80%"
      center>
      <p v-html="detailNotice.noticeValue"></p>
    </el-dialog>
    <el-container>
    <el-row class="bookContainer">
      <el-col :span="6" v-for="(item, index) in bookList.data" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.bookUrl" class="image">
          <div style="padding: 14px;">
            <span>{{item.bookname}}</span>
            <div class="bottom clearfix">
              <p class="time">
                <time class="time">{{item.bookAutor}}</time>
                <time class="time">￥{{item.bookPrice}}</time>
              </p>
              <p class="time">
                 <time class="time">库存数量{{item.bookCount}}</time>
                 <time class="time">借阅人数{{item.isleave}}</time>
                 <time class="time">电子版下载{{item.bookCount}}</time>
              </p>
              <el-button type="text" class="button" @click.stop="handleBorrowing(item._id)">借阅</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    </el-container>
    <bs-footer></bs-footer>
  </div>
</template>

<script>
// import pic1 from '../../assets/baseImage/p00005332_763.jepg';
import bsHeader from "../../common/layout/header";
import bsContainer from "../../common/layout/center";
import bsFooter from "../../common/layout/footer";
import pic1 from "../../assets/baseImage/tushuguan.jpg";
import pic2 from "../../assets/baseImage/2wpansb62m.jpg";
import pic3 from "../../assets/baseImage/2d7eo87635.jpg";
import pic4 from "../../assets/baseImage/shujia.jpg";
import mainHeader from "../../common/layout/header";
export default {
  data() {
    return {
      cardImg: [pic1,pic2, pic3,pic4],
      bookList: {},
      allNotice: [],
      centerDialogVisible: false,
      detailNotice: {}
    };
  },
  beforeMount() {
    this.handleGetBookList();
    this.handleGetAllNotice();
  },
  methods: {
    handleGetBookList() {
      let t = this;
      t.$store.dispatch("list/getBookList").then(function(res) {
        t.bookList = res.data;
      });      
    },
    handleGetAllNotice() {
      let t = this;
      t.$store.dispatch('notice/getAllNotice').then(function(res){
        if (res.type) {
          t.$message({
            message: res.message,
            type: "success"
          })
          t.allNotice = res.data;
        } else {
          t.$message({
            message: res.message,
            type: "danger"
          })
        }
      })
    },
    handleBorrowing(id) {
      let t = this;
      t.$store.dispatch("list/browrringById", {id: id}).then(function(res) {
        if (res.type) {
          t.$message({
            type: 'success',
            message: res.message
          })
          t.handleGetBookList();
        } else {
          t.$message({
            type: 'danger',
            message: res.message
          })
        }
      })
    },
    handleDetail(item) {
      this.detailNotice = item;
      this.centerDialogVisible = !this.centerDialogVisible;
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
  .bookContainer {
    .time {
      font-size: 13px;
      color: #999;
    }
    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }
    .button {
      padding: 0;
      float: right;
    }
    .image {
      width: 100%;
      display: block;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
  }
  .el-aside {
    width: 450px !important;
    height: 300px;
    padding-top: 20px;
    overflow: hidden;
    .notice-line {
      // background: #409EFF;
      line-height:20px;
      border-bottom: 2px solid #409EFF;
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
        width:100%;
        overflow: hidden;
        text-overflow:ellipsis;
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
       width:100%;
       height: 100%;
     }      
    }
  }
}
</style>
