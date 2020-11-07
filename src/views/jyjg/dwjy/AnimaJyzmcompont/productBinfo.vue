<template>
  <div>
    <img src="@/assets/b.png" alt="" class="zhang"/>
    <a-row>
      <a-col :span="9">
        <img
          src="@/assets/qrcode.jpg"
          style="width:100px; height:80px;margin-left:10%;"
        /><br/>
        <span style="margin-left:7%;">31910193701000187</span>
      </a-col>
      <a-col>
        <h2 class="infoTop"><b>动  物  检  疫  合  格  证  明 (产品B)</b></h2>
      </a-col>
    </a-row>
    <a-row type="flex" justify="end">
      <span style="color:red;font-size:15px">No {{ info.PNumber }}</span>
    </a-row>
    <table class="tbClass">
      <tbody>
        <tr>
          <td>货主</td>
          <td>
            {{ info.PBCargoOwner }}
          </td>
          <td>产品名称</td>
          <td>
            {{ info.PBName }}
          </td>
        </tr>
        <tr>
          <td>数量及单位</td>
          <td>
            {{ info.PBQuantity }}{{ info.PBQuantity }}
          </td>
          <td>产地</td>
          <td>
            {{ info.PBOrigin }}
          </td>
        </tr>
        <tr>
          <td>生产单位名称地址</td>
          <td colspan="3">
            {{ info.PBPumAdd }}
          </td>
        </tr>
        <tr>
          <td>目的地</td>
          <td colspan="3">
            {{ info.PBDestinations }}
          </td>
        </tr>
        <tr>
          <td>检疫标志号</td>
          <td colspan="3">
            {{ info.PBSign }}
          </td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="3">
            <span> {{ info.PBRemarks }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <div style="height: 230px;">
              <span style="float:left">本批动物经检疫合格,应于当日内到达有效</span><br/>
              <span style="float:right">
                <a id="a1">官方兽医签字：</a>
                {{ info.PBVeterinary }}<br>
                <a id="a1"></a>
                签发日期： {{ info.DateQF }}
                <br>
                <a id="a2">(动物卫生监督所检疫专用章)</a>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <a-row>
      <span>注:1.本证书一式两联,第一联动物卫生监督所留存,第二联随货同行。
      </span>
    </a-row>
    <a-row>
      <span style="margin-left:2%">2.本证书限省境内使用。</span>
    </a-row>

  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    info: {
      type: Object
    }
  }
}
</script>
<style scoped>
.zhang {
  width: 150px;
  height: 100px;
  position: absolute;
  left: 48%;
  top: 10px;
}
.infoTop {
  display: inline-block;
  color:#754946;
  margin-top: 2%;
  font-size: 20px;
}

.tbClass {
  width:100%;
  line-height:60px;
}

.tbClass td {
    border: 1px solid #754946;
    padding: 0;
}
.tbClass td:nth-child(1),td:nth-child(3) {
  text-align: center;
}
</style>
