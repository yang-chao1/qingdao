<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="参数类型">
                    <a-input v-model="queryParam.id" @blur="mocheck" size="large" class="btn" style="width: 100%" />
                  </a-form-item>
                </a-col>
              </div>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item label="调用次数">
                    <a-input-number v-model="queryParam.callNo" style="width: 100%" />
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
                <a-col :md="8" :sm="24">
                  <a-form-item label="使用状态">
                    <a-select placeholder="请选择" default-value="0" style="width: 80px">
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
                    <a-button v-permission="{active:'clasele'}" type="primary" style="height:40px" @click="$refs.table.refresh(true)">查询</a-button>
                    <!-- <a-button style="margin-left: 8px;height:40px" @click="() => (queryParam = {})">重置</a-button>
                    <a @click="toggleAdvanced" style="margin-left: 8px">
                      {{ advanced ? '收起' : '展开' }}
                      <a-icon :type="advanced ? 'up' : 'down'" />
                    </a> -->
                  </span>
                </a-col>
              </div>
            </a-row>
          </a-form>
          <div style="margin-top:35px;">
            <a-button type="primary" v-permission="{active:'claadd'}" style="height:40px" icon="plus" @click="showModal()">新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- 新增 -->
            <a-modal
              title="管理新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="800px"
              :footer="null"
              :destroyOnClose="true"
            >
              <!-- <p>{{ ModalText }}</p> -->

              <a-form @submit="handleSubmit" :form="form">
                <!-- //类型 -->
                <a-form-item
                  label="参数类型"
                  :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-select
                    v-decorator="['leixing', { rules: [{ required: true, message: '请选择参数类型' }] }]"
                    placeholder="请选择参数类型"
                    @focus="checkOptionClass"
                    @change="handleSelectChange"
                  >
                    <a-select-option v-for="item in classTypeOption" :key="item.FStId">{{
                      item.FcPName
                    }}</a-select-option>
                    <!-- <a-select-option value="tongzhileixing">通知类型</a-select-option> -->
                  </a-select>
                </a-form-item>
                <!-- //参数名 -->
                <a-form-item
                  label="参数名"
                  :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <!-- <a-select
                    v-decorator="['FcName', { rules: [{ required: true, message: '请选择参数类型' }] }]"
                    placeholder="请选择参数名"
                    @focus="checkOptionClassName"
                    @change="handleSelectChange"
                  >
                    <a-select-option v-for="item in classTypeName" :key="item.FStId">{{ item.FcName }}</a-select-option>
                  </a-select> -->

                  <a-input
                    v-decorator="['FcName', { rules: [{ required: true, message: '请输入参数名' }] }]"
                    name="FcName"
                    placeholder="请输入"
                  />
                </a-form-item>
                <!-- //参数值 -->
                <a-form-item
                  label="参数值"
                  :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input v-decorator="['canshuzhi']" name="canshuzhi" placeholder="请输入" />
                </a-form-item>
                <!-- 树形控件 -->
                <a-form-item style="margin-left:60%; margin-top:100px;">
                  <a-tree
                    checkable
                    :autoExpandParent="true"
                    :defaultExpandedKeys="['0-0']"
                    :tree-data="sysTree"
                    :replace-fields="replaceFields"
                    @select="onSelect"
                    @check="onCheck"
                  />
                </a-form-item>
                <!-- 提交按钮 -->
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                  <a-button type="primary" html-type="submit">
                    确认提交
                  </a-button>
                </a-form-item>
              </a-form>
            </a-modal>
            <!-- 修改 -->
            <a-modal
              title="修改"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="800px"
              :footer="null"
              :destroyOnClose="true"
            >
              <!-- 管理新增form表 -->
              <a-form @submit="handleSubmitUpdate" :form="upForm">
                <a-form-item
                  label="参数类型"
                  :labelCol="{ lg: { span: 3 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <!-- <a-input
                    v-decorator="['title', { rules: [{ required: true, message: '请输入参数类型' }] }]"
                    name="title"
                    placeholder="参数类型"
                  /> -->
                  <a-select
                    v-decorator="['leixing', { rules: [{ required: true, message: '请选择参数类型' }] }]"
                    placeholder="请选择参数类型"
                    @focus="checkOptionClass"
                    @change="handleSelectChange"
                  >
                    <a-select-option v-for="item in classTypeOption" :key="item.FStId">{{
                      item.FcPName
                    }}</a-select-option>
                    <!-- <a-select-option value="tongzhileixing">通知类型</a-select-option> -->
                  </a-select>
                </a-form-item>
                <a-form-item
                  label="参数名称"
                  :labelCol="{ lg: { span: 3 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    v-decorator="['time', { rules: [{ required: true, message: '请输入参数名称' }] }]"
                    name="time"
                    placeholder="参数名称"
                  />
                </a-form-item>
                <a-form-item
                  label="参数值"
                  :labelCol="{ lg: { span: 3 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input v-decorator="['vu']" name="vu" placeholder="参数值" />
                </a-form-item>
                <!-- <a-form-item
                  label="排序"
                  :labelCol="{ lg: { span: 3 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    v-decorator="['sort']"
                    name="sort"
                    placeholder="排序"
                  />
                </a-form-item> -->
                <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
                  <a-button type="primary" html-type="submit">
                    保存
                  </a-button>
                </a-form-item>
                <!-- <router-link :to="{ name: 'Analysis' }">
                  <a-button type="primary" style="height:40px" icon="plus" @click="fanhui1">返回1</a-button>
                </router-link> -->
              </a-form>
              <a-form-item style="margin-left:60%;">
                <a-tree
                  checkable
                  :autoExpandParent="true"
                  :defaultExpandedKeys="['0-0']"
                  :tree-data="sysTree"
                  :replace-fields="replaceFields"
                  @select="onSelect"
                  @check="onCheck"
                />
              </a-form-item>
              <!-- 提交按钮 -->
            </a-modal>
            <!-- 删除弹窗 -->
            <a-modal
              okText="确认"
              cancelText="取消"
              title="删除"
              :visible="deletinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk1"
              @cancel="handleCancel"
              width="400px"
            >
              <div>
                是否确认删除
              </div>
            </a-modal>
            <a-button v-permission="{active:'cladele'}" type="primary" style="height:40px" @click="deletAll">批量删除</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <a-button type="primary" style="height:40px" @click="handleEdit()">导出</a-button>&nbsp;&nbsp;&nbsp;&nbsp; -->
          </div>
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="allClassOption"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
            align="center"
          >
            <span style="margin-left: 8px">
              <template v-if="hasSelected">
                {{ `Selected ${selectedRowKeys.length} items` }}
              </template>
            </span>
            <template slot="action" slot-scope="text, record">
              <a v-permission="{active:'claupd'}" slot="action" @click="update(record)">修改&nbsp;&nbsp;</a>
              <!-- <a slot="action" @click="delet(record)">删除</a> -->
            </template>
          </a-table>
          <div>
            <a-pagination
              size="small"
              :total="this.total"
              show-size-changer
              show-quick-jumper
              style="margin: 10px"
              @change="changePage"
              :current="offset"
              @showSizeChange="onShowSizeChange"
            />
            <span
              style="float: right;font-size:15px; margin-top:-2%;margin-right:5%"
            >当前第{{ offset }} / {{ totalPage }} 页 共 {{ total }} 条记录 每页 {{ limit }} 条</span
            >
          </div>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
import http from '@/utils/httpapi'
import { GetToken } from '@/api/getToken'
import { PCArrydata } from '@/utils/classFe'
// import user from '@/store/modules/user'

var yenum1 = 1
var yeOffset = 10
const columns = [
  // { title: '序号', width: 80, dataIndex: 'xuhao', key: 'xuhao' },
  // { title: '参数类型', width: 200, dataIndex: 'canshuleixing', key: 'canshuleixing' },
  // { title: '参数名称', width: 200, dataIndex: 'canshuname', key: 'canshuname' },
  // { title: '参数值', width: 200, dataIndex: 'canshuzhi', key: 'canshuzhi' },
  {
    title: '序号',
    width: 80,
    align: 'center',
    dataIndex: 'FStId',
    key: 'FStId',
    customRender: (t, r, index) => {
      // console.log('序号处理', t, r, index)
      if (yenum1 === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenum1 - 1) * yeOffset + 1
      }
    }
  },
  { title: '参数类型', width: 200, align: 'center', dataIndex: 'FcPName', key: 'FcPName' },
  { title: '参数名称', width: 200, align: 'center', dataIndex: 'FcName', key: 'FcName' },
  { title: '参数值', width: 200, align: 'center', dataIndex: 'FcValue', key: 'FcValue' },
  // { title: '参数名ID', width: 100, hidden: true, align: 'center', dataIndex: 'CodeID', key: 'CodeID' },

  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

// 模拟数据
const data = []
// 导航nav数据模拟
const treeData = [
  {
    name: '系统目录',
    key: '0-0',
    child: [
      {
        name: '畜牧生产信息管理',
        key: '0-0-0',
        child: [
          {
            name: '种畜禽场',
            key: '0-0-0-0',
            child: [
              {
                name: '种畜禽场信用档案',
                key: '0-0-0-0-0'
              },
              { name: '安全生产检查', key: '0-0-0-0-1' }
            ]
          },
          { name: '规模养殖场', key: '0-0-0-1' }
        ]
      },
      {
        name: '检疫监管',
        key: '0-0-1',
        child: [{ key: '0-0-1-0', name: 'zcvc' }]
      }
    ]
  }
]

export default {
  name: 'BaseForm',
  inject: ['reload'],
  data () {
    return {
      // token
      userToken: '',
      // 时间戳
      timestamp: new Date().valueOf(),
      treeData,
      replaceFields: {
        children: 'child',
        title: 'title'
      },

      // 参数类型下拉框
      classTypeOption: [],
      // 参数类型名称下拉框
      classTypeName: [],

      // 删除的fstid
      removeFstid: '',

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
      value: '',
      hasSelected: 'true',

      // 新增窗口的form 表单
      form: this.$form.createForm(this),
      // 修改窗口的form表单
      upForm: this.$form.createForm(this),
      // 点击 新增弹出框
      // // ModalText: '请不要输入错误噢~',
      visible: false,
      updateinfo: false,
      deletinfo: false,
      confirmLoading: false,

      data,
      columns,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      selectedRow: [],
      loading: false,
      number: 0,
      // 分类参数
      // FcPName:'',
      // FcName:'',
      // FcValue:'',
      // FcOrder:''
      allClassOption: [],
      // 页码
      limit: 10,
      offset: 1,
      total: 1,
      totalNum: 1,
      totalPage: 1,

      // 修改后的数据
      updateUser: {
        FcName: '',
        FcValue: '',
        FcPName: '',
        FStId: '',
        CodeID: ''
      },
      // 批量删除
      deletalls: false,
      // 系统树
      sysTree: [],
      // 选择的系统
      cheSysTree: '',
      CodeIDs: 0,
      UserId: sessionStorage.getItem('FStId'),
      FSunitUstrId: sessionStorage.getItem('FSunitUstrId'),
      FcPName: ''

    }
  },
  created () {
    yenum1 = 1
    // 获取token
    GetToken()
      .then(res => {
        console.log(res)
        // var that = this
        // console.log(that.timeStamp)
        this.userToken = res.access_token
        this.timestamp = new Date().valueOf
      })
      .catch(rol => {
        console.log(rol)
      })
    // const resToken = this.getToken()
    // console.log(resToken)
    // console.log('获取token结束')
    // 查询所有分类参数
    this.checkAllclassOptions(this.userToken, this.timestamp, this.offset, this.limit)
    // console.log('查询所有参数结束')
    console.log(PCArrydata)
    this.sysTree = PCArrydata
  },
  methods: {
    mocheck (checkedValues, e) {
      console.log(checkedValues, e, this.queryParam.id)
      if (!checkedValues.length && !this.queryParam.id) {
        this.reload()
      }
      if (!e) {
        this.FcPName = this.queryParam.id
      }
      this.limit = 10
      this.offset = 1
      this.GetTokenitem()
      this.checkAllclassOptions(this.userToken, this.timestamp, this.offset, this.limit)
    },
    // 获取token
    GetTokenitem () {
      GetToken()
        .then(res => {
          this.userToken = res.access_token
          this.timestamp = new Date().valueOf()
          console.log(res)
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    // 查询所有分类参数
    async checkAllclassOptions (AccessToken, timestamp, offset, limit) {
      await this.$axios
        .get(http + '/Code/GetAllCode?FcPName=' + this.FcPName + '&FSunitUstrId=' + this.FSunitUstrId + '&offset=' + offset + '&limit=' + limit, {
          headers: {
            AccessToken,
            timestamp,
            UserId: this.UserId
          }
        })
        .then(res => {
          console.log('查询所有数据')
          console.log(JSON.parse(res.data.Data))
          console.log(res)
          console.log(res.data.Data)
          const resData = JSON.parse(res.data.Data)
          this.allClassOption = resData.rows
          console.log(resData.rows)
          this.total = resData.total
          this.totalPage = Math.ceil(this.total / this.limit)
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    // 页码改变
    changePage (current, pageSize) {
      //  current 改变后的页码，pageSize 每页显示条数
      console.log('log:', current, pageSize)
      this.offset = current
      yenum1 = current
      this.selectedRowKeys = []
      this.GetTokenitem()
      this.checkAllclassOptions(this.userToken, this.timestamp, current, pageSize)
    },
    // 每页数量改变
    onShowSizeChange (current, pageSize) {
      // console.log(current, pageSize)
      this.GetTokenitem()

      this.checkAllclassOptions(this.userToken, this.timestamp, current, pageSize)

      this.limit = pageSize
      yenum1 = current
      yeOffset = pageSize
      this.totalPage = Math.ceil(this.total / this.limit)
    },
    // 新增弹窗控制
    showModal (formName) {
      // this.queryNav()
      this.visible = true
      this.GetTokenitem()
    },

    // 查询参数类型下拉框
    async checkOptionClass () {
      this.GetTokenitem()
      console.log('查询参数类型')
      if (!this.userToken) return
      await this.$axios
        .get(http + '/Code/GetSelectFcPName', {
          headers: {
            AccessToken: this.userToken,
            timestamp: this.timestamp
          }
        })
        .then(res => {
          this.classTypeOption = [...res.data.Data]
          console.log(res)
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 查询参数名下拉框
    async checkOptionClassName () {
      this.GetTokenitem()
      console.log('查询参数名称下拉框')
      await this.$axios
        .get(http + '/Code/GetSelectFcName', {
          headers: {
            AccessToken: this.userToken,
            timestamp: this.timestamp
          }
        })
        .then(res => {
          console.log(res)
          this.classTypeName = [...res.data.Data]
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // checkOptionClassSort 查询排序
    async checkOptionClassSort () {
      this.GetTokenitem()
      console.log('查询参数类型')
      await this.$axios
        .get(http + '/Code/GetFcOrder', {
          headers: {
            AccessToken: this.userToken,
            timestamp: this.timestamp
          }
        })
        .then(res => {
          console.log(res)
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    // 修改弹窗控制
    update (v) {
      // FuName: 参数名  FcPName 参数类型 FcValue 参数值   FcOrder  排序  FStId		自增ID    FcRemark备注
      console.log(v)
      this.updateinfo = true
      // this.$nextTick(() => {
      //   this.form.setFieldsValue({
      //     title: v.canshuleixing,
      //     time: v.canshuname,
      //     vu: v.canshuzhi
      //   })
      // })

      this.updateUser.FStId = v.FStId
      this.updateUser.CodeID = v.CodeId
      // this.updateUser.FcRemark = v.FcRemark
      this.$nextTick(() => {
        this.upForm.setFieldsValue({
          leixing: v.FcPName,
          time: v.FcName,
          vu: v.FcValue
        })
      })
    },
    // 修改表单验证，及发起请求
    handleSubmitUpdate (e) {
      e.preventDefault()
      this.upForm.validateFields((err, values) => {
        console.log(values)
        console.log(this.classTypeOption[values.leixing])
        if (!err) {
          if (values.leixing * 1) {
            this.updateUser.FcPName = this.classTypeOption[values.leixing - 1].FcPName
          } else {
            this.updateUser.FcPName = values.leixing
          }
          console.log('Received values of form: ', values)
          this.updateUser.FcName = values.time
          this.updateUser.FcValue = values.vu
          console.log(this.updateUser)
          this.updateClassOptions(this.updateUser)
          this.updateinfo = false
        }
      })
    },
    // 修改--发起请求方法
    async updateClassOptions (value) {
      console.log(value)
      await this.$axios
        .post(
          http +
            '/code/updatecode?FcName=' +
            this.updateUser.FcName +
            '&FcPName=' +
            this.updateUser.FcPName +
            '&FcValue=' +
            this.updateUser.FcValue +
            '&FStId=' +
            this.updateUser.FStId +
            '&CodeId=' + this.updateUser.CodeID
        )
        .then(res => {
          console.log(res)
          if (res.data.Result) {
            this.GetTokenitem()
            this.checkAllclassOptions(this.userToken, this.timestamp, this.offset, this.limit)
             this.$notification.success({
              message: '修改成功'
            })
            this.reload()
          } else {
            this.$notification.error({
              message: '修改失败'
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 删除弹窗控制
    delet (v) {
      console.log(v)
      console.log('删除')
      this.deletinfo = true
      this.number = v.xuhao
      this.removeFstid = v.FStId
    },
    deletAll () {
      if (this.selectedRow.length) {
        this.deletinfo = true
        if (this.selectedRow.length) {
          var arr = []
          this.selectedRow.forEach(item => {
            arr.push(item.FStId)
          })
          this.removeFstid = arr
        }
      }
    },
    // 确认删除
    handleOk1 (e) {
      console.log(e)
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      this.deletinfo = false
      this.confirmLoading = false
      this.deletItmes()
    },
    async deletItmes () {
      console.log(this.removeFstid)
      if (this.removeFstid * 1) {
        await this.$axios
          .post(http + '/code/codeDel?FStId=' + this.removeFstid)
          .then(res => {
            console.log(res)
            if (res.data.Result) {
              this.GetTokenitem()
              this.checkAllclassOptions(this.userToken, this.timestamp, this.offset, this.limit)
            this.$notification.success({
              message: '删除成功'
            })
            this.reload()
            } else {
              this.$notification.error({
                message: '删除失败'
              })
            }
          })
          .catch(rol => {
            console.log(rol)
          })
      } else if (this.removeFstid.length) {
        console.log(this.removeFstid.join(','))
        await this.$axios
          .post(http + '/code/codeDel?FStId=' + this.removeFstid.join(','))
          .then(res => {
            console.log(res)
            if (res.data.Result) {
            this.$notification.success({
              message: '删除成功'
            })
              this.GetTokenitem()
              this.checkAllclassOptions(this.userToken, this.timestamp, this.offset, this.limit)
              this.reload()
            } else {
              this.$notification.error({
                message: '删除失败'
              })
            }
          })
          .catch(rol => {
            console.log(rol)
          })
      }
    },

    // 查询系统目录

     queryNav () {
      this.GetTokenitem()

       this.$axios
        .get(http + '/code/Getmenuone')
        .then(res => {
          console.log(JSON.parse(res.data))
          var Clres = JSON.parse(res.data)
          Clres.forEach((item, index) => {
            if (index === 0) {
              this.sysTree = item.child
            }
          })
          // this.sysTree = Clres
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    onCheck (checkedKeys, info) {
      this.cheSysTree = checkedKeys.join(',')
      console.log(this.cheSysTree)
      console.log('onCheck', checkedKeys, info)
    },

    // select数据绑定
    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys, selectedRow) {
      console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRow)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRow = selectedRow
    },

    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.updateinfo = false
        this.deletinfo = false
        this.confirmLoading = false
      }, 2000)
    },

    handleCancel (e) {
      console.log('点击了取消')
      this.removeFstid = ''
      this.visible = false
      this.deletinfo = false
      this.updateinfo = false
    },

    //  from表单验证
    // handler
    // 新增
    handleSubmit (e) {
      e.preventDefault()
      console.log(e)
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          console.log('Received values of form: ', values)
          this.addNewclass(values)
        }
      })
    },

    // 管理新增测试
    async addNewclass (value) {
      this.GetTokenitem()
      console.log(value)
      // if (!this.cheSysTree) return this.$notification.error({ message: '请选择系统目录' })
      this.visible = false
      await this.$axios({
        url: http + '/Code/InsertCode?FcPName=' + this.classTypeOption[value.leixing - 1].FcPName + '&FcName=' + value.FcName + '&FcValue=' + value.canshuzhi + '&menustr=' + this.cheSysTree,
        method: 'post',
        headers: {
          UserId: this.UserId
        }
      }).then(res => {
          console.log(res)
          if (res.data.Result) {
            this.limit = 10
            this.offset = 1
            this.$notification.success({
              message: '新增成功'
            })
            this.reload()
          } else {
            this.$notification.error({
              message: '新增失败'
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    }
  }
}
</script>
<style scoped>
.ant-tree {
  margin-top: -260px;
}
.btn[data-v-dc210480] {
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
</style>
