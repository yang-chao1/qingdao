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
            <a-button type="primary" style="height:40px" icon="plus" @click="showModal()">新增</a-button
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
              >当前第 1/ 1 页 共 {{ totalnum }} 条记录 每页 10 条</span
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

            >
              <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
                <a-form-item label="*无害化处理厂名称">
                  <a-input
                    v-decorator="['whhName', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
                </a-form-item>
                <a-form-item label="*企业名称">
                  <a-input
                    v-decorator="['FFcmc', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
                  <a-button @click="checkInfo" style="position: absolute; margin: 3px 10px">
                    选择
                  </a-button>
                </a-form-item>
                <a-form-item label="*动物种类">
                  <a-input
                    v-decorator="['sbdwType', { rules: [{ required: true, message: 'Please input your note!' }] }]"
                  />
                </a-form-item>
              </a-form>
              <a-button type="primary" html-type="submit" @click="hiddModal">
                确认
              </a-button>
            </a-modal>
            <a-modal
              :visible="checkMOdal"
              :confirm-loading="confirmLoading"
              @ok="handleOk2"
              @cancel="handleCancelCheck"
              width="1000px"
              :footer="null"
              :closable="false"

            >
              <a-table
                :row-selection="{ selectedRowKeys: SelectChangeCheck, onChange: onSelectChangeCheck }"
                :columns="columnCheck"
                :data-source="checkData"
              />
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
  { title: '无害化处理厂名称', width: 200, dataIndex: 'whhName', key: 'whhName' },
  { title: '企业名称', width: 200, dataIndex: 'FFcmc', key: 'FFcmc' },
  { title: '病死动物', width: 200, dataIndex: 'sbdwType', key: 'sbdwType' },
  { title: '处理时间', width: 200, dataIndex: 'collectTime', key: 'collectTime' }
]
// 表格类型
const columnCheck = [
  { title: '企业名称', width: 200, dataIndex: 'FFcmc', key: 'FFcmc' },
  { title: '企业类型', width: 200, dataIndex: 'FFcType', key: 'FFcType' },
  { title: '动物种类', width: 200, dataIndex: 'sbdwType', key: 'sbdwType' },
  { title: '申报数量', width: 200, dataIndex: 'sbNum', key: 'sbNum' }
]
// 模拟数据
const datas = [
  // FFcmc	厂名称	FSmemo2	编号	FFArea 地址	FFfzr 负责人	FFlxdh	联系电话	FFclfs	处理方式	FFclnl	日处理能力	UnitCloseStatus	经营状态
  //   申报状态     企业名称  企业名称类型   申报时间 法人代表 申报人电话 畜主身份证号 实际处理数量  动物重量 收集人姓名 收集日期  删除人  删除时间   删除原因  现存数量  地址
  {
    Pid: 1,
    whhName: '无害化厂名称',
    FFcmc: '企业名称',
    sbdwType: '病死动物',
    collectTime: '处理时间'
  },
  {
    Pid: 2,
    whhName: '无害化厂名称2',
    FFcmc: '企业名称2',
    sbdwType: '病死动物2',
    collectTime: '处理时间2'
  },
  {
    Pid: 3,
    whhName: '无害化厂名称3',
    FFcmc: '企业名称3',
    sbdwType: '病死动物3',
    collectTime: '处理时间3'
  }
]

// 模拟选择的数据
const checkData = [
  {
    FFcmc: '企业名称',
    FFcType: '企业类型',
    sbdwType: '动物种类',
    sbNum: '申报数量'
  },
  {
    FFcmc: '企业名称2',
    FFcType: '企业类型2',
    sbdwType: '动物种类2',
    sbNum: '申报数量2'
  },
  {
    FFcmc: '企业名称3',
    FFcType: '企业类型3',
    sbdwType: '动物种类3',
    sbNum: '申报数量3'
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

      //   选择数据的对话框
      checkMOdal: false,

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
      columnCheck,
      //   columnuser,
      //   userData,
      data1,

      //   模拟的选择数据
      checkData,

      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      SelectChangeCheck: [],
      loading: false,
      userdanwei1: '',
      number: 0,
      allFStid: []
    }
  },
  created () {},
  methods: {
    //   选择数据页面
    checkInfo () {
      console.log('打开选择对话框')
      this.checkMOdal = true
    },

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
    onSelectChangeCheck (selectedRowKeys) {
      console.log('selectedRowKeys1 changed: ', selectedRowKeys)
      this.SelectChangeCheck = selectedRowKeys
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
    handleCancelCheck () {
      this.checkMOdal = false
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
