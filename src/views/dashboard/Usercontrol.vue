<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;" @submit="handleSubmit" :form="form">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="6" :sm="12">
                  <a-form-item
                    label="用户姓名"
                    :labelCol="{ lg: { span: 9 }, sm: { span: 10 } }"
                    :wrapperCol="{ lg: { span: 15 }, sm: { span: 14 } }">
                    <a-input
                      @blur="mocheck"
                      v-decorator="['FuNames']"
                      placeholder="姓名"
                      size="large"
                      style="width: 100%"
                    />
                  </a-form-item>
                </a-col>
                <a-col :md="4" :sm="10">
                  <a-select @change="selectShow" default-value="已启用">
                    <a-select-option value="已启用">
                      已启用
                    </a-select-option>
                    <a-select-option value="已注销">
                      已注销
                    </a-select-option>
                  </a-select>
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
                    <a-date-picker
                      v-model="queryParam.date"
                      style="width: 100%"
                      placeholder="请输入更新日期"
                      :defaultValue="moment(getCurrentData(), 'YYYY-MM-DD')"
                      :showToday="false"
                    />
                  </a-form-item>
                </a-col>

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
                    <a-button v-permission="{active:'mansele'}" type="primary" html-type="submit" style="height:40px" >查询</a-button>
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
            <!-- 新增用户 -->
            <a-button v-permission="{active:'manadd'}" type="primary" style="height:40px" icon="plus" @click="showModal()">新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-modal
              :footer="null"
              title="管理新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="800px"
              :destroyOnClose="true"
            >
              <!-- <p>{{ ModalText }}</p> -->

              <a-form @submit="handleSubmit" :form="addForm">
                <a-form-item
                  label="用户账号"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    v-decorator="['FuAccount', { rules: [{ required: true, message: '请输入账号' }] }]"
                    name="FuAccount"
                    placeholder="用户账号"
                  />
                </a-form-item>
                <a-form-item
                  label="用户姓名"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    v-decorator="['FuName', { rules: [{ required: true, message: '请输入姓名' }] }]"
                    name="FuName"
                    placeholder="用户姓名"
                  />
                </a-form-item>
                <a-form-item
                  label="用户单位"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    v-decorator="['FuseEName', { rules: [{ required: true, message: '请选择所在单位' }] }]"
                    name="FuseEName"
                    placeholder="用户单位"
                    disabled
                  />
                  <a-button @click="userdanwei" style="position: absolute; margin: 3px 10px">
                    选择
                  </a-button>
                </a-form-item>
                <a-form-item
                  label="用户角色"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-select
                    v-decorator="['FrName', { rules: [{ required: true, message: '请选择角色' }] }]"
                    name="FrName"
                    placeholder="用户角色"
                    @change="handleSelectChangeAdd"
                  >
                    <a-select-option v-for="item in UnitTypes" :key="item.FStId">
                      {{ item.FrName ? item.FrName : '' }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  label="用户密码"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input-password

                    v-decorator="[
                      'FuPassWord',
                      {
                        rules: [
                          {
                            required: true,
                            message: '请输入密码'
                          },
                          {
                            pattern: /^(?![^A-z]+$)(?!\D+$)[A-z\d]{8,16}$/,
                            message: '密码必须是8-16为数字加字母组成'
                          }
                        ]
                      }
                    ]"
                    name="FuPassWord"
                    type="password"
                    placeholder="用户密码"
                  />
                </a-form-item>
                <a-form-item
                  label="用户类型"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-select
                    v-decorator="['FuQuanXian', { rules: [{ required: true, message: '请选择用户类型' }] }]"
                    placeholder="用户类型"
                    @change="handleSelectChange"
                  >
                    <a-select-option value="信息员">
                      信息员
                    </a-select-option>
                    <a-select-option value="信息管理员">
                      信息管理员
                    </a-select-option>
                    <a-select-option value="基层信息管理员">
                      基层信息管理员
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                  <a-button type="primary" html-type="submit" style="width:315px; height: 40px;">
                    确认
                  </a-button>
                </a-form-item>
              </a-form>
            </a-modal>
            <!-- 修改弹窗 -->
            <a-modal
              title="修改"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="600px"
              :destroyOnClose="true"
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <!-- 用户账号 -->
                  <a-form-item
                    style="display: none"
                    label="id"
                    :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-input v-decorator="['FStId']" name="FStId" placeholder="id" />
                  </a-form-item>
                  <a-form-item
                    label="用户账号"
                    :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-input
                      v-decorator="['FuAccount', { rules: [{ required: true, message: '请输入账号' }] }]"
                      name="FuAccount"
                      placeholder="用户账号"
                    />
                  </a-form-item>
                  <!-- 用户姓名 -->
                  <a-form-item
                    label="用户姓名"
                    :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-input
                      v-decorator="['FuName', { rules: [{ required: true, message: '请输入姓名' }] }]"
                      name="FuName"
                      placeholder="用户姓名"
                    />
                  </a-form-item>
                  <!-- 用户单位 只读-->
                  <a-form-item
                    label="用户单位"
                    :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-input v-decorator="['FuseEName']" name="FuseEName" placeholder="用户单位" disabled />
                  </a-form-item>
                  <!-- 用户角色 -->
                  <a-form-item
                    label="用户角色"
                    :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-select
                      name="FrName"
                      v-decorator="['FrName', { rules: [{ required: true, message: '请选择角色' }] }]"
                      placeholder="用户角色"
                      @change="handleSelectChange"
                    >
                      <a-select-option v-for="item in UnitTypes" :key="item.FStId">{{ item.FrName }}</a-select-option>
                    </a-select>
                  </a-form-item>
                  <!-- 用户密码 -->
                  <a-form-item
                    label="用户密码"
                    :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"

                  >
                    <a-input-password
                      v-decorator="[
                        'FuPassWord',
                        {
                          rules: [
                            {
                              required: true,
                              message: '请输入密码'
                            },
                            {
                              pattern: /^(?![^A-z]+$)(?!\D+$)[A-z\d]{8,16}$/,
                              message: '密码必须是8-16为数字加字母组成'
                            }
                          ]
                        }
                      ]"
                      name="FuPassWord"
                      type="password"
                      placeholder="用户密码"
                    />
                  </a-form-item>
                  <!-- 用户类型 -->
                  <a-form-item
                    label="用户类型"
                    :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-select
                      v-decorator="['FuQuanXian', { rules: [{ required: true, message: '请选择类型' }] }]"
                      placeholder="用户类型"
                      name="FuQuanXian"
                      @change="handleSelectChange"
                    >
                      <a-select-option value="信息员">
                        信息员
                      </a-select-option>
                      <a-select-option value="信息管理员">
                        信息管理员
                      </a-select-option>
                      <a-select-option value="基层信息管理员">
                        基层信息管理员
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
                    <a-button type="primary" html-type="submit" style="width:230px; height: 40px;">
                      确认
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
            <!-- 选择单位弹窗 -->
            <a-modal
              title="选择单位"
              :visible="danwei"
              :confirm-loading="confirmLoading1"
              @ok="handleOk1"
              @cancel="handleCancel1"
              width="800px"
              style="top: 100px"
              :destroyOnClose="true"
            >
              <div>
                <!-- input下拉列表 -->
                <a-row>
                  <a-col :span="12">
                    <!-- 单位类型下拉 -->
                    <a-select
                      v-decorator="[
                        'FuseEName',
                        { rules: [{ required: true, message: 'Please select your gender!' }] }

                      ]"
                      placeholder="类型"
                      @change="handleSelectChange1"
                      size="large"
                      style="width: 280px"
                    >
                      <a-select-option v-for="item in data1" :key="item.FSQuFenName">
                        {{ item.FSQuFenName }}
                      </a-select-option>
                    </a-select>
                  </a-col>
                  <a-col :span="12">
                    <!-- 单位名称 -->
                    <a-input-search placeholder="请输入企业名称" enter-button="搜索" size="large" @search="onSearch" />
                  </a-col>
                </a-row>
                <!-- 用户管理新增功能里企业单位选择数据表格 -->
                <a-table
                  :columns="columns1"
                  :data-source="AddCheData"
                  :pagination="false"
                  :rowSelection="{
                    selectedRowKeys: selectedRowKeys1,
                    onChange: onSelectChange1,
                    onSelect: onSelect1,
                    type: 'radio'
                  }"
                >
                  <a slot="name" slot-scope="text">{{ text }}</a>
                  <span slot="customTitle"><a-icon type="smile-o" /> 姓名</span>
                </a-table>
                <a-pagination
                  show-quick-jumper
                  :default-current="offset"
                  :current="offset"
                  :total="DWtotal"
                  show-less-items
                  @change="onChangeDw"
                  style="margin: 10px"
                />
              </div>
            </a-modal>
            <!-- 删除弹窗 -->
            <a-modal
              title="删除"
              cancelText="取消"
              okText="确定"
              :visible="deletinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk2"
              @cancel="handleCancel"
              width="400px"
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
                    确定删除该账户
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
            <!-- 禁用弹窗 -->
            <a-modal
              cancelText="取消"
              okText="确定"
              :title="FuLogoff"
              :visible="jinyong"
              :confirm-loading="confirmLoading"
              @ok="handleOkDis"
              @cancel="handleCancel"
              width="400px"
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
                    {{ this.FuLogoff === '已启用' ? '确定注销该账号' : '确定启用该账号' }}
                  </a-form-item>
                  <!-- 隐藏input -->
                  <a-form-item
                    :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-input type="hidden" v-decorator="['jinyong']" name="" />
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
            <a-button v-permission="{active:'mandele'}" type="primary" style="height:40px" @click="DeleteByFStId">批量删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px" @click="UpdateByFStId">密码重置</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <a-button type="primary" style="height:40px">导出</a-button>&nbsp;&nbsp;&nbsp;&nbsp; -->
            <!-- <a-button type="primary" style="height:40px">列表定制</a-button> -->
            <!-- 地址选择 -->
            <!-- <a-cascader
              style="margin-top: -1px ;width: 250px;float:right;"
              :options="options"
              placeholder="所在地"
              size="large"
              @change="mocheck"
            >
              <a-icon
                slot="suffixIcon"
                type="environment"
                class="test"
                :style="{ fontSize: '26px', 'margin-top': '-11px', 'margin-right': '8px' }"
              />
            </a-cascader> -->
            <a-tree-select
              style="margin-top: -1px ;width: 250px;float:right;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="所在地"
              :tree-data="options"
              @change="mocheck"
            >
            </a-tree-select>
          </div>
          <!-- 用户管理页面表格 -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="data"

            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <!-- <span style="margin-left: 8px">
              <template v-if="hasSelected">
                {{ `Selected ${selectedRowKeys.length} items` }}
              </template>
            </span> -->
            <template slot="action" slot-scope="text, record">
              <a slot="action" v-permission="{active:'manupd'}" @click="update(record)">修改&nbsp;&nbsp;</a>
              <!-- <a slot="action" @click="delet(record)">删除&nbsp;&nbsp;</a> -->
              <a slot="action" @click="jinyonguser(record)">启用/注销&nbsp;&nbsp;</a>
            </template>
          </a-table>
          <div>
            <a-pagination
              show-quick-jumper
              :default-current="offset"
              :total="totalnum"
              show-less-items
              @change="onChange"
              :current="offset"
              style="margin: 10px"
            />
            <span
              style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
            >当前第 {{ this.yenum }}/{{ Math.ceil(this.totalnum / 10) }} 页 共 {{ this.totalnum }} 条记录 每页 10
              条</span
            >
          </div>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
// 接口请求调用
import {
  findAllUser,
  FinfByName,
  DeleteUser,
  ReplaceUserPassword,
  checkUserPole,
  FindUserDanWei,
  DISUserPole,
  checkCondit,
  AddUser
} from '@/api/usercontrol'
import { GetToken } from '@/api/getToken'
import http from '@/utils/httpapi'
import Qs from 'qs'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import moment from 'moment'

import vPinyin from '@/utils/vue-py'
// 当前页
var yenum1 = 1
var yenum2 = 1

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
  { title: '行政名称', width: 200, align: 'center', dataIndex: 'FSunitName', key: 'FSunitName' },
  { title: '用户账号', width: 200, align: 'center', dataIndex: 'FuAccount', key: 'FuAccount' },
  { title: '用户角色', width: 200, align: 'center', dataIndex: 'FrName', key: 'FrName' },
  { title: '用户单位', width: 220, align: 'center', dataIndex: 'FuseEName', key: 'FuseEName' },
  { title: '用户姓名', width: 200, align: 'center', dataIndex: 'FuName', key: 'FuName' },
  // { title: '性别', width: 100, dataIndex: 'sex', key: 'sex' },
  // { title: '电话', width: 180, dataIndex: 'FuPhone', key: 'FuPhone' },  暂时隐藏
  // { title: '用户类型', width: 200, dataIndex: 'leixing', key: 'leixing' },
  // { title: '手机APP用户角色', width: 200, dataIndex: 'phoneappuserjuese', key: 'phoneappuserjuese' },
  { title: '状态', width: 100, align: 'center', dataIndex: 'FuLogoff', key: 'FuLogoff' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 250,
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
const columns1 = [
  {
    title: '序号',
    width: 100,
    dataIndex: 'FSunitId',
    key: 'FSunitId',
    customRender: (t, r, index) => {
      if (yenum2 === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenum2 - 1) * 10 + 1
      }
    }
  },
  { title: '行政名称', width: 300, dataIndex: 'FSunitName', key: 'FSunitName' },
  { title: '企业单位', width: 300, dataIndex: 'FSeName', key: 'FSeName' },
  { title: '单位类型', width: 300, dataIndex: 'FSQuFenName', key: 'FSQuFenName' }
]

const data1 = []

export default {
  inject: ['reload'],
  name: 'BaseForm',
  data () {
    return {
      lx: '',
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

      options: [],
      queryParam: { status: 0, status1: 0 },
      value: '',
      hasSelected: 'true',
      fromdata: '',

      // from 表单
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      addForm: this.$form.createForm(this),

      // 点击 新增弹出框
      // // ModalText: '请不要输入错误噢~',
      visible: false,
      updateinfo: false,
      danwei: false,
      confirmLoading: false,
      confirmLoading1: false,
      deletinfo: false,
      jinyong: false,
      qiyedanwei: '',
      data,
      columns,
      data1,
      columns1,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      loading: false,
      userdanwei1: '',
      number: 0,
      allFStid: [],
      // token
      userToken: '',
      // 时间戳
      timestamp: new Date().valueOf(),
      // 用户角色单位
      UnitTypes: [],
      // 用户角色id
      poleID: '',
      // 单位名称id
      FuseEiditem: '',
      // 新增选择的单位数据
      AddCheData: [],

      // 是否禁用
      FuLogoff: '',
      // 搜索请求
      checkeHe: {
        FSQuFenName: '',
        FSeName: ''
      },
      // 选中的单位信息
      checkIfno: {},
      // 角色id
      FrId: 0,
      // 角色名
      FrName: '',
      UserId: sessionStorage.getItem('FStId'),
      FuName: '',
      FSunitUstrId: sessionStorage.getItem('FSunitUstrId'),
      // 请求headers
      headData: {
        AccessToken: '',
        timestamp: '',
        UserId: sessionStorage.getItem('FStId')
      },
      fuDWType: '',
      FSztInfo: '已启用'
    }
  },
  created () {
    yenum1 = 1
    yenum2 = 1
    // 行政树
    getAdminAddress()
      .then(res => {
        // var Clres = JSON.parse(res)
        this.options = res
      })
      .catch(rol => {
        console.log(rol)
      })

    GetToken()
      .then(res => {
        var that = this
        var p = {
          token: res.access_token,
          timestamp: that.timestamp,
          offset: that.yenum,
          limit: that.limit,
          FSunitUstrId: this.FSunitUstrId,
          FuName: this.FuName,
          UserId: this.UserId,
          FSzt: this.FSztInfo
        }
        // 查询所有用户
        findAllUser(p)
          .then(res => {
            console.log(res)
            if (res.Result) {
              var datalist = JSON.parse(res.Data)
              this.data = datalist.rows
              this.totalnum = datalist.total
            } else {
              this.$notification.error('未查询到用户')
            }
          })
          .catch(err => {
            console.log('用户管理 失败' + err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    selectShow (v) {
      console.log(v)
      yenum1 = 1
    yenum2 = 1
      this.FSztInfo = v
      this.offset = 1

      this.onChange(this.offset)
    },
    moment,
    mocheck (checkedValues, e) {
      console.log(checkedValues, e, this.form.getFieldValue('FuNames'))
      if (!checkedValues.length && !this.form.getFieldValue('FuNames')) {
        this.reload()
      }
      if (!e) {
        this.FuName = this.form.getFieldValue('FuNames')
      } else if (e.length) {
        this.options.forEach(item => {
          if (item.label === e[0]) {
            this.FSunitUstrId = item.key
          } else {
            item.children.forEach(itemCh => {
              if (itemCh.label === e[0]) {
                this.FSunitUstrId = itemCh.key
              } else {
                itemCh.children.forEach(itemS => {
                  if (itemS.label === e[0]) {
                    this.FSunitUstrId = itemS.key
                  }
                })
              }
            })
          }
        })
      }
      this.limit = 10
      this.offset = 1
      yenum1 = 1
      yenum2 = 1
      this.onChange(this.offset)
    },
    getCurrentData () {
      return new Date().toLocaleDateString()
    },
    // token获取
    GetTokenItem () {
      GetToken()
        .then(res => {
          this.userToken = res.access_token
          this.timestamp = new Date().valueOf()
          this.headData.AccessToken = this.userToken
          this.headData.timestamp = this.timestamp
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 单位信息查询
    checkD (val) {
      this.GetTokenItem()
      var parameter = {
        AccessToken: this.userToken,
        timestamp: this.timestamp,
        offset: this.offset,
        limit: this.limit,
        FSQuFenName: this.checkeHe.FSQuFenName,
        FSeName: this.checkeHe.FSeName,
        UserId: this.UserId
      }
      checkCondit(parameter)
        .then(res => {
          console.log(res)
          var Clres = JSON.parse(res.Data)
          console.log(Clres)
          this.AddCheData = Clres.rows
          console.log(this.AddCheData)
          this.checkeHe.FSQuFenName = this.AddCheData[0]
          this.DWtotal = Clres.total
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    // 用户类型条件查询
    onSearch (value) {
      console.log(value)
      this.checkeHe.FSeName = value
      var parameter = {
        AccessToken: this.userToken,
        timestamp: this.timestamp,
        offset: this.offset,
        limit: this.limit,
        FSQuFenName: this.checkeHe.FSQuFenName,
        FSeName: this.checkeHe.FSeName,
        UserId: this.UserId
      }
      checkCondit(parameter)
        .then(res => {
          console.log(res)
          var Clres = JSON.parse(res.Data)
          console.log(Clres)
          this.AddCheData = Clres.rows
          this.DWtotal = Clres.total
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 用户按条件查询
    findByinfo () {
      console.log('用户按条件查询')
      this.fromdata = 'findbyinfo'
    },
    // 批量删除
    DeleteByFStId () {
      if (this.allFStid.length > 0) {
        this.allFStid.forEach(item => {
          this.data = this.data.filter(item1 => parseInt(item1.FStId) !== item)
        })
        this.selectedRowKeys = []
        GetToken().then(res => {
          var timestamp = new Date().valueOf()
          var p = {
            FStId: this.allFStid,
            timestamp: timestamp,
            token: res.access_token
          }
          DeleteUser(p).then(res => {
            setTimeout(() => {
              this.$notification.success({
                message: '批量删除成功'
              })
            }, 100)
            yenum1 = 1
            yenum2 = 1
            this.reload()
          })
        })
      } else {
        alert('请选择要删除的数据')
      }
    },
    // 密码重置
    UpdateByFStId () {
      if (this.allFStid.length > 0) {
        GetToken().then(res => {
          var timestamp = new Date().valueOf()
          var p = {
            FStId: this.allFStid,
            timestamp: timestamp,
            token: res.access_token
          }
          ReplaceUserPassword(p).then(res => {
            setTimeout(() => {
              this.$notification.success({
                message: '密码重置成功'
              })
            }, 100)
            this.reload()
          })
        })
      } else {
        alert('请选择要重置的数据')
      }
    },
    jinyonguser (v) {
      console.log('注销')
      console.log(v)
      this.FuLogoff = v.FuLogoff
      this.headData.FStId = v.FStId
      console.log('执行了赋值')
      if (v.FuLogoff === '已启用') {
        this.headData.FuLogoff = '已注销'
      } else {
        this.headData.FuLogoff = '已启用'
      }
      this.jinyong = true
    },
    // 注销请求
    handleOkDis () {
      this.GetTokenItem()
      DISUserPole(this.headData)
        .then(res => {
          console.log(res)
          if (res.Result) {
            this.jinyong = false
            if (this.headData.FuLogoff === '已启用') {
              this.$notification.success({
                message: '启用成功'
              })
            } else {
              this.$notification.success({
                message: '注销成功'
              })
            }
            this.reload()
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    delet (v) {
      console.log('删除')
      this.deletinfo = true
      this.number = v.FStId
      // console.log(this.number)
    },
    // 单位选择方法
    onSelect1 (record, selected, selectedRows, nativeEvent) {
      console.log('点击表格列表触发')
      console.log(record)
      // this.selectedRowKeys1 = selectedRows
      // 关闭弹窗
      this.danwei = false
      this.checkIfno = record
      // 给对应的表单元素赋值
      this.$nextTick(() => {
        this.addForm.setFieldsValue({
          FuseEName: record.FSeName
        })
      })
    },
    // 查询单位信息
    userdanwei () {
      this.danwei = true
      this.GetTokenItem()
      // 用户单位查询
      FindUserDanWei(this.headData)
        .then(res => {
          if (res.Result) {
            this.data1 = res.Data
            this.checkeHe.FSQuFenName = res.Data[0].FSQuFenName
            this.checkD()
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 修改
    update (v) {
      console.log(v)
      this.fromdata = 'update'
      console.log('修改')
      this.updateinfo = true

      console.log(this.updateinfo)

      var p = {
        AccessToken: '',
        timestamp: '',
        UserId: this.UserId
      }
      this.GetTokenItem()
      p.AccessToken = this.userToken
      p.timestamp = this.timestamp
      checkUserPole(p)
        .then(res => {
          console.log(res)
          this.UnitTypes = [...res.Data]
        })
        .catch(rol => {
          console.log(rol)
        })
      this.$axios
        .get(http + '/User/GetUserSelectUp?FStId=' + v.FStId, {
          headers: {
            AccessToken: this.userToken,
            timestamp: this.timestamp
          }
        })
        .then(res => {
          console.log('要修改的数据')
          console.log(res)
          this.number = res.data.Data[0].FStId
          this.FuseEiditem = res.data.Data[0].FuseEid
          this.FrName = res.data.Data[0].FrName
          this.poleID = res.data.Data[0].FrId
          // this.fuDWType = res.data.Data[0].fuDWType
          this.$nextTick(() => {
            res.data.Data.forEach((item, index) => {
              if (index === 0) {
                this.form.setFieldsValue({
                  FuAccount: item.FuAccount,
                  FuName: item.FuName,
                  FuseEName: item.FuseEName,
                  FuPassitemWord: item.FuPassitemWord,
                  FrName: item.FrName,
                  FuPassWord: item.FuPassWord,
                  FuQuanXian: item.FuQuanXian
                })
              }
            })
          })
        })
        .catch(err => {
          console.log(err)
        })
    },

    handleSelectChange (value) {
      console.log(value)
      this.UnitTypes.forEach(item => {
        // console.log(item)
        if (item.FStId === value) {
          console.log(item)
          this.poleID = item.FStId
          this.FrName = item.FrName
        }
      })
      this.$nextTick(() => {
        this.form.setFieldsValue({
          note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
        })
      })
    },
    // 用户角色新增下拉选择
    handleSelectChangeAdd (val) {
      this.UnitTypes.forEach(item => {
        if (item.FStId === val) {
          this.FrName = item.FrName
          this.FrId = item.FStId
        }
      })
      console.log(this.FrName, this.FrId)
    },
    // 通过类型查找单位信息
    handleSelectChange1 (value) {
      this.selectedRowKeys1 = []
      console.log(value)
      this.lx = value
      this.checkeHe.FSQuFenName = value
      this.offset = 1
      var parameter = {
        AccessToken: this.userToken,
        timestamp: this.timestamp,
        offset: this.offset,
        limit: this.limit,
        FSQuFenName: this.checkeHe.FSQuFenName,
        FSeName: this.checkeHe.FSeName,
        UserId: this.UserId
      }
      checkCondit(parameter)
        .then(res => {
          console.log(res)
          yenum1 = 1
          yenum2 = 1
          var Clres = JSON.parse(res.Data)
          console.log(Clres)
          this.AddCheData = Clres.rows
          this.DWtotal = Clres.total
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
      yenum2 = checkedValues
      GetToken()
        .then(res => {
          var that = this
          var p = {
            token: res.access_token,
            timestamp: that.timestamp,
            offset: that.yenum,
            limit: that.limit,
            FSunitUstrId: this.FSunitUstrId,
            FuName: this.FuName,
            UserId: this.UserId,
            FSzt: this.FSztInfo
          }
          findAllUser(p)
            .then(res => {
              // console.log('用户管理' + JSON.stringify(res))
              var datalist = JSON.parse(res.Data)
              that.data = datalist.rows
              this.totalnum = datalist.total
            })
            .catch(err => {
              console.log('用户管理 失败' + err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 分页数据
    onChangeDw (current, pageSize) {
      console.log(current, pageSize)
      this.limit = pageSize
      this.offset = current
      yenum2 = current
      this.GetTokenItem()
      var parameter = {
        AccessToken: this.userToken,
        timestamp: this.timestamp,
        offset: this.offset,
        limit: this.limit,
        FSQuFenName: this.checkeHe.FSQuFenName,
        FSeName: this.checkeHe.FSeName,
        UserId: this.UserId
      }
      checkCondit(parameter)
        .then(res => {
          this.selectedRowKeys1 = []

          console.log(res)
          var Clres = JSON.parse(res.Data)
          console.log(Clres)
          this.AddCheData = Clres.rows
          this.DWtotal = Clres.total
        })
        .catch(rol => {
          console.log(rol)
        })
      // this.onSearch()
    },

    toggleAdvanced () {
      this.advanced = !this.advanced
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
    onSelectChange1 (selectedRowKeys, rowel) {
      console.log('selectedRowKeys1 changed: ', selectedRowKeys, rowel)
      this.fuDWType = ''
      if (rowel[0].FSQuFenName !== '') {
       var clpy = rowel[0].FSQuFenName.split('')
       for (var i = 0; i < clpy.length; i++) {
         this.fuDWType += vPinyin.chineseToPinYin(clpy[i])
       }
      }

      this.fuDWType = this.fuDWType.toLowerCase()
      console.log(this.fuDWType)
      this.$nextTick(() => {
        this.addForm.setFieldsValue({
          FuseEName: rowel[0].FuseEName
        })
      })
      this.selectedRowKeys1 = selectedRowKeys
    },

    // 弹窗
    showModal (formName) {
      this.fromdata = 'add'
      this.visible = true
      this.GetTokenItem()
      // 用户角色查询
      checkUserPole(this.headData)
        .then(res => {
          console.log('用户单位')
          console.log(res)
          this.UnitTypes = [...res.Data]
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 弹窗关闭
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.updateinfo = false
        this.deletinfo = false
        this.jinyong = false
        this.confirmLoading = false
        this.userdanwei1 = ''
        this.form.resetFields()
        this.selectedRowKeys1 = []
        // 给对应的表单元素赋值
        this.form.setFieldsValue({
          FuseEName: this.userdanwei1
        })
      }, 100)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.updateinfo = false
      this.deletinfo = false
      this.jinyong = false
      this.userdanwei1 = ''
      this.fuDWType = ''
      this.selectedRowKeys1 = []
      // 给对应的表单元素赋值
      this.form.setFieldsValue({
        FuseEName: this.userdanwei1
      })
      this.form.resetFields()
    },
    handleOk1 (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading1 = true
      setTimeout(() => {
        this.danwei = false
        this.confirmLoading1 = false
        this.form.resetFields()
      }, 100)
    },
    handleCancel1 (e) {
      console.log('点击了取消')
      this.checkeHe.FSQuFenName = ''
      this.checkeHe.FSeName = ''
      this.danwei = false
    },
    handleOk2 () {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.data = this.data.filter(item => parseInt(item.FStId) !== this.number)
        GetToken().then(res => {
          var timestamp = new Date().valueOf()
          var p = {
            FStId: this.number,
            timestamp: timestamp,
            token: res.access_token
          }
          DeleteUser(p).then(res => {
            setTimeout(() => {
              this.$notification.success({
                message: '删除成功'
              })
            }, 100)
            yenum1 = 1
            yenum2 = 1
            this.reload()
          })
          this.deletinfo = false
          this.confirmLoading = false
        })
      }, 100)
    },

    //  新增from表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      if (this.fromdata === 'update') {
        this.$nextTick(() => {
          this.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
              var data = {
                FStId: this.number,
                FuAccount: values.FuAccount,
                FuName: values.FuName,
                FuseEid: this.FuseEiditem,
                FuseEName: values.FuseEName,
                FrId: this.poleID,
                FrName: this.FrName,
                FuPassWord: values.FuPassWord,
                FuQuanXian: values.FuQuanXian
              }
              var that = this
              GetToken().then(res => {
                this.$axios
                  .post(http + '/User/PutUserUp', Qs.stringify(data), {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      AccessToken: res.access_token,
                      timestamp: that.timestamp
                    }
                  })
                  .then(res => {
                    this.updateinfo = false
                    setTimeout(() => {
                      this.$notification.success({
                        message: '修改成功'
                        // description: `${timeFix()}，欢迎回来`
                      })
                    }, 100)
                    this.reload()
                  })
                  .catch(() => {
                    this.$notification.error({
                      message: '修改失败，请检查输入'
                    })
                  })
              })
              console.log(values)
              this.form.resetFields()
            }
          })
        })
      } else if (this.fromdata === 'add') {
            console.log('新增用户信息')
            console.log(this.checkIfno)
              this.GetTokenItem()
              var parameter = {
                FuAccount: this.addForm.getFieldValue('FuAccount'),
                FuName: this.addForm.getFieldValue('FuName'),
                FSunitName: this.checkIfno.FSunitName,
                FSunitUstrId: this.checkIfno.FSunitUstrId,
                FSunitId: this.checkIfno.FSunitId,
                FrId: this.FrId,
                FrName: this.FrName,
                FuPassWord: this.addForm.getFieldValue('FuPassWord'),
                FuQuanXian: this.addForm.getFieldValue('FuQuanXian'),
                FuPhone: '',
                FuSex: '',
                FuseEid: this.checkIfno.FSenterpriseId,
                FuseEName: this.checkIfno.FSeName,
                fuDWType: this.fuDWType
              }
              var queryInfo = {
                AccessToken: this.userToken,
                timestamp: this.timestamp,
                UserId: this.UserId
              }
              console.log(queryInfo, parameter)
              AddUser(parameter, queryInfo)
                .then(res => {
                  console.log(res)
                  if (res.Result) {
                    this.$notification.success({
                      message: '新增成功'
                    })
                    this.reload()
                  } else {
                    this.$notification.error({
                      message: res.Msg
                    })
                  }
                })
                .catch(rol => {
                  console.log(rol)
                })
      } else if (this.fromdata === 'findbyinfo') {
        this.$nextTick(() => {
          this.form.validateFields((err, values) => {
            if (!err) {
              if (values.FuName === undefined) {
                GetToken()
                  .then(res => {
                    var that = this
                    var p = {
                      token: res.access_token,
                      timestamp: that.timestamp,
                      offset: that.yenum,
                      limit: that.limit,
                      FSunitUstrId: this.FSunitUstrId,
                      FuName: this.FuName,
                      UserId: this.UserId,
                      FSzt: this.FSztInfo
                    }
                    findAllUser(p)
                      .then(res => {
                        // console.log('用户管理' + JSON.stringify(res))
                        var datalist = JSON.parse(res.Data)
                        that.data = datalist.rows
                        that.totalnum = datalist.total
                      })
                      .catch(err => {
                        console.log('用户管理 失败' + err)
                      })
                  })
                  .catch(err => {
                    console.log(err)
                  })
              }
              GetToken()
                .then(res => {
                  var that = this
                  var p = {
                    token: res.access_token,
                    timestamp: that.timestamp,
                    offset: that.yenum,
                    limit: that.limit,
                    FuName: values
                  }
                  FinfByName(p)
                    .then(res => {
                      var datalist = JSON.parse(res.Data)
                      console.log(datalist.rows)
                      that.data = datalist.rows
                      that.totalnum = datalist.total
                    })
                    .catch(err => {
                      console.log('用户类型条件查询 失败' + err)
                    })
                })
                .catch(err => {
                  console.log(err)
                })
              console.log(values)
              this.form.resetFields()
            }
          })
        })
      }
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
</style>
