<template>
  <div>
    <a-form :form="addForm" @submit="handleSubmit">
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="记录单编号："
            :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input disabled v-decorator="['JLDNumber', { rules: [{ required: true, message: '请输入' }] }]" />
            <a-input v-decorator="['JLDLX']" style="display: none"/>
            <a-input v-decorator="['FGlid']" style="display: none"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="检疫证编号："
            :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input disabled v-decorator="['ANumber', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="10">
          <a-form-item
            label="货主姓名"

            :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input disabled v-decorator="['ACargoOwner', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="2">
          <!-- <a-button @click="xz">选择</a-button> -->
        </a-col>
        <a-col :span="12">
          <a-form-item

            label="联系电话"

            :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-input disabled v-decorator="['APhone', { rules: [{ required: true, message: '请输入' }] }]" />
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
              v-decorator="['AXuZhong', { rules: [{ required: true, message: '请输入' }] }]"
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
              v-decorator="['AQuantity', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 80px; margin-right: 10px"
            ></a-input>
            <a-select
              disabled
              v-decorator="['ADanWei', { rules: [{ required: true, message: '请输入' }] }]"
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
              disabled
              v-decorator="['AYongTu', { rules: [{ required: true, message: '请输入' }] }]"
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
        <!-- <a-col :span="12">
          <a-form-item
            label="运载工具牌号"
            :labelCol="{ lg: { span: 8 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
          >
            <a-input v-decorator="['ATrademark']"></a-input
            ></a-form-item>
        </a-col> -->
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
                <a-form-item>
                  <a-input
                    disabled
                    v-decorator="['AXiangQy']"
                    placeholder="请输入乡（镇）"
                  ></a-input>
                </a-form-item>
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
              v-decorator="['ATypeQy']"
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

        <a-col :span="10">
          <a-form-item
            :labelCol="{ lg: { span: 0 }, sm: { span: 0 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              disabled
              v-decorator="['ACunQy']"
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
                <a-form-item>
                  <a-input disabled v-decorator="['AXiangDd', { rules: [{ required: true, message: '请输入' }] }]" placeholder="请输入乡（镇）"></a-input
                  ></a-form-item>
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
              v-decorator="['ATypeDd', { rules: [{ required: true, message: '请输入' }] }]"
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

        <a-col :span="10">
          <a-form-item
            :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              disabled
              v-decorator="['ACunDd', { rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请输入养殖场名称"
            ></a-input
            ></a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="承运人："
            :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input v-decorator="['ACarrier', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="联系电话："
            :labelCol="{ lg: { span: 7 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input v-decorator="['APhoneCyr', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>

        <a-col :span="12">
          <a-form-item
            label="运载工具牌号"
            :labelCol="{ lg: { span: 8 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
          >
            <a-input v-decorator="['ATrademark']"></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="运载方式:"
            :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }"
          >
            <a-radio-group v-decorator="['AYunZai', { rules: [{ required: true, message: '请输入' }],initialValue:'公路' }]">
              <a-radio value="公路">公路 </a-radio>
              <a-radio value="铁路"> 铁路</a-radio>
              <a-radio value="水路">水路 </a-radio>
              <a-radio value="航空"> 航空</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="17" :pull="1">

          <a-form-item
            label="装运前经"
            :labelCol="{ lg: { span: 7 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 1 } }"

          >

            <a-select
              v-decorator="['ADisinfection']"
              placeholder="请选择"

              style="width:180px;margin: 3px 5px"
            >

              <a-select-option value="0.5%过氧乙酸">
                0.5%过氧乙酸
              </a-select-option> </a-select
            >消毒
          </a-form-item>

        </a-col>
      </a-row>

      <a-col :span="16" v-if="AXuZhong==='猪'||AXuZhong==='牛'||AXuZhong==='羊'">
        <a-form-item
          label="牲畜耳标号:"
          :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
          :wrapperCol="{ lg: { span: 14 }, sm: { span: 1 } }"
        >
          <a-input
            disabled
            v-decorator="['AEarTag', { rules: [{ required: true, message: '请输入' }] }]"
            style="height: 125px"
            type="textarea"
          /></a-form-item>
      </a-col>
      <a-col :span="4" :offset="0" v-if="AXuZhong==='猪'||AXuZhong==='牛'||AXuZhong==='羊'">
        <a-button type="primary" @click="er">耳标输入</a-button>
      </a-col>
      <a-col :span="16">
        <a-form-item
          label="备注:"
          :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
          :wrapperCol="{ lg: { span: 14 }, sm: { span: 1 } }"
        >
          <a-input
            v-decorator="['AMemo1']"
            style="height: 125px"
            type="textarea"
          /></a-form-item>
      </a-col>
      <a-col :span="22" :offset="1">
        <span
        >本批动物经检疫合格,应于
          <a-select
            v-decorator="['AYouXiaoRi', { rules: [{ required: true, message: '请选择' }] }]"
            placeholder="请选择"
            :default-value="2"
            style="width:100px; margin: 4px 5px"
          >
            <a-select-option v-for="index in 7" :key="index">
              {{ index }}
            </a-select-option> </a-select
          >日内到达有效。</span
        >

      </a-col>
      <a-col :span="15">
        <a-form-item
          label="官方兽医签字:"
          :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
          :wrapperCol="{ lg: { span: 8 }, sm: { span: 1 } }"
        >
          <a-input
            v-decorator="['AVeterinary', { rules: [{ required: true, message: '请输入' }] }]"
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

      <a-button
        :disabled="useButA"
        type="primary"
        html-type="submit"
        style="margin-left: 50%; transform: translateX(-50%); width: 315px; height: 40px"
      >
        确认
      </a-button>
    </a-form>
    <a-modal :destroyOnClose="true" :zIndex="10003" v-model="vv" width="900px">
      <clu :columns1="clo" :totalnum="tt" :shu="shu1" @child-event1="father" @tiao="tiao"> </clu>
    </a-modal>
    <a-modal :destroyOnClose="true" :zIndex="1003" v-model="erVisited" :footer="null" width="800px">
      <er :num="num" @hander-fa="ff"></er>
    </a-modal>
  </div>
</template>

<script>
import { OwnerGet } from '@/api/cdjy'
// eslint-disable-next-line no-unused-vars
import er from '../../compont/er'
import clu from '../../compont/clu3'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import httper from '@/utils/httper'
import { getTime } from '@/utils/time.js'
import qs from 'qs'
export default {
   inject: ['reload'],
  components: {
    clu,
    er
  },
  data () {
    return {
      AXuZhong: '',
      spinning: true,
      useButA: false,
       shu1: [],
      tt: 0,
      vv: false,
      subTF: false,
       UserId: sessionStorage.getItem('FStId'),
      erVisited: false,
      shu: [],
            clo: [{
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
        }],
      addVisitd: false,
      addForm: this.$form.createForm(this),

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
      countyArrQy: [],
      num: 0
    }
  },
  created () {
    this.findeInfo()
    // this.getRecordNo()
    this.getHao()
      // 行政树
    getAdminAddress()
      .then((res) => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
        // this.regName = '请选择'
        res.forEach((item) => {
          this.FeQD = item
          item.children.forEach((items, index) => {
            this.FeQS.push(items)
            items.children.forEach((itemOl, index) => {
              this.FeDjz.push(itemOl)
            })
          })
        })
        // for (var i = 0; i < this.FeQS.length - 1; i++) {

        // }
        console.log(this.FeQD, this.FeQS, this.FeDJ)
      })
      .catch((rol) => {
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
      this.provinceQy = ClMyinfo.startaddress
      this.cityQy = ClMyinfo.startaddress1
      this.countyQy = ClMyinfo.startaddress2
      this.num = ClMyinfo.animalnum
      this.AXuZhong = ClMyinfo.animalsort

      this.$nextTick(() => {
        this.addForm.setFieldsValue({
          JLDLX: jldlx,
          FGlid: ClMyinfo.FStId,
          JLDNumber: ClMyinfo.recordNo,
          ACargoOwner: ClMyinfo.shippername,
          APhone: ClMyinfo.teltphone,
          AXuZhong: ClMyinfo.animalsort,
          AQuantity: ClMyinfo.animalnum,
          ADanWei: ClMyinfo.QDWDanWei,
          AYongTu: ClMyinfo.myuse,
          ATrademark: ClMyinfo.toolid,
          AShiQy: ClMyinfo.rqydzxx,
          ATypeQy: ClMyinfo.startaddress5,
          ATypeDd: ClMyinfo.rdddzxx5,
          AEarTag: ClMyinfo.ErBiaoHao,
          AMemo1: '本检疫证二十四小时内到达有效',
          AVeterinary: sessionStorage.getItem('FuName'),
          DateQF: getTime(),
          AXiangQy: ClMyinfo.startaddress3,
          ACunQy: ClMyinfo.startaddress4,
          AXiangDd: ClMyinfo.rdddzxx3,
          ACunDd: ClMyinfo.rdddzxx4

        })
      })
    },
    ff (arr) {
      console.log(arr)
      this.addForm.setFieldsValue({
        AEarTag: arr
      })
      this.erVisited = false
    },
    er () {
      this.erVisited = true
    },
       // 获取记录单编号
   async getRecordNo () {
    const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))
    const res = await this.$axios.post(`${httper}/SetSBDBH.ashx?FSunitUstrId=${AllInfo.FSuserId}&lx=jl&FSunitId=${AllInfo.FSunitId}&FSunitName=${AllInfo.FSunitName}&uid=${AllInfo.FSunitUstrId}`)
       this.addForm.setFieldsValue({ JLDNumber: res.data.data.result })
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
    handleSubmit (e) {
       e.preventDefault()
       this.addForm.validateFields((err, v) => {
        console.log(v)
        v.QDWXuZhongZ = this.addForm.getFieldValue('AXuZhong')
        v.QDWXuZhong = this.addForm.getFieldValue('AXuZhong')
        v.AShengQy = this.provinceQy
        v.AShiQy = this.cityQy
        v.AXianQy = this.countyQy
        v.AXiangQy = this.addForm.getFieldValue('AXiangQy')
        v.AShengDd = this.province
        v.AShiDd = this.city
        v.AXianDd = this.county
        v.AXiangDd = this.addForm.getFieldValue('AXiangDd')
        v.AMemo2 = this.provinceQy + this.cityQy + this.countyQy + v.AXiangQy + v.ACunQy
        v.AMemo3 = this.province + this.city + this.county + v.AXiangDd + v.ACunDd
        v.JLDLX = this.$attrs.JLDLX
        v.SaveId = 5
         v.AYouXiaoRi = this.addForm.getFieldValue('AYouXiaoRi') || 2
        console.log(v)

         const data = {
            type: 'Qua_AnimalQuarantineA',
            json: JSON.stringify(v),
            uid: JSON.parse(localStorage.getItem('AllInfo')).FStId
         }

         console.log(`${httper}/Upload.ashx?uid=${data.uid}&type=${data.type}&json=${data.json}`)
         if (!err) {
            this.useButA = false
            this.$message.loading('正在开证，请等待', 0)
           this.$axios({
             method: 'post',
             url: `${httper}/Upload.ashx`,
             data: qs.stringify(data)
           }).then(
             res => {
               this.$message.destroy()
               console.log(res)

               if (res.data.errorCode !== 0) {
                  this.$message.error(res.data.errorMsg)
                  this.useButA = false
                } else {
                   this.$message.success('新增成功')
                  this.reload()
                   this.subTF = false
                }
             }
           )
         } else {
           this.subTF = false
           return false
         }
       })
    },
    father (list) {
      console.log(list)
      this.addForm.setFieldsValue({ AXuZhong: list.FSxz })
      this.addForm.setFieldsValue({ ACunDd: list.FSxxdz })

       this.addForm.setFieldsValue({ ACargoOwner: list.FSfzr })
       this.addForm.setFieldsValue({ APhone: list.FSlxdh })
       this.vv = false
    },
    // xz () {
    //   this.getLu()
    //   this.addVisitd = true
    // },
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

      getLu () {
         const Allinfo = JSON.parse(localStorage.getItem('AllInfo'))
        this.$axios.get(httper + '/GetInfos.ashx?FStId=-1&Name=Qua_AnimalQuarantineA_CDJLD&uid=' + Allinfo.FStId + '&FSunitUstrId=' + Allinfo.FSunitUstrId + '&txt=').then(
          res => {
          console.log(res)

          this.shu = res.data.dataList
        })
      },
      getHao () {
        const Allinfo = JSON.parse(localStorage.getItem('AllInfo'))
        console.log(Allinfo)
        this.$axios.get(httper + '/GetNumber.ashx?type=1&uid=' + Allinfo.FStId).then(
          res => {
          console.log(res)
          this.addForm.setFieldsValue({ ANumber: res.data.data.result })
        })
      }
  }

}
</script>

<style scoped>
</style>
