<template>
  <div class="container">
    <bs-header></bs-header>
    <el-container>
      <el-aside></el-aside>
      <el-main>
        <template>
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in cardImg" :key="item">
              <img :src="item">
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-main>
    </el-container>
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
                 <time class="time">借阅人数{{item.bookCount}}</time>
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
import pic2 from "../../assets/baseImage/2wpansb62m.jpg";
import pic3 from "../../assets/baseImage/2d7eo87635.jpg";
import mainHeader from "../../common/layout/header";
export default {
  data() {
    return {
      cardImg: [pic2, pic3],
      bookList: {}
    };
  },
  beforeMount() {
    this.handleGetBookList();
  },
  methods: {
    handleGetBookList() {
      let t = this;
      t.$store.dispatch("list/getBookList").then(function(res) {
        t.bookList = res.data;
      });      
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
    width: 300px;
    height: 100%;
    min-height: 450px;
    background: #333;
  }
  .el-main {
    width: 620px;
    height: 100%;
    min-height: 450px;
    background: #333;
  }
}
</style>
