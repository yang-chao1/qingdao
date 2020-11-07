<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="角色名称">
                    <a-input v-model="queryParam.id" placeholder="" @blur="mocheck" size="large" style="width:150%"/>
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
                    <a-button v-permission="{active:'rolesele'}" type="primary" style="height:40px" >查询</a-button>
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
            <a-button v-permission="{active:'roleadd'}" type="primary" style="height:40px" icon="plus" @click="showModal()">新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- 新增弹窗 -->
            <a-modal
              title="新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="600px"
              :footer="null"
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item
                    label="角色名"
                    :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-input
                      placeholder="请输入角色名"
                      v-decorator="[
                        'xzjuesename',
                        { rules: [{ required: true, message: '请输入用户名称' }] },
                      ]"></a-input>
                  </a-form-item>
                  <a-form-item
                    label="备注"
                    :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-input
                      v-decorator="[
                        'userzhanghao',
                        // {rules: [{ required: true, message: '请输入备注' }]}
                      ]"
                      name=""
                      placeholder="备注"
                    />
                  </a-form-item>
                  <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                    <a-button type="primary" html-type="submit" style="width:230px; height: 40px;">
                      确认
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
            <!-- 修改弹窗 -->
            <a-modal
              title="修改"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="600px"
              :footer="null"
            >
              <div>
                <a-form @submit="handleSubmit" :form="updataForm">
                  <a-form-item
                    label="角色名"
                    :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-select
                      v-decorator="[
                        'FrName',
                        { rules: [{ required: true, message: '请输入角色名' }] },
                      ]"
                      name="FrName"
                      placeholder="角色名"
                      @change="handleSelectChange"
                    >
                      <a-select-option v-for="(item,index) in roleName" :key="index">
                        {{ item }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item
                    label="备注"
                    :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-input
                      v-decorator="[
                        'FrRemark'
                        //{rules: [{ required: true, message: '请输入备注' }]}
                      ]"
                      name="FrRemark"
                      placeholder="备注"
                    />
                  </a-form-item>
                  <a-form-item
                    style="display:none"
                    label="id"
                    :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-input v-decorator="['FStId']" name="FStId" />
                  </a-form-item>
                  <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                    <a-button type="primary" html-type="submit" style="width:230px; height: 40px;">
                      确认
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>
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
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
                    确定删除该角色
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
            <a-button v-permission="{active:'roledele'}" type="primary" style="height:40px" @click="deleteAll()">批量删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px" @click="handleEdit()">导出</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px" @click="handleEdit()">列表定制</a-button>
          </div>
          <!-- 用户管理页面表格 -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="resUser"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a slot="action" v-permission="{active:'roleupd'}" @click="update(record)">修改&nbsp;&nbsp;</a>
              <a slot="action" v-permission="{active:'roledele'}" @click="delet(record)">删除&nbsp;&nbsp;</a>
            </template>
          </a-table>
          <div>
            <a-pagination
              show-quick-jumper
              :default-current="offset"
              :total="total"
              show-less-items
              @change="onChange"
              :current="offset"
              style="margin: 10px"
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
import { FindAllRole, AddRole, UpdateRole, DeleteRole, CheckRoleName, CheckuserName } from '@/api/authority'
// const id = 0
// import http from '@/utils/httpapi'
import { GetToken } from '@/api/getToken'
// import { values } from 'mockjs2'
// 当前页
var yenum = 1
const columns = [
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
  { title: '角色名称', width: 250, align: 'center', dataIndex: 'FrName', key: 'FrName' },
  { title: '创建人物姓名', width: 200, align: 'center', dataIndex: 'FSuserName', key: 'FSuserName' },
  { title: '用户区划', width: 200, align: 'center', dataIndex: 'FSunitName', key: 'FSunitName' },
  { title: '备注', width: 250, align: 'center', dataIndex: 'FrRemark', key: 'FrRemark' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]

const data = []

export default {
  inject: ['reload'],
  name: 'BaseForm',
  data () {
    return {
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

      // from 表单
      form: this.$form.createForm(this),
      updataForm: this.$form.createForm(this),
      // token
      userToken: '',
      // 时间戳
      timestamp: new Date().valueOf(),

      // 点击 新增弹出框
      // ModalText: '请不要输入错误噢~',
      visible: false,
      updateinfo: false,
      danwei: false,
      confirmLoading: false,
      confirmLoading1: false,
      deletinfo: false,
      qiyedanwei: '',

      data,
      columns,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      loading: false,
      userdanwei1: '',
      number: 0,
      // 角色列表数据
      roleList: [],
      // 角色列表请求数据
      roleName: [],
      // 当前页
      offset: 1,
      // 每页条数
      limit: 10,
      // 总条数
      total: 0,
      // 判断form表单提交数据进行对应操作
      formData: '',
      allFStid: [],
      // 返回所有的数据
      resUser: [],
      UserId: sessionStorage.getItem('FStId'),
      FSunitUstrId: sessionStorage.getItem('FSunitUstrId')
    }
  },
  created () {
    // this.GetTokenitem()
    yenum = 1
    var that = this
    GetToken()
      .then(res => {
        this.userToken = res.access_token
        this.timestamp = new Date().valueOf()
        console.log(res)
        var p = {
          limit: this.limit,
          offset: this.offset,
          AccessToken: this.userToken,
          timestamp: this.timestamp,
          FSunitUstrId: this.FSunitUstrId,
          UserId: this.UserId
        }
        console.log(p)
        // 查询所有角色
        FindAllRole(p).then(res => {
          console.log(res)
          if (res.Result) {
            var resData = JSON.parse(res.Data)
            that.resUser = resData.rows
            console.log(that.resUser)
            var resTotal = JSON.parse(res.Data)
            that.total = resTotal.total
          }
        })
      })
      .catch(rol => {
        console.log(rol)
      })
  },
  methods: {
    // 模糊插叙
    mocheck () {
      console.log(this.queryParam.id)
      var p = {
        FrName: this.queryParam.id,
        UserId: this.UserId,
        offset: 1,
        limit: 10
      }
      if (!this.queryParam.id) {
        p.FrName = ''
      }
      CheckuserName(p).then(res => {
        console.log(res)
        yenum = 1
        this.offset = 1
        this.limit = 10
        var resDate = JSON.parse(res.Data)
          this.resUser = resDate.rows
          var resTotal = JSON.parse(res.Data)
          this.total = resTotal.total
      })
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
    // 批量删除
    deleteAll () {
      if (this.allFStid.length > 0) {
        this.GetTokenitem()
        var reFStId = this.allFStid.join(',')
        var reID = {
          AccessToken: this.userToken,
          timestamp: this.timestamp,
          UserId: this.UserId
        }
        for (var i = 0; i < this.allFStid.length; i++) {
          this.resUser = this.resUser.filter(item => parseInt(item.FStId) !== this.allFStid[i])
        }
        DeleteRole(reFStId, reID)
          .then(res => {
            if (res.Result) {
              this.$notification.success({
                message: '批量删除成功'
              })
              this.reload()
            } else {
              this.$notification.error({
                message: '批量删除失败'
              })
            }
            console.log('批量删除成功' + res)
          })
          .catch(err => {
            console.log('批量删除失败' + err)
          })
      } else {
        this.$notification.error({
          message: '请选择批量删除的数据'
        })
      }
    },

    delet (v) {
      console.log('删除')
      this.deletinfo = true
      this.number = v.FStId
    },
    onSearch (value) {
      console.log(value)
    },
    userdanwei () {
      console.log('单位')
      this.danwei = true
    },
    update (v) {
      // 给修改的表单赋值
      console.log(v)
      this.number = v.FStId
      this.formData = 'update'
      this.updateinfo = true
      var p = {
        AccessToken: this.userToken,
        timestamp: this.timestamp,
        UserId: this.UserId
      }
      CheckRoleName(p).then(res => {
        console.log(res)
        if (res.Result && res.Data) {
          res.Data.map(item => {
            this.roleName.push(item.FrName)
          })
        } else {
          this.$notification.error({
            message: '获取角色名称失败，请联系管理人员'
          })
        }
      }).catch(rol => {
        console.log(rol)
      })
      this.$nextTick(() => {
        console.log('执行了更新')
        this.updataForm.setFieldsValue({
          FrName: v.FrName,
          FrRemark: v.FrRemark,
          FStId: v.FStId
        })
      })
    },
    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    // 分页
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
      this.selectedRowKeys = []
      yenum = checkedValues
      var that = this
      this.offset = checkedValues
      var p = { limit: this.limit, offset: this.offset, UserId: this.UserId, FSunitUstrId: this.FSunitUstrId }
      FindAllRole(p).then(res => {
        if (res.Result) {
          console.log(res)
          console.log(res.Data)
          var resDate = JSON.parse(res.Data)
          that.resUser = resDate.rows
          var resTotal = JSON.parse(res.Data)
          that.total = resTotal.total
        }
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 批量删除&修改获取选中行对应FStId生成数组
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

    // 弹窗
    showModal (formName) {
      this.visible = true
      this.formData = 'add'
      this.GetTokenitem()
    },
    // 弹窗关闭
    handleOk (e) {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.updateinfo = false
        this.deletinfo = false
        this.confirmLoading = false
      }, 1000)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.updateinfo = false
      this.deletinfo = false
    },
    handleOk1 () {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      console.log(this.number)
      var reID = {
        AccessToken: this.userToken,
        timestamp: this.timestamp,
        UserId: this.UserId
      }
      if (this.deletinfo) {
        DeleteRole(this.number, reID).then(res => {
          console.log(res)
          if (res.Result) {
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
      }
      this.deletinfo = false
      this.confirmLoading = false
    },

    //  from表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      if (this.formData === 'add') {
        this.form.validateFields((err, values) => {
        console.log(values)
        var ClValue = {
          FrName: values.xzjuesename,
          FrOrder: 1,
          FrRemark: values.userzhanghao || ''
        }
        if (!err) {
          // 新增

            this.GetTokenitem()
            var headerQuery = {
              AccessToken: this.userToken,
              timestamp: this.timestamp,
              UserId: this.UserId
            }
            console.log(ClValue, headerQuery)
            AddRole(ClValue, headerQuery).then(res => {
              console.log('新增成功', res)
              if (res.Result) {
                this.$notification.success({
                  message: '新增成功'
                })
                this.reload()
                this.form.resetFields()
              } else {
                this.$notification.error({
                  message: '新增失败'
                })
              }
              this.visible = false
            })
            console.log('Received values of form: ', values)
        }
      })
      } else {
        this.updataForm.validateFields((err, values) => {
          console.log(values)
          if (!err) {
            values.FStId = this.number
            // 修改
            this.GetTokenitem()
            var headerQuerys = {
              AccessToken: this.userToken,
              timestamp: this.timestamp,
              UserId: this.UserId
            }
            console.log(values)
            if (values.FrName * 1) {
              values.FrName = this.roleName[this.updataForm.getFieldValue('FrName')]
            }

            values.FrRemark = this.updataForm.getFieldValue('FrRemark')
            UpdateRole(values, headerQuerys).then(res => {
              console.log(res)
              if (res.Result) {
                this.$notification.success({
                  message: '修改成功'
                })
                this.reload()
                this.form.resetFields()
              } else {
                this.$notification.error({
                  message: '修改失败'
                })
              }
              console.log('Received values of form: ', values)
            })
          }
        })
      }
    },
    // 列表定制
    handleEdit () {
      this.$notification.error({
        message: '待开发，敬请期待'
      })
    }
  }
}
</script>
<style scoped>
.btn[data-v-05e2cb5e] {
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
