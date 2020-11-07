<template>
  <div>

    <a-form :form="addForm" @submit="handleSubmit">

      <a-row>
        <a-col :span="12">
          <a-form-item
            label="记号："
            :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['supervisename', { rules: [{ required: true, message: '请输入' }] }]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="检疫证编号："
            :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['ANumber', { rules: [{ required: true, message: '请输入' }] }]"

            />
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
            <a-input
              v-decorator="['ACargoOwner', { rules: [{ required: true, message: '请输入' }] }]"

            />
            <a-button @click="xz">选择</a-button>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
            ref="name"
            label="联系电话"
            prop="phone"
            :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
          >
            <a-input
              v-decorator="['APhone', { rules: [{ required: true, message: '请输入' }] }]"

            />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
            label="动物种类:"
            :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-select
              v-decorator="['AXuZhong', {initialValue:'请选择', rules: [{ required: true, message: '请输入' }] }]"

              style="width: 160px"
              placeholder="请选择">
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
              v-decorator="['AQuantity', { rules: [{ required: true, message: '请输入' }] }]"

              style="width:80px;margin-right:10px"></a-input>
            <a-select
              v-decorator="['ADanWei', {initialValue:'请选择', rules: [{ required: true, message: '请输入' }] }]"

              style="position: absolute; top: 50%; transform: translateY(-50%); width: 100px"
              placeholder="请选择"
            >
              <a-select-option value="头"> 头 </a-select-option>
              <a-select-option value="只"> 只 </a-select-option>
              <a-select-option value="箱"> 箱 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="启运地点:"
            :labelCol="{ lg: { span: 4 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }"
          >
            <a-select
              v-decorator="['AShiQy', {initialValue:'青岛市', rules: [{ required: true, message: '请输入' }] }]"

              style="width: 120px; margin-right: 10px"
              @change="ChangeTown"
            >
              <a-select-option value="青岛市"> 青岛市 </a-select-option>
            </a-select>
            <a-select
              v-decorator="['AXianQy', {initialValue:'请选择', rules: [{ required: true, message: '请输入' }] }]"

              style="width: 120px; margin-right: 10px"
              @change="ChangeRegion"
            >
              <a-select-option value="请选择"> 请选择 </a-select-option>
              <a-select-option v-for="(item, index) in regInfo" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select>
            <a-select
              v-decorator="['AXiangQy', {initialValue:'请选择', rules: [{ required: true, message: '请输入' }] }]"

              style="width: 120px"
              v-if="peoTF"
              @change="ChangePeo"
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
            label="启运类型:"
            :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-select
              v-decorator="['ATypeQy', { rules: [{ required: true, message: '请输入' }] }]"

              style="width: 160px"
              placeholder="请选择">
              <a-select-option value="养殖场"> 养殖场 </a-select-option>
              <a-select-option value="交易市场"> 交易市场 </a-select-option>
              <a-select-option value="散养户"> 散养户 </a-select-option>
              <a-select-option value="其他"> 其他 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            :labelCol="{ lg: { span: 19 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['AXiangDd', { rules: [{ required: true, message: '请输入' }] }]"

              placeholder="请输入乡（镇）"></a-input
              ></a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['ACunDd', { rules: [{ required: true, message: '请输入' }] }]"

              placeholder="请输入养殖场名称"></a-input
              ></a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="到达地点:"
            :labelCol="{ lg: { span: 4 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }"
          >
            <!-- <a-select
              v-decorator="['AShiDd', {initialValue:'青岛市', rules: [{ required: true, message: '请输入' }] }]"

              style="width: 120px; margin-right: 10px"
              @change="ChangeTown"
            >
              <a-select-option value="青岛市"> 青岛市 </a-select-option>
            </a-select>
            <a-select
              v-decorator="['AXianDd', {initialValue:'请选择', rules: [{ required: true, message: '请输入' }] }]"

              style="width: 120px; margin-right: 10px"
              @change="ChangeRegion"
            >
              <a-select-option value="请选择"> 请选择 </a-select-option>
              <a-select-option v-for="(item, index) in regInfo" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select>
            <a-select
              v-decorator="['AXiangDd', {initialValue:'请选择', rules: [{ required: true, message: '请输入' }] }]"

              style="width: 120px"
              v-if="peoTF"
              @change="ChangePeo"
            >
              <a-select-option value="请选择"> 请选择 </a-select-option>
              <a-select-option v-for="(item, index) in peoInfo" :key="index">
                {{ item.label }}
              </a-select-option>
            </a-select> -->
            <a-col :span="5">
              <a-select
                placeholder="请选择"
                v-decorator="['AShengDd', { rules: [{ required: true, message: '请输入' }] }]"

                @change="getCity" >
                <a-select-option v-for="(item,index) in arr" :value="item.label" :key="index">{{ item.label }}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="5">
              <a-select
                placeholder="请选择"
                v-decorator="['AShiDd', { rules: [{ required: true, message: '请输入' }] }]"

                @change="getCounty" >
                <a-select-option v-for="(item,index) in cityArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="5">
              <a-select
                placeholder="请选择"
                v-decorator="['AXianDd', { rules: [{ required: true, message: '请输入' }] }]"

              >
                <a-select-option v-for="(item,index) in countyArr" :value="item.label" :key="index">{{
                  item.label
                }}</a-select-option>
              </a-select>
            </a-col>

          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="地点类型:"
            :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-select
              v-decorator="['ATypeDd', { rules: [{ required: true, message: '请输入' }] }]"

              style="width: 160px"
              placeholder="请选择">
              <a-select-option value="养殖场"> 养殖场 </a-select-option>
              <a-select-option value="交易市场"> 交易市场 </a-select-option>
              <a-select-option value="散养户"> 散养户 </a-select-option>
              <a-select-option value="其他"> 其他 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            :labelCol="{ lg: { span: 19 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['AXiangDd', { rules: [{ required: true, message: '请输入' }] }]"

              placeholder="请输入乡（镇）"></a-input
              ></a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item
            :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['ACunDd', { rules: [{ required: true, message: '请输入' }] }]"

              placeholder="请输入养殖场名称"></a-input
              ></a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="承运人："
            :labelCol="{ lg: { span: 8 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['ACarrier', { rules: [{ required: true, message: '请输入' }] }]"

            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="联系电话："
            :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['APhoneCyr', { rules: [{ required: true, message: '请输入' }] }]"

            />
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <a-form-item
            label="用途:"
            :labelCol="{ lg: { span: 12 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
          >
            <a-select
              v-decorator="['AYongTu', { rules: [{ required: true, message: '请输入' }] }]"

              style="width: 160px"
              placeholder="请选择">
              <a-select-option value="饲养"> 饲养 </a-select-option>
              <a-select-option value="屠宰"> 屠宰 </a-select-option>
              <a-select-option value="乳用"> 乳用 </a-select-option>
              <a-select-option value="种用"> 种用 </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="16">
          <a-form-item
            label="运载方式:"
            :labelCol="{ lg: { span: 11 }, sm: { span: 4 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
          >
            <a-radio-group
              v-decorator="['AYunZai', { rules: [{ required: true, message: '请输入' }] }]"

            >
              <a-radio value="公路">公路 </a-radio>
              <a-radio value="铁路"> 铁路</a-radio>
              <a-radio value="水路">水路 </a-radio>
              <a-radio value="航空"> 航空</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item
            label="运载工具牌号"
            :labelCol="{ lg: { span: 8 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
          >
            <a-input
              v-decorator="['ATrademark', { rules: [{ required: true, message: '请输入' }] }]"

            ></a-input
            ></a-form-item>
        </a-col>
        <a-col :span="10">
          <a-form-item
            label="装运前经"
            :labelCol="{ lg: { span: 8 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 1 } }"
          >
            <a-input
              v-decorator="['ADisinfection', { rules: [{ required: true, message: '请输入' }] }]"

            /></a-form-item>
        </a-col>
        <a-col :span="1"><span
          style="line-height: 35px; margin-left: 5px;">消毒</span></a-col>

        <a-col :span="10">
          <a-form-item
            label="本批动物经检疫合格,应于"
            :labelCol="{ lg: { span: 18 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 6 }, sm: { span: 1 } }"
          >
            <a-select
              v-decorator="['AYouXiaoRi', { rules: [{ required: true, message: '请输入' }] }]"

              placeholder="请选择">
              <a-select-option value="1"> 1 </a-select-option>
              <a-select-option value="2"> 2 </a-select-option>
              <a-select-option value="3"> 3 </a-select-option>
              <a-select-option value="4"> 4 </a-select-option>
            </a-select>
          </a-form-item></a-col>
        <a-col :span="10"><span
          style="line-height: 35px; margin-left: 5px;">日内到达有效。</span></a-col>
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
              placeholder="Pick a date"

            /></a-form-item>
        </a-col>
        <a-col :span="16">
          <a-form-item
            label="牲畜耳标号:"
            :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 14 }, sm: { span: 1 } }"
          >
            <a-input
              v-decorator="['AQEarTag', { rules: [{ required: true, message: '请输入' }] }]"

              style="height:125px;"
              type="textarea"/></a-form-item>
        </a-col>
        <a-col :span="4" :offset="0">
          <a-button type="primary" >耳标输入</a-button>
        </a-col>
        <a-col :span="16">
          <a-form-item
            label="备注:"
            :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
            :wrapperCol="{ lg: { span: 14 }, sm: { span: 1 } }"
          >
            <a-input
              v-decorator="['AQMemo1']"

              style="height:125px;"
              type="textarea"/></a-form-item>
        </a-col>

      </a-row>
      <a-button type="primary" html-type="submit" style="margin-left:50%;transform: translateX(-50%);width:315px; height: 40px;">
        确认
      </a-button>
    </a-form>
    <a-modal v-model="addVisitd" width="900px">
      <clu :columns1="clo" :shu="shu" @child-event1="father"></clu>
    </a-modal>
  </div>
</template>

<script>
import citys from '@/assets/citys'
import clu from '../../compont/clu'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import httper from '@/utils/httper'
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    addForm: {
      type: Object
    }
  },
  components: {
    clu
  },

  data () {
    return {
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
      shu: [],
            clo: [{
          title: '名称',
          key: 'startaddress4',
          width: 100,
          align: 'center',
          dataIndex: 'startaddress4'
        },
        {
          title: '动物种类',
          key: 'animalsort',
          align: 'center',
          dataIndex: 'animalsort',
          width: 80
        },
        {
          title: '地址',
          key: 'rqydzxx',
          align: 'center',
          dataIndex: 'rqydzxx',
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
      // addForm: this.$form.createForm(this),
      updateForm: this.$form.createForm(this),

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
    // this.updateForm.setFieldsValue(this.addForm)

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
   mounted () {
    this.bb()
  },
  methods: {
 bb () {
    for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]
        if (this.addForm.AShengDd === obj.label) {
          this.cityArr = obj.children
          obj.children.forEach((item, index) => {
             if (item.label === this.updateinfo.rdddzxx1) {
                 this.countyArr = item.children
             }
            })
        }
      }
  },
     getCity (val) {
      for (let i = 0; i < this.arr.length; i++) {
        const obj = this.arr[i]

        if (val === obj.label) {
          this.cityArr = obj.children
        this.addForm.setFieldsValue({ AShiDd: obj.children[0].label })
        this.addForm.setFieldsValue({ AXianDd: obj.children[0].children[0].label })
         }
      }
    },
    getCounty (val) {
      for (let i = 0; i < this.cityArr.length; i++) {
        const obj = this.cityArr[i]
        if (val === obj.label) {
           this.countyArr = obj.children
        this.addForm.setFieldsValue({ AXianDd: obj.children[0].label })
        }
      }
    },
    handleSubmit (e) {
       e.preventDefault()
       this.addForm.validateFields((err, v) => {
           v.AMemo2 = v.AShengQy + v.AShiQy + v.AXianQy + v.AXiangQy + v.ACunQy
        v.AMemo3 = v.AShengDd + v.AShiDd + v.AXianDd + v.AXiangDd + v.ACunDd

         const data = {
            type: 'Qua_AnimalQuarantineA',
            json: JSON.stringify(v),
            uid: JSON.parse(localStorage.getItem('AllInfo')).FStId
         }

         console.log(`${httper}/Upload.ashx?uid=${data.uid}&type=${data.type}&json=${data.json}`)
         if (!err) {
           this.$axios({
             methods: 'post',
             url: `${httper}/Upload.ashx?uid=${data.uid}&type=${data.type}&json=${data.json}`
           }).then(
             res => {
               console.log(res)
               if (res.data.errorCode === 1) {
            this.$message.error('此检疫证已存在或者有不属于本人的库存！')
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

       this.addForm.setFieldsValue({ AXuZhong: list.animalsort })
       this.addForm.setFieldsValue({ AQuantity: list.animalnum })
       this.addForm.setFieldsValue({ ADanWei: list.QDWDanWei })

       this.addForm.setFieldsValue({ APhone: list.teltphone })

       this.addForm.setFieldsValue({ ACargoOwner: list.shippername })
       this.addForm.setFieldsValue({ supervisename: list.recordNo })
       this.addVisitd = false
    },
    xz () {
      this.getLu()
      this.addVisitd = true
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
        this.$axios.get(httper + '/GetNumber.ashx?type=1&uid=' + Allinfo.FStId).then(
          res => {
          console.log(res)
          this.addForm.setFieldsValue({ ANumber: res.data.data.result })
        })
      }
  }

}
</script>

<style>

</style>
