<template>
  <div id="prints">
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;" @submit="handleSubmit" :form="form">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item>
                    <a-input v-decorator="['FuName']" size="large" class="btn" />
                  </a-form-item>
                </a-col>
              </div>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item label="调用次数">
                    <a-input-number style="width: 100%" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="更新日期">
                    <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期" />
                  </a-form-item>
                </a-col>
                <!-- <a-col :md="8" :sm="24">
                <a-form-item label="使用状态">
                  <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col> -->
                <!-- 使用状态 -->
                <a-col :md="8" :sm="24">
                  <a-form-item label="使用状态">
                    <a-select placeholder="请选择" default-value="0">
                      <a-select-option value="0">全部</a-select-option>
                      <a-select-option value="1">关闭</a-select-option>
                      <a-select-option value="2">运行中</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </template>
              <div class="div4">
                <a-col :md="(!advanced && 8) || 24" :sm="24">
                  <span
                    class="table-page-search-submitButtons"
                    :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
                  >
                    <a-button type="primary" html-type="submit" style="height:40px" @click="findByinfo">查询</a-button>
                    <a-button style="margin-left: 8px;height:40px" @click="() => (queryParam = {})">重置</a-button>
                    <a @click="toggleAdvanced" style="margin-left: 8px">
                      {{ advanced ? '收起' : '展开' }}
                      <a-icon :type="advanced ? 'up' : 'down'" />
                    </a>
                  </span>
                </a-col>
              </div>
            </a-row>
          </a-form>
          <div style="margin-top:35px;">
            <!-- 新增无害化报表 -->
            <a-button type="primary" style="height:40px" icon="plus" @click="showModal()">任务分派</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;

            <!-- 页面表格 -->
            <a-table
              :pagination="false"
              :columns="columns"
              :data-source="datas"
              :scroll="{ x: 1300 }"
              :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
              style="margin-top:5px;"
            >
              <template slot="action" slot-scope="text, record">
                <a slot="action" @click="showModal(record)">分派&nbsp;&nbsp;</a>
              </template>
            </a-table>
            <!-- 页面表格end -->
            <!-- 分页 -->
            <div>
              <a-pagination
                show-quick-jumper
                :default-current="offset"
                :total="totalnum"
                show-less-items
                @change="onChange"
                style="margin: 10px"
              />
              <span
                style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
              >当前第  1/ 1  页 共 {{ totalnum }} 条记录 每页 10
                条</span
              >
            </div>
            <!-- 分页结束 -->

            <!-- 无害化处理申报详情弹窗 -->
            <a-modal
              :visible="modalWh"
              :confirm-loading="confirmLoading"
              @ok="handleOk2"
              @cancel="handleCancel"
              width="1000px"
              :footer="null"
              :closable="false"
              :zIndex="1000"
            >
              <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                <a-form-item label="*无害化处理厂">
                  <a-input
                    v-decorator="['millName', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
                </a-form-item>
                <a-form-item label="*收集人员姓名">
                  <a-input
                    v-decorator="['collectName', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
                </a-form-item>
                <a-form-item label="*联系方式：">
                  <a-input
                    v-decorator="['collectPhone', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
                </a-form-item>
                <a-form-item label="*车牌">
                  <a-input
                    v-decorator="['plateNum', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                  <a-button type="primary" html-type="submit">
                    选择
                  </a-button>
                </a-form-item>
              </a-form>
              <a-table
                :pagination="false"
                :columns="columnuser"
                :data-source="userData"
                :scroll="{ x: 1300 }"
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                style="margin-top:5px;"
              >
              </a-table>
              <a-button type="primary" html-type="submit" @click="hiddModal">
                确认
              </a-button>
            </a-modal>

            <!-- 无害化处理申报详情弹窗结束 -->
          </div>
        </div>
      </div></page-header-wrapper
    >
  </div>
</template>
<script>
// 接口请求调用
// import { getToken } from '@/api/getToken'
// import http from '@/utils/httpapi'
const columns = [
  { title: '序号', width: 200, dataIndex: 'Pid', key: 'Pid' },
  { title: '操作', width: 200, dataIndex: 'handle', key: 'handle', scopedSlots: { customRender: 'action' } },
  { title: '企业名称', width: 200, dataIndex: 'FFcmc', key: 'FStId' },
  { title: '企业名称类型', width: 200, dataIndex: 'FFcType', key: 'FFcType' },
  { title: '申报时间', width: 200, dataIndex: 'declareTime', key: 'declareTime' },
  //   { title: '申报来源', width: 200, dataIndex: 'declareAddress', key: 'FrName' },
  //   { title: '法人代表', width: 200, dataIndex: 'FRDB', key: 'FRDB' },
  { title: '申报人电话', width: 200, dataIndex: 'declarePhone', key: 'declarePhone' },
  { title: '身份证号', width: 200, dataIndex: 'userCID', key: 'userCID' },
  { title: '一卡通号', width: 200, dataIndex: 'yktCID', key: 'FuPhone' },
  { title: '现存栏数', width: 200, dataIndex: 'xclNum', key: 'leixing' },
  { title: '申报动物种类', width: 200, dataIndex: 'sbdwType', key: 'phoneappuserjuese' },
  { title: '申报数量单位', width: 200, dataIndex: 'sbNum', key: 'sbNum' },
  //   { title: '动物重量', width: 200, dataIndex: 'animalKG', key: 'animalKG' },
  //   { title: '收集人姓名', width: 200, dataIndex: 'collectUName', key: 'collectUName' },
  //   { title: '收集日期', width: 200, dataIndex: 'collectTime', key: 'collectTime' },
  //   { title: '删除人', width: 200, dataIndex: 'delUName', key: 'delUName' },
  //   { title: '删除时间', width: 200, dataIndex: 'delUTime', key: 'delUTime' },
  //   { title: '删除原因', width: 200, dataIndex: 'delCause', key: 'delCause' },
  //   { title: '现存数量', width: 200, dataIndex: 'newNum', key: 'newNum' },
  { title: '申报数量单位', width: 200, dataIndex: 'sbNumAddress', key: 'state' },

  { title: '地址', width: 200, dataIndex: 'newAddress', key: 'newAddress' }
]
// 模拟数据
const datas = [
  // FFcmc	厂名称	FSmemo2	编号	FFArea 地址	FFfzr 负责人	FFlxdh	联系电话	FFclfs	处理方式	FFclnl	日处理能力	UnitCloseStatus	经营状态
  //   申报状态     企业名称  企业名称类型   申报时间 法人代表 申报人电话 畜主身份证号 实际处理数量  动物重量 收集人姓名 收集日期  删除人  删除时间   删除原因  现存数量  地址
  {
    Pid: '1',
    handle: '分派',
    FFcmc: '企业名称',
    FFcType: '企业名称类型',
    declareTime: '申报时间',
    // declareAddress: '申报来源',
    // FRDB: '法人代表',
    declarePhone: '申报人电话',
    userCID: '身份证号',
    yktCID: '一卡通号',
    xclNum: '现存栏数',
    sbdwType: '申报动物种类',
    sbNum: '申报数量',
    sbNumAddress: '申报数量单位',
    // animalKG: '动物重量',
    // collectUName: '收集人姓名',
    // collectTime: '收集日期',
    // delUName: '删除人',
    // delUTime: '删除时间',
    // delCause: '删除原因',
    // newNum: '现存数量',
    newAddress: '地址'
  },
  {
    Pid: '2',
    handle: '分派',
    FFcmc: '企业名称2',
    FFcType: '企业名称类型2',
    declareTime: '申报时间2',
    // declareAddress: '申报来源',
    // FRDB: '法人代表',
    declarePhone: '申报人电话2',
    userCID: '身份证号2',
    yktCID: '一卡通号2',
    xclNum: '现存栏数2',
    sbdwType: '申报动物种类2',
    sbNum: '申报数量2',
    sbNumAddress: '申报数量单位2',
    // animalKG: '动物重量',
    // collectUName: '收集人姓名',
    // collectTime: '收集日期',
    // delUName: '删除人',
    // delUTime: '删除时间',
    // delCause: '删除原因',
    // newNum: '现存数量',
    newAddress: '地址2'
  },
  {
    Pid: '3',
    handle: '分派3',
    FFcmc: '企业名称3',
    FFcType: '企业名称类型3',
    declareTime: '申报时间3',
    // declareAddress: '申报来源',
    // FRDB: '法人代表',
    declarePhone: '申报人电话3',
    userCID: '身份证号3',
    yktCID: '一卡通号3',
    xclNum: '现存栏数3',
    sbdwType: '申报动物种类3',
    sbNum: '申报数量3',
    sbNumAddress: '申报数量单位3',
    // animalKG: '动物重量',
    // collectUName: '收集人姓名',
    // collectTime: '收集日期',
    // delUName: '删除人',
    // delUTime: '删除时间',
    // delCause: '删除原因',
    // newNum: '现存数量',
    newAddress: '地址3'
  }
]

const columnuser = [
  { title: '企业名称', width: 200, dataIndex: 'FFcmc', key: 'FStId' },
  { title: '企业类别', width: 200, dataIndex: 'FFcType', key: 'FFcType' },
  { title: '申报时间', width: 200, dataIndex: 'declareTime', key: 'declareTime' },
  //   { title: '申报来源', width: 200, dataIndex: 'declareAddress', key: 'FrName' },
  //   { title: '法人代表', width: 200, dataIndex: 'FRDB', key: 'FRDB' },
  { title: '申报人电话', width: 200, dataIndex: 'declarePhone', key: 'declarePhone' },
  { title: '现存栏数', width: 200, dataIndex: 'xclNum', key: 'leixing' },
  { title: '申报单位地址', width: 200, dataIndex: 'newAddress', key: 'newAddress' },
  { title: '申报动物种类', width: 200, dataIndex: 'sbdwType', key: 'phoneappuserjuese' },
  { title: '申报数量', width: 200, dataIndex: 'sbNum', key: 'sbNum' }
]
const userData = [
    {
    FFcmc: '企业名称',
    FFcType: '企业名称类型',
    declareTime: '申报时间',
    declarePhone: '申报人电话',
    xclNum: '现存栏数',
     newAddress: '申报单位地址',
    sbdwType: '申报动物种类',
    sbNum: '申报数量'

  },
  {
    FFcmc: '企业名称1',
    FFcType: '企业名称类型1',
    declareTime: '申报时间1',
    declarePhone: '申报人电话1',
    xclNum: '现存栏数1',
     newAddress: '申报单位地址1',
    sbdwType: '申报动物种类1',
    sbNum: '申报数量1'

  },
  {
    FFcmc: '企业名称2',
    FFcType: '企业名称类型2',
    declareTime: '申报时间2',
    declarePhone: '申报人电话2',
    xclNum: '现存栏数2',
     newAddress: '申报单位地址2',
    sbdwType: '申报动物种类2',
    sbNum: '申报数量2'

  }
]

const data1 = []

export default {
  name: 'BaseForm',
  data () {
    return {
      lx: '',
      // 总条数
      totalnum: 3,
      yenum: 1,
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake'
                }
              ]
            }
          ]
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men'
                }
              ]
            }
          ]
        }
      ],
      queryParam: { status: 0, status1: 0 },
      value: '',
      hasSelected: 'true',
      fromdata: '',

      // from 表单
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),

      // 点击 新增弹出框
      // ModalText: '请不要输入错误噢~',
      visible: false,
      updateinfo: false,
      danwei: false,
      confirmLoading: false,
      confirmLoading1: false,
      deletinfo: false,
      //   无害化申报处理弹窗控制
      modalWh: false,
      jinyong: false,
      qiyedanwei: '',

      datas,
      columns,
      columnuser,
      userData,
      data1,

      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      loading: false,
      userdanwei1: '',
      number: 0,
      allFStid: []
    }
  },
  created () {},
  methods: {
    //   打印报表
    printBB () {
      this.$print(this.$refs.print)
    },
    onSearch (value) {
      console.log(value)
    },
    // 用户按条件查询
    findByinfo () {
      console.log('用户按条件查询')
      this.fromdata = 'findbyinfo'
    },
    // 批量删除
    DeleteByFStId () {
      if (this.allFStid.length > 0) {
        this.$axios
          .delete('http://192.168.0.119:8086/api/User/DelUserBatch', {
            data: this.allFStid
          })
          .then(res => {
            console.log('批量删除成功' + res)
          })
          .catch(err => {
            console.log('批量删除失败' + err)
          })
      } else {
        alert('请选择要删除的数据')
      }
    },
    handleSelectChange (value) {
      console.log(value)
      this.$nextTick(() => {
        this.form.setFieldsValue({
          note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
        })
      })
    },
    handleSelectChange1 (value) {
      console.log(value)
      this.lx = value
    },
    onChange (checkedValues) {
      // console.log('checked = ', checkedValues)
      // this.yenum = checkedValues
      // this.$axios({
      //   url: 'http://192.168.0.119:8086/api/User/GetUsers?offset=' + checkedValues + '&limit=10',
      //   method: 'get'
      // })
      //   .then(res => {
      //     console.log('通知管理' + JSON.parse(res.data.Data))
      //     var datalist = JSON.parse(res.data.Data)
      //     this.data = datalist.rows
      //   })
      //   .catch(err => {
      //     console.log('通知管理 失败' + err)
      //   })
    },
    toggleAdvanced () {
      //   this.advanced = !th is.advanced
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      // 把要删除的FStid放入数组
      console.log('selectedRows changed: ', selectedRows)
      var arr = []
      selectedRows.forEach(item => {
        console.log(item.FStId)
        arr.push(item.FStId)
        console.log('arr 数组' + arr)
        this.allFStid = arr
        console.log('FStid数组' + this.allFStid)
      })
      arr = []
    },
    onSelectChange1 (selectedRowKeys) {
      console.log('selectedRowKeys1 changed: ', selectedRowKeys)
      //   this.selectedRowKeys1 = selectedRowK eys
    },

    // 弹窗
    showModal (formName) {
      console.log(formName)
      this.modalWh = true
      // this.fromdata = 'add'
      // this.visible =  true
    },
    hiddModal () {
      this.modalWh = false
    },
    // 弹窗关闭
    handleOk (e) {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.updateinfo = false
        this.deletinfo = false
        this.jinyong = false
        this.confirmLoading = false
        this.userdanwei1 = ''
        this.selectedRowKeys1 = []
        // 给对应的表单元素赋值
        this.form.setFieldsValue({
          FuseEName: this.userdanwei1
        })
      }, 1000)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.updateinfo = false
      this.deletinfo = false
      this.jinyong = false
      this.userdanwei1 = ''
      this.modalWh = false
      this.selectedRowKeys1 = []
      // 给对应的表单元素赋值
      this.form.setFieldsValue({
        // FuseEName: this.userd anwei1
      })
    },
    handleOk1 (e) {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading1 = true
      setTimeout(() => {
        this.danwei = false
        this.confirmLoading1 = false
      }, 1000)
    },
    handleCancel1 (e) {
      console.log('点击了取消')
      //   thi s.danwei = false
    },
    handleOk2 () {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.data = this.data.filter(item => parseInt(item.FStId) !== this.number)
        this.deletinfo = false
        this.confirmLoading = false
        this.modalWh = false
      }, 1000)
    },

    //  新增fro m表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
    }
  }
}
</script>
<style scoped>
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
/* 打印页样式 */
.AllItem {
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
}
.AllItem li {
  border: 1px solid rgba(0, 0, 0, 0.3);
  height: 40px;
  width: 25%;
  text-align: center;
  line-height: 40px;
}
.AllItem li:nth-child(2n-1) {
  background-color: rgba(250, 194, 194, 0.2);
}
.AllItem .pictureAll {
  height: 80px;
  line-height: 80px;
}
</style>
