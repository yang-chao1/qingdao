<template>
  <div>
    <a-form :form="addForm" @submit="handleSubmit">
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="记录单编号："
            :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-input disabled v-decorator="['JLDNumber', { rules: [{ required: true, message: '请输入' }] }]" />
            <a-input v-decorator="['JLDLX']" style="display:none"/>
            <a-input v-decorator="['FGlid']" style="display:none"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="检疫证编号："
            :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-input disabled v-decorator="['AQNumber', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            ref="name"
            label="货主姓名"
            prop="name"
            :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-input disabled v-decorator="['AQCargoOwner', { rules: [{ required: true, message: '请输入' }] }]" />
            <!-- <a-button @click="xz" type="primary" style="position: absolute;margin: 3px 5px">选择</a-button> -->
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            ref="phone"
            label="联系电话"
            prop="phone"
            :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-input disabled v-decorator="['AQPhone', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
            label="动物种类:"
            :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-select
              disabled
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
              disabled
              v-decorator="['AQQuantity', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 80px; margin-right: 10px"
            ></a-input>
            <a-select
              disabled
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
        <a-col :span="12">
          <a-form-item
            label="用途:"
            :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
          >
            <a-select
              disabled
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
            :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
          >
            <a-input disabled v-decorator="['Fsm5']"></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="启运地点:"
            :labelCol="{ lg: { span: 4 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }"
          >
            <a-row>
              <a-col :span="5">
                <a-select v-model="provinceQy" @change="getCityQy" disabled >
                  <a-select-option v-for="(item,index) in arrQy" :value="item.label" :key="index">{{ item.label }}</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="5">
                <a-select v-model="cityQy" @change="getCountyQy" disabled>
                  <a-select-option v-for="(item,index) in cityArrQy" :value="item.label" :key="index">{{
                    item.label
                  }}</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="5">
                <a-select v-model="countyQy" disabled>
                  <a-select-option v-for="(item,index) in countyArr" :value="item.label" :key="index">{{
                    item.label
                  }}</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="8">
                <a-input
                  disabled
                  v-decorator="['AQXiangQy']"
                  placeholder="请输入乡（镇）"
                />
              </a-col>
            </a-row>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="地点类型:"
            :labelCol="{ lg: { span: 12 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
          >
            <a-select
              disabled
              v-decorator="['AQTypeQy']"
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
            :labelCol="{ lg: { span: 0 }, sm: { span: 0 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 19 } }"
          >
            <a-input
              disabled
              v-decorator="['AQXiangQy']"
              placeholder="请输入乡（镇）"
            ></a-input
            ></a-form-item>
        </a-col> -->
        <a-col :span="10">
          <a-form-item
            :labelCol="{ lg: { span: 0 }, sm: { span: 0 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              disabled
              v-decorator="['AQCunQy']"
              placeholder="请输入养殖场名称"
            ></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="到达地点:"
            :labelCol="{ lg: { span: 4 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }"
          >
            <a-row>
              <a-col :span="5">
                <a-select v-model="province" @change="getCity" disabled >
                  <a-select-option v-for="(item,index) in arr" :value="item.label" :key="index">{{ item.label }}</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="5">
                <a-select v-model="city" @change="getCounty" disabled>
                  <a-select-option v-for="(item,index) in cityArr" :value="item.label" :key="index">{{
                    item.label
                  }}</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="5">
                <a-select v-model="county" disabled>
                  <a-select-option v-for="(item,index) in countyArr" :value="item.label" :key="index">{{
                    item.label
                  }}</a-select-option>
                </a-select>
              </a-col>
              <a-col :span="8">
                <a-input disabled v-decorator="['AQXiangDd', { rules: [{ required: true, message: '请输入' }] }]" placeholder="请输入乡（镇）"/>
              </a-col>
            </a-row>

          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="地点类型:"
            :labelCol="{ lg: { span: 12 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
          >
            <a-select
              disabled
              v-decorator="['AQTypeDd', { rules: [{ required: true, message: '请输入' }] }]"
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
            <a-input v-decorator="['AQXiangDd', { rules: [{ required: true, message: '请输入' }] }]" placeholder="请输入乡（镇）"></a-input
            ></a-form-item>
        </a-col> -->
        <a-col :span="10">
          <a-form-item
            :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              disabled
              v-decorator="['AQCunDd', { rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请输入养殖场名称"
            ></a-input
            ></a-form-item>
        </a-col>
        <a-row>

          <a-col :span="16" v-if="addForm.getFieldsValue().AQXuZhong==='猪'||addForm.getFieldsValue().AQXuZhong==='羊'||addForm.getFieldsValue().AQXuZhong==='牛'">
            <a-form-item
              label="牲畜耳标号:"
              :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
              :wrapperCol="{ lg: { span: 14 }, sm: { span: 1 } }"
            >
              <a-input
                disabled
                v-decorator="['AQEarTag', { rules: [{ required: true, message: '请输入' }] }]"
                style="height: 125px"
                type="textarea"
              />
              <a-button type="primary" @click="er" style="position: absolute;margin: 3px 5px">耳标输入</a-button>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-col :span="4" :offset="0">
          <a-button type="primary" @click="er">耳标输入</a-button>
        </a-col> -->
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
            /></a-form-item>
        </a-col>
      </a-row>
      <a-button
        :disabled="useBut"
        type="primary"
        html-type="submit"
        style="margin-left: 50%; transform: translateX(-50%); width: 315px; height: 40px"
      >
        确认
      </a-button>
    </a-form>
    <a-modal :destroyOnClose="true" :zIndex="1003" v-model="vv" width="900px">
      <clu :columns1="clo" :totalnum="tt" :shu="shu1" @child-event1="father" @tiao="tiao"> </clu>
    </a-modal>
    <a-modal :destroyOnClose="true" :zIndex="1003" v-model="erVisited" :footer="null" width="800px">
      <er :num="num" @hander-fa="ff"></er>
    </a-modal>
  </div>
</template>

<script>

import { getXiang } from '@/assets/getXiang'
import { OwnerGet } from '@/api/cdjy'
import er from '@/views/jyjg/compont/er'
// eslint-disable-next-line no-unused-vars
import clu from '@/views/jyjg/compont/clu3'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import httper from '@/utils/httper'
import { getTime } from '@/utils/time.js'

import citys from '../../../../../static/citys'
export default {
  inject: ['reload'],
  components: {
    clu,
    er
  },
  props: {},

  data () {
    return {
      AQXuZhong: '',
      useBut: false,
      num: 0,
      erVisited: false,
      addForm: this.$form.createForm(this),
      addVisitd: false,
      shu: [],
      shu1: [],
      tt: 0,
      subTF: false,
      vv: false,
      UserId: sessionStorage.getItem('FStId'),

     clo: [
        {
          title: '名称',
          key: 'FSyzcmc',
          width: 100,
          align: 'center',
          dataIndex: 'FSyzcmc'
        },
        {
          title: '动物种类',
          key: 'FSxz',
          align: 'center',
          dataIndex: 'FSxz',
          width: 80
        },
        {
          title: '地址',
          key: 'FSxxdz',
          align: 'center',
          dataIndex: 'FSxxdz',
          width: 180
        },
        {
          title: '电话',
          key: 'FSlxdh',
          align: 'center',
          dataIndex: 'FSlxdh',
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
      ],
      Detailed: '',
      // 行政存储
      FeQD1: [],
      FeQS1: [],
      FeDJ1: [],
      FeDjz1: [],
      // 区，动监站选择
      regionTF1: false,
      regInfo1: [],
      peoTF1: false,
      peoInfo1: [],

      // 区名称
      regName1: '请选择',
      // 动监站名称
      peoName1: '请选择',

      // 行政存储
      FeQD: [],
      FeQS: [],
      FeDJ: [],
      FeDjz: [],
      // 区，动监站选择
      regionTF: false,
      regInfo: [],
      peoTF: false,
      peoInfo: [],

      // 区名称
      regName: '请选择',
      // 动监站名称
      peoName: '请选择',
      itemInfo: {},
      // 地址
      province: '',
      city: '',
      county: '',
      provinceQy: '',
      cityQy: '',
      countyQy: '',
      arr: [],
      cityArr: [],
      countyArr: [],
      arrQy: [],
      cityArrQy: [],
      countyArrQy: []
    }
  },

  created () {
    this.findeInfo()
    this.arr = citys
    console.log(this.$attrs)
    this.getHao()
    // this.getRecordNo()

    // 行政树
    getAdminAddress()
      .then(res => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
        this.regInfo1 = this.options[0].children
        // this.regName = '请选择'
        res.forEach(item => {
          this.FeQD = item
          this.FeQD1 = item
          item.children.forEach((items, index) => {
            this.FeQS.push(items)
            this.FeQS1.push(items)
            items.children.forEach((itemOl, index) => {
              this.FeDjz.push(itemOl)
              this.FeDjz1.push(itemOl)
            })
          })
        })
        console.log(this.FeQD, this.FeQS, this.FeDJ)
      })
      .catch(rol => {
        console.log(rol)
      })
  },
  methods: {
    findeInfo () {
      console.log(123)
      console.log(this.$attrs)

      const jldlx = this.$attrs.JLDLX
      const ClMyinfo = this.$attrs.myinfo
      this.province = ClMyinfo.rdddzxx
      this.city = ClMyinfo.rdddzxx1
      this.county = ClMyinfo.rdddzxx2
      var xiang = getXiang(ClMyinfo.rdddzxx3)
      console.log(xiang)
      this.provinceQy = ClMyinfo.startaddress
      this.cityQy = ClMyinfo.startaddress1
      this.countyQy = ClMyinfo.startaddress2
      this.AQXuZhong = ClMyinfo.animalsort
      this.$nextTick(() => {
        this.addForm.setFieldsValue({
            JLDLX: jldlx,
          FGlid: ClMyinfo.FStId,
          JLDNumber: ClMyinfo.recordNo,
          AQCargoOwner: ClMyinfo.shippername,
          AQPhone: ClMyinfo.teltphone,
          AQXuZhong: ClMyinfo.animalsort,
          AQQuantity: ClMyinfo.animalnum,
          AQDanWei: ClMyinfo.QDWDanWei,
          AQYongTu: ClMyinfo.myuse,
          Fsm5: ClMyinfo.toolid,
          AQShiQy: ClMyinfo.rqydzxx,

          AQTypeQy: ClMyinfo.startaddress5,

          AQTypeDd: ClMyinfo.rdddzxx5,
          AQEarTag: ClMyinfo.ErBiaoHao,
          AQMemo1: '本检疫证二十四小时内到达有效',
          AQVeterinary: sessionStorage.getItem('FuName'),
          DateQF: getTime(),
          AQXiangQy: ClMyinfo.startaddress3,
          AQCunQy: ClMyinfo.startaddress4,
          AQXiangDd: xiang,
          AQCunDd: ClMyinfo.rdddzxx4
        })
      })
    },
    getCity () {
      for (var i = 0; i < this.arr.length; i++) {
        var obj = this.arr[i]
        if (this.province === obj.label) {
          this.cityArr = obj.children
          console.log(obj.children)
          this.city = obj.children[0].label
          this.county = obj.children[0].children[0].label
        }
      }
    },
    getCounty () {
      for (var i = 0; i < this.cityArr.length; i++) {
        var obj = this.cityArr[i]
        if (this.city === obj.label) {
          this.countyArr = obj.children
          // this.city = ''
          this.county = obj.children[0].label
        }
      }
    },
    getCityQy () {
      for (var i = 0; i < this.arr.length; i++) {
        var obj = this.arrQy[i]
        if (this.provinceQy === obj.label) {
          this.cityArr = obj.children
          console.log(obj.children)
          this.cityQy = obj.children[0].label
          this.countyQy = obj.children[0].children[0].label
        }
      }
    },
    getCountyQy () {
      for (var i = 0; i < this.cityArr.length; i++) {
        var obj = this.cityArrQy[i]
        if (this.city === obj.label) {
          this.countyArrQy = obj.children
          // this.city = ''
          this.countyQy = obj.children[0].label
        }
      }
    },
    ff (arr) {
      console.log(arr)
      this.erVisited = false
      if (this.addForm.getFieldValue('AQEarTag')) {
        arr += this.addForm.getFieldValue('AQEarTag')
      }
      this.$nextTick(() => {
        this.addForm.setFieldsValue({
          AQEarTag: arr
        })
      })
    },
    er () {
      if (this.addForm.getFieldsValue().AQQuantity) {
        this.num = this.addForm.getFieldsValue().AQQuantity
        this.erVisited = true
      } else {
        alert('请输入数量')
      }
    },
    // 获取记录单编号
    async getRecordNo () {
      const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))
      const res = await this.$axios.post(
        `${httper}/SetSBDBH.ashx?FSunitUstrId=${AllInfo.FSuserId}&lx=jl&FSunitId=${AllInfo.FSunitId}&FSunitName=${AllInfo.FSunitName}&uid=${AllInfo.FSunitUstrId}`
      )

      this.addForm.setFieldsValue({ JLDNumber: res.data.data.result })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.subTF = true
      // eslint-disable-next-line handle-callback-err
      this.addForm.validateFields((err, v) => {
        v.QDWXuZhongZ = this.addForm.getFieldValue('AQXuZhong')
        v.QDWXuZhong = this.addForm.getFieldValue('AQXuZhong')
        v.AQShengQy = this.provinceQy
        v.AQShiQy = this.cityQy
        v.AQXianQy = this.countyQy

        v.AQShengDd = this.province
        v.AQShiDd = this.city
        v.AQXianDd = this.county

        v.AQMemo2 = this.provinceQy + this.cityQy + this.countyQy + v.AQXiangQy + v.AQCunQy
        v.AQMemo3 = this.province + this.city + this.county + v.AQXiangDd + v.AQCunQy
        v.JLDLX = this.$attrs.JLDLX
        v.SaveId = 5
          v.PBYouXiaoRi = 1
        console.log(v)
        const data = {
          type: 'Qua_AnimalQuarantineB',
          json: JSON.stringify(v),
          uid: JSON.parse(localStorage.getItem('AllInfo')).FStId
        }

        console.log(`${httper}/Upload.ashx?uid=${data.uid}&type=${data.type}&json=${data.json}`)
        if (!err) {
           this.useBut = true
           this.$message.loading('正在开证，请等待', 0)
          this.$axios({
            method: 'post',
            url: `${httper}/Upload.ashx?uid=${data.uid}&type=${data.type}&json=${data.json}`
          }).then(res => {
            console.log(res)
             this.$message.destroy()
            if (res.data.errorCode !== 0) {
              this.$message.error(res.data.errorMsg)
              this.useBut = false
            } else {
              this.$message.success('新增成功')

              this.reload()
            }
          }).catch(res => {
             this.$message.destroy()
              this.$message.error('新增失败')
          })
        } else {
          this.subTF = false
          console.log('执行了错误')
          return false
        }
      })
    },
    father (list) {
      console.log(list)
      // eslint-disable-next-line no-unused-vars
      const adree = list.FCityAdd
      // this.regInfo.forEach((item, index) => {
      //   if (adree.includes(item.label)) {
      //     this.peoTF = true
      //     this.peoInfo = this.regInfo[index].children
      //     this.addForm.setFieldsValue({ AQXianQy: item.label })
      //   }
      // })
      // var tt = ''
      // this.peoInfo.forEach((item, index) => {
      //   if (adree.includes(item.label)) {
      //     tt = item.label
      //     this.addForm.setFieldsValue({ AQXiangQy: item.label })
      //   }
      // })
      // const arr = adree.split(tt)
      // this.Detailed = arr[arr.length - 1]

      // this.addForm.setFieldsValue({ AQXuZhong: list.FCategory })
      // this.addForm.setFieldsValue({ AQCunDd: list.FFarmName })

      // this.addForm.setFieldsValue({ AQCargoOwner: list.FLegalPerson })
      // this.addForm.setFieldsValue({ AQPhone: list.FPhone })
      this.vv = false
    },
    tiao (data) {
      console.log(data)
      OwnerGet(data, this.UserId).then(res => {
        this.shu1 = JSON.parse(res.Data).rows
        this.tt = parseInt(JSON.parse(res.Data).total)
      })
    },
    xz () {
      console.log(11)
      OwnerGet({ offset: 1, limit: 10, selectWhere: '', dist: 'gmyzc' }, this.UserId).then(res => {
        // console.log(res)
        this.shu1 = JSON.parse(res.Data).rows
        this.tt = parseInt(JSON.parse(res.Data).total)
      })
      this.vv = true
    },
    getLu () {
      const Allinfo = JSON.parse(localStorage.getItem('AllInfo'))
      this.$axios
        .get(
          httper +
            '/GetInfos.ashx?FStId=-1&Name=Qua_AnimalQuarantineB_CDJLD&uid=' +
            Allinfo.FStId +
            '&FSunitUstrId=' +
            Allinfo.FSunitUstrId +
            '&txt='
        )
        .then(res => {
          console.log(res)

          this.shu = res.data.dataList
        })
    },
    getHao () {
      const Allinfo = JSON.parse(localStorage.getItem('AllInfo'))
      console.log(Allinfo)
      this.$axios.get(httper + '/GetNumber.ashx?type=2&uid=' + Allinfo.FStId).then(res => {
        console.log(res)
        this.addForm.setFieldsValue({ AQNumber: res.data.data.result })
      })
    },
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
        this.peoName = this.peoInfo[val].label

        console.log(this.regName, this.peoName)
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
    ChangePeo1 (val) {
      if (val === '请选择') {
        this.peoName1 = '请选择'
      } else {
        this.peoTF1 = true
        this.peoName1 = this.peoInfo1[val].label

        console.log(this.regName1, this.peoName1)
      }
    }
  }
}
</script>

<style></style>
