<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :sm="24">
                  <a-form-item
                    label="收集人"
                    :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 17 }, sm: { span: 17 } }">
                    <a-input v-model="queryParam.id" size="large" />
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" style="height:40px" @click="mocheck">查询</a-button>
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
              <!-- <div class="div4">
                <a-col :lang="6" :md="8" :sm="24">
                  <a-button type="primary" style="height:40px">查询</a-button>
                </a-col>
              </div> -->
            </a-row>
          </a-form>
          <div style="margin-top:35px;">
            <a-button type="primary" style="height:40px" icon="plus" @click="showModal()">分派</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-tree-select
              style="margin-top: -1px ;width: 250px;float:right;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="所在地"
              allowClear
              :tree-data="options"
              @change="mocheck"
            >
            </a-tree-select>
            <!-- 任务分派弹窗 -->
            <a-modal
              cancelText="取消"
              okText="确定"
              title="任务分派"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk1"
              @cancel="handleCancel"
              width="900px"
              destroyOnClose
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item
                    label="消息发送人:"
                    :labelCol="{ lg: { span: 4 }, sm: { span: 4 } }"
                    :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                  >
                    <a-input v-decorator="['FuseEName']" disabled size="large" />
                  </a-form-item>
                  <a-form-item
                    label="收集人:"
                    :labelCol="{ lg: { span: 4 }, sm: { span: 4 } }"
                    :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                  >
                    <a-select
                      v-decorator="['FSsjrName', { rules: [{ required: true, message: '请选择' }] }]"
                      placeholder="收集人"
                      @change="handleSelectChange"
                      size="large"
                    >
                      <a-select-option v-for="item in renList" :key="item.FuName">
                        {{ item.FuName }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item
                    label="车牌号:"
                    :labelCol="{ lg: { span: 4 }, sm: { span: 4 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                  >
                    <a-row>
                      <a-col :span="5">
                        <a-select default-value="鲁U" @change="handleChange">
                          <a-select-option value="鲁U">鲁U</a-select-option>
                          <a-select-option value="鲁B">鲁B</a-select-option>
                        </a-select>
                      </a-col>
                      <a-col :span="10" style="margin-left:20px;">
                        <a-input
                          v-decorator="[
                            'carhao',
                            {
                              rules: [
                                {
                                  max: 5,
                                  min: 5,
                                  message: '请输入5位'
                                },
                                {
                                  pattern: '[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$',
                                  message: '规范输入车牌号'
                                }
                              ]
                            }
                          ]"
                          name="name"
                          placeholder="车牌号"
                          size="large"
                        />
                      </a-col>
                      <a-col :span="5">
                        <a-button type="primary" size="large" style="margin-left:20px;" @click="add">添加</a-button>
                      </a-col>
                    </a-row>
                    <a-radio-group v-model="carhaoma" @change="onChangecar" style="margin-top: 10px;width: 600px;">
                      <a-radio v-for="(item, index) in carList" :key="index" :value="item.Cord">
                        {{ item.Cord }}
                      </a-radio>
                    </a-radio-group>
                  </a-form-item>
                  <a-divider orientation="left" style="margin-top: 20px;">分派的任务</a-divider>
                  <div class="div8">
                    <!-- 任务分配 -->
                    <div>
                      <p v-for="(item, index) in taskList" :key="index" @click="dianjixuanzhong(index)">
                        {{ item.FuName }}
                      </p>
                    </div>
                    <a-icon
                      type="arrow-right"
                      :style="{ fontSize: '50px', position: 'absolute', 'margin-top': '170px' }"
                    />
                    <div>
                      <p class="qiye">
                        已选任务
                      </p>
                      <p v-for="(item, index) in taskPersonneList" :key="index">
                        {{ item.FuName }}
                        <a-icon
                          @click="delet(index)"
                          type="delete"
                          :style="{
                            fontSize: '20px',
                            position: 'relative',
                            'margin-top': '10px',
                            'margin-left': '10px'
                          }"
                        >
                        </a-icon>
                      </p>
                    </div>
                  </div>
                </a-form>
              </div>
            </a-modal>

            <!-- 修改 -->
            <a-modal
              cancelText="取消"
              okText="确定"
              title="修改"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOkDoUp"
              @cancel="handleCancel"
              width="900px"
              destroyOnClose
            >
              <div>
                <a-form @submit="handleOkDoUp" :form="upForm">
                  <a-form-item
                    label="隐藏的数据:"
                    :labelCol="{ lg: { span: 4 }, sm: { span: 4 } }"
                    :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                    style="display:none"
                  >
                    <a-input v-decorator="['FStId']" disabled size="large" />
                    <a-input v-decorator="['FSsjrID']" disabled size="large" />
                  </a-form-item>
                  <a-form-item
                    label="消息发送人:"
                    :labelCol="{ lg: { span: 4 }, sm: { span: 4 } }"
                    :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                  >
                    <a-input v-decorator="['FuseEName']" disabled size="large" />
                  </a-form-item>
                  <a-form-item
                    label="收集人:"
                    :labelCol="{ lg: { span: 4 }, sm: { span: 4 } }"
                    :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                  >
                    <a-select
                      v-decorator="['FSsjrName', { rules: [{ required: true, message: '请选择' }] }]"
                      placeholder="收集人"
                      @change="handleSelectChange"
                      :disabled="true"
                      size="large"
                    >
                      <a-select-option v-for="item in renList" :key="item.FuName">
                        {{ item.FuName }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item
                    label="车牌号:"
                    :labelCol="{ lg: { span: 4 }, sm: { span: 4 } }"
                    :wrapperCol="{ lg: { span: 20 }, sm: { span: 20 } }"
                  >
                    <a-row>
                      <a-col :span="5">
                        <a-select default-value="鲁U" @change="handleChange">
                          <a-select-option value="鲁U">鲁U</a-select-option>
                          <a-select-option value="鲁B">鲁B</a-select-option>
                        </a-select>
                      </a-col>
                      <a-col :span="10" style="margin-left:20px;">
                        <a-input
                          v-decorator="[
                            'carhao',
                            {
                              rules: [
                                {
                                  max: 5,
                                  min: 5,
                                  message: '请输入5位'
                                },
                                {
                                  pattern: '[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$',
                                  message: '规范输入车牌号'
                                }
                              ]
                            }
                          ]"
                          name="name"
                          placeholder="车牌号"
                          size="large"
                        />
                      </a-col>
                      <a-col :span="5">
                        <a-button type="primary" size="large" style="margin-left:20px;" @click="add">添加</a-button>
                      </a-col>
                    </a-row>
                    <a-radio-group v-model="carhaoma" @change="onChangecar" style="margin-top: 10px;width:600px;">
                      <a-radio v-for="(item, index) in carList" :key="index" :value="item.Cord">
                        {{ item.Cord }}
                      </a-radio>
                    </a-radio-group>
                  </a-form-item>
                  <a-divider orientation="left" style="margin-top: 20px;">分派的任务</a-divider>
                  <div class="div8">
                    <!-- 任务分配 -->
                    <div>
                      <p v-for="(item, index) in taskList" :key="index" @click="dianjixuanzhong(index)">
                        {{ item.FuName }}
                      </p>
                    </div>
                    <a-icon
                      type="arrow-right"
                      :style="{ fontSize: '50px', position: 'absolute', 'margin-top': '170px' }"
                    />
                    <div>
                      <p class="qiye">
                        已选任务
                      </p>
                      <p v-for="(item, index) in taskPersonneList" :key="index">
                        {{ item.FuName }}
                        <a-icon
                          @click="delet(index)"
                          type="delete"
                          :style="{
                            fontSize: '20px',
                            position: 'relative',
                            'margin-top': '10px',
                            'margin-left': '10px'
                          }"
                        >
                        </a-icon>
                      </p>
                    </div>
                  </div>
                </a-form>
              </div>
            </a-modal>

            <!-- 查看 -->
            <a-modal
              :footer="null"
              title="查看"
              :visible="findinfo"
              :confirm-loading="confirmLoading"
              @cancel="handleCancel"
              width="900px"
            >
              <div id="printNew">
                <template>
                  <a-card title="查看详情">
                    <a-card-grid class="cardOne" :hoverable="false">
                      收集人
                    </a-card-grid>
                    <a-card-grid style="width:25%;text-align:center" :hoverable="false">
                      {{ lists.FSsjrName }}
                    </a-card-grid>
                    <a-card-grid class="cardOne" :hoverable="false">
                      车牌号
                    </a-card-grid>
                    <a-card-grid style="width:25%;text-align:center" :hoverable="false">
                      {{ lists.FSCPH }}
                    </a-card-grid>
                    <a-card-grid class="cardOne" :hoverable="false">
                      动监站
                    </a-card-grid>
                    <a-card-grid style="width:75%;text-align:center" :hoverable="false">
                      {{ lists.FSDJZ }}
                    </a-card-grid>
                  </a-card>
                </template>
              </div>
              <a-row type="flex" justify="center" style="margin-top: 80px;">
                <a-col :span="10">
                  <a-button v-print="'#printNew'" type="primary" style="width:150px; height: 40px; margin-left: 120px;">
                    打印
                  </a-button>
                </a-col>
                <a-col :span="10">
                  <a-button type="primary" @click="fanhui()" style="width:150px; height: 40px; margin-left: 100px;">
                    返回
                  </a-button>
                </a-col>
              </a-row>

            </a-modal>

            <!-- 删除弹窗 -->
            <a-modal
              title="删除"
              cancelText="取消"
              okText="确定"
              :visible="deletinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOkToDel"
              @cancel="handleCancel"
              width="400px"
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
                    确定删除吗
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
          </div>
          <!-- 用户管理页面表格 -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="data"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a v-permission="{active: 'conadd'}" slot="action" @click="find(record)">查看&nbsp;&nbsp;</a>
              <a v-permission="{active: 'conupd'}" slot="action" @click="update(record)">修改&nbsp;&nbsp;</a>
              <a v-permission="{active: 'consele'}" slot="action" @click="deleteOne(record)">删除</a>
            </template>
          </a-table>
          <div>
            <a-pagination
              show-quick-jumper
              :default-current="offset"
              :total="total"
              show-less-items
              :current="offset"
              @change="onChange"
              style="margin: 20px"
            />
            <span
              style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
            >当前第 {{ this.offset }}/{{ Math.ceil(this.total / 10) }} 页 共 {{ this.total }} 条记录 每页 10 条</span
            >
          </div>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
// import http from '@/utils/httpapi'
import { FindAll, Findren, Finddjz, AddInfo, checkUserDjInfo, toUpInfo, UpInfo, DelInfo, checkNumberPlatesCPH } from '@/api/clrw'
import { getAdminAddress } from '@/api/AdministrativeAddress'

var yenum = 1
const columns = [
  // { title: '序号', width: 50, dataIndex: 'FStId', key: 'FStId' },
  {
    title: '序号',
    width: 80,
    align: 'center',
    dataIndex: 'FStId',
    key: 'FStId',
    customRender: (t, r, index) => {
      if (yenum === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenum - 1) * 10 + 1
      }
    }
  },
  { title: '收集人', width: 150, align: 'center', dataIndex: 'FSsjrName', key: 'FSsjrName' },
  { title: '车牌号', width: 150, align: 'center', dataIndex: 'FSCPH', key: 'FSCPH' },
  { title: '动监站', width: 200, align: 'center', dataIndex: 'FSDJZ', key: 'FSDJZ' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
// 任务List
const taskList = []
// 已选任务
const taskPersonneList = []
export default {
  name: 'BaseForm',
  inject: ['reload'],
  data () {
    return {
    printObj: {
        id: 'printNew',
        popTitle: '动物检疫（产品B）', // 文件标题
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      carList: [],
      taskPersonneList,
      taskList,
      value: 0,
      hasSelected: 'true',
      // from 表单
      form: this.$form.createForm(this),
      upForm: this.$form.createForm(this),

      // 点击 新增弹出框
      // ModalText: '请不要输入错误噢~',
      visible: false,
      danwei: false,
      confirmLoading: false,
      confirmLoading1: false,
      qiyedanwei: '',
      findinfo: false,
      updateinfo: false,
      deletinfo: false,
      fenpairw: false,
      data,
      columns,
      options: [],
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      loading: false,
      userdanwei1: '',
      number: 0,
      // 角色列表请求数据
      // 当前页
      offset: 1,
      // 每页条数
      limit: 10,
      // 总条数
      total: 0,
      rwinfo: false,
      // 搜集人员
      renList: [],
      formDate: '',
      carhaoma: '',
      // 车牌头部
      carTop: '鲁U',
      // 是否已被分派
      FSsJTf: false,
      FSsjrName: '',
      UserId: sessionStorage.getItem('FStId'),
      unitID: '',
      FSenterpriseName: sessionStorage.getItem('FSenterpriseName'),
      FSenterpriseId: sessionStorage.getItem('FSenterpriseId'),
      FuseEName: sessionStorage.getItem('FuseEName'),
      FuseEid: sessionStorage.getItem('FuseEid'),
      lists: {
          FSsjrName: '',
          FSCPH: '',
          FSDJZ: ''
      }
    }
  },
  created () {
    yenum = 1
    // 行政树
    getAdminAddress()
      .then(res => {
        // this.options = JSON.parse(res)
        this.options = res
        // this.regInfo = res[0].children
        // this.regionTF = true
      })
      .catch(err => {
        console.log(err)
      })
    var that = this
    var p = {
      limit: that.limit,
      offset: that.offset,
      FSsjrName: this.FSsjrName,
      UserId: this.UserId,
      unitID: this.unitID
    }
    FindAll(p).then(res => {
      that.data = JSON.parse(res.Data).rows
      that.total = JSON.parse(res.Data).total
    })
    // 选择人
    Findren(this.UserId).then(res => {
      this.renList = []
      console.log(res)
      if (res.Data) {
        res.Data.forEach(item => {
          if (this.renList.indexOf(item.FuName) === -1) {
            this.renList.push({ FuName: item.FuName, FStId: item.FStId })
          }
        })
      }
    })
    // 选择动监站
    Finddjz(p).then(res => {
      console.log(res)
      this.taskList = []
      if (res.Data) {
        res.Data.forEach((item, index) => {
          this.taskList.push({ FuStrId: item.FuStrId, FuName: item.FuName })
        })
      }
    })
  },
  methods: {
    mocheck (checkedValues, e) {
      console.log(checkedValues, e)
      //  if (!checkedValues.length && this.queryParam.id === '') {
      //   this.reload()
      // }
      // console.log(this.queryParam.id)
      if (!e) {
        if (this.queryParam.id) this.FSsjrName = this.queryParam.id
        if (!this.queryParam.id) this.reload()
      } else if (e.length) {
        this.options.forEach(item => {
          if (item.label === e[0]) {
            this.unitID = item.key
          } else {
            item.children.forEach(itemCh => {
              if (itemCh.label === e[0]) {
                this.unitID = itemCh.key
              } else {
                itemCh.children.forEach(itemS => {
                  if (itemS.label === e[0]) {
                    this.unitID = itemS.key
                  }
                })
              }
            })
            console.log(this.unitID)
          }
        })
      } else if (!e.length) {
        this.unitID = ''
      }

      var p = {
          limit: this.limit,
          offset: this.offset,
          FSsjrName: this.FSsjrName,
          UserId: this.UserId,
          unitID: this.unitID
        }
        // this.FSsjrName = this.queryParam.id
        this.limit = 10
        this.offset = 1
        yenum = 1
      FindAll(p).then(res => {
          this.data = JSON.parse(res.Data).rows
          this.total = JSON.parse(res.Data).total
        })
    },
    fanhui () {
      this.findinfo = false
      this.updateinfo = false
    },
    add () {
      var cph = ''
      if (this.updateinfo) {
        cph = this.upForm.getFieldValue('carhao')
      } else {
        cph = this.form.getFieldValue('carhao')
      }
      console.log(cph)
      if (/[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(cph)) {
        console.log(this.carList)
        this.carList.push({ Cord: this.carTop + cph })

        //  this.form.resetFields('carhao')
      } else {
        this.$notification.error({
          message: '请输入规范的车牌号'
        })
      }
    },
    // 删除已选任务
    delet (i) {
      this.taskPersonneList.splice(i, 1)
    },
    // 点击添加到已选
    dianjixuanzhong (i) {
      console.log(this.taskList[i])
      console.log(this.taskPersonneList)
      var p = {
        FuName: this.taskList[i].FuName,
        FuStrId: this.taskList[i].FuStrId
      }
      var indF = false
      if (this.taskPersonneList.length) {
        this.taskPersonneList.forEach((item, ind) => {
          if (item.FuName === p.FuName) {
            indF = true
          }
        })
        if (indF) {
          this.$notification.error({
            message: '该动监站已选择，请选择其他动监站'
          })
          indF = false
        } else {
          this.taskPersonneList.push(p)
        }
      } else {
        this.taskPersonneList.push(p)
      }

      // if (this.taskPersonneList.indexOf(p) === -1) {
      //   this.taskPersonneList.push(p)
      // } else {
      //   this.$notification.error({
      //     message: '该动监站已选择，请选择其他动监站'
      //   })
      // }
      // console.log(this.taskPersonneList, p)

      // if (this.taskPersonneList.indexOf(this.taskList[i]) === -1) {
      //   this.taskPersonneList.push(this.taskList[i])
      // } else {
      //   this.$notification.error({
      //     message: '该动监站已选择，请选择其他动监站'
      //   })
      // }
    },
    // 查看
    find (v) {
      this.findinfo = true
          this.lists.FSsjrName = v.FSsjrName
          this.lists.FSCPH = v.FSCPH
          this.lists.FSDJZ = v.FSDJZ
      this.$nextTick(() => {
        this.form.setFieldsValue({
          FSsjrName: v.FSsjrName,
          FSCPH: v.FSCPH,
          FSDJZ: v.FSDJZ
        })
      })
    },
    update (v) {
      // newADd
      console.log('修改前查询')
      this.carList = []
      this.taskPersonneList = []
      // this.$axios
      //     .get(http + '/Harmless/HarmlessSelect?FStId=' + v.FStId)
      var p = { FStId: v.FStId, UserId: this.UserId }
      toUpInfo(p).then(res => {
        console.log(JSON.stringify(res.Data) + '@@@')
        const that = JSON.parse(res.Data)[0]
        // 回显车牌号及已选任务
        this.carList.push({ Cord: that.FSCPH })
        var Clarry = that.FSDJZ.split(',')
        var ClarryID = that.DJZFSunitUstrId.split(',')
        if (Clarry.length !== ClarryID.length) {
          return this.$notification({
            message: '没有对应的动监站ID'
          })
        }
        ClarryID.forEach((item, index) => {
          this.taskPersonneList.push({ FuName: Clarry[index], FuStrId: item })
        })

        this.upForm
          .setFieldsValue({
            FStId: that.FStId,
            FSsjrID: that.FSsjrID,
            FuseEName: this.FuseEName,
            FSsjrName: that.FSsjrName,
            FSCPH: that.FSCPH,
            FSDJZ: that.FSDJZ,
            DJZFSunitUstrId: that.DJZFSunitUstrId
          })
          .catch(err => {
            console.log('修改前查询' + err)
          })
      })
      this.updateinfo = true
    },
    deleteOne (v) {
      console.log('删除')
      this.deletinfo = true
      this.number = v.FStId
    },
    onSearch (value) {
      console.log(value)
    },
    handleSelectChange (value) {
      console.log(value)
      this.taskPersonneList = []
      this.renList.forEach((item, index) => {
        if (item.FuName === value) {
          checkUserDjInfo(item.FStId)
            .then(res => {
              console.log(res)
              var Clres = JSON.parse(res.Data)
              if (Clres.length) {
                this.FSsJTf = true
                this.$notification.error({
                  message: '该收集人员已被分派，请选择其他人员'
                })
              } else {
                var Clarry = Clres[0].FSDJZ.split(',')
                var ClarryID = Clres[0].DJZFSunitUstrId.split(',')
                if (Clarry.length !== ClarryID.length) {
                  return this.$notification.error({
                    message: '没有对应的动监站ID'
                  })
                }
                ClarryID.forEach((item, index) => {
                  this.taskPersonneList.push({ FuName: Clarry[index], FuStrId: item })
                })
                console.log(this.taskPersonneList)
              }
              console.log(Clres)
            })
            .catch(rol => {
              console.log(rol)
            })
        }
      })
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
      yenum = checkedValues
      this.offset = checkedValues
      var p = { limit: this.limit, offset: this.offset, FSsjrName: this.FSsjrName, UserId: this.UserId }
      FindAll(p).then(res => {
        this.data = JSON.parse(res.Data).rows
        this.total = JSON.parse(res.Data).total
      })
    },
    onChangecar (checkedValues) {
      console.log('checked = ', checkedValues)
      this.carhaoma = checkedValues.target.value
      console.log(this.carhaoma)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onSelectChange1 (selectedRowKeys) {
      console.log('selectedRowKeys1 changed: ', selectedRowKeys)
      this.selectedRowKeys1 = selectedRowKeys
    },

    // 弹窗
    showModal (formName) {
      this.visible = true
      this.formDate = 'add'
      this.taskPersonneList = []
      this.getcheckNumberPlatesCPH()
      this.$nextTick(() => {
        this.form.setFieldsValue({
          FuseEName: this.FuseEName
        })
      })
    },
    // 弹窗关闭
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.findinfo = false
        this.form.resetFields()
        this.upForm.resetFields()
        this.carhaoma = ''
        this.confirmLoading = false
      }, 100)
    },
    // 弹窗关闭
    handleOk1 (e) {
      this.handleSubmit(e)
    },
    handleOkDoUp (e) {
      // 执行修改
      this.confirmLoading = true
      e.preventDefault()
      if (this.carhaoma === '') {
        this.$notification.error({
          message: '请选择车牌号'
        })
        this.confirmLoading = false
        return
      }
      this.upForm.validateFields((err, values) => {
        if (!err) {
          var aaa = ''
          var bbb = ''
          this.taskPersonneList.forEach(item => {
            if (aaa === '') {
              aaa = item.FuStrId
            } else {
              aaa = aaa + ',' + item.FuStrId
            }
            if (bbb === '') {
              bbb = item.FuName
            } else {
              bbb = bbb + ',' + item.FuName
            }
          })
          var p = {
            FStId: values.FStId,
            FSsjrID: values.FSsjrID,
            FSsjrName: values.FSsjrName,
            FSCPH: this.carhaoma,
            FSDJZ: bbb,
            DJZFSunitUstrId: aaa,
            UserId: this.UserId
          }
          console.log(JSON.stringify(p) + '>>修改的数据')
          // this.$axios
          //   .post(http + '/Harmless/HarmlessUp?FStId=' + p.FStId, p)
          UpInfo(p)
            .then(res => {
              console.log('修改成功' + JSON.stringify(res))
              setTimeout(() => {
                this.$notification.success({
                  message: '修改成功'
                })
              }, 100)
              this.reload()
            })
            .catch(err => {
              console.log('修改失败' + err)
            })
          this.updateinfo = false
          this.confirmLoading = false
          this.DJZFSunitUstrId = ''
          this.upForm.resetFields()
        }
      })
    },
    handleOkToDel () {
      // 执行删除
      this.confirmLoading = true
      setTimeout(() => {
        // this.$axios
        //   .post(http + '/Harmless/HarmlessDel?FStId=' + this.number)
        var p = { FStId: this.number, UserId: this.UserId }
        DelInfo(p)
          .then(res => {
            console.log('删除成功' + res)
            setTimeout(() => {
              this.$notification.success({
                message: '删除成功'
              })
            }, 100)
            this.reload()
          })
          .catch(err => {
            console.log('删除失败' + err)
          })
        this.deletinfo = false
        this.confirmLoading = false
        this.form.resetFields()
      }, 100)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.findinfo = false
      this.updateinfo = false
      this.deletinfo = false
      this.FSsJTf = false
      this.carhaoma = ''
      this.form.resetFields()
      this.upForm.resetFields()
    },
    // 车牌加载
    getcheckNumberPlatesCPH () {
      checkNumberPlatesCPH(sessionStorage.getItem('FuseEid')).then(res => {
        console.log(res)
        if (res.Result) {
          this.carList = res.Data
        }
      }).catch(rol => {
        console.log(rol)
      })
    },
    //  from表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      if (this.carhaoma === '') {
        this.$notification.error({
          message: '选择车牌号'
        })
      } else if (this.FSsJTf) {
        this.$notification.error({
          message: '该收集人员已被分派，请选择其他收集人员'
        })
      } else {
        this.form.validateFields((err, values) => {
          console.log(values)
          console.log(err)

          if (!err) {
            if (this.formDate === 'add') {
              var aaa = ''
              var bbb = ''
              this.taskPersonneList.forEach(item => {
                if (aaa === '') {
                  aaa = item.FuStrId
                } else {
                  aaa = aaa + ',' + item.FuStrId
                }
                if (bbb === '') {
                  bbb = item.FuName
                } else {
                  bbb = bbb + ',' + item.FuName
                }
              })
              console.log(aaa, bbb)
              // var FSenterpriseId = JSON.parse(localStorage.getItem('AllInfo'))
              var p = {
                FuseEid: this.FuseEid,
                FuseEName: values.FuseEName,
                FSsjrID: 1,
                FSsjrName: values.FSsjrName,
                FSCPH: this.carhaoma,
                FSDJZ: bbb,
                DJZFSunitUstrId: aaa,
                UserId: this.UserId
              }

              this.renList.forEach(item => {
                if (item.FuName === values.FSsjrName) {
                  p.FSsjrID = item.FStId
                }
              })
              console.log(p)
              AddInfo(p)
                .then(res => {
                  console.log(res)
                  if (res.Result) {
                    this.confirmLoading = true
                    setTimeout(() => {
                      this.visible = false
                      this.carhaoma = ''
                      this.confirmLoading = false
                      this.FSsJTf = false
                      this.$notification.success({
                        message: '分派成功'
                      })
                      this.reload()
                    }, 100)
                  } else {
                    this.$notification.error({
                      message: '分派失败，请联系管理人员'
                    })
                  }
                })
                .catch(rol => {
                  this.$notification.error({
                    message: '分派失败，请联系管理人员'
                  })
                })
            }
            console.log('Received values of form: ', values)
          } else {
            this.$notification.error({
              message: '请检查输入信息'
            })
          }
        })
      }
    },
    // 车牌下拉框
    handleChange (reskey, res) {
      console.log(reskey, res)
      this.carTop = reskey
    }
  }
}
</script>
<style scoped>
.cardOne{
  width:25%;
  text-align:center;
  background-color:#7aa7d0;
}
.ant-card-grid{
  height: 65px;
}
.tab div {
  height: 40px;
  border: black 1px solid;
  line-height: 38px;
  text-align: center;
  margin: -1px;
}
.tab input {
  background-color: white;
  border: none;
}
.tab p {
  background-color: wheat;
}
.btn[data-v-5e6caa37] {
  width: 129% !important;
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
.div8 div {
  display: inline-block;
  width: 300px;
  height: 400px;
  box-shadow: 5px 5px 5px #888888;
  margin-left: 80px;
  overflow-y: scroll;
}
.div8 div p {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 0px;
}
.qiye {
  color: rgba(255, 0, 0, 0.63);
}
.div8 div p:hover {
  background-color: rgba(0, 255, 255, 0.13);
}
</style>
