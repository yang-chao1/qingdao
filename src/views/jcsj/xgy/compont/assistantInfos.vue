<template>
  <div class="all">
    <div id="printNew">
      <h3>协管员基本信息</h3>
      <div class="defalutInfo">
        <div class="infoName">
          <label>姓名</label>
          <p>{{ assistantItem.FEPCName }}</p>
        </div>
      </div>
      <div class="defalutInfo">
        <div class="infoItem">
          <label class="nthItem">性别</label>
          <p>{{ assistantItem.FEPCSex }}</p>
        </div>
        <div class="infoItem">
          <label>所学专业</label>
          <p>{{ assistantItem.FEPCMajor }}</p>
        </div>
      </div>
      <div class="defalutInfo">
        <div class="infoItem">
          <label class="nthItem">联系电话</label>
          <p>{{ assistantItem.FEPCTel }}</p>
        </div>
        <div class="infoItem">
          <label>身份证号</label>
          <p>{{ assistantItem.FEPCIDCard }}</p>
        </div>
      </div>
      <div class="defalutInfo">
        <div class="infoItem">
          <label class="nthItem">所属县区乡镇</label>
          <p>{{ assistantItem.FEPCAddress }}</p>
        </div>
        <div class="infoItem">
          <label>学历</label>
          <p>{{ assistantItem.FEPCEdu }}</p>
        </div>
      </div>
      <div class="preparer">
        <span>填表人：</span>
        <span>{{ assistantItem.FSuserName }}</span
        >&nbsp;&nbsp;
        <span>填表时间：</span>
        <span>{{ assistantItem.FScTime }}</span>
      </div>
      <a-form @submit="handleSubmit" :form="form">
        <!-- <a-row>
        <a-col :span="12">
          <a-form-item
            label="姓名"
            :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
          >
            <a-input disabled v-decorator="['FEPCName']" name="FEPCName" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="身份证号码"
            :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          >
            <a-input disabled v-decorator="['FEPCIDCard']" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="联系电话"
            :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
          >
            <a-input disabled v-decorator="['FEPCTel']" name="FEPCTel" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="性别"
            :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          >
            <a-radio-group disabled v-decorator="['FEPCSex']" default-value="男">
              <a-radio value="男">男</a-radio>
              <a-radio value="女">女</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="所学专业"
            :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
          >
            <a-select disabled v-decorator="['FEPCMajor', { initialValue: '兽医专业' }]" @change="selectChangeitem">
              <a-select-option value="兽医专业">兽医专业</a-select-option>
              <a-select-option value="非兽医专业">非兽医专业</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="学历"
            :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          >
            <a-select disabled v-decorator="['FEPCEdu', { initialValue: '请选择' }]" @change="selectChangeitem">
              <a-select-option value="请选择">请选择</a-select-option>
              <a-select-option value="高中以下">高中以下</a-select-option>
              <a-select-option value="高中">高中</a-select-option>
              <a-select-option value="中专">中专</a-select-option>
              <a-select-option value="大专">大专</a-select-option>
              <a-select-option value="本科">本科</a-select-option>
              <a-select-option value="硕士以上">硕士以上</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="18">
          <a-form-item
            label="所属县区乡镇"
            :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 15 }, sm: { span: 17 } }"
          >
            <a-tree-select
              disabled
              v-decorator="['FEPCAddress', { rules: [{ required: true, message: '所属县区乡镇' }] }]"
              style="margin-top: -1px ;width: 250px; position: absolute;background: white;z-index: 1000;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              allowClear
              :load-data="onLoadData"
              :tree-data="this.options"
              :replaceFields="replaceFields"
              @change="selectOption"
            />

          </a-form-item>
        </a-col>
      </a-row> -->
        <a-row>
          <a-col :span="12" style="height: 120px;">
            <a-form-item
              label="防疫二维码"
              :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
              :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
            >
              <qr-code :visible="visibleqrcode" :codeId="assistantItem.QRCode"></qr-code>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
        <a-button type="primary" html-type="submit" style="width:315px; height: 40px;">
          保存
        </a-button>
      </a-form-item> -->
      </a-form>
    </div>
    <a-button type="primary" v-print="'#printNew'" style="margin:20px 50%;transform:translateX(-50%)">打印</a-button>
    <!-- <a-modal
      :footer="null"
      title="所属县区乡镇"
      :visible="ssyzTF"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      width="800px"
      :destroyOnClose="true"
    >

    </a-modal> -->
  </div>
</template>
<script>
import { getAdminAddress } from '@/api/AdministrativeAddress'
import { getCFYYInforFileAdd } from '@/api/assistant'
import qrCode from '@/views/qrcode/index'
// import { getQrCode } from '@/api/crcode'
export default {
  props: {
    assistantItem: Object
  },
  inject: ['reload'],
  data () {
    return {
      printObj: {
        id: 'printNew',
        popTitle: '动物检疫（产品B）', // 文件标题
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      form: this.$form.createForm(this),
      // 区，动监站选择
      regionTF: false,
      regInfo: [],
      peoTF: false,
      peoInfo: [],
      // 区名称
      regName: '请选择',
      // 动监站名称
      peoName: '请选择',
      options: [],
      replaceFields: {
        children: 'children',
        title: 'label',
        key: 'key',
        value: 'label'
      },
      ssyzTF: false,
      UserId: sessionStorage.getItem('FStId'),
      qeCodeInfo: 'https://qdxmsupervision.qingdao.gov.cn:8182?type=1&UserName=',
      visibleqrcode: false,
      codeId: '',
      infoItem: false,
      assistantItemInfo: {}
    }
  },
  components: {
    qrCode
  },
  watch: {
    assistantItem (newassistantItem) {
      this.$nextTick(() => {
        this.form.setFieldsValue(newassistantItem)
      })
      this.codeId = newassistantItem.QRCode
      this.assistantItemInfo = newassistantItem
    }
  },
  created () {
    // 行政树
    getAdminAddress()
      .then(res => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
        this.peoInfo = this.regInfo[0].children
      })
      .catch(rol => {
        console.log(rol)
      })
  },
  methods: {
    selectOption (v) {
      console.log(v)
    },

    showOptions () {
      this.ssyzTF = true
    },
    handleOk () {
      this.ssyzTF = false
    },
    handleCancel () {
      this.ssyzTF = false
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          var p = {
            FEPCName: this.form.getFieldValue('FEPCName') || '',
            FEPCSex: this.form.getFieldValue('FEPCSex') || '男',
            FEPCTime: this.assistantItemInfo.FEPCTime || '',
            FEPCTel: this.form.getFieldValue('FEPCTel') || '',
            FEPCIDCard: this.form.getFieldValue('FEPCIDCard') || '',
            FEPCAddress: this.form.getFieldValue('FEPCAddress') || '',
            FEPCMajor: this.form.getFieldValue('FEPCMajor') || '',
            FEPCEdu: this.form.getFieldValue('FEPCEdu') || '',
            FWorkArea: this.form.getFieldValue('FWorkArea') || '',
            FJD: this.form.getFieldValue('FJD') || '',
            FWD: this.form.getFieldValue('FWD') || '',
            FNotes: this.form.getFieldValue('FNotes') || '',
            QRCode: this.qeCodeInfo + this.form.getFieldValue('FEPCName'),
            FEPCPost: this.form.getFieldValue('FEPCPost') || ''
          }

          getCFYYInforFileAdd(p, this.UserId)
            .then(res => {
              console.log(res)
              this.ssyzTF = false
              this.reload()
            })
            .catch(rol => {
              console.log(rol)
            })
        } else {
          this.$notification.error({
            message: '请检查输入信息'
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@media print {
  #printNew {
    width: 1000px;
    // border-right: 1px solid black;
    // border-left: 1px solid black;
    padding: 20px;
    .infoName {
      border: 1px solid black;
      label{
         border-left: 1px solid black;
      }
    }
    .infoItem {
      border-left: 1px solid black;
      border-bottom: 1px solid black;

      label {
        border-bottom: 1px solid black;
      }
      .nthItem{
        border-left: 1px solid black;
      }
    }
  }
}
#printNew {
  box-sizing: border-box;
  // width: 1000px;
  h3 {
    display: block;
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }
  // 表格样式开始
  .defalutInfo {
    display: flex;
    justify-content: flex-start;
    text-align: center;
    height: 50px;
    line-height: 50px;
    // padding: 10px 30px;

    label {
      display: block;
      width: 160px;
      background: cornsilk;
      border-right: 1px solid black;
    }
    .infoName {
      width: 1000px;
      display: flex;
      justify-content: flex-start;
      border: 1px solid black;
      p {
        display: block;
        width: 600px;
        text-align: center;
        font-size: 12px;
      }
    }
    .infoItem {
      width: 500px;
      display: flex;
      justify-content: flex-start;
      border-left: 1px solid black;
      border-bottom: 1px solid black;
      p {
        display: block;
        width: 300px;
        font-size: 12px;
      }
    }
    .infoItem:nth-child(2n) {
      border-right: 1px solid black;
    }
  }
  // 表格样式结束
  // 填表信息开始
  .preparer {
    width: 500px;
    float: right;
  }
  // 填表信息结束
}
</style>
