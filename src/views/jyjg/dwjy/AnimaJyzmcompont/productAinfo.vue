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
        <h2 class="infoTop"><b>动  物  检  疫  合  格  证  明 (产品A)</b></h2>
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
            {{ info.PCargoOwner }}
          </td>
          <td>联系电话</td>
          <td>
            {{ info.PPhone }}
          </td>
        </tr>
        <tr>
          <td>产品名称</td>
          <td>
            {{ info.PName }}
                      &nbsp;
          </td>
          <td>数量及单位</td>
          <td>
            {{ info.PQuantity }}{{ info.PDanWei }}
          </td>
        </tr>
        <tr>
          <td>生产单位名称地址</td>
          <td colspan="3">
            {{ info.PMemo4 }}
          </td>
        </tr>
        <tr>
          <td>目的地</td>
          <td colspan="3">
            {{ info.PMemo2 }}
          </td>
        </tr>
        <tr>
          <td>承运人</td>
          <td>
            {{ info.PCarrier }}
          </td>
          <td>联系电话</td>
          <td>
            {{ info.PPhoneCyr }}
          </td>
        </tr>
        <tr>
          <td>运载方式</td>
          <td colspan="3">
            <a-radio-group
              disabled
              v-model=" info.PYunZai">
              <a-radio :value="1">公路</a-radio>
              <a-radio :value="2">铁路</a-radio>
              <a-radio :value="3">水路</a-radio>
              <a-radio :value="4">航空</a-radio>
            </a-radio-group>
          </td>
        </tr>
        <tr>
          <td>运载工具牌号</td>
          <td>
            {{ info.PTrademark }}
                      &nbsp;
          </td>
          <td>装运前经</td>
          <td>
            {{ info.PDisinfection }}
          </td>
        </tr>
        <tr>
          <td colspan="4" >
            <div style="height: 230px;">
              <span style="float:left">
                本批动物经检疫合格,应于{{ info.PYouXiaoRi }} 日内到达有效。</span><br/>
              <span style="float:right">
                <a id="a1">官方兽医签字：</a>
                {{ info.PVeterinary }}
                <a id="a1"></a><br>
                签发日期：{{ info.DateQF }}
                <!-- 二〇二〇年 七月 十七日 15:44:54 -->
                <br>
                <a id="a2">(动物卫生监督所检疫专用章)</a>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td>动物卫生监督检查站签章</td>
          <td colspan="3">

          </td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="3">
            {{ info.PMemo1 }}
          </td>
        </tr>
      </tbody>
    </table>
    <a-row>
      <span>注:1.本证书一式两联,第一联动物卫生监督所留存,第二联随货同行。</span>
    </a-row>
    <a-row>
      <span style="margin-left:2%">2.动物卫生监督所联系电话：17621696833</span>
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
