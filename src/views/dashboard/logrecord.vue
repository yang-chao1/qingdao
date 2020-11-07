<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="序号">
                    <a-input v-model="queryParam.id" placeholder="" size="large" style="width: 100%" />
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
                    <!-- <a-button type="primary" style="height:40px" @click="$refs.table.refresh(true)">查询</a-button> -->
                    <a-button v-permission="{active:'scasele'}" type="primary" style="height:40px" @click="checkRol">查询</a-button>

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
            <a-button v-permission="{active:'scaadd'}" type="primary" style="height:40px" icon="plus" @click="showModal()">新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <a-button type="primary" style="height:40px" @click="handleEdit()">导出</a-button>&nbsp;&nbsp;&nbsp;&nbsp; -->
            <!-- 新增 -->
            <a-modal
              title="管理新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOkAdd"
              @cancel="handleCancel"
              width="800px"
              :destroyOnClose="true"

            >
              <a-form @submit="handleSubmit" :form="form">
                <a-form-item
                  label="管理人员"
                  :labelCol="{ lg: { span: 4 }, sm: { span: 4 } }"
                  :wrapperCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                >
                  <a-input
                    v-decorator="['guanlirenyuan', { rules: [{ required: true, message: '请选择' }] }]"
                    name="guanlirenyuan"
                    disabled
                  />
                  <a-button @click="glrenyuan" style="position: absolute; margin: 3px 10px">
                    选择
                  </a-button>
                  <a-select
                    style="position: absolute;margin: 3px 100px"
                    @change="handleSelectChange"
                    :default-value="defaultValuePole"
                  >
                    <a-select-option v-for="item in poleAll" :key="item.ColumnValue">
                      {{ item.ColumnName }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-form>
              <div class="div8">
                <!-- 下辖单位 -->
                <div>
                  <p v-for="(item, index) in classPole" :key="index" @click="dianjixuanzhong(index)">
                    {{ item.Text }}
                  </p>
                </div>
                <a-icon type="arrow-right" :style="{ fontSize: '50px', position: 'absolute', 'margin-top': '170px' }" />
                <div>
                  <p class="qiye" v-show="this.l >= 1 ? true : false">
                    已选企业
                    <a-icon
                      type="delete"
                      :style="{ fontSize: '30px', float: 'right', 'margin-top': '5px' }"
                      @click="deletall"
                    >
                    </a-icon>
                  </p>
                  <p v-for="(item, index) in classPoleAdd" :key="index">
                    {{ item.Text }}
                    <a-icon
                      @click="delet(index)"
                      type="delete"
                      :style="{ fontSize: '20px', position: 'relative', 'margin-top': '10px', 'margin-left': '10px' }"
                    >
                    </a-icon>
                  </p>
                </div>
              </div>
            </a-modal>

            <!-- 选择管理人员弹窗 -->
            <a-modal
              title="选择管理员"
              :visible="glry"
              :confirm-loading="confirmLoading1"
              @ok="handleOk1"
              @cancel="handleCancel1"
              width="800px"
              style="top: 100px"
              :destroyOnClose="true"
              :footer="null"
            >
              <div>
                <!-- 搜索框 -->
                <a-input-search
                  placeholder="请输入姓名"
                  enter-button="搜索"
                  size="large"
                  @search="onSearchAdminItems"
                  style=" width:280px; margin-bottom: 10px;"
                  v-model="searchUser"
                />
                <!-- 权限管理新增功能里管理人员选择数据表格 -->
                <a-table
                  :columns="columns1"
                  :data-source="AdminAll"
                  :pagination="false"
                  :rowSelection="{
                    selectedRowKeys: selectedRowKeys1,
                    onChange: onSelectChange1,
                    onSelect: onSelect1,
                    type: 'radio'
                  }"
                >
                </a-table>
                <div>
                  <a-pagination
                    size="small"
                    :total="this.AdmintotalNum"
                    show-size-changer
                    show-quick-jumper
                    style="margin: 10px"
                    @change="changePageAdmin"
                    @showSizeChange="onShowSizeChangeAdmin"
                  />
                </div>
              </div>
            </a-modal>
          </div>
          <!-- 用户管理页面表格 -->
          <a-table :pagination="false" :columns="columns" :data-source="userPower" style="margin-top: 5px">
            <a slot="name" slot-scope="text">{{ text }}</a>
          </a-table>
          <div>
            <a-pagination
              size="small"
              :total="this.totalNum"
              show-size-changer
              show-quick-jumper
              style="margin: 10px"
              @change="changePage"
              :current="offset"
              @showSizeChange="onShowSizeChange"
            />
            <span
              style="float: right;font-size:15px; margin-top:-2%;margin-right:5%"
            >当前第{{ offset }} / {{ totalPage }} 页 共 {{ totalNum }} 条记录 每页 {{ limit }} 条</span
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
// import Qs from 'qs'
// import { concat } from 'store/storages/all'
// import { reduce } from 'store/storages/all'
var yenum1 = 1
var yeOffset = 10
const columns = [
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
  // { title: '序号', width: 100, dataIndex: 'FStId', key: 'FStId' },
  { title: '分配人', width: 200, align: 'center', dataIndex: 'FSuserName', key: 'FSuserName' },
  { title: '行政名称', width: 200, align: 'center', dataIndex: 'FSunitName', key: 'FSunitName' },
  { title: '管理人员', width: 200, align: 'center', dataIndex: 'QYName', key: 'QYName' },
  { title: '企业名称及类型', width: 250, align: 'center', dataIndex: 'QYtext', key: 'QYtext' }
]

const data = [
  {
    xuhao: '1',
    fenpeiren: '青岛市',
    xingzhengname: '青岛市畜牧兽医研究所',
    guanlirenyuan: '畜牧兽医局',
    mingchenjileixing: '青岛市李沧区'
  },
  {
    xuhao: '2',
    fenpeiren: '青岛市',
    xingzhengname: '超级管理员',
    guanlirenyuan: '畜牧兽医局',
    mingchenjileixing: '青岛市李沧区'
  },
  {
    xuhao: '2',
    fenpeiren: '青岛市',
    xingzhengname: '超级管理员',
    guanlirenyuan: '畜牧兽医局',
    mingchenjileixing: '青岛市李沧区'
  },
  {
    xuhao: '2',
    fenpeiren: '青岛市',
    xingzhengname: '超级管理员',
    guanlirenyuan: '畜牧兽医局',
    mingchenjileixing: '青岛市李沧区'
  },
  {
    xuhao: '2',
    fenpeiren: '青岛市',
    xingzhengname: '超级管理员',
    guanlirenyuan: '畜牧兽医局',
    mingchenjileixing: '青岛市李沧区'
  }
]
const columns1 = [
  { title: '用户名', width: 200, dataIndex: 'FuName', key: 'FuName' },
  { title: '用户账号', width: 250, dataIndex: 'FuAccount', key: 'FuAccount' },
  { title: '角色名', width: 250, dataIndex: 'FrName', key: 'FrName' },
  { title: '行政名称', width: 250, dataIndex: 'FSunitName', key: 'FSunitName' },
  { title: '单位名称', width: 250, dataIndex: 'FuseEName', key: 'FuseEName' }
]

const data1 = [
  {
    yonghuname: '徐法勇',
    yonghuzhanghao: '11111111111',
    juesename: '协管员',
    xingzhengname: '李哥庄动检站',
    danweiname: '李哥庄动检站'
  },
  {
    yonghuname: '李刚',
    yonghuzhanghao: '11111111111',
    juesename: '协管员',
    xingzhengname: '李哥庄动检站',
    danweiname: '李哥庄动检站'
  },
  {
    yonghuname: '任启华',
    yonghuzhanghao: '11111111111',
    juesename: '协管员',
    xingzhengname: '李哥庄动检站',
    danweiname: '李哥庄动检站'
  }
]
export default {
  name: 'BaseForm',
  data () {
    return {
      // token存储
      userToken: '',
      // 时间戳
      timestamp: new Date().valueOf(),

      // from 表单
      form: this.$form.createForm(this),
      quanxiandata: [
        { title: '胶州市超源' },
        { title: '胶州市超源养殖场' },
        { title: '胶州市超源养殖' },
        { title: '胶州市超源养' },
        { title: '胶州市超源养殖' },
        { title: '胶州' },
        { title: '胶州市超源养' },
        { title: '胶州市超源养殖场' },
        { title: '胶州市超源养殖场' },
        { title: '胶州市超源养殖场' },
        { title: '胶州市超源养殖场' },
        { title: '胶州市超源养殖场' },
        { title: '胶州市超源养殖场' },
        { title: '胶州市超源养殖场' }
      ],
      quanxiandata1: [],
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
      data1,
      columns1,

      // table数据
      userPower: [],

      // 点击 新增弹出框
      // ModalText: '请不要输入错误噢~',
      visible: false,
      glry: false,
      confirmLoading: false,
      qiyedanwei: '',
      l: '',

      data,
      columns,
      confirmLoading1: false,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      selectedRowKeys1: [],
      loading: false,
      guanlirenyuan: '',
      // 请求参数
      // 当前页数
      offset: 1,
      // 每页多少条
      limit: 10,
      // 总条数
      totalNum: 10,
      // 总页数
      totalPage: Math.ceil(this.totalNum / this.limit),

      // 管理人员页码
      Adminlimit: 1,
      AdmintotalNum: 10,
      Adminoffset: 10,
      // AdmintotalPage: 5,

      // 管理员数据
      AdminAll: [],

      // 管理员姓名
      poleInput: '',
      // 角色名 FrName 数据
      poleAll: [],
      // 角色名
      poleName: { ColumnName: '选择角色', ColumnValue: ''
      },
      // 管理人员信息
      admininfo: {
        FrName: '',
        FStId: ''

      },

      // 角色权限
      classPole: [],
      // 角色权限暂存
      classPoleAdd: [],
      // 按条件查询数据
      searchUser: '',
      // 提交数据
      FcPName: '',
      FcName: '',
      FcValue: '',
      //  默认选择的角色
      defaultValuePole: '选择角色',
      UserId: sessionStorage.getItem('FStId'),
      FSunitUstrId: ''
    }
  },
  created () {
    yenum1 = 1
    // 获取token
    this.GetTokenitem()
    this.checkUserPower(this.offset, this.limit)
  },
  methods: {
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
    // 查询所有用户权限
    async checkUserPower (offset, limit) {
      this.GetTokenitem()
      await this.$axios
        .get(http + '/Popedom/GetAllpopedom?FSunitUstrId=01&offset=' + offset + '&limit=' + limit, {
          headers: {
            AccessToken: this.userToken,
            timestamp: this.timestamp,
            UserId: this.UserId
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.Result) {
            var resData = JSON.parse(res.data.Data)
            console.log(resData)
            this.totalNum = resData.total
            this.userPower = resData.rows
            this.totalPage = Math.ceil(this.totalNum / this.limit)
          } else {
            this.$notification.error({
              message: '查询失败，请联系管理人员'
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 失去焦点时获取 已不用
    InputBlurProwerRole () {
      this.poleInput = this.form.getFieldValue('guanlirenyuan')
      this.onSearchAdmin(this.poleInput, this.userToken, this.timestamp)
    },
    // 通过选择去查找信息查询所有管理人员信息
    glrenyuan () {
      this.GetTokenitem()
      this.glry = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          'guanlirenyuan': ''
        })
      })
      console.log('管理人员姓名')
      this.classPole = []
      this.classPoleAdd = []
      this.l = this.classPoleAdd.length
      // 查询所有管理人员
      this.checkAllAdmin(this.Adminlimit, this.Adminoffset)
    },
    // 根据角色id行政id查询养殖场数据
    async onSearchAdmin (FrId, FSunitUstrId) {
      console.log(FrId, FSunitUstrId)
      await this.$axios({
        url: http + '/Popedom/GetYZCZL?FrId=' + FrId + '&FSunitUstrId=' + FSunitUstrId,
        method: 'get',
        headers: {
            AccessToken: this.AccessToken,
            timestamp: this.timestamp
          }
      })
        .then(res => {
          console.log(res.data.Data)
          console.log(JSON.parse(res.data.Data))
          var Clres = JSON.parse(res.data.Data)

          if (!res.data.Result) {
            this.$notification.error({
              message: '未查询到该用户'
            })
            this.poleAll = []
            this.classPole = []
            this.AdminAll = []
          } else {
            console.log([...Clres.rows])
            this.poleAll = [...Clres.rows]
            // this.poleAll.forEach((item, index) => {
            //   if (!index) {
            //     console.log(item.ColumnName)
            //     this.poleName.ColumnName = item.ColumnValue
            //     this.defaultValuePole = item.ColumnName
            //   }
            // })
            this.poleName.ColumnName = this.poleAll[0].ColumnName
            this.poleName.ColumnValue = this.poleAll[0].ColumnValue
            this.defaultValuePole = this.poleAll[0].ColumnValue
            console.log(this.defaultValuePole)
            this.onSearchPowerRole(this.poleName.ColumnName, this.poleName.ColumnValue, FSunitUstrId)
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 查询所有管理人员
    async checkAllAdmin (Adminoffset, Adminlimit) {
      console.log('查询所有管理人员')
      this.GetTokenitem()
      await this.$axios
        .get(http + '/Popedom/GetAllUser?FSunitId=01&offset=' + Adminoffset + '&limit=' + Adminlimit, {
          headers: {
            AccessToken: this.userToken,
            timestamp: this.timestamp,
            UserId: this.UserId
          }
        })
        .then(res => {
          if (res.data.Result) {
            var Clres = JSON.parse(res.data.Data)
            console.log(Clres)
            this.AdminAll = Clres.rows
            this.AdmintotalNum = Clres.total
          } else {
            this.$notification.error({
              message: '查询失败'
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 按条件查询 模糊查询
    async onSearchAdminItems () {
      console.log(this.searchUser)
      var FuName = this.searchUser
      this.GetTokenitem()
      await this.$axios
        .get(
          http +
            '/Popedom/GetUserswhere?FSunitUstrId=01&FuName=' +
            FuName +
            '&offset=' +
            this.Adminoffset +
            '&limit=' +
            this.Adminlimit,
          {
            headers: {
              AccessToken: this.userToken,
              timestamp: this.timestamp
            }
          }
        )
        .then(res => {
          console.log(res)
          var Clres = JSON.parse(res.data.Data)
          this.AdmintotalNum = Clres.total
          this.AdminAll = Clres.rows
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    // 养殖场查询
    async onSearchPowerRole (yzcname, yzclx, FSunitUstrId) {
      this.GetTokenitem()
      await this.$axios
        .get(http + '/Popedom/GetYZCInfo?yzcname=' + yzcname + '&yzclx=' + yzclx + '&FSunitUstrId=' + FSunitUstrId, {
          headers: {
            AccessToken: this.userToken,
            timestamp: this.timestamp
          }
        })
        .then(res => {
          var Clres = JSON.parse(res.data.Data)
          console.log(Clres)
          if (res.data.Result) {
            this.classPole = [...Clres.rows]
          } else {
            this.classPole = []
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    // 页码改变  index
    changePage (current, pageSize) {
      //  current 改变后的页码，pageSize 每页显示条数
      console.log('log:', current, pageSize)
      this.offset = current
      yenum1 = current

      this.checkUserPower(current, pageSize)
    },
    // 每页数量改变 index
    onShowSizeChange (current, pageSize) {
      this.checkUserPower(current, pageSize)

      this.limit = pageSize
      yenum1 = current
      yeOffset = pageSize
      this.totalPage = Math.ceil(this.totalNum / this.limit)
    },

    // 查询所有管理员页码改变
    changePageAdmin (current, pageSize) {
      console.log('管理人')
      console.log(current, pageSize)
      this.Adminoffset = current
      this.checkAllAdmin(current, pageSize)
    },
    onShowSizeChangeAdmin (current, pageSize) {
      this.checkAllAdmin(current, pageSize)
      this.Adminlimit = pageSize
    },
    checkRol () {
      console.log(this.queryParam)
      this.GetTokenitem()
      this.$axios
        .get(http + '/Popedom/GetUserswhere?FuName=' + this.queryParam.id, {
          headers: {
            AccessToken: this.userToken,
            timestamp: this.timestamp
          }
        })
        .then(res => {
          console.log(res)
          this.userPower = res.data.Data
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    // 选择管理员方法
    onSelect1 (record, selected, selectedRows, nativeEvent) {
      console.log(record)
      // this.onSelectChange1()
      // 关闭弹窗
      this.glry = false
      // 给管理人员赋值
      this.$nextTick(() => {
        this.form.setFieldsValue({
          'guanlirenyuan': record.FuName
        })
      })
    },
    // 单位添加
    dianjixuanzhong (index) {
      if (this.classPoleAdd.indexOf(this.classPole[index]) === -1) {
        this.classPoleAdd.push(this.classPole[index])
        console.log(this.classPoleAdd)
        this.l = this.classPoleAdd.length
      } else {
        this.$notification.error({
          message: '此单位已添加，请勿重复添加'
        })
      }
    },
    deletall () {
      // console.log(this.classPoleAdd)
      var resID = []
      this.classPoleAdd.forEach(item => {
        resID.push(item.FStId)
      })
      this.$axios({
        method: 'post',
        url: http + '/Popedom/UserDel?FStId=' + resID.join(',')
      }).then(res => {
        if (res.data.Result) {
          this.$notification.success({
            message: '删除成功'
          })
          this.classPoleAdd.splice(0)
          this.l = this.classPoleAdd.length
        } else {
          this.$notification.error({
            message: '删除失败'
          })
        }
      })
    },
    delet (index) {
      console.log(index)
      console.log('删除')
      this.classPoleAdd.splice(index, 1)
      console.log(this.quanxiandata1)
      this.l = this.classPoleAdd.length
      // this.$axios({
      //   method: 'post',
      //   url: http + '/Popedom/UserDel?FStId=' + this.classPole[index].FStId
      // }).then(res => {
      //   if (res.data.Result) {
      //     this.$notification.success({
      //       message: '删除成功'
      //     })
      //   } else {
      //     this.$notification.error({
      //       message: '删除失败'
      //     })
      //   }
      // })
    },
    // 新增权限
    addNewPower () {},
    // 角色选择
    handleSelectChange (value) {
      this.classPoleAdd.splice(0)
      console.log(value)
      this.l = this.classPoleAdd.length
      this.onSearchPowerRole(this.poleName.ColumnName, value, this.FSunitUstrId)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    // 收起展开控制
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 权限管理新增功能里管理人员选择数据表格变化
    onSelectChange1 (selectedRowKeys, selectedRows) {
      console.log('选择的管理人员信息')
      console.log(selectedRows)
      // var poleName = ''
      var FrId = ''
      var FSunitUstrId = ''
      // this.poleInput = selectedRows[0].FuName
      selectedRows.forEach((item, index) => {
        if (!index) {
          this.form.setFieldsValue({
            'guanlirenyuan': item.FuName
          })
          this.poleInput = item.FuName
          // poleName = item.FrName
          FrId = item.FrId
          this.admininfo.FStId = item.FStId
          this.admininfo.FrName = item.FuName
          FSunitUstrId = item.FSunitUstrId
          this.FSunitUstrId = item.FSunitUstrId
        }
      })
      // console.log(poleName)
      this.classPoleAdd.splice(0)
      this.l = this.classPoleAdd.length
      this.GetTokenitem()
      // 查询

      this.onSearchAdmin(FrId, FSunitUstrId)
      this.selectedRowKeys1 = selectedRowKeys
    },

    // 打开管理新增弹窗
    showModal () {
      this.visible = true
    },
    // 关闭管理新增弹窗
    handleOk (e) {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.selectedRowKeys1 = []
        this.confirmLoading = false
      }, 1000)
    },

    handleCancel (e) {
      console.log('点击了取消')
      this.selectedRowKeys1 = []
      this.visible = false
      this.classPole = []
      this.classPoleAdd = []
      this.l = this.classPoleAdd.length
      this.poleAll = []
    },
    handleOk1 (e) {
      console.log(e)
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading1 = true
      setTimeout(() => {
        this.glry = false
        this.confirmLoading1 = false
      }, 1000)
    },
    handleCancel1 (e) {
      this.searchUser = ''
      console.log('点击了取消')
      this.glry = false
      this.classPoleAdd = []
      this.l = this.classPoleAdd.length
    },

    //  from表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
        console.log(err)
      })
    },

    handleOkAdd (v) {
      console.log(this.classPoleAdd)

      if (!this.classPoleAdd.length) {
        this.$notification.error({
          message: '请选择企业'
        })
      } else {
        var checkInfo = {
          gluserid: '',
          glname: '',
          QYID: '',
          QYNAME: '',
          qylb: '',
          name: '',
          LXS: ''
        }
        this.classPoleAdd.forEach(item => {
          if (checkInfo.QYID === '') {
            checkInfo.QYID = item.Target
            checkInfo.QYNAME = item.Text
            checkInfo.name = item.ToolTip
            checkInfo.LXS = item.Value
          } else {
            checkInfo.QYID = checkInfo.QYID + ',' + item.Target
            checkInfo.QYNAME = checkInfo.QYNAME + ',' + item.Text
            checkInfo.name = checkInfo.name + ',' + item.ToolTip
            checkInfo.LXS = checkInfo.LXS + ',' + item.Value
          }
        })
        checkInfo.gluserid = this.admininfo.FStId
        checkInfo.glname = this.admininfo.FrName
        checkInfo.qylb = this.poleName.ColumnValue
        this.$axios({
        method: 'post',
        url: http + '/Popedom/AddQyfp?gluserid=' + checkInfo.gluserid + '&glname=' + checkInfo.glname + '&QYID=' + checkInfo.QYID + '&QYNAME=' + checkInfo.QYNAME + '&qylb=' + checkInfo.qylb + '&name=' + checkInfo.name + '&LXS=' + checkInfo.LXS,

        headers: {
          'UserId': this.UserId
        }

      }).then(res => {
        console.log(res)
      })
      }
      console.log(v)
    }

  }
}
</script>
<style scoped>
.btn[data-v-6a9157b0] {
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
.div8 div {
  display: inline-block;
  width: 300px;
  height: 400px;
  box-shadow: 5px 5px 5px #888888;
  margin-left: 50px;
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
