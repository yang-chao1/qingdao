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
            <a-input v-decorator="['JLDNumber', { rules: [{ required: true, message: '请输入' }] }]" />
            <a-input
              v-decorator="['JLDLX']"
              v-show="false"
            />
            <a-input
              v-decorator="['FGlid']"
              v-show="false"
            />
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

        <a-col :span="10">
          <a-form-item
            ref="name"
            label="货主姓名"
            prop="name"
            :labelCol="{ lg: { span: 9 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 13 }, sm: { span: 8 } }"
          >
            <a-input v-decorator="['AQCargoOwner', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>

        </a-col>
        <a-col :span="2">
          <a-button @click="xz" type="primary" style="position: absolute;margin: 3px 5px">选择</a-button>
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
              style="width: 100px; margin-right: 10px"
            ></a-input>
            <a-select
              v-decorator="['AQDanWei', {rules: [{ required: true, message: '请输入' }] }]"
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
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
          >
            <a-select
              v-decorator="['AQYongTu', {rules: [{ required: true, message: '请输入' }] }]"

              style="width: 160px"
              placeholder="请选择">
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
            :labelCol="{ lg: { span: 7 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['FSm5', { rules: [{ required: true, message: '请输入' }] }]"

            ></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="14">
          <a-form-item
            label="启运地点:"
            :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
          >
            <a-select
              disabled
              style="width: 30%; "
              v-decorator="['AQShengQy', { rules: [{ required: true, message: '请输入' }] }]"
            >
              <a-select-option v-for="(item,index) in arr" :value="item.label" :key="index">{{ item.label }}</a-select-option>
            </a-select>
            <a-select
              disabled
              style="width: 30%; margin-left: 2%"
              v-decorator="['AQShiQy', {rules: [{ required: true, message: '请输入' }] }]"
            >
              <a-select-option v-for="(item,index) in cityArr" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
            <a-select
              placeholder="请输入"
              v-decorator="['AQXianQy', {rules: [{ required: true, message: '请输入' }] }]"
              style="width: 30%; margin-left: 2%"
            >
              <a-select-option v-for="(item,index) in countyArrQy" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item
            :labelCol="{ lg: { span: 1 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 17 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['AQXiangQy', { rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请输入乡（镇）"
            ></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="地点类型:"
            :labelCol="{ lg: { span: 10 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 13 }, sm: { span: 8 } }"
          >
            <a-select
              v-decorator="['AQTypeQy', { rules: [{ required: true, message: '请输入' }] }]"
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
              v-decorator="['AQXiangQy', { rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请输入乡（镇）"
            ></a-input
            ></a-form-item>
        </a-col> -->
        <a-col :span="10">
          <a-form-item
            :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['AQCunQy', { rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请输入养殖场名称"
            ></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="14">
          <a-form-item
            label="到达地点:"
            :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
          >
            <a-select
              disabled
              v-decorator="['AQShengDd', { rules: [{ required: true, message: '请输入' }] }]"
              style="width: 30%; "
              @change="getCity" >
              <a-select-option v-for="(item,index) in arr" :value="item.label" :key="index">{{ item.label }}</a-select-option>
            </a-select>
            <a-select
              v-decorator="['AQShiDd', { rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请输入"
              style="width: 30%; margin-left: 2%"
              @change="getCounty" >
              <a-select-option v-for="(item,index) in cityArr" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
            <a-select
              v-decorator="['AQXianDd', {rules: [{ required: true, message: '请输入' }] }]"
              style="width: 30%; margin-left: 2%"
              placeholder="请输入"
            >
              <a-select-option v-for="(item,index) in countyArr" :value="item.label" :key="index">{{
                item.label
              }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item
            :labelCol="{ lg: { span: 1 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['AQXiangDd', { rules: [{ required: true, message: '请输入' }] }]"

              placeholder="请输入乡（镇）"
            ></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item
            label="地点类型:"
            :labelCol="{ lg: { span: 10 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-select
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
            <a-input
              v-decorator="['AQXiangDd', { rules: [{ required: true, message: '请输入' }] }]"

              placeholder="请输入乡（镇）"
            ></a-input
            ></a-form-item>
        </a-col> -->
        <a-col :span="10">
          <a-form-item
            :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['AQCunDd', { rules: [{ required: true, message: '请输入' }] }]"
              placeholder="请输入养殖场名称"
            ></a-input
            ></a-form-item>
        </a-col>

        <a-col :span="20">
          <a-form-item
            label="牲畜耳标号:"
            :labelCol="{ lg: { span: 4 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 14 }, sm: { span: 1 } }"
          >
            <a-input
              v-decorator="['AQEarTag', { rules: [{ required: true, message: '请输入' }] }]"
              style="height: 125px"
              type="textarea"
            />
            <a-button type="primary" @click="er" style="position: absolute;margin: 3px 5px">耳标输入</a-button>
          </a-form-item>
        </a-col>
        <!-- <a-col :span="4" :offset="0">
          <a-button type="primary" @click="er">耳标输入</a-button>
        </a-col> -->
        <a-col :span="20">
          <a-form-item
            label="备注:"
            :labelCol="{ lg: { span: 4 }, sm: { span: 3 } }"
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
            :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 1 } }"
          >
            <a-date-picker
              v-decorator="['DateQF', { rules: [{ required: true, message: '请输入' }] }]"

              type="date"
              placeholder="请选择日期"
            /></a-form-item>
        </a-col>
      </a-row>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="this.subTF"
        style="margin-left: 50%; transform: translateX(-50%); width: 315px; height: 40px"
      >
        保存
      </a-button>
    </a-form>
    <a-modal v-model="vv" width="900px">
      <clu
        :columns1="clo"

        :totalnum="tt"
        :shu="shu1"
        @child-event1="father"
        @tiao="tiao">

      </clu>
    </a-modal>
    <a-modal :destroyOnClose="true" v-model="erVisited" :footer="null" width="800px">
      <er :man="man" :num="num" @hander-fa="ff"></er>
    </a-modal>
  </div>
</template>

<script>
import { placexiangx } from '@/assets/playdz'

import { eartag, leixin } from '@/assets/eartag'
import citys from '@/assets/citys'
import { OwnerGet } from '@/api/cdjy'
import er from '../../compont/er'
// eslint-disable-next-line no-unused-vars
import clu from '../../compont/clu3'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import httper from '@/utils/httper'
export default {
  inject: ['reload'],
  components: {
    clu,
    er
  },
  data () {
    return {
      man: '',
       // 地址
      province: '',
      city: '',
      county: '',
      provinceQy: '',
      subTF: false,
      cityQy: '',
      countyQy: '',
      arr: [],
      cityArr: [],
      countyArr: [],
      arrQy: [],
      cityArrQy: [],
      countyArrQy: [],
      num: 0,
      erVisited: false,
      addForm: this.$form.createForm(this),
      addVisitd: false,
      shu: [],
      shu1: [],
      tt: 0,
      vv: false,
       UserId: sessionStorage.getItem('FStId'),

            clo: [ {
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
      peoName: '请选择'
    }
  },
  created () {
      this.arr = citys
    this.getHao()
    this.getRecordNo()

      // 行政树
    getAdminAddress()
      .then((res) => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
         this.regInfo1 = this.options[0].children
        // this.regName = '请选择'
        res.forEach((item) => {
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
      .catch((rol) => {
        console.log(rol)
      })
  },
   mounted () {
     this.bb()
    this.qi()
  },
  methods: {
      qi () {
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]
        this.addForm.setFieldsValue({ AQShengQy: '山东省' })

        if (this.addForm.getFieldsValue().AQShengQy === obj.label) {
          this.cityArrQy = obj.children
           this.addForm.setFieldsValue({ AQShiQy: '青岛市' })
          obj.children.forEach((item, index) => {
            if (item.label === this.addForm.getFieldsValue().AQShiQy) {
              this.countyArrQy = item.children
            }
          })
          //  this.addForm.rdddzxx1 = obj.children[0].label
          //  this.countyArr = obj.children[0].children
          //   this.addForm.rdddzxx2 = obj.children[0].children[0].label
        }
      }
    },
     bb () {
      for (var i = 0; i < this.arr.length; i++) {
        var obj = this.arr[i]

        this.addForm.setFieldsValue({ AQShengDd: '山东省' })
      if (this.addForm.getFieldsValue().AQShengDd === obj.label) {
         this.cityArr = obj.children
          this.cityArrQy = obj.children
           this.addForm.setFieldsValue({ AQShiDd: '青岛市' })
          obj.children.forEach((item, index) => {
            if (item.label === this.addForm.getFieldsValue().AQShiDd) {
              this.countyArr = item.children
            }
          })
          //  this.addForm.rdddzxx1 = obj.children[0].label
          //  this.countyArr = obj.children[0].children
          //   this.addForm.rdddzxx2 = obj.children[0].children[0].label
        }
      }
    },
      getCity (val) {
        this.addForm.setFieldsValue({ AQShengDd: '山东省' })
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]

        if (val === obj.label) {
          this.cityArr = obj.children

           this.addForm.setFieldsValue({ AQShiDd: obj.children[0].label })
            this.cityArr.forEach((item, index) => {
             if (item.label === this.addForm.getFieldsValue().AQShiDd) {
                this.countyArr = item.children
             }
          })
            this.addForm.setFieldsValue({ AQXianDd: obj.children[0].children[0].label })
        }
      }
    },
    getCounty (val) {
      for (var i = 0; i < this.cityArr.length; i++) {
        var obj = this.cityArr[i]
        if (val === obj.label) {
          this.countyArr = obj.children
           this.addForm.setFieldsValue({ AQXianDd: obj.children[0].label })
        }
      }
    },
       ff (arr) {
      console.log(arr)
      this.addForm.setFieldsValue({
        AQEarTag: arr
      })
      this.erVisited = false
    },
     er () {
       if (this.addForm.getFieldsValue().AQQuantity && this.addForm.getFieldsValue().AQXuZhong) {
           const allinfo = JSON.parse(localStorage.getItem('AllInfo'))
       const w = leixin(this.addForm.getFieldsValue().AQXuZhong)

       const q = eartag(allinfo.FSunitUstrId)
        this.man = w + '' + q
         this.num = parseInt(this.addForm.getFieldsValue().AQQuantity)
          this.erVisited = true
       } else {
         alert('请输入数量和动物种类')
       }
    },
     // 获取记录单编号
   async getRecordNo () {
    const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))
    const res = await this.$axios.post(`${httper}/SetSBDBH.ashx?FSunitUstrId=${AllInfo.FSuserId}&lx=jl&FSunitId=${AllInfo.FSunitId}&FSunitName=${AllInfo.FSunitName}&uid=${AllInfo.FSunitUstrId}`)

       this.addForm.setFieldsValue({ JLDNumber: res.data.data.result })
    },
    handleSubmit (e) {
      e.preventDefault()
      // eslint-disable-next-line handle-callback-err
      this.addForm.validateFields((err, v) => {
         v.JLDLX = ''
         v.AQMemo2 = v.AQShengQy + v.AQShiQy + v.AQXianQy + v.AQXiangQy + v.AQCunQy
         v.AQMemo3 = v.AQShengDd + v.AQShiDd + v.AQXianDd + v.AQXiangDd + v.AQCunDd
        const data = {
            type: 'Qua_AnimalQuarantineB',
            json: JSON.stringify(v),
            uid: JSON.parse(localStorage.getItem('AllInfo')).FStId
         }

         console.log(`${httper}/Upload.ashx?uid=${data.uid}&type=${data.type}&json=${data.json}`)
         if (!err) {
           this.subTF = true
           this.$axios({
             method: 'post',
             url: `${httper}/Upload.ashx?uid=${data.uid}&type=${data.type}&json=${data.json}`
           }).then(
             res => {
               this.subTF = false
               console.log(res)
               if (res.data.errorCode !== 0) {
                  this.$message.error('此检疫证已存在或者有不属于本人的库存！')
                } else {
                  this.$message.success('新增成功')
                  this.reload()
                }
             }
           )
         } else {
           return false
         }
      })
    },
    father (list) {
      console.log(list)
      if (list.tyep !== 'syh') {
         this.addForm.setFieldsValue({ AQTypeQy: '养殖场' })
      } else {
         this.addForm.setFieldsValue({ AQTypeQy: '散养户' })
      }
      const adree = list.FSdz
    const arr = placexiangx(adree)
         this.addForm.setFieldsValue({ AQShengQy: arr[0] })
         this.addForm.setFieldsValue({ AQShiQy: arr[1] })
         this.addForm.setFieldsValue({ AQXianQy: arr[2] })
         this.addForm.setFieldsValue({ AQXiangQy: arr[3].replace('/', '') })

        this.addForm.setFieldsValue({ AQXuZhong: list.FSxz })
         this.addForm.setFieldsValue({ AQCunQy: list.FSxxdz })

       this.addForm.setFieldsValue({ AQCargoOwner: list.FSfzr })
       this.addForm.setFieldsValue({ AQPhone: list.FSlxdh })
      this.vv = false
    },
      tiao (data) {
      console.log(data)

      OwnerGet(data, this.UserId).then(res => {
         this.shu1 = JSON.parse(res.Data).rows
         console.log(this.shu1)
         this.tt = parseInt(JSON.parse(res.Data).total)
        })
    },
     xz () {
         console.log(11)
        OwnerGet({ offset: 1, limit: 10, selectWhere: '', dist: 'gmyzc' }, this.UserId).then(res => {
        this.shu1 = JSON.parse(res.Data).rows
           console.log(this.shu1)
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
        .then((res) => {
          console.log(res)

          this.shu = res.data.dataList
        })
    },
    getHao () {
      console.log('1111')
      const Allinfo = JSON.parse(localStorage.getItem('AllInfo'))
      console.log(Allinfo)
      this.$axios.get(httper + '/GetNumber.ashx?type=2&uid=' + Allinfo.FStId).then((res) => {
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

<style>
</style>
