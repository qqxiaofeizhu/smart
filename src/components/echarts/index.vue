<template>
  <div class="container">
    <bs-header></bs-header>
    <bs-container>
        <div class="container" slot="bs-right">
            <div class="left-container" style="float:left">
                <div id="myChart" :style="{width: '600px', height: '300px'}"></div>
                <div id="myChartSort" :style="{width: '600px', height: '300px'}"></div>
            </div>
            <div class="right-container" style="float:left; width:400px">
                <h3>Tip：各字母所代表的含义</h3>
                <uL>
                    <li v-for="(item,index) of sortName" :key="index">
                        {{item.label}}
                    </li>
                </uL>
            </div>
        <!-- <el-form :model="bookListModel" status-icon ref="bookListForm">
            <el-form-item>
                <el-input auto-complete="off" v-model="bookListModel.booKData"></el-input>
            </el-form-item>
            <el-select style="width:100%" @change="changePosition(bookListModel.bookCategory)" filterable  v-model="bookListModel.bookCategory" placeholder="请选择">
                <el-option
                  v-for="item in sortName"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label">
                </el-option>
            </el-select>
            <el-form-item>
                <el-input auto-complete="off" v-model="bookListModel.bookPosition"></el-input>
            </el-form-item>
            <el-button type="primary" @click="submitForm('bookListForm')">提交</el-button>
            <el-button @click="resetForm('bookListForm')">重置</el-button>
        </el-form> -->
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
  mounted(){
    let t = this;
    this.$http({
          method: 'get',
          url: '/bookstore/get-book-count',
    }).then(function(res) {
      let values = [];
      let keys = [];
      let obj = res.data.data.result;
      for(var key in obj){   
          //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
          if (obj.hasOwnProperty(key) === true){  
              keys.push(key);    
              values.push(obj[key]);   
          }                 
      }
      t.bookCount = values;
      let tenValues = [];
      let tenKeys = [];
      let tenobj = res.data.data.resultTenSort;
      for(var key in tenobj){   
          //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
          if (tenobj.hasOwnProperty(key) === true){  
              tenKeys.push(key);    
              tenValues.push(tenobj[key]);   
          }                 
      }
      t.tenValues = tenValues;
      t.tenKeys = tenKeys;
      t.drawLine();
    })
  },
 data() {
   return {
     bookCount: [],
     tenValues: [],
     tenKeys: [],
     sortName: constData.options,
     position: constData.bookPosition,
     bookListModel: {
         bookPosition: '',
         bookCategory: '',
         booKData: ''
     }
   }
 },
 methods: {
    submitForm(formName) {
      let _that = this;
      this.$http.post("bookstore/add-book-data", {
        bookPosition: this.bookListModel.bookPosition,
        bookCategory:  this.bookListModel.bookCategory,
        booKData: this.bookListModel.booKData
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changePosition(item) {
      this.bookListModel.bookPosition = this.position[item.slice(0, 1)];
    },
    drawLine(){
        let t = this;
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '图书馆藏书种类数量统计' },
            tooltip: {},
            xAxis: {
                data: constData.sortBook
            },
            legend: {
                data:['藏书数量']
            },
            yAxis: [
                {
                    type: 'value',
                    name: '藏书量',
                    axisLabel: {
                        formatter: '{value} 本'
                    }
                },
                {
                    type: 'value',
                    name: '借阅数量',
                    axisLabel: {
                        formatter: '{value} 本'
                    }
                },
            ],
            series: [
                {
                    name: '藏书数量',
                    type: 'bar',
                    data: t.bookCount
                },
                {
                    name:'借阅数量',
                    type:'line',
                    yAxisIndex: 1,
                    data:t.tenValues
                }
            ]
        });
        let myChartSort = this.$echarts.init(document.getElementById('myChartSort'))
        // 绘制图表
        myChartSort.setOption({
            title: { text: '各图书分类下当前借阅数量'},
            tooltip: {},
            xAxis: {
                data: t.tenKeys
            },
            legend: {
                data:['借阅数量']
            },
            yAxis: {},
            series: [
                {
                    name: '借阅数量',
                    type: 'bar',
                    data: t.tenValues
                },
            ]
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


