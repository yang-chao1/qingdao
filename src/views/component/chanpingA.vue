<template>
  <div>
    <div>

      <a-form @submit="handleSubmit" :form="form">
        <template>
          <a-descriptions bordered :column="2" size="small">
            <a-descriptions-item label="肉品品质检验合格报告单编号" :span="1">
              <a-form-item>
                <a-input
                  v-decorator="[
                    'JLDNumber',
                    {
                      rules: [
                        { required: true, message: '请输入' },
                        { pattern: /^[0-9]*$/, message: '只能为数字' }
                      ]
                    }
                  ]"
                  name="JLDNumber"
                />
              </a-form-item>
              <!-- style="border:none" -->
            </a-descriptions-item>
            <a-descriptions-item label="检疫证编号" :span="1">
              <a-form-item>
                <a-input
                  v-decorator="[
                    'PNumber',
                    {
                      rules: [
                        { required: true, message: '请输入' },
                        { pattern: /^[0-9]*$/, message: '只能为数字' }
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </a-descriptions-item>
            <a-descriptions-item label="货主" :span="1">
              <a-form-item>
                <a-input
                  v-decorator="['PCargoOwner', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width:75%"
                />
                <a-button
                  @click="findShipper"
                  class="abutton"
                  type="primary"
                  style="position: absolute;margin: 3px 5px"
                >选择</a-button
                >
              </a-form-item>
            </a-descriptions-item>
            <a-descriptions-item label="联系电话" :span="1">
              <a-form-item>
                <a-input v-decorator="['PPhone', { rules: [{ required: true, message: '请输入' }] }]" />
              </a-form-item>
            </a-descriptions-item>
            <a-descriptions-item label="产品名称" :span="1">
              <a-form-item>
                <a-select
                  v-decorator="['PName', { rules: [{ required: true, message: '请选择' }] }]"
                  placeholder="请选择"
                >
                  <a-select-option value="猪-副产品">
                    猪-副产品
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-descriptions-item>
            <a-descriptions-item label="数量及单位" :span="1">
              <a-form-item>
                <a-input
                  v-decorator="['PQuantity', { rules: [{ required: true, message: '请输入' }] }]"
                  name="PQuantity"
                  style="width:55%"
                />
                <a-select
                  disabled
                  v-decorator="[
                    'PDanWei',
                    { rules: [{ required: true, message: '请选择' }], initialValue: '千克(公斤)' }
                  ]"
                  placeholder="请选择"
                  style="position: absolute;width:110px; margin: 4px"
                >
                  <a-select-option value="千克(公斤)">
                    千克(公斤)
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-descriptions-item>
            <a-descriptions-item label="生产单位名称地址" :span="2">
              <a-form-item>
                <a-input
                  disabled
                  v-decorator="['PUnitName', { initialValue: '青岛正大食品有限公司' }]"
                  style="width:40%"
                />
                <a-input
                  disabled
                  v-decorator="['PProductionunit', { initialValue: '青岛市即墨市龙泉动监站龙泉办事处张家小庄' }]"
                  style="width:50%;margin-left: 1%"
                />
                <a-input v-decorator="['PMemo4']" placeholder="生产单位地址" style="display:none" />
              </a-form-item>
            </a-descriptions-item>
            <a-descriptions-item label="目的地" :span="2">
              <a-form-item>
                <a-col :span="5">
                  <a-select v-decorator="['PBSheng']" :defaultValue="this.shengDD" @select="getCity">
                    <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                      item.label
                    }}</a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="5">
                  <a-select v-decorator="['PBShi']" @select="getCounty">
                    <a-select-option v-for="(item, index) in cityArr" :value="item.label" :key="index">{{
                      item.label
                    }}</a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="5">
                  <a-select v-decorator="['PBXian']">
                    <a-select-option v-for="(item, index) in countyArr" :value="item.label" :key="index">{{
                      item.label
                    }}</a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="5">
                  <a-input
                    v-decorator="['PDiDian', { rules: [{ required: true, message: '请输入' }] }]"
                    name="PDiDian"
                  />
                </a-col>
              </a-form-item>
            </a-descriptions-item>
            <a-descriptions-item label="承运人" :span="1">
              <a-form-item>
                <a-input v-decorator="['PCarrier', { rules: [{ required: true, message: '请输入' }] }]" />
              </a-form-item>
            </a-descriptions-item>
            <a-descriptions-item label="联系电话" :span="1">
              <a-form-item>
                <a-input v-decorator="['PPhoneCyr', { rules: [{ required: true, message: '请输入' }] }]" />
              </a-form-item>
            </a-descriptions-item>
            <a-descriptions-item label="运载方式" :span="2">
              <a-radio-group v-decorator="['PYunZai']" :default-value="1">
                <a-radio :value="1">公路</a-radio>
                <a-radio :value="2">铁路</a-radio>
                <a-radio :value="3">水路</a-radio>
                <a-radio :value="4">航空</a-radio>
              </a-radio-group>
            </a-descriptions-item>
            <a-descriptions-item label="运载工具牌号" :span="1">
              <a-form-item>
                <a-input v-decorator="['PTrademark', { rules: [{ required: true, message: '请输入' }] }]" />
              </a-form-item>
            </a-descriptions-item>
            <!-- <a-descriptions-item label="非洲猪瘟检测单号" :span="1">
              <a-input v-decorator="['Fsm3', { rules: [{ required: true, message: '请输入' }] }]" />
            </a-descriptions-item> -->
            <a-descriptions-item label="装运前经" :span="2">
              <a-form-item>
                <a-select
                  placeholder="请选择"
                  @select="selectXiaodu"
                  style="width:180px;margin: 3px 5px"
                  v-decorator="[
                    'PDisinfection',
                    { rules: [{ required: true, message: '请输入' }], initialValue: '0.5%过氧乙酸' }
                  ]"
                >
                  <a-select-option value="请选择">
                    请选择
                  </a-select-option>
                  <a-select-option value="0.5%过氧乙酸">
                    0.5%过氧乙酸
                  </a-select-option> </a-select
                >消毒
              </a-form-item>
            </a-descriptions-item>
          </a-descriptions>
          <span
          >本批动物经检疫合格,应于
            <a-select
              v-decorator="['PYouXiaoRi', { rules: [{ required: true, message: '请选择' }] }]"
              placeholder="请选择"
              :default-value="2"
              style="width:100px; margin: 4px 5px"
            >
              <a-select-option v-for="index in 7" :key="index">
                {{ index }}
              </a-select-option> </a-select
            >日内到达有效。</span
          >

          <a-descriptions bordered :column="2" size="small">
            <a-descriptions-item label="官方兽医签字" :span="1">
              <a-form-item>
                <a-input disabled v-decorator="['PVeterinary', { initialValue: loggedUserName }]" />
              </a-form-item>
            </a-descriptions-item>
            <a-descriptions-item label="签发日期" :span="1">
              <a-form-item>
                <a-date-picker
                  disabled
                  format="yyyy-MM-DD hh:mm:ss"
                  v-decorator="['DateQF', { initialValue: getCurrentDate() }]"
                />
              </a-form-item>
            </a-descriptions-item>
            <a-descriptions-item label="备注" :span="2">
              <a-form-item>
                <a-textarea v-decorator="['PMemo1']" rows="4" cols="20" style="width:95%" />
              </a-form-item>
            </a-descriptions-item>
            <a-descriptions-item label="动物卫生监督所联系电话" :span="2">
              <a-form-item>
                <a-input
                  v-decorator="['PDwPhone', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width:30%"
                />
              </a-form-item>
            </a-descriptions-item>
          </a-descriptions>
        </template>

        <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
          <a-button type="primary" html-type="submit" style="width:315px; height: 40px;margin-top:30px;">
            确认
          </a-button>
        </a-form-item>
      </a-form>
      <!-- 弹出层选择货主信息 -->
      <a-modal
        title="选择货主信息"
        :visible="selectShipperinfo"
        :footer="null"
        @cancel="handleCancelHZ"
        width="900px"
        :zIndex="1003"
        :destroyOnClose="true"
      >
        <clu
          keyword="请输入名称"
          :columns1="clo"
          :totalnum="tt"
          :shu="shu"
          @child-event1="father"
          @tiao="tiao"> </clu>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { AddInfo, FindShipperInfo, GettzcsbdaddressInfo } from '@/api/tzjyEb/AnimaJyzmA.js'
import formatTime from '@/utils/public.js'
import clu from '@/views/jyjg/compont/clu2.vue'
import httper from '@/utils/httper'
import { getQrCode } from '@/api/crcode'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import mapaddres from '../../../static/citys.json'

// 货主列表弹窗
const clo = [
  { title: '名称', key: 'PCargoOwner', align: 'center', width: 200, dataIndex: 'PCargoOwner' },
  { title: '联系电话', key: 'PPhone', align: 'center', width: 280, dataIndex: 'PPhone' },
  { title: '产品名称', key: 'PName', align: 'center', width: 220, dataIndex: 'PName' },
  { title: '生产单位名称地址', key: 'PProductionunit', align: 'center', width: 220, dataIndex: 'PProductionunit' },
  { title: '目的地', key: 'PMemo2', align: 'center', width: 220, dataIndex: 'PMemo2' },
  { title: '承运人', key: 'PCarrier', align: 'center', width: 220, dataIndex: 'PCarrier' },
  { title: '联系电话', key: 'PPhoneCyr', align: 'center', width: 220, dataIndex: 'PPhoneCyr' },
  { title: '签发日期', key: 'FScTime', align: 'center', width: 220, dataIndex: 'FScTime' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    align: 'center',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]
var yenum1 = 1
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    findList: {
      type: Object
    }
  },
  components: {
    clu
  },

  inject: ['reload'],
  data () {
    return {
      // 总条数
      totalnum: 0,
      // 单位总数
      DWtotal: 0,
      // 当前页
      yenum: 1,
      yenum1,
      // 单位选择当前页数
      offset: 1,
      // 每页条数
      limit: 10,
      // 模糊查询当前页
      findBynameyenum: 1,

      // 货主列表
      offsetHz: 1,
      limitHz: 10,
      PCargoOwner: '',
      clo, // 列
      tt: 0, // 总条数
      shu: [], // 数据
      selectShipperinfo: false,

      queryParam: { status: 0, status1: 0 },

      data: [],
      selectwhere: '',
      UserId: sessionStorage.getItem('FStId'), // 当前登录用户Id
      loggedUserName: sessionStorage.getItem('FuName'), // 当前登录用户
      options: [],
      regName: '',
      peoName: '',
      regInfo: [],
      peoInfo: [],

      // from 表单
      form: this.$form.createForm(this),
      formType: '',
      number: 0,

      FSzxjyxkzP: [], // 二维码照片
      // 点击 弹出框
      visible: false,
      updateinfo: false,
      findinfo: false,
      deletinfo: false,
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      loading: false,
      // 地址
      arr: [],
      cityArr: [],
      countyArr: [],
      arrQy: [],
      cityArrQy: [],
      countyArrQy: [],
      shengDD: '北京市',
      shiDD: '',
      xianDD: ''
    }
  },
  watch: {
    info (newInfo) {
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
      })
    },
    findList (newfindList) {
      this.getHao()
    }
  },
  created () {
    yenum1 = 1
    this.arr = mapaddres
    this.shengDD = this.arr[0].label
    this.cityArr = this.arr[0].children
    this.shiDD = this.cityArr[0].label
    this.countyArr = this.cityArr[0].children
    this.xianDD = this.countyArr[0].label
    GettzcsbdaddressInfo(this.UserId)
      .then(res => {
        if (res.Result) {
          this.$nextTick(() => {
            this.form.setFieldsValue({
              PBSheng: '北京市',
              PBShi: '北京城区',
              PBXian: '东城区',
              PUnitName: res.Data.FsbdName,
        PProductionunit: res.Data.FAddress + res.Data.FLAddress
            })
          })
        }
      })

    getAdminAddress()
      .then(res => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
      })
      .catch(rol => {
        console.log(rol)
      })
    this.getHao()
  },
  methods: {
    // 地址
    getCity () {
      for (var i = 0; i < this.arr.length; i++) {
        var obj = this.arr[i]
        if (this.form.getFieldValue('PBSheng') === obj.label) {
          this.cityArr = obj.children
          this.countyArr = this.cityArr[0].children
          console.log(this.cityArr[0].children[0].label)
          this.$nextTick(() => {
            this.form.setFieldsValue({
              PBShi: this.cityArr[0].label,
              PBXian: this.cityArr[0].children[0].label
            })
          })
        }
      }
    },
    getCounty () {
      for (var i = 0; i < this.cityArr.length; i++) {
        var obj = this.cityArr[i]
        if (this.form.getFieldValue('PBShi') === obj.label) {
          this.countyArr = obj.children
          this.$nextTick(() => {
            this.form.setFieldsValue({
              PBXian: this.countyArr[0].label
            })
          })
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
    getCurrentDate () {
      // 当前时间
      var currentDate = formatTime(null, 'yyyy-MM-dd hh:mm:ss')
      return currentDate
    },
    handleCancelHZ (e) {
      this.selectShipperinfo = false
      // this.form.resetFields()
    },
    //  from表单验证
    handleSubmit (e) {
      e.preventDefault()
      var that = this
      var PUnitName = this.form.getFieldValue('PUnitName')
      var PProductionunit = this.form.getFieldValue('PProductionunit')
      var PPumAdd = PUnitName + ' ' + PProductionunit
      this.form.setFieldsValue({ PMemo4: PPumAdd }) // 生产单位名称地址

      var PSheng = this.form.getFieldValue('PBSheng')
      var PShi = this.form.getFieldValue('PBShi')
      var PXian = this.form.getFieldValue('PBXian')
      var PDiDian = this.form.getFieldValue('PDiDian')
      var PDestinations = PSheng + PShi + PXian + PDiDian

      this.form.setFieldsValue({ PMemo2: PDestinations })

      this.form.validateFields((err, v) => {
        console.log(v)
        if (!err) {
          v.UserId = that.UserId
          v.PMemo2 =
            '' +
            this.form.getFieldValue('PBSheng') +
            this.form.getFieldValue('PBShi') +
            this.form.getFieldValue('PBXian') +
            this.form.getFieldValue('PDiDian')
          // 新增
          v.PYouXiaoRi = this.form.getFieldValue('PYouXiaoRi') || 2
          v.SaveId = 5
          v.PYunZai = this.form.getFieldValue('PYunZai') || '公路'

          AddInfo(v)
            .then(res => {
              console.log(res)
              if (res.Data !== 'false') {
                this.formType = ''
                this.visible = false
                this.$notification.success({
                  message: res.Msg
                })
                this.reload()
              } else {
                this.$notification.error({
                  message: res.Msg
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    selectXiaodu (obj) {
      // 消毒选择下拉框
      if (obj === '请选择') obj = ''
      this.form.setFieldsValue({ PDisinfection: obj })
    },
    tiao (data) {
      console.log(data)
      data.PCargoOwner = data.selectWhere
       data.UserId = this.UserId
      FindShipperInfo(data).then(res => {
          this.selectShipperinfo = true
          console.log(res)
          if (res.Data) {
            var datalist = JSON.parse(res.Data)
            this.shu = datalist.rows
            this.tt = parseInt(datalist.total)
          } else {
            this.$notification.info({ message: '未查询到任何信息' })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notification.info({ message: '系统繁忙，请稍后再试' })
        })
    },
    father (data) {
      console.log(data)
      this.selectShipperinfo = false
      this.$nextTick(() => {
        this.form.setFieldsValue({
          PCargoOwner: data.PCargoOwner, // 货主
          PPhone: data.PPhone, // 联系电话
          PName: data.PName, // 产品名称
          PCarrier: data.PCarrier, // 承运人
          PPhoneCyr: data.PPhoneCyr, // 承运人联系电话
          PTrademark: data.PTrademark, // 工具号牌
          PDisinfection: data.PDisinfection, // 运载工具牌号
          PDwPhone: data.PDwPhone, // 动物卫生监督所联系电话
          PQuantity: data.PQuantity,
          PUnitName: data.PUnitName,
          PProductionunit: data.PProductionunit

        })
      })
    },
    getHao () {
      // 获取检疫证编号
      const Allinfo = JSON.parse(localStorage.getItem('AllInfo'))
      console.log(Allinfo)
      console.log(this.findList)
      this.$axios.get(httper + '/GetNumber.ashx?type=3&uid=' + Allinfo.FStId).then(res => {
        console.log(res)
        this.$nextTick(() => {
          this.form.setFieldsValue({
            PNumber: res.data.data.result,
            JLDNumber: this.findList.BH
          })
        })
      })
    },
    // 选择货主信息
    findShipper () {
      var p = {
        offset: this.offsetHz,
        limit: this.limitHz,
        PCargoOwner: this.PCargoOwner,
        UserId: this.UserId
      }
      // console.log(JSON.stringify(p))
      FindShipperInfo(p)
        .then(res => {
          this.selectShipperinfo = true
          console.log(res)
          if (res.Data) {
            var datalist = JSON.parse(res.Data)
            this.shu = datalist.rows
            this.tt = parseInt(datalist.total)
          } else {
            this.$notification.info({ message: '未查询到任何信息' })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notification.info({ message: '系统繁忙，请稍后再试' })
        })
    }
  }
}
</script>

<style scoped lang="less">
.btn[data-v-7b4fe6ed] {
  width: 129%;
}
.div {
  background-color: white;
  height: 80px;
}
.div1 {
  background-color: white;
  padding-bottom: 5px;
}
.div2 {
  margin-left: 20px;
}
.div3 {
  margin-left: 20px;
}
.bq {
  font-size: 18px;
  color: black;
  margin-top: 10px;
  font-weight: bold;
}
.div4 {
  margin-top: 20px;
}
.btn {
  width: 280%;
}
.div5 {
  margin-top: 24px;
}
/deep/ .tbClass {
  width: 100%;
  line-height: 60px;
}

/deep/ .tbClass td {
  border: 1px solid #754946;
  padding: 0;
}
/deep/ .tbClass td:nth-child(1),
/deep/ td:nth-child(3) {
  text-align: center;
}
</style>
