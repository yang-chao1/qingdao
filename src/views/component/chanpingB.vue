<template>
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
              />
            </a-form-item>
            <!-- style="border:none" -->
          </a-descriptions-item>
          <a-descriptions-item label="检疫证编号" :span="1">
            <a-form-item>
              <a-input

                v-decorator="[
                  'PBNumber',
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
                v-decorator="['PBCargoOwner', { rules: [{ required: true, message: '请输入' }] }]"
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
          <a-descriptions-item label="产品名称" :span="1">
            <a-form-item>
              <a-select
                v-decorator="['PBName', { rules: [{ required: true, message: '请选择' }] }]"
                placeholder="请选择"
              >
                <a-select-option value="猪-肉产品">
                  猪-肉产品
                </a-select-option>
                <a-select-option value="猪-副产品">
                  猪-副产品
                </a-select-option>
                <a-select-option value="牛-肉产品">
                  牛-肉产品
                </a-select-option>
                <a-select-option value="牛-副产品">
                  牛-副产品
                </a-select-option>
                <a-select-option value="羊-肉产品">
                  羊-肉产品
                </a-select-option>
                <a-select-option value="羊-副产品">
                  羊-副产品
                </a-select-option>
                <a-select-option value="鸡-肉产品">
                  鸡-肉产品
                </a-select-option>
                <a-select-option value="鸡-副产品">
                  鸡-副产品
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="数量及单位" :span="1">
            <a-form-item>
              <a-input
                v-decorator="['PBQuantity', { rules: [{ required: true, message: '请输入' }] }]"
                style="width:55%"
              />
              <a-select
                disabled
                v-decorator="['PBDanWei', { initialValue: '千克(公斤)' }]"
                style="position: absolute;width:110px; margin: 4px 3px"
              >
                <a-select-option value="千克(公斤)">
                  千克(公斤)
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="产地" :span="1">
            <a-form-item>
              <a-input v-decorator="['PBOrigin']" />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="生产单位名称地址" :span="2">
            <a-form-item>
              <a-input
                disabled
                v-decorator="['PBUnitName', { initialValue: '青岛正大食品有限公司' }]"
                style="width:40%"
              />
              <a-input
                disabled
                v-decorator="['PBProductionunit', { initialValue: '青岛市即墨市龙泉动监站龙泉办事处张家小庄' }]"
                style="width:50%;margin-left: 1%"
              />
              <a-input v-decorator="['PBPumAdd']" placeholder="生产单位名称地址" style="display:none" />
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
                  v-decorator="['PBXiangXi', { rules: [{ required: true, message: '请输入' }] }]"
                  name="PBXiangXi"
                />
              </a-col>
            </a-form-item>
            <!-- <a-form-item>
              <a-select
                v-decorator="['PBSheng', { rules: [{ required: true, message: '请输入' }], initialValue: '山东省' }]"
                style="width: 30%;margin-right: 1%;"
                @select="ChangeTown"
              >
                <a-select-option value="山东省">
                  山东省
                </a-select-option>

              </a-select>
              <a-select
                v-decorator="['PBShi', { rules: [{ required: true, message: '请输入' }], initialValue: '0' }]"
                style="width: 30%;margin-right: 1%;"
                @select="ChangeRegion"
              >
                <a-select-option value="请选择">
                  请选择
                </a-select-option>
                <a-select-option v-for="(item, index) in regInfo" :key="index" :value="JSON.stringify(index)">
                  {{ item.label }}
                </a-select-option>
              </a-select>
              <a-select
                v-decorator="['PBXian', { rules: [{ required: true, message: '请输入' }], initialValue: '请选择' }]"
                style="width: 30%;"
                @select="ChangePeo"
              >
                <a-select-option value="请选择">
                  请选择
                </a-select-option>
                <a-select-option v-for="(item, index) in peoInfo" :key="index" :value="JSON.stringify(index)">
                  {{ item.label }}
                </a-select-option>
              </a-select>
              <a-input
                v-decorator="['PBXiangXi', { rules: [{ required: true, message: '请输入' }] }]"
                style="width:45%;"
              />
              <a-input v-decorator="['PBDestinations']" placeholder="目的地" style="display:none" />
            </a-form-item> -->
          </a-descriptions-item>
          <a-descriptions-item label="检疫标志号" :span="1">
            <a-form-item>
              <a-input v-decorator="['PBSign']" />
            </a-form-item>
          </a-descriptions-item>
          <!-- <a-descriptions-item label="非洲猪瘟检测单号" :span="1">
            <a-form-item>
              <a-input v-decorator="['Fsm3']" />
            </a-form-item>
          </a-descriptions-item> -->
          <a-descriptions-item label="备注" :span="2">
            <a-form-item>
              <a-textarea v-decorator="['PBRemarks']" rows="4" cols="20" style="width:90%" />
            </a-form-item>
          </a-descriptions-item>
        </a-descriptions>
        <span>本批动物经检疫合格,应于当日内到达有效。</span>
        <a-descriptions bordered :column="2" size="small">
          <a-descriptions-item label="官方兽医签字" :span="1">
            <a-form-item>
              <a-input disabled v-decorator="['PBVeterinary', { initialValue: loggedUserName }]" />
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
      :zIndex="1000"
      :destroyOnClose="true"
    >
      <clu :columns1="clo" :totalnum="tt" :shu="shu" @child-event1="father" @tiao="tiao"> </clu>
    </a-modal>
  </div>
</template>

<script>
// 接口请求调用
import httper from '@/utils/httper'
import { FindAllInfo, AddInfo, FindInfoByFStId, DeleteInfo, FindShipperInfo } from '@/api/tzjyEb/AnimaJyzmB.js'
import { GettzcsbdaddressInfo
} from '@/api/tzjyEb/AnimaJyzmA.js'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import formatTime from '@/utils/public.js'
import clu from '@/views/jyjg/compont/clu2.vue'
import qrCode from '@/views/qrcode/index'
import { getQrCode } from '@/api/crcode'

import mapaddres from '../../../static/citys.json'

// 当前页
var yenum1 = 1

const columns = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    dataIndex: 'FStId',
    key: 'FStId',
    customRender: (t, r, index) => {
      if (yenum1 === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenum1 - 1) * 10 + 1
      }
    }
  },
  { title: '签发日期', width: 150, align: 'center', dataIndex: 'DateQF', key: 'DateQF' },
  { title: '检疫证编号', width: 200, align: 'center', dataIndex: 'PBNumber', key: 'PBNumber' },
  { title: '货主', width: 200, align: 'center', dataIndex: 'PBCargoOwner', key: 'PBCargoOwner' },
  { title: '产品名称', width: 220, align: 'center', dataIndex: 'PBName', key: 'PBName' },
  { title: '数量', width: 200, align: 'center', dataIndex: 'PBQuantity', key: 'PBQuantity' },
  { title: '单位', width: 200, align: 'center', dataIndex: 'PBDanWei', key: 'PBDanWei' },
  { title: '产地', width: 200, align: 'center', dataIndex: 'PBOrigin', key: 'PBOrigin' },
  { title: '生产单位名称地址', width: 280, align: 'center', dataIndex: 'PBPumAdd', key: 'PBPumAdd' },
  { title: '目的地', width: 280, align: 'center', dataIndex: 'PBDestinations', key: 'PBDestinations' },
  { title: '官方兽医签字', width: 200, align: 'center', dataIndex: 'PBVeterinary', key: 'PBVeterinary' },
  { title: '开证人员', width: 200, align: 'center', dataIndex: 'FSuserName', key: 'FSuserName' },
  { title: '检疫证状态', width: 200, align: 'center', dataIndex: 'IsPrant', key: 'IsPrant' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 250,
    scopedSlots: { customRender: 'action' }
  }
]

// 货主列表弹窗
const clo = [
  { title: '货主', key: 'PBCargoOwner', align: 'center', width: 200, dataIndex: 'PBCargoOwner' },
  { title: '产品名称', key: 'PBName', align: 'center', width: 220, dataIndex: 'PBName' },
  { title: '生产单位名称地址', key: 'PBPumAdd', align: 'center', width: 220, dataIndex: 'PBPumAdd' },
  { title: '目的地', key: 'PBDestinations', align: 'center', width: 220, dataIndex: 'PBDestinations' },
  { title: '产地', key: 'PBOrigin', align: 'center', width: 220, dataIndex: 'PBOrigin' },
  { title: '检疫标志号', key: 'PBSign', align: 'center', width: 220, dataIndex: 'PBSign' },
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

export default {
  inject: ['reload'], // 页面刷新this.reload()使用
  props: {
    // eslint-disable-next-line vue/require-default-prop
    findList: {
      type: Object
    }
  },
  components: {
    clu,
    qrCode,
    mapaddres
  },
  data () {
    return {
      // 总条数
      totalnum: 0,
      // 单位总数
      DWtotal: 0,
      // 当前页
      yenum: 1,
      // 单位选择当前页数
      offset: 1,
      // 每页条数
      limit: 10,
      // 模糊查询当前页
      findBynameyenum: 1,

      // 货主列表
      offsetHz: 1,
      limitHz: 10,
      PBCargoOwner: '',
      clo, // 列
      tt: 0, // 总条数
      shu: [], // 数据
      selectShipperinfo: false,

      queryParam: { status: 0, status1: 0 },
      columns,
      data: [],
      selectwhere: '',
      options: [],
      regName: '',
      peoName: '',
      regInfo: [],
      peoInfo: [],

      // from 表单
      form: this.$form.createForm(this),
      formType: '',
      number: 0,
      UserId: sessionStorage.getItem('FStId'), // 当前登录用户Id
      loggedUserName: sessionStorage.getItem('FuName'), // 当前登录用户
      loggedAllInfo: localStorage.getItem('AllInfo'),

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

      codeId: '',
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
    this.arr = mapaddres
    this.shengDD = this.arr[14].label
    this.cityArr = this.arr[14].children
    this.shiDD = this.cityArr[0].label
    this.countyArr = this.cityArr[0].children
    this.xianDD = this.countyArr[0].label
    GettzcsbdaddressInfo(this.UserId).then(res => {
      console.log(res.Data)
      if (res.Result) {
        this.$nextTick(() => {
      this.form.setFieldsValue({
        PBSheng: '山东省',
        PBShi: '济南市',
        PBXian: '历下区',
        PBUnitName: res.Data.FsbdName,
        PBProductionunit: res.Data.FAddress + res.Data.FLAddress
      })
    })
      }
    })

    yenum1 = 1
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
    this.findAll()
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
      var currentDate = formatTime(null, 'yyyy-MM-dd hh:mm:ss')
      return currentDate
    },
    getHao () {
      // 获取检疫证编号
      const Allinfo = JSON.parse(localStorage.getItem('AllInfo'))
      this.$axios.get(httper + '/GetNumber.ashx?type=4&uid=' + Allinfo.FStId).then(res => {
        console.log(res)
        this.form.setFieldsValue({ PBNumber: res.data.data.result, JLDNumber: this.findList.BH })
      })
    },
    findAll () {
      var that = this
      var p = {
        limit: that.limit,
        offset: that.offset,
        selectwhere: that.selectwhere,
        UserId: this.UserId
      }
      FindAllInfo(p)
        .then(res => {
          // console.log(JSON.stringify(res))
          if (res.Result) {
            if (res.Data) {
              var datalist = JSON.parse(res.Data)
              datalist.rows.forEach(item => {
                item.DateQF = formatTime(item.DateQF, 'yyyy-MM-dd')
              })
              this.data = datalist.rows
              this.totalnum = parseInt(datalist.total)
            }
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 分页方法
    onChange (checkedValues) {
      this.selectedRowKeys = []
      console.log('checked = ', checkedValues)
      this.yenum = checkedValues
      this.offset = checkedValues
      yenum1 = checkedValues
      this.findAll()
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 市级选择触发
    ChangeTown (val) {
      console.log(val)
    },
    ChangeRegion (val) {
      this.form.setFieldsValue({ PXian: '请选择' })
      console.log(val)
      if (val === '请选择' || val === '') {
      } else {
        this.peoName = '请选择'
        if (this.regInfo[val]) {
          this.regName = this.regInfo[val].label
          this.peoInfo = this.regInfo[val].children
        }
        console.log(val + '##' + this.regName + '@@' + this.peoInfo)
      }
    },
    ChangePeo (val) {
      if (val === '请选择' || val === '') {
      } else {
        this.peoName = this.peoInfo[val].label
        console.log(this.regName, this.peoName)
      }
    },
    onSelectChange (selectedRowKeys, selectedRow) {
      // 选中行
      console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRow)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRow = selectedRow
    },
    // 弹窗
    showModal (formName) {
      this.getHao()
      this.formType = 'add'
      this.visible = true
    },
    find (v) {
      var p = {
        FStId: v.FStId,
        UserId: this.UserId
      }
      FindInfoByFStId(p).then(res => {
        if (res.Result) {
          console.log(JSON.stringify(res) + '##查看的数据')
          this.findinfo = true
          this.$nextTick(() => {
            res.Data.FDate = formatTime(res.Data.FDate, 'yyyy年MM月dd日')
            res.Data.DateQF = formatTime(res.Data.DateQF, 'yyyy年MM月dd日 hh:mm:ss')
            this.findList = res.Data
          })
        }
      })
      var pp = {
        FStId: v.FStId,
        Mid: 31,
        UserId: sessionStorage.getItem('FStId')
      }
      getQrCode(pp).then(res => {
        console.log(res)
        this.codeId = res.Data
      })
    },
    update (v) {
      console.log('修改' + v.FStId)
      this.formType = 'update'
      var p = {
        FStId: v.FStId,
        UserId: this.UserId
      }
      FindInfoByFStId(p)
        .then(res => {
          console.log(JSON.stringify(res) + '@@@@')
          if (res.Result) {
            this.updateinfo = true
            this.$nextTick(() => {
              var datalist = res.Data
              this.ChangeRegion(datalist.PBShi)
              this.form.setFieldsValue(datalist)
            })
          } else {
            this.$notification.info({ message: '未查询到任何信息' })
            // this.$notification.info({ message: res.Msg })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notification.info({ message: '系统繁忙，请稍后再试' })
        })
    },
    delet (v) {
      this.number = v.FStId
      this.deletinfo = true
    },
    handleSubmit (e) {
      e.preventDefault()
      var that = this
      var PBUnitName = this.form.getFieldValue('PBUnitName')
      var PBProductionunit = this.form.getFieldValue('PBProductionunit')
      var PBPumAdd = PBUnitName + ' ' + PBProductionunit
      this.form.setFieldsValue({ PBPumAdd: PBPumAdd }) // 生产单位名称地址

      var PBSheng = this.form.getFieldValue('PBSheng')
      var PBShi = this.form.getFieldValue('PBShi')
      var PBXian = this.form.getFieldValue('PBXian')
      var PBXiangXi = this.form.getFieldValue('PBXiangXi')
      var PBDestinations = PBSheng + PBShi + PBXian + PBXiangXi
      this.form.setFieldsValue({ PBDestinations: PBDestinations })

      this.form.validateFields((err, v) => {
        console.log(v)
        if (!err) {
          var p = v
          p.UserId = that.UserId
          // 新增
          p.PMemo2 = '' + this.form.getFieldValue('PBSheng') + this.form.getFieldValue('PBShi') + this.form.getFieldValue('PBXian') + this.form.getFieldValue('PBXiangXi')
          p.IsPrant = '已保存'
          p.SaveId = 5
          p.PBYouXiaoRi = 1
          console.log(JSON.stringify(p) + '新增')
          AddInfo(p)
            .then(res => {
              console.log(res)
              if (res.Result && res.Data !== 'false') {
                this.formType = ''
                this.visible = false
                this.$notification.success({
                  message: res.Msg
                })
                this.reload()
              } else {
                this.$notification.error({
                  message: '该检疫证编号不属于本人或已存在'
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$notification.error({
            message: '请检查输入信息'
          })
        }
      })
    },
    handleDeletOk () {
      // 删除
      this.confirmLoading = true
      var p = {
        FStId: this.number,
        UserId: this.UserId
      }
      console.log(JSON.stringify(p))
      DeleteInfo(p)
        .then(res => {
          var result = res.Result
          var Msg = res.Msg
          setTimeout(() => {
            this.$notification.success({
              message: Msg
            })
          }, 100)
          if (result) {
            this.deletinfo = false
            this.confirmLoading = false
            this.form.resetFields()
            this.reload()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 选择货主信息
    findShipper () {
      var p = {
        offset: this.offsetHz,
        limit: this.limitHz,
        PBCargoOwner: this.PBCargoOwner,
        UserId: this.UserId
      }

      FindShipperInfo(p)
        .then(res => {
          this.selectShipperinfo = true
          console.log(res)
          if (res.Data) {
            console.log(JSON.parse(res.Data))
            var datalist = JSON.parse(res.Data)
            this.shu = datalist.rows
            this.tt = parseInt(datalist.total)
          }
        })
        .catch(err => {
          console.log(err)
          this.$notification.info({ message: '系统繁忙，请稍后再试' })
        })
    },
    tiao (data) {
      this.offsetHz = data.offset
      this.limitHz = data.limit
      this.PBCargoOwner = data.selectWhere ? data.selectWhere : ''
      this.findShipper()
    },
    father (data) {
      console.log(data)
      this.selectShipperinfo = false
      this.$nextTick(() => {
        this.form.setFieldsValue({
          PBCargoOwner: data.PBCargoOwner, // 货主
          PBName: data.PBName, // 产品名称
          PBShi: data.PBShi,
          PBXian: data.PBXian,
          PBXiangXi: data.PBXiangXi,
          PBSign: data.PBSign, // 检疫标志号
          PBOrigin: data.PBOrigin, // 产地
          PBRemarks: data.PBRemarks,
          PBQuantity: data.PBQuantity,
          PBUnitName: data.PBUnitName,
          PBProductionunit: data.PBProductionunit

        })
      })
    },
    handleCancelHZ (e) {
      this.selectShipperinfo = false
      this.PBCargoOwner = ''
    },
    // 弹窗关闭
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.updateinfo = false
        this.findinfo = false
        this.deletinfo = false
        this.confirmLoading = false
        this.formType = ''
        this.form.resetFields()
      }, 100)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.updateinfo = false
      this.findinfo = false
      this.deletinfo = false
      this.formType = ''
      this.selectedRowKeys1 = []
      this.form.resetFields()
    }
  }
}
</script>
<style scoped>
.zhang {
  width: 150px;
  height: 90px;
  position: absolute;
  left: 40%;
  top: 10px;
}
.infoTop {
  display: inline-block;
  margin-left: 50%;
  color: #754946;
  transform: translateX(-50%);
  /* font-size: 30px; */
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
.tbClass {
  width: 100%;
  line-height: 60px;
}

.tbClass td {
  border: 1px solid #754946;
  padding: 0;
  width: 20%;
}
.tbClass td:nth-child(1),
td:nth-child(3) {
  text-align: center;
}
</style>
