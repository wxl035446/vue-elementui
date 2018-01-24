<template>
  <div>
    <div class="charts">
      <div class="first">
        <div>
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </div>
        <div>
          <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VeLine from 'v-charts/lib/line'
  import VeBar from 'v-charts/lib/Bar'

  export default{
    data(){
      return {
        chartSettings: {}
      }
    },
    methods: {
      changeType: function () {
        this.index++
        if (this.index >= this.typeArr.length) {
          this.index = 0
        }
        this.chartSettings = {type: this.typeArr[this.index]}
      }
    },
    created: function () {
      this.chartData = {
        columns: ['日期', '销售额-1季度'],
        rows: [
          {'日期': '1月1日', '销售额-1季度': 1523},
          {'日期': '1月2日', '销售额-1季度': 1223},
          {'日期': '1月3日', '销售额-1季度': 2123},
          {'日期': '1月4日', '销售额-1季度': 4123},
          {'日期': '1月5日', '销售额-1季度': 3123},
          {'日期': '1月6日', '销售额-1季度': 7123}
        ]
      }
      this.typeArr = ['line', 'column', 'pie']
      this.index = 0
      this.chartSettings = {type: this.typeArr[this.index]}
    },
    components:{ VeLine, VeBar}
  }

</script>
<style>
  .charts .first{
      width: 100%;
      display: flex;

    }
  .charts .first  div{
    flex: 1;
  }


</style>
