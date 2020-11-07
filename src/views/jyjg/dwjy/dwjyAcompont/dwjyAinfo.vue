<template>
  <div>
    <!-- 二维码 -->
    <div >
      <qr-code :visible="visibleQrcode" :codeId="codeId"></qr-code>
      <img src="@/assets/b.png" alt="" class="zhang" />
      <h1 class="infoTop">动物检疫合格证明<span class="s">（动物A）</span></h1>
      <h3 class="hao">NO：{{ info.ANumber }}</h3>
      <a-descriptions :column="3" bordered>
        <a-descriptions-item label="货主" :span="1.5"> {{ info.ACargoOwner }} </a-descriptions-item>
        <a-descriptions-item label="联系电话" :span="1.5"> {{ info.APhone }} </a-descriptions-item>
        <a-descriptions-item label="动物种类" :span="1.5"> {{ info.AXuZhong }} </a-descriptions-item>
        <a-descriptions-item label="数量及单位" :span="1.5">
          {{ num }} &nbsp;&nbsp;{{ info.ADanWei }}
        </a-descriptions-item>
        <a-descriptions-item label="起运地点" :span="3"> {{ info.AMemo2|replaceX }} </a-descriptions-item>
        <a-descriptions-item label="到达地点" :span="3"> {{ info.AMemo3 }} </a-descriptions-item>
        <a-descriptions-item label="用途" :span="1"> {{ info.AYongTu }} </a-descriptions-item>
        <a-descriptions-item label="承运人" :span="1"> {{ info.ACarrier }} </a-descriptions-item>
        <a-descriptions-item label="联系电话" :span="1"> {{ info.APhoneCyr }} </a-descriptions-item>
        <a-descriptions-item label="运载方式" :span="2"> {{ info.AYunZai }} </a-descriptions-item>
        <a-descriptions-item label="运载工具牌号" :span="1"> {{ info.ATrademark }} </a-descriptions-item>
        <a-descriptions-item label="运载工具消毒情况" :span="3">
          装在前经<u>{{ info.ADisinfection }}</u
          >消毒
        </a-descriptions-item>
      </a-descriptions>
      <div class="zhong">
        <h3 class="ben">
          本批动物经检疫合格，应于<u>{{ datenum }}</u
          >日内到达有效
        </h3>
        <h3 class="er">
          官方兽医签字：<u>{{ info.AVeterinary }}</u>
        </h3>
        <h3 class="er">签发日期：{{ info.DateQF | dateFormat }}</h3>
        <h4 class="z">（动物卫生监督所检疫专用章）</h4>
      </div>
      <a-descriptions :column="3" bordered>
        <a-descriptions-item label="畜生耳标号" :span="3">
          {{ info.AEarTag }}
        </a-descriptions-item>
        <a-descriptions-item label="动物卫生监督检查签章" :span="3"> </a-descriptions-item>
        <a-descriptions-item label="备注" :span="3">{{ info.AMemo1 }}</a-descriptions-item>
      </a-descriptions>

      <div class="foot1">
        <h4>1.本证书一式两份，第一联由动物卫生监督所保留，第二联随货同行</h4>
        <h4>2.跨省调运动物到达目的地后，货主或承运人应在24小时内向输入动物卫生监督机构报告。</h4>
        <h4>3.动物卫生鉴定监督机构联系电话：{{ info.ADwPhone }}</h4>
      </div>
    </div>
    <a-button v-print="'#printNew'" @click="showTFDJ">打印</a-button>
    <div v-show="printTF" id="printNew" v-html="this.printInfo"></div>
  </div>
</template>

<script>
import qrCode from '@/views/qrcode/index'
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
    qrCode
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
      codeId: '',
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
      console.log(newInfo)
      this.infoItem = newInfo
      var p = {
        FStId: this.infoItem.FStId,
        Mid: 29,
        UserId: sessionStorage.getItem('FStId')
      }
      getQrCode(p).then(res => {
        console.log(res)
        this.codeId = res.Data
        this.visibleQrcode = false
      })
      this.printTF = false
      this.getPrint()
      // console.log(this.capitalizate(['1']))
    }
  },
  computed: {
    // capitalizate () {
    //   const list = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
    //   var str = ''
    //   for (var i = 0; i < this.num.length; i++) {
    //     str += list[this.num[i]]
    //   }
    //   console.log('执行力')
    //   console.log(str)
    //   return str
    // }
  },
  methods: {
    showTFDJ () {
      this.printTF = true
      this.$emit('child-showTF')
    },
    getPrint () {
      this.num = smallToBig(this.infoItem.AQuantity)
      this.datenum = smallToBig(this.infoItem.AYouXiaoRi)
      console.log(smallToBig(123))
      this.$axios({
        method: 'get',
        url:
          httpers +
          '/SVPrint/TicketPrint.ashx?earTagPrint=' +
          this.earTagPrint +
          '&TicketType=29' +
          '&FSuserId=' +
          sessionStorage.getItem('FStId') +
          '&FStid=' +
          this.infoItem.FStId
      }).then(res => {
        this.printInfo = res.data.replace('..\\Jsonashx\\BitmapQRCode.ashx', 'http://www.miliotech.com:8886\\QingDaoZhuiSuPT\\Jsonashx\\BitmapQRCode.ashx')
        //  console.log(this.printInfo)
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
.zhang {
  width: 150px;
  height: 100px;
  position: absolute;
  left: 48%;
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
</style>
