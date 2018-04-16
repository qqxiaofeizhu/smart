<template>
  <div class="container">
    <bs-header></bs-header>
    <bs-container>
      <div class="container" slot="bs-right">
          <!-- @sort-change="handlerTableSortChange"
          @row-click="handlerOpenDetail"
          @header-dragend="handlerAdjustWidth" -->
        <el-table
          :data="bookDataList.data"
          border
          style="width: 100%"
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
export default {
  beforeMount() {
    let t = this;
    t.getBookList();
  },
  data() {
    return {
      bookDataList: {},
      count: 0,
      list: ["删除", "编辑"]
    };
  },
  computed: {
    ...mapGetters("list", {
      bookListData: "getBookListData"
    })
  },
  methods: {
    handelOperate(type, bookId, item) {
      console.log(type);
      console.log(item);
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
          t.getBookList();
        });
    },
    handelEditorBookMessage(type, bookId, item) {
      let t = this;
      t.$store.commit("list/updateBookDeatil", item);
      t.$router.push({ path: "/list/add-list" });
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

