<template>
  <div class="container">
    <bs-header></bs-header>
    <bs-container>
        <div class="container" slot="bs-right">
            <div id="myChart" :style="{width: '600px', height: '300px'}"></div>
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
  this.$http({
        method: 'get',
        url: '/bookstore/get-book-count',
    })
    this.drawLine();
  },
 methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '借阅数量' },
            tooltip: {},
            xAxis: {
                data: constData.sortBook
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
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


