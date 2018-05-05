<template>
  <div class="container">
    <bs-header></bs-header>
    <bs-container>
      <div class="container" slot="bs-right">
        <div class="container-header">
          <div class="header-input">
            <el-input
              style="width:360px"
              placeholder="请输入您要搜索的图书名称"
              v-model="searchBookname">
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        <el-select  class="header-select" filterable style="width: 470px" v-model="bookCategory" clearable placeholder="请选择您要查看的图书种类">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
        <el-button  class="header-button" type="primary" @click="filterBook()">确定</el-button>
        </div>
        <el-table
          :data="bookDataList.data"
          border
          style="width: 100%;cursor: pointer;"
          class="booklist"
          fit
        >
          <template v-for="(item,index) in bookDataList.header">
           <el-table-column
               v-if="item.fieldName == 'bookUrl'"
              :key="index"
              :prop="item.fieldName"
              :label="item.labeName"
               min-width="90"
            >
              <template slot-scope="scope">
                  <div>
                    <img :src="scope.row.bookUrl" style="width: 100%; height: 35px">
                  </div>
                </template>
          </el-table-column>  
           <el-table-column
              fixed="right"
              :key="index"
              :prop="item.fieldName"
              :label="item.labeName"
              v-else-if="item.fieldName == 'operate'"
              min-width="90"
            >
              <template slot-scope="scope" class="handel-operate">
                  <span v-for="(item, index) of list" :key="index" @click="handelOperate(item, scope.row._id, scope.row)">
                    <a style="color: rgb(244, 81, 30);" v-if='item == "删除"'>{{item}}&nbsp;</a>
                    <a v-else>&nbsp;编辑</a>
                  </span>
              </template>
            </el-table-column>   
           <el-table-column
               v-else
              :key="index"
              :prop="item.fieldName"
              :label="item.labeName"
              min-width="110"
            >
              <template slot-scope="scope" class="handel-operate">
                  <el-tooltip  placement="top" :content="`${scope.row[item.fieldName]}`" offset="50">
                    <p class="text">{{scope.row[item.fieldName]}}</p>
                  </el-tooltip>
              </template>
          </el-table-column>          
          </template>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :page-count="Math.ceil(bookDataList.count / 10)"
          v-if="bookDataList.count > 10"
          :current-page.sync="bookDataList.p"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      </bs-container>
    <bs-footer></bs-footer>
  </div>
</template>

<script>
import bsHeader from "../../common/layout/header";
import bsContainer from "../../common/layout/center";
import bsFooter from "../../common/layout/footer";
import { mapGetters } from "vuex";
import constData from "../../utils/constData"
export default {
  beforeMount() {
    let t = this;
    t.getBookList();
  },
  data() {
    return {
      bookDataList: {},
      count: 0,
      list: ["删除", "编辑"],
      bookCategory: '',
      searchBookname: '',
      options: constData.options
    };
  },
  computed: {
    ...mapGetters("list", {
      bookListData: "getBookListData"
    })
  },
  methods: {
    filterBook() {
      this.$store.commit("list/updateConditions", {bookCategory: this.bookCategory, searchBookname: this.searchBookname});
      this.getBookList();
    },
    handelOperate(type, bookId, item) {
      if (type == "编辑") {
        this.handelEditorBookMessage(type, bookId, item);
      } else {
        this.handelOperateDelate(type, bookId);
      }
    },
    handelOperateDelate(type, bookId) {
      // 发送删除请求
      let t = this;
      let data = { id: bookId };
      t.$http
        .post("bookstore/delate-booklist-by-id", data)
        .then(function(data) {
          const resp = data.data;
          console.log(data.p, data)
            t.$store.commit("list/updateConditions", { p: resp.p });
            t.getBookList();
        });
    },
    handelEditorBookMessage(type, bookId, item) {
      let t = this;
      t.$store.dispatch("list/getAllBookEntry").then(function() {
        t.$store.commit("list/updateBookDeatil", item);
        t.$router.push({ path: "/list/add-list" });
      });
    },
    handleCurrentChange(page) {
      this.$store.commit("list/updateConditions", { p: page });
      this.getBookList();
    },
    getBookList() {
      let t = this;
      t.$store.dispatch("list/getBookList").then(function(resp) {
        t.bookDataList = t.bookListData;
        if (resp.type) {
          t.$message({
            message: resp.message,
            type: 'success'
          });
        } else {
          t.$message({
            message: resp.message,
            type: 'danger'
          });
        }
      });
    }
  },
  components: {
    "bs-header": bsHeader,
    "bs-container": bsContainer,
    "bs-footer": bsFooter
  }
};
</script>

<style lang="scss">
.container {
  .container-header {
    width: 100%;
    padding: 15px 0;
    display: inline-flex;
    box-sizing: border-box;
    .container-header {
      width: 240px;
    }
    .header-select {
      margin-left: 20px;
    }
    .header-button {
      margin-left: 20px;
    }
  }
  .booklist {
    .text {
      width: 100%;
      text-overflow : ellipsis; 
      white-space : nowrap; 
      overflow : hidden; 
      height: 40px;
      line-height: 40px;
    }
    .handel-operate {
      span {
        a {
          cursor: pointer;
          padding: 0 5px 0 5px;
        }
      }
    }
  }
}
</style>

