<template>
  <div>
    <a-form :form="updateForm" @submit="onSubmit">
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="记录单编号："
            :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input v-decorator="['recordNo', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="检疫证编号："
            :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input v-decorator="['AQNumber', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
            ref="name"
            label="货主姓名"
            prop="name"
            :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input v-decorator="['AQCargoOwner', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>
          <a-button @click="xz">选择</a-button>
        </a-col>

        <a-col :span="12">
          <a-form-item
            ref="name"
            label="联系电话"
            prop="phone"
            :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-input v-decorator="['AQPhone', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
            label="动物种类:"
            :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-select
              v-decorator="['AQXuZhong', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 160px"
              placeholder="请选择"
            >
              <a-select-option value="猪"> 猪 </a-select-option>
              <a-select-option value="牛"> 牛 </a-select-option>
              <a-select-option value="羊"> 羊 </a-select-option>
              <a-select-option value="狗"> 狗 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="数量及单位:"
            :labelCol="{ lg: { span: 6 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['AQQuantity', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 80px; margin-right: 10px"
            ></a-input>
            <a-select
              v-decorator="['AQDanWei', { rules: [{ required: true, message: '请输入' }] }]"
              style="position: absolute; top: 50%; transform: translateY(-50%); width: 100px"
              placeholder="请选择"
            >
              <a-select-option value="头"> 头 </a-select-option>
              <a-select-option value="只"> 只 </a-select-option>
              <a-select-option value="箱"> 箱 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="用途:"
            :labelCol="{ lg: { span: 12 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
          >
            <a-select
              v-decorator="['AQYongTu', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 160px"
              placeholder="请选择"
            >
              <a-select-option value="饲养"> 饲养 </a-select-option>
              <a-select-option value="屠宰"> 屠宰 </a-select-option>
              <a-select-option value="乳用"> 乳用 </a-select-option>
              <a-select-option value="种用"> 种用 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="运载工具牌号"
            :labelCol="{ lg: { span: 8 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
          >
            <a-input v-decorator="['Fsm5', { rules: [{ required: true, message: '请输入' }] }]"></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="启运地点:"
            :labelCol="{ lg: { span: 4 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }"
          >
            <a-select
              v-decorator="['AQShiQy', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 120px; margin-right: 10px"
              @change="ChangeTown"
              placeholder="请选择"
            >
              <a-select-option value="青岛市"> 青岛市 </a-select-option>
            </a-select>
            <a-select
              v-decorator="['AQXianQy', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 120px; margin-right: 10px"
              @change="ChangeRegion"
              placeholder="请选择"
            >
              <a-select-option value="请选择"> 请选择 </a-select-option>
              <a-select-option v-for="(item, index) in regInfo" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select>
            <a-select
              v-decorator="['AQXiangQy', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 120px"
              v-if="peoTF"
              @change="ChangePeo"
              placeholder="请选择"
            >
              <a-select-option value="请选择"> 请选择 </a-select-option>
              <a-select-option v-for="(item, index) in peoInfo" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="地点类型:"
            :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-select
              v-decorator="['AQTypeQy', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 160px"
              placeholder="请选择"
            >
              <a-select-option value="养殖场"> 养殖场 </a-select-option>
              <a-select-option value="交易市场"> 交易市场 </a-select-option>
              <a-select-option value="散养户"> 散养户 </a-select-option>
              <a-select-option value="其他"> 其他 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="6">
          <a-form-item
            :labelCol="{ lg: { span: 19 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input v-model="Detailed" placeholder="请输入乡（镇）"></a-input
            ></a-form-item>
        </a-col> -->
        <!-- <a-col :span="6">
          <a-form-item
            :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['AQCunQy', { rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请输入养殖场名称"
            ></a-input
            ></a-form-item>
        </a-col> -->
        <a-col :span="24">
          <a-form-item
            label="到达地点:"
            :labelCol="{ lg: { span: 4 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }"
          >
            <a-select
              v-decorator="['AQShiDd', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 120px; margin-right: 10px"
              @change="ChangeTown"
              placeholder="青岛市"
            >
              <a-select-option value="青岛市"> 青岛市 </a-select-option>
            </a-select>
            <a-select
              v-decorator="['AQXianDd', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 120px; margin-right: 10px"
              @change="ChangeRegion1"
              placeholder="请选择"
            >
              <a-select-option value="请选择"> 请选择 </a-select-option>
              <a-select-option v-for="(item, index) in regInfo1" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select>
            <a-select
              v-decorator="['AQXiangDd', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 120px"
              v-if="peoTF1"
              @change="ChangePeo1"
              placeholder="请选择"
            >
              <a-select-option value="请选择"> 请选择 </a-select-option>
              <a-select-option v-for="(item, index) in peoInfo1" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="地点类型:"
            :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-select
              v-decorator="['AQTypeDd', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 160px"
              placeholder="请选择"
            >
              <a-select-option value="养殖场"> 养殖场 </a-select-option>
              <a-select-option value="交易市场"> 交易市场 </a-select-option>
              <a-select-option value="散养户"> 散养户 </a-select-option>
              <a-select-option value="其他"> 其他 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="6">
          <a-form-item
            :labelCol="{ lg: { span: 19 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['AQXiangDd', { rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请输入乡（镇）"
            ></a-input
            ></a-form-item>
        </a-col> -->
        <!-- <a-col :span="6">
          <a-form-item
            :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['AQCunDd', { rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请输入养殖场名称"
            ></a-input
            ></a-form-item>
        </a-col> -->

        <a-col :span="16">
          <a-form-item
            label="牲畜耳标号:"
            :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 14 }, sm: { span: 1 } }"
          >
            <a-input
              v-decorator="['AQEarTag', { rules: [{ required: true, message: '请输入' }] }]"
              style="height: 125px"
              type="textarea"
            /></a-form-item>
        </a-col>
        <a-col :span="4" :offset="0">
          <a-button type="primary" @click="er">耳标输入</a-button>
        </a-col>
        <a-col :span="16">
          <a-form-item
            label="备注:"
            :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 14 }, sm: { span: 1 } }"
          >
            <a-input
              v-decorator="['AQMemo1']"
              style="height: 125px"
              type="textarea"
            /></a-form-item>
        </a-col>
        <a-col :span="22" :offset="1">
          <div>本批动物经检疫合格,应于当日内到达有效。</div>
          <br />
        </a-col>
        <a-col :span="15">
          <a-form-item
            label="官方兽医签字:"
            :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 1 } }"
          >
            <a-input
              v-decorator="['AQVeterinary', { rules: [{ required: true, message: '请输入' }] }]"
            /></a-form-item>
        </a-col>
        <a-col :span="9">
          <a-form-item
            label="签发日期："
            :labelCol="{ lg: { span: 5 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 1 } }"
          >
            <a-date-picker
              v-decorator="['DateQF', { rules: [{ required: true, message: '请输入' }] }]"
              show-time
              type="date"
              placeholder="Pick a date"
            /></a-form-item>
        </a-col>
      </a-row>
      <a-button
        type="primary"
        html-type="submit"
        style="margin-left: 50%; transform: translateX(-50%); width: 315px; height: 40px"
      >
        确认
      </a-button>
    </a-form>
    <a-modal v-model="vv" :footer="null" width="1000px" :zIndex="1004" :destroyOnClose="true">
      <clu :columns1="clo" :totalnum="tt" :shu="shu1" @child-event1="father" @tiao="tiao"> </clu>
    </a-modal>
    <a-modal :zIndex="1003" v-model="erVisited" :footer="null" width="800px">
      <er num="10" @hander-fa="ff"></er>
    </a-modal>
  </div>
</template>
<script>
// import { AnimalBinfo } from '@/api/cdjy'
import clu from '@/views/jyjg/compont/clu3'
import er from '@/views/jyjg/compont/er'
// eslint-disable-next-line camelcase
import { OwnerGet } from '@/api/cdjy'
import httper from '@/utils/httper'
export default {
  props: {
    myinfo: {
      type: Object
    },
    showvisible: Boolean
  },
  data () {
    return {
      peoTF: false,
      peoTF1: false,
      updateForm: this.$form.createForm(this),
      fatherInfo: {},
      shu: [],
      shu1: [],
      erVisited: false,
      regInfo: [],
      regInfo1: [],
      tt: 0,
      vv: false,
      Detailed: '',
      UserId: sessionStorage.getItem('FStId'),
      clo: [
        {
          title: '名称',
          key: 'FFarmName',
          width: 100,
          align: 'center',
          dataIndex: 'FFarmName'
        },
        {
          title: '动物种类',
          key: 'FCategory',
          align: 'center',
          dataIndex: 'FCategory',
          width: 80
        },
        {
          title: '地址',
          key: 'FCityAdd',
          align: 'center',
          dataIndex: 'FCityAdd',
          width: 180
        },

        {
          title: '操作',
          key: 'cz',
          fixed: 'right',
          width: 150,
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  components: {
    clu,
    er
  },
  watch: {
    showvisible (newshowvisible) {
      console.log(this.myinfo)
      this.fatherInfo = this.myinfo
      this.$axios.get(httper + '/GetNumber.ashx?type=1&uid=' + JSON.parse(localStorage.getItem('AllInfo')).FStId).then(
          res => {
          console.log(res)
          if (!res.data.errorCode) {
            this.$nextTick(() => {
              this.updateForm.setFieldsValue({
                AQNumber: res.data.data.result

              })
            })
          }
          // this.addForm.setFieldsValue({ ANumber: res.data.data.result })
        })
      this.$nextTick(() => {
        this.updateForm.setFieldsValue({
          recordNo: this.myinfo.recordNo,
          AQCargoOwner: this.myinfo.shippername,
          AQNumber: this.myinfo.ANumber,
          AQPhone: this.myinfo.teltphone
        })
      })
      console.log(this.fatherInfo)
    }
  },
  created () {
    this.$nextTick(() => {
      this.updateForm.setFieldsValue({
        recordNo: this.myinfo.recordNo,
        AQNumber: this.myinfo.ANumber
      })
    })
  },
  methods: {
    ChangePeo1 () {},
    xz () {
      console.log(11)
      OwnerGet({ offset: 1, limit: 10, selectWhere: '', dist: 'gmyzc' }, this.UserId).then(res => {
        // console.log(res)
        this.shu1 = JSON.parse(res.Data).rows
        this.tt = parseInt(JSON.parse(res.Data).total)
      })
      this.vv = true
    },
    tiao (data) {
      console.log(data)
      OwnerGet(data, this.UserId).then(res => {
        this.shu1 = JSON.parse(res.Data).rows
        this.tt = parseInt(JSON.parse(res.Data).total)
      })
    },
    er () {
      console.log('执行了耳标输入')
      this.erVisited = true
    },
    ff (arr) {
      console.log(arr)
      this.addForm.setFieldsValue({
        AQEarTag: arr
      })
      this.erVisited = false
    },
    handleSubmit (e) {
      e.preventDefault()
    },
     onSubmit (e) {
      e.preventDefault()
      console.log(this.updateForm.getFieldsValue())
      const data = {
        type: 'AH_AnimalOrigin',
        json: JSON.stringify(this.updateForm.getFieldsValue()),
        uid: JSON.parse(localStorage.getItem('AllInfo')).FStId
      }
       console.log(data)

      this.$axios({
        method: 'post',
        url: 'http://www.miliotech.com:8886/QDZSAPP/HtmlAshxQua/UplaodJYFiles.ashx?json=' + JSON.stringify(this.updateForm.getFieldsValue()) + '&type=AH_AnimalOrigin&uid=' + JSON.parse(localStorage.getItem('AllInfo')).FSuserId
      }).then(res => {
        this.reload()
      })
    },
    // 市级选择触发
    ChangeTown (val) {
      console.log(val)
    },
    ChangeRegion (val) {
      console.log(val)
      if (val === '请选择') {
        this.peoTF = false
      } else {
        this.peoTF = false
        setTimeout(() => {
          this.peoTF = true
          this.regName = this.regInfo[val].label
          this.peoName = '请选择'

          this.peoInfo = this.regInfo[val].children
        }, 0)
      }
    },
    ChangePeo (val) {
      if (val === '请选择') {
        this.peoName = '请选择'
      } else {
        this.peoTF = true
        console.log(val)
        console.log(this.peoInfo[val].label)
        this.peoName = this.peoInfo[val].label
      }
    },
    ChangeRegion1 (val) {
      console.log(val)
      if (val === '请选择') {
        this.peoTF1 = false
      } else {
        this.peoTF1 = false
        setTimeout(() => {
          this.peoTF1 = true
          this.regName1 = this.regInfo1[val].label
          this.peoName1 = '请选择'
          this.peoInfo1 = this.regInfo1[val].children
        }, 0)
      }
    },
    father (data) {
      // this.updateinfo.supervisename = data.FFarmName
      // this.updateinfo.animalsort = data.FCategory
      // this.updateinfo.startaddress4 = data.FCityAdd
      // this.updateinfo.shippername = data.FLegalPerson
      // this.updateinfo.teltphone = data.FPhone
      this.vv = false
      this.$nextTick(() => {
        this.updateForm.setFieldsValue({
          AQXuZhong: data.FCategory,
          AQShiQy: data.FCityAdd,
          AQTypeQy: data.FFarmName
        })
      })
      console.log(data)
    }
  }
}
</script>
<style lang="less" scoped></style>
