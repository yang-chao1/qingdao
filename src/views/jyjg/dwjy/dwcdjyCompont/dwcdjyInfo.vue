<template>
  <div v-show="!this.showvisible" >
    <div id="printNew">
      <table>
        <tbody>
          <tr>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td colspan="2" align="right">记录单编号:{{ myinfo.recordNo }}</td>
          </tr>
          <tr>
            <td colspan="3" align="center">
              <h3 class="h3Title">动物产地检疫工作记录单</h3>
            </td>
          </tr>
          <tr>
            <td align="left" colspan="2">
              动物卫生监督所（分所）名称：
              {{ myinfo.supervisename }}
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <table class="kv-table" style="width: 900px;" id="myTable">
                <tbody>
                  <tr>
                    <td class="kv-label" rowspan="8">基本情况</td>
                    <td style="width: 100px" class="kv-label">报检时间</td>
                    <td colspan="4" class="kv-content">
                      {{ myinfo.inspectiontime | dateFormatHms }}
                    </td>
                    <td colspan="1" class="kv-label">检疫时间</td>
                    <td colspan="4" class="kv-content">
                      {{ myinfo.quarantinetime | dateFormatHms }}
                    </td>
                  </tr>
                  <tr>
                    <td class="kv-label">货主姓名</td>
                    <td colspan="2" class="kv-content">
                      {{ myinfo.shippername }}
                    </td>
                    <td class="kv-label">联系电话</td>
                    <td colspan="1.7" class="kv-content">
                      {{ myinfo.teltphone }}
                    </td>
                    <td class="kv-label">身份证号码</td>
                    <td colspan="3" class="kv-content">
                      {{ myinfo.idcardnum }}
                    </td>
                  </tr>
                  <tr>
                    <td class="kv-label">养殖场、村、原驻地或捕获地名称</td>
                    <td colspan="4" class="kv-content">
                      {{ myinfo.farmsnme }}
                    </td>
                    <td colspan="2" class="kv-label">检疫地点</td>
                    <td colspan="3" class="kv-content">
                      {{ myinfo.quarantineaddress }}
                    </td>
                  </tr>
                  <tr>
                    <td class="kv-label">动物种类</td>
                    <td colspan="2" class="kv-content">
                      {{ myinfo.animalsort }}
                    </td>
                    <td class="kv-label">用途</td>
                    <td colspan="6" class="kv-content">
                      {{ myinfo.myuse }}
                    </td>
                  </tr>
                  <tr>
                    <td class="kv-label">动物来源</td>
                    <td colspan="9" class="kv-content">
                      {{ myinfo.animalsources }}
                    </td>
                  </tr>
                  <tr>
                    <td class="kv-label">野生动物驯养繁殖许可证号</td>
                    <td colspan="4" class="kv-content">
                      {{ myinfo.domesticatedid }}
                    </td>
                    <td colspan="2" class="kv-label">野生动物捕捉(猎捕)许可证号</td>
                    <td colspan="3" class="kv-content">
                      {{ myinfo.catchid }}
                    </td>
                  </tr>
                  <tr>

                    <td class="kv-label">启运地点</td>
                    <td colspan="5" class="kv-content">
                      {{ myinfo.startaddress }}{{ myinfo.startaddress1 }}{{ myinfo.startaddress2 }}
                      {{ myinfo.startaddress3 }}
                    </td>
                    <td class="kv-label">数量</td>
                    <td colspan="2" class="kv-content">
                      {{ myinfo.animalnum }}
                    </td>
                  </tr>
                  <tr>
                    <td class="kv-label">到达地点</td>
                    <td colspan="4" class="kv-content">
                      {{ myinfo.rdddzxx }}{{ myinfo.rdddzxx1 }}{{ myinfo.rdddzxx2 }}
                      {{ myinfo.rdddzxx3 }}
                    </td>
                    <td colspan="1" class="kv-label">运载工具牌号</td>
                    <td colspan="3" class="kv-content">
                      {{ myinfo.toolid }}
                    </td>
                  </tr>
                  <tr>
                    <td class="kv-label" rowspan="2">查验材料与疫情调查</td>
                    <td class="kv-label">是否经强制免疫并在有效期内</td>
                    <td colspan="2" class="kv-content">
                      {{ myinfo.qzmy }}
                    </td>
                    <td class="kv-label">养殖档案是否符合规定</td>
                    <td colspan="2" class="kv-content">
                      {{ myinfo.recordrule }}
                    </td>
                    <td colspan="2" class="kv-label">畜禽标识是否符合规定</td>
                    <td colspan="2" class="kv-content">
                      {{ myinfo.logorule }}
                    </td>
                  </tr>
                  <tr>
                    <td class="kv-label">养殖场疫情（六个月内）</td>
                    <td colspan="2" class="kv-content">
                      {{ myinfo.outbreak }}
                    </td>
                    <td class="kv-label">是否疫区</td>
                    <td colspan="2" class="kv-content">
                      {{ myinfo.eridemicarea }}
                    </td>
                    <td colspan="2" class="kv-label">其他项目检查</td>
                    <td colspan="2" class="kv-content">
                      {{ myinfo.other }}
                    </td>
                  </tr>
                  <tr>
                    <td class="kv-label">临床检查</td>
                    <td align="center" class="kv-content" colspan="9">
                      <div style="float:left;">{{ myinfo.clinical }}
                        <a-button @click="showA" class="no-print" type="primary" v-show="myinfo.rdddzxx!=='山东省' && myinfo.clinical==='合格' && myinfo.KZID ==0 && FrName=='官方兽医'">
                          动物A
                        </a-button>

                        <a-button @click="showB" class="no-print" type="primary" v-show="myinfo.rdddzxx==='山东省' && myinfo.clinical==='合格' && myinfo.KZID ==0&& FrName=='官方兽医'">
                          动物B
                        </a-button>
                      </div>
                      <div id="btnLink" style="float:left;"></div>
                    </td>

                  </tr>
                  <tr>
                    <td class="kv-label">实验室检查</td>
                    <td colspan="9" class="kv-content">{{ myinfo.laboratory }}</td>
                  </tr>
                  <tr>
                    <td id="t1" class="kv-label" rowspan="5">检疫结果处理</td>

                    <td colspan="2" class="kv-label">是否符合检疫规定</td>
                    <td id="td1" colspan="2" class="kv-content">
                      {{ myinfo.quarantinerule }}
                    </td>

                    <td id="td2" colspan="2" class="kv-label">出具《动物检疫合格证明》编号</td>

                    <td id="td3" colspan="4" class="kv-content">
                      {{ myinfo.code }}
                    </td>
                  </tr>

                  <tr>
                    <td class="kv-label">检疫人员签字</td>
                    <td colspan="3" class="kv-content">
                      <div style="text-align: left; width: 100%; height: 35px;">
                        <span> {{ myinfo.vetname }}</span>
                      </div>
                      <div style="text-align: right; width: 100%;">
                        <span> {{ myinfo.Gftime | dateFormatH }} </span>
                      </div>
                    </td>
                    <td class="kv-label">货主签字</td>
                    <td colspan="6" class="kv-content">
                      <div style="text-align: left; width: 100%;">
                        {{ myinfo.shippername }}
                      </div>
                      <div style="text-align: right; width: 100%;">
                        <span> {{ myinfo.rhzdate | dateFormatH }} </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <!-- <tr>
            <td colspan="4">
              <div id="myPrintArea1" style="display: none"></div>
              <div id="myPrintAreas" style="display: none;"></div>
            </td>
          </tr> -->
        </tbody>
      </table>
    </div>
    <!-- 显示表单B-->
    <!-- <a-modal :zIndex="1001" width="1000px" v-model="showvisible" :footer="null" >
      <dwjy-binfo :info="info" ></dwjy-binfo>
    </a-modal> -->
    <!-- 显示表单A-->
    <a-modal :zIndex="1001" width="1000px" v-model="showvisibleA" :footer="null">
      <dwjy-ainfo :info="info" ></dwjy-ainfo>
    </a-modal>
    <!-- 显示表单A -->
    <a-modal :zIndex="1001" width="1000px" v-model="showvisibleA" :footer="null">
      <!-- <dwjy-ainfo :info="info" ></dwjy-ainfo> -->
      <dwjyAupdate :info="info"></dwjyAupdate>
    </a-modal>
    <!-- 动物A跳转 -->
    <a-modal
      width="1000px"
      :zIndex="1001"
      :destroyOnClose="true"
      title="动物产地检疫A"
      v-model="showvisibleA"
      :footer="null">
      <dwjy-binfot ref="dw" :myinfo="info" :showvisible="showvisibleA" :JLDLX="JLDLX"></dwjy-binfot>
    </a-modal>
    <!-- 动物B跳转 -->
    <a-modal
      width="1000px"
      :zIndex="1001"
      :destroyOnClose="true"
      title="动物产地检疫B"
      v-model="showvisible"
      :footer="null">
      <dwjy-ainfot ref="dw" :myinfo="info" :showvisible="showvisible" :JLDLX="JLDLX" ></dwjy-ainfot>
    </a-modal>
    <a-button type="primary" v-print="'#printNew'" class="dayi">打印</a-button>
  </div>

</template>

<script>
import dwjyBadd from '@/views/jyjg/dwjy/dwjyBcompont/dwjyBadd'
import dwjyBinfo from '@/views/jyjg/dwjy/dwjyBcompont/dwjyBinfo'
import dwjyAinfo from '@/views/jyjg/dwjy/dwjyAcompont/dwjyAinfo'
import dwjyBinfot from '@/views/jyjg/dwjy/dwcdjyCompont/dwjyA'
import dwjyAinfot from '@/views/jyjg/dwjy/dwcdjyCompont/dwjy'
import dwjyAupdate from '@/views/jyjg/dwjy/dwjyAcompont/dwjyAupdate'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    myinfo: {
      type: Object
    }
  },
  components: {
    dwjyBinfo,
    dwjyAinfo,
    dwjyAinfot,
    dwjyAupdate,
    dwjyBadd,
    dwjyBinfot
  },
  data () {
    return {
      printObj: {
        id: 'printNew',
        popTitle: '动物检疫（产品B）', // 文件标题
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      FrName: JSON.parse(localStorage.getItem('AllInfo')).FrName,
      ABTF: false,
      showvisible: false,
      showvisibleA: false,
      info: {},
      JLDLX: 'AH_AnimalOrigin'

    }
  },
  created () {
    this.showInfo()
  },
  methods: {
    showInfo () {
      console.log('执行了赋值')

      if (this.myinfo.rdddzxx === '山东省') {
      this.ABTF = true
    }
    },
    showB () {
      console.log('执行了B')

      this.info = this.myinfo
      this.showvisible = true
      console.log(this.info)
    },
    showA () {
      console.log('执行了A')
      this.info = this.myinfo
      this.showvisibleA = true
      console.log(this.info)
    }
  }
}
</script>

<style scoped lang="less">
@media print {
  #printNew{
    td{
      height: 60px;
    }
  }
  .no-print {
    display: none;
  }
}
#printNew{
  padding: 20px;
}
.dayi{
  width: 60px;
  margin-left: 470px;
}
.kv-table {
  border-right: 1px solid #cacaca \9;
  *border-right: 1px solid #cacaca;
}

.kv-table .kv-table-row {
  border-bottom: 1px solid #cacaca;
}

.kv-table .kv-table-row .kv-item {
  padding-left: 134px;
}

.kv-table .kv-table-row .kv-item .kv-label1 {
  height: 35px;
  border-style: none solid;
  border-width: 1px;
  border-color: #cacaca;
}
.kv-table .kv-table-row .kv-item .kv-label {
  float: left;
  padding: 0 10px;
  margin-left: -134px;
  width: 112px;
  background: #f5f5f5;
  border: 1px solid #cacaca;
  border-bottom: none;
  border-top: none;
}

.kv-table .kv-table-row .kv-item .kv-content-wrap {
  float: left;
  width: 100%;
}

.kv-table .kv-table-row .kv-item .kv-content {
  padding: 10px;
}

.kv-table .kv-table-row.col-3 .kv-item-wrap {
  float: left;
  width: 33.33%;
}

.kv-table .kv-table-row.col-2 .kv-item-wrap {
  float: left;
  width: 33.33%;
}

table.kv-table {
  width: 100%;
}

table.kv-table .kv-label {
  padding: 0 10px;
  width: 114px;
  background: #f5f5f5;
  border: 1px solid #cacaca;
  border-top: none;
  text-align: center;
}

table.kv-table td.kv-content,
table.kv-table td.kv-label {
  height: 29px;
  padding: 5px;
  border-bottom: 1px solid #cacaca;
}

table.kv-table tr:first-child td.kv-content,
table.kv-table tr:first-child td.kv-label {
  border-top: 1px solid #cacaca;
}

table.kv-table tr td.kv-content:last-child {
  border-right: 1px solid #cacaca;
  border-left: 1px solid #cacaca;
}

table.kv-table tr .button {
  text-align: center;
  border-radius: 0;
  text-indent: 0;
  height: 32px;
}

table.kv-table .kv-content {
  /*width: 260px;*/
  padding: 5px 10px;
}

table.kv-table .textarea-wrap textarea {
  width: 98%;
}
#myTable.kv-table tr td:not(.kv-label) {
  background: #fff;
}

.tablePrint {
  width: 793px;
  padding: 0;
  border: 1px solid #000;
  border-collapse: collapse;
}

.tablePrint1 {
  width: 793px;
  padding: 0;
  border: 0px solid #000;
  border-collapse: collapse;
}

.tablePrint td {
  padding: 0 0 0 12px;
  border: 1px solid #000;
  height: 28px;
  line-height: 28px;
  padding: 0;
}

.tablePrintCustom {
  width: 793px;
  padding: 0;
  border: 1px solid #000;
  border-collapse: collapse;
}

.tablePrintCustom td {
  padding: 0 0 0 12px;
  border: 1px solid #000;
  height: 28px;
}

.tablePrintCustoms {
  width: 793px;
  padding: 0;
  border: 1px solid #000;
  border-collapse: collapse;
}

.tablePrintCustoms td {
  border: 1px solid #000;
  height: 28px;
}

.tableHead {
  width: 793px;
  padding: 0;
  border-collapse: collapse;
}

.ts {
  width: 400px;
  padding: 0;
  border: 1px solid #000;
  border-collapse: collapse;
}

.ts td {
  padding: 0 0 0 10px;
  border: 1px solid #000;
  height: 28px;
  line-height: 28px;
}

// #myTable {
//   font-size: 16px;
// }

#id1 {
  float: left;
  color: Red;
  margin-left: 540px;
  margin-top: -10px;
}
#myPrintArea1 {
  margin-left: 10%;
  width: 794px;
  margin-top: -10px;
}
\deep\.ant-modal{
  width: 1000px !important;
}
</style>
