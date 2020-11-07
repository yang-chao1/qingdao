<template>
  <div>
    <!-- 二维码 -->
    <div>
      <qr-code :visible="visibleQrcode" :codeId="codeId"></qr-code>
      <img src="@/assets/b.png" alt="" class="zhang" />
      <h1 class="infoTop">动物检疫合格证明<span class="s">（动物B）</span></h1>
      <h3 class="hao">NO：{{ info.AQNumber }}</h3>
      <a-descriptions :column="3" bordered>
        <a-descriptions-item label="货主" :span="1.5"> {{ info.AQCargoOwner }} </a-descriptions-item>
        <a-descriptions-item label="联系电话" :span="1.5"> {{ info.AQPhone }} </a-descriptions-item>
        <a-descriptions-item label="动物种类" :span="1"> {{ info.AQXuZhong }} </a-descriptions-item>
        <a-descriptions-item label="数量及单位" :span="1">
          {{ num }} &nbsp;&nbsp;{{ info.AQDanWei }}
        </a-descriptions-item>
        <a-descriptions-item label="用途" :span="1"> {{ info.AQYongTu }} </a-descriptions-item>
        <a-descriptions-item label="起运地点" :span="3"> {{ info.AQMemo2|replaceX }} </a-descriptions-item>
        <a-descriptions-item label="到达地点" :span="3"> {{ info.AQMemo3 }} </a-descriptions-item>
        <a-descriptions-item label="畜生耳标号" :span="3"> {{ info.AQEarTag }} </a-descriptions-item>
      </a-descriptions>
      <div class="zhong">
        <h3 class="ben">本批动物经检疫合格，应于当日内到达有效</h3>

        <h3 class="er">
          官方兽医签字：<u>{{ info.AQVeterinary }}</u>
        </h3>
        <h3 class="er">签发日期：{{ info.DateQF | dateFormat }}</h3>
        <h4 class="z">（动物卫生监督所检疫专用章）</h4>
      </div>
      <div id="dbInfo">
        <dbqr-code :visible="visibleQrcodeDBinfo" :codeId="DBinfo"></dbqr-code>
      </div>
      <div class="foot1">
        <h4>1.本证书一式两份，第一联由动物卫生监督所保留，第二联随货同行</h4>
        <h4>2.本证书限省境内使用</h4>
        <h4>3.畜生耳标号是需填写后3位，可另赋纸填写，并注明本检疫证明编号，同时加盖动物卫生监督所检疫专用章。</h4>
      </div>
    </div>
    <a-button v-print="'#printNew'" @click="showPrint">打印</a-button>
    <div v-show="printTF" id="printNew" v-html="this.printInfo"></div>
  </div>
</template>

<script>
import qrCode from '@/views/qrcode/index'
import dbqrCode from '@/views/qrcode/dbqrcode'
import { getQrCode } from '@/api/crcode'
import httpers from '@/utils/httpers.js'
import smallToBig from '@/utils/numberTocase'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    info: {
      type: Object
    }
  },
  components: {
    qrCode,
    dbqrCode
  },
  data () {
    return {
      printObj: {
        id: 'printNew',
        popTitle: '动物检疫（产品B）', // 文件标题
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      visibleQrcode: false,
      visibleQrcodeDBinfo: false,
      codeId: '',
      DBinfo: 'DB',
      infoItem: {},
      earTagPrint: '',
      printInfo: '',
      printTF: false,
       num: 1,
      datenum: 2
    }
  },
  watch: {
    info (newInfo) {
      this.visibleQrcode = true
      this.visibleQrcodeDBinfo = true
      console.log(newInfo)
      this.infoItem = newInfo
      var p = {
        FStId: this.infoItem.FStId,
        Mid: 30,
        UserId: sessionStorage.getItem('FStId')
      }
      getQrCode(p).then(res => {
        console.log(res)
        this.codeId = res.Data
        this.DBinfo += this.infoItem.AQNumber
        this.visibleQrcode = false
        this.visibleQrcodeDBinfo = false
      })
      this.getPrint()
      this.printTF = false
    }
  },
  methods: {
    showPrint () {
      this.printTF = true
      this.$emit('child-showTF')
    },
    getPrint () {
      this.num = smallToBig(this.infoItem.AQQuantity)
      // this.datenum = smallToBig(this.infoItem.AYouXiaoRi)
      this.$axios({
        method: 'get',
        url:
          httpers +
          '/SVPrint/TicketPrint.ashx?earTagPrint=' +
          this.earTagPrint +
          '&TicketType=30' +
          '&FSuserId=' +
          sessionStorage.getItem('FStId') +
          '&FStid=' +
          this.infoItem.FStId
      }).then(res => {
        this.printInfo = res.data.replace('..\\Jsonashx\\BitmapQRCode.ashx', 'http://www.miliotech.com:8886\\QingDaoZhuiSuPT\\Jsonashx\\BitmapQRCode.ashx')
         console.log(this.printInfo)
      })
    }
  }
}
</script>

<style scoped>
@media print {
  #printNew #qrcode{
   margin-left: -100px;
  }
  .infoTop{
    width:420px;
    margin-bottom: 40px;
  }
}
/* #dbInfo{
  position: absolute;
  top: 100px;
} */
.zhang {
  width: 150px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 10px;
}
.infoTop {
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
}
.dayi {
  margin-top: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.z {
  margin-left: 70%;
}
.foot1 {
  margin-left: 40px;
  position: relative;
}
.foot1:before {
  content: '注：';
  position: absolute;
  top: 0;
  left: -40px;
}
.er {
  margin-left: 60%;
}

.zhong {
  margin: 20px 0;
}
.hao {
  color: red;
  margin-left: 70%;
  display: inline-block;
}
.s {
  margin-left: 10px;
  font-size: 18px;
}
\deep\ .ant-modal {
  width: 100px;
}
</style>
