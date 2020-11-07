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
                    <a-input v-model="queryParam.id" placeholder="" size="large" class="btn" />
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
                    <a-button type="primary" style="height:40px" @click="$refs.table.refresh(true)">查询</a-button>
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
            <a-button type="primary" style="height:40px" icon="plus" @click="showModal()">新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- 新增弹窗 -->
            <a-modal
              title="新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="600px"
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item
                    label="角色名"
                    :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-select
                      v-decorator="[
                        'xzjuesename'
                        //{ rules: [{ required: true, message: '请选择用户类型' }] },
                      ]"
                      placeholder="角色名"
                      @change="handleSelectChange"
                    >
                      <a-select-option value="超管">
                        超管
                      </a-select-option>
                      <a-select-option value="散养户">
                        散养户
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item
                    label="排序"
                    :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-select
                      v-decorator="[
                        'xzuserleixing'
                        //{ rules: [{ required: true, message: '请选择用户类型' }] },
                      ]"
                      placeholder="排序"
                      @change="handleSelectChange"
                    >
                      <a-select-option value="1">
                        1
                      </a-select-option>
                      <a-select-option value="2">
                        2
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
                        'userzhanghao'
                        //{rules: [{ required: true, message: '请输入备注' }]}
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
            <!-- 查看 -->
            <a-modal
              title="查看"
              :visible="findinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"

              width="900px"
            >
              <p>查看详情</p>
              <div class="tab">
                <a-form @submit="handleSubmit" :form="form">
                  <a-row type="flex" justify="space-between" align="bottom">
                    <a-col :span="4">
                      <div>
                        <p>市区</p>
                      </div>
                    </a-col>
                    <a-col :span="20">
                      <div>
                        <a-form-item
                          :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                          <a-input
                            v-decorator="['shiqu']"
                            disabled
                            style="margin-left:10px;"/>
                        </a-form-item>
                      </div>
                    </a-col>
                  </a-row>
                  <a-row type="flex" justify="space-between" align="bottom">
                    <a-col :span="4">
                      <div>
                        <p>厂名称</p>
                      </div>
                    </a-col>
                    <a-col :span="20">
                      <a-form-item
                        :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                        <a-input
                          v-decorator="['name']"
                          disabled
                          style="margin-left:10px;"/>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row type="flex" justify="space-between" align="bottom">
                    <a-col :span="4">
                      <div>
                        <p>负责人</p>
                      </div>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                        <a-input
                          v-decorator="['fzr']"
                          disabled
                          style="margin-left:10px;"/>
                      </a-form-item>
                    </a-col>
                    <a-col :span="4">
                      <div>
                        <p>联系电话</p>
                      </div>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                        <a-input
                          v-decorator="['phone']"
                          disabled
                          style="margin-left:10px;"/>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row type="flex" justify="space-between" align="bottom">
                    <a-col :span="4">
                      <div>
                        <p>处理方式</p>
                      </div>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                        <a-input
                          v-decorator="['clfs']"
                          disabled
                          style="margin-left:10px;"/>
                      </a-form-item>
                    </a-col>
                    <a-col :span="4">
                      <div>
                        <p>日处理能力</p>
                      </div>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                        <a-input
                          v-decorator="['rclnl']"
                          disabled
                          style="margin-left:10px;"/>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row type="flex" justify="space-between" align="bottom">
                    <a-col :span="4">
                      <div>
                        <p>运营状况</p>
                      </div>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                        <a-input
                          v-decorator="['yyzk']"
                          disabled
                          style="margin-left:10px;"/>
                      </a-form-item>
                    </a-col>
                    <a-col :span="4">
                      <div>
                        <p>企业关闭时间</p>
                      </div>
                    </a-col>
                    <a-col :span="8">
                      <a-form-item
                        :wrapperCol="{lg: {span: 16}, sm: {span: 16} }">
                        <a-input
                          v-decorator="['time']"
                          disabled
                          style="margin-left:10px;"/>
                      </a-form-item>
                    </a-col>
                  </a-row>
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
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item
                    label="角色名"
                    :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-select
                      v-decorator="[
                        'userleixing'
                        //{ rules: [{ required: true, message: '请选择用户类型' }] },
                      ]"
                      name="juesename"
                      placeholder="角色名"
                      @change="handleSelectChange"
                    >
                      <a-select-option value="超管">
                        超管
                      </a-select-option>
                      <a-select-option value="散养户">
                        散养户
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item
                    label="排序"
                    :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                  >
                    <a-select
                      v-decorator="[
                        'userleixing'
                        //{ rules: [{ required: true, message: '请选择用户类型' }] },
                      ]"
                      placeholder="排序"
                      @change="handleSelectChange"
                    >
                      <a-select-option value="1">
                        1
                      </a-select-option>
                      <a-select-option value="2">
                        2
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
                        'userzhanghao'
                        //{rules: [{ required: true, message: '请输入备注' }]}
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
            <!-- 删除弹窗 -->
            <a-modal
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
            <a-button type="primary" style="height:40px" @click="handleEdit()">批量删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px" @click="handleEdit()">导出</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px" @click="handleEdit()">列表定制</a-button>
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
            <template slot="action" slot-scope="text, record">
              <a slot="action" @click="update">修改&nbsp;&nbsp;</a>
              <a slot="action" @click="delet(record)">删除&nbsp;&nbsp;</a>
              <a slot="action" @click="find(record)">查看详情&nbsp;&nbsp;</a>
            </template>
          </a-table>
          <div>
            <a-pagination
              show-quick-jumper
              :default-current="offset"
              :total="num"
              show-less-items
              :current="offset"
              @change="onChange"
              style="margin: 10px"
            />
            <span
              style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
            >当前第 {{ this.offset }}/{{ Math.ceil(this.num / 10) }} 页 共 {{ this.num }} 条记录 每页 10 条</span
            >
          </div>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
import { GetToken } from '@/api/getToken.js'
const columns = [
  {
    title: '序号',
    width: 80,
    dataIndex: 'FStId',
    key: 'FStId',
    customRender: function (t, r, index) {
      return parseInt(index) + 1
    }
  },
  { title: '厂名称', width: 200, dataIndex: 'FFcmc', key: 'FFcmc' },
  { title: '编号', width: 200, dataIndex: 'FSmemo2', key: 'FSmemo2' },
  { title: '地址', width: 200, dataIndex: 'FFArea', key: 'FFArea' },
  { title: '负责人', width: 250, dataIndex: 'FFfzr', key: 'FFfzr' },
  { title: '联系电话', width: 250, dataIndex: 'phFFlxdhone', key: 'FFlxdh' },
  { title: '处理方式', width: 250, dataIndex: 'FFclfs', key: 'FFclfs' },
  { title: '日处理能力', width: 250, dataIndex: 'FFclnl', key: 'FFclnl' },
  { title: '经营状态', width: 250, dataIndex: 'UnitCloseStatus', key: 'UnitCloseStatus' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  // {
  //   FStId: 1,
  //   FFcmc: '演示无害化处理场',
  //   FSmemo2: 'LC01500001',
  //   FFArea: '青岛市李沧区振华路街道',
  //   FFfzr: '测试',
  //   phFFlxdhone: '12313123123',
  //   FFclfs: '化制',
  //   FFclnl: '',
  //   UnitCloseStatus: '运营'
  // },
  // {
  //   FStId: 2,
  //   FFcmc: '演示无害化处理场',
  //   FSmemo2: 'LC01500001',
  //   FFArea: '青岛市李沧区振华路街道',
  //   FFfzr: '测试',
  //   phFFlxdhone: '12313123123',
  //   FFclfs: '化制',
  //   FFclnl: '',
  //   UnitCloseStatus: '运营'
  // },
  // {
  //   FStId: 3,
  //   FFcmc: '演示无害化处理场',
  //   FSmemo2: 'LC01500001',
  //   FFArea: '青岛市李沧区振华路街道',
  //   FFfzr: '测试',
  //   phFFlxdhone: '12313123123',
  //   FFclfs: '化制',
  //   FFclnl: '',
  //   UnitCloseStatus: '运营'
  // }
]

export default {
  name: 'BaseForm',
  data () {
    return {
      value: '',
      hasSelected: 'true',

      // from 表单
      form: this.$form.createForm(this),

      // 点击 新增弹出框
      // ModalText: '请不要输入错误噢~',
      visible: false,
      updateinfo: false,
      danwei: false,
      confirmLoading: false,
      confirmLoading1: false,
      deletinfo: false,
      qiyedanwei: '',
      findinfo: false,
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
      // 角色列表请求数据
      // 当前页
      offset: 1,
      // 每页条数
      limit: 10,
      // 总条数
      num: 100
    }
  },
  created () {
    var that = this
    var p = { offset: that.offset, limit: that.limit }
    GetToken(p).then(res => {
      that.data = JSON.parse(res.Data).rows
      that.num = JSON.parse(res.Data).total
    })
  },
  methods: {
    // 查看
    find (v) {
        this.findinfo = true
    },
    // 删除
    delet (v) {
      console.log('删除' + v.FStId)
      this.deletinfo = true
      this.number = v.xuhao
    },
    // onSearch (value) {
    //   console.log(value)
    // },
    // 修改
    update () {
      console.log('修改')
      this.updateinfo = true

      console.log(this.updateinfo)
    },
    // 获取下拉选框值
    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    // 分页方法
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
    },
    // 展开收起功能
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 表格复选框取值
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      // 把要删除的FStid放入数组
      console.log('selectedRows changed: ', selectedRows)
      var arr = []
      selectedRows.forEach(item => {
        console.log(item.FStId)
        arr.push(item.FStId)
        this.allFStid = arr
        console.log('FStid数组' + this.allFStid)
      })
      arr = []
    },
    // 弹窗
    showModal (formName) {
      this.visible = true
    },
    // 弹窗关闭
    handleOk (e) {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.findinfo = false
        this.updateinfo = false
        this.deletinfo = false
        this.confirmLoading = false
      }, 1000)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.findinfo = false
      this.updateinfo = false
      this.deletinfo = false
    },
    handleOk1 () {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.data = this.data.filter(item => parseInt(item.xuhao) !== this.number)
        this.deletinfo = false
        this.confirmLoading = false
      }, 1000)
    },

    //  from表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>
<style scoped>
.tab div {
  height: 40px;
  border: black 1px solid;
  line-height: 40px;
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
.btn[data-v-567409ec] {
  width: 129%!important;
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
