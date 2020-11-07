<template>
  <div class="all">
    <a-form @submit="handleSubmit" :form="form">
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="姓名"
            :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
          >
            <a-input v-decorator="['FEPCName', { rules: [{ required: true, message: '姓名' }] }]" name="FEPCName" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="身份证号码"
            :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          >
            <a-input v-decorator="['FEPCIDCard']" />
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
            <a-input v-decorator="['FEPCTel']" name="FEPCTel" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="性别"
            :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          >
            <a-radio-group v-decorator="['FEPCSex']" default-value="男">
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
            <a-select v-decorator="['FEPCMajor', { initialValue: '兽医专业' }]" @change="selectChangeitem">
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
            <a-select v-decorator="['FEPCEdu', { initialValue: '请选择' }]" @change="selectChangeitem">
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
              v-decorator="['FEPCAddress', { rules: [{ required: true, message: '所属县区乡镇' }] }]"
              style="margin-top: -1px ;width: 250px; position: absolute;background: white;z-index: 1000;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              allowClear

              :tree-data="this.options"
              :replaceFields="replaceFields"
              @change="selectOption"
            />
            <!-- <a-input
              disabled
              v-decorator="['FRBatch', { rules: [{ required: true, message: '所属县区乡镇' }] }]"
              name="FRBatch"
            />
            <a-button @click="showOptions()" style="position: absolute; margin: 3px 10px">
              选择
            </a-button> -->
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="防疫二维码"
            :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
          >
            <img src="" alt="" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
        <a-button type="primary" html-type="submit" style="width:315px; height: 40px;">
          保存
        </a-button>
      </a-form-item>
    </a-form>
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

export default {
  inject: ['reload'],
  data () {
    return {
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
      qeCodeInfo: 'https://qdxmsupervision.qingdao.gov.cn:8182?type=1&UserName='
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
    selectChangeitem () {

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
            FEPCTime: this.form.getFieldValue('FEPCTime') || '',
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
          this.options.forEach(item => {
            if (item.label !== p.FEPCAddress) {
              if (item.children) {
                item.children.forEach(itemO => {
                  if (itemO.label === p.FEPCAddress) {
                    p.FEPCAddress = item.label + itemO.label
                  } else {
                    if (itemO.children) {
                      itemO.children.forEach(itemT => {
                        if (itemT.label === p.FEPCAddress) {
                          p.FEPCAddress = item.label + itemO.label + itemT.label
                        } else {
                          if (itemT.children) {
                            itemT.children.forEach(itemTh => {
                              if (itemTh.label === p.FEPCAddress) {
                                p.FEPCAddress = item.label + itemO.label + itemT.label + itemTh.label
                              } else {
                                if (itemTh.children) {
                                  itemTh.children.forEach(itemF => {
                                    if (itemF.label === p.FEPCAddress) {
                                      p.FEPCAddress =
                                        item.label + itemO.label + itemT.label + itemTh.label + itemF.label
                                    }
                                  })
                                }
                              }
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
            }
          })
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
.all {
}
</style>
