<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;" @submit="handleSubmit">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item
                    label="入库单位名称
">
                    <a-input
                      v-model="rkdwName"
                      size="large"
                      style="width: 150%"
                    />
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
                    <a-button type="primary" @click="mocheck" style="height:40px" >查询</a-button>
                  </span>
                </a-col>
              </div>
            </a-row>
          </a-form>
          <div style="margin-top:35px;">
            <!-- 新增-->
            <a-button type="primary" style="height:40px" icon="plus" @click="showModal()">新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px">批量删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px; width:80px;" >导出</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-modal
              :footer="null"
              title="证章入库新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
              :destroyOnClose="true"
            >
              <a-form @submit="handleSubmit" :form="form">
                <a-row>
                  <a-col :span="11">
                    <a-form-item
                      label="入库单位名称"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['RkUnit', { rules: [{ required: true, message: '请输入' }] }]"
                        name="RkUnit"
                      />
                    </a-form-item>
                  </a-col>
                  <a-popover title="">
                    <template slot="content">
                      <span> 输入起始号和数量点击确认自动生成号段 </span>
                    </template>
                    <a-col :span="11">
                      <a-form-item>
                        起始号:
                        <a-input
                          :maxLength="10"
                          v-decorator="['startRoughly',{ rules: [{ required: true, message: '请输入' },{ pattern: /^[0-9]{10}$/, message: '请输入10位数字' }] }]"
                          style="width:35%;margin-right: 1%"/>
                        数量:
                        <a-input

                          v-decorator="['roughlyNum',{ rules: [{ required: true, message: '请输入' },{ pattern: /^[0-9]*$/, message: '只能为数字' }] }]"
                          style="width:20%;"
                        />
                        <a-button
                          type="primary"
                          @click="createRkHdRange()"
                          style="position: absolute;margin: 4px">
                          确定
                        </a-button>
                      </a-form-item>
                    </a-col>
                  </a-popover>
                  <!-- <a-popover title="">
                    <template slot="content">
                      <span> 输入起始号和数量点击确认自动生成号段 </span>
                    </template>
                      <a-form-item
                        label="数量"
                        :labelCol="{ lg: { span: 5 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }">
                    <a-col :span="7">
                      <a-input
                        v-decorator="['num', { rules: [{ required: true, message: '请输入' }] }]"
                        name="num"
                        style="width:80%;margin-left: 1%"
                      />
                      <a-button
                        style="position: absolute;margin:4px 5px;">
                        确定
                      </a-button>
                      </a-form-item>
                  </a-col>
                  </a-popover> -->
                </a-row>

                <a-row>
                  <a-col :span="11">
                    <a-form-item
                      label="证章种类	"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-select
                        v-decorator="['ZzType', { rules: [{ required: true, message: '请选择' }] }]"
                        placeholder="请选择"
                      >
                        <a-select-option value="动物A证">
                          动物A证
                        </a-select-option>
                        <a-select-option value="动物B证">
                          动物B证
                        </a-select-option>
                        <a-select-option value="产品A证">
                          产品A证
                        </a-select-option>
                        <a-select-option value="产品B证">
                          产品B证
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>

                  <!-- <a-col :span="2"> <span> 证章号段 </span></a-col> -->

                  <a-col :span="12">
                    <a-form-item
                      label="证章号段"
                      :labelCol="{ lg: { span: 4 }, sm: { span: 4 } }"
                      :wrapperCol="{ lg: { span: 16 }, sm: { span: 17 } }">
                      <a-textarea
                        @blur="changeNum"
                        v-decorator="['RkHdRange', { rules: [{ required: true, message: '请输入' }] }]"
                        name="RkHdRange"
                        rows="4"
                      />
                    </a-form-item>
                  </a-col>

                </a-row>
                <a-row>
                  <a-col :span="11">
                    <a-form-item
                      label="经办人"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="['RkAgent', { rules: [{ required: true, message: '请输入' }] }]"
                        name="RkAgent"
                      />

                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="入库数量及单位"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 17 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="['RkNumber', { rules: [{ required: true, message: '请输入' }] }]"
                        name="RkNumber"
                        style="width:40%"
                      />
                      <a-input
                        disabled
                        v-decorator="['RkSldw', { rules: [{ required: true, message: '请输入' }],initialValue:'份'}]"
                        name="RkSldw"
                        style="width:40%;margin-left:2%;"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>

                </a-row>
                <a-row>
                  <a-col :span="11">
                    <a-form-item
                      label="备注"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-textarea
                        v-decorator="['Remark']"
                        name="Remark"
                        rows="4"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">

                    <a-form-item style="color:red;">
                      <p>
                        注：号段格式如下:<br/>
                        1、3701000100-3701000102(单个号段)<br/>
                        2、3701000100-3701000102,3701000105-3701000106(多个号段)<br/>
                        3、每个号段的起始号不能大于结束号<br/>
                        4、不能使用中文逗号</p>
                    </a-form-item>

                  </a-col>
                </a-row>
                <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                  <a-button type="primary" html-type="submit" style="width:315px; height: 40px;">
                    确认
                  </a-button>
                </a-form-item>
              </a-form>
            </a-modal>
            <!-- 查看弹窗 -->
            <a-modal
              title="证章入库查看"
              :visible="findinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1000px"
              :destroyOnClose="true"
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <template >
                    <a-descriptions bordered :column="2">
                      <a-descriptions-item label="入库单位名称" :span="1">
                        <span>{{ findResultOne.RkUnit }}</span>
                        <!--<span v-if="!f">{{ findResultOne.RkUnit }}</span>
                        <a-form-item v-if="f">
                          <a-input
                            v-decorator="['RkUnit', { rules: [{ required: true, message: '请输入' }] }]"
                            name="RkUnit"
                          />
                        </a-form-item>-->
                      </a-descriptions-item>
                      <a-descriptions-item label="入库日期" :span="1">
                        <span>{{ findResultOne.FScTime }}</span>
                        <!--
                          <span
                          v-if="!f"></span>
                          <a-form-item v-if="f">
                            <a-input
                              v-decorator="['FScTime', { rules: [{ required: true, message: '请输入' }] }]"
                              name="FScTime"
                            />
                          </a-form-item> -->
                      </a-descriptions-item>
                      <a-descriptions-item label="证章种类" :span="1">
                        <span>{{ findResultOne.ZzType }}</span>
                        <!-- <span v-if="!f">动物B证</span>
                        <a-form-item v-if="f">
                          <a-input
                            v-decorator="['xx3', { rules: [{ required: true, message: '请输入' }] }]"
                            name="xx3"
                          />
                        </a-form-item> -->
                      </a-descriptions-item>
                      <a-descriptions-item label="经办人" :span="1">
                        <span>{{ findResultOne.RkAgent }}</span>
                        <!-- <span v-if="!f">cs</span>
                        <a-form-item v-if="f">
                          <a-input
                            v-decorator="['xx3', { rules: [{ required: true, message: '请输入' }] }]"
                            name="xx3"
                          />
                        </a-form-item> -->
                      </a-descriptions-item>
                      <a-descriptions-item label="入库数量及单位" :span="1">
                        <span>{{ findResultOne.RkNumber }}{{ findResultOne.RkSldw }}</span>
                        <!-- <span v-if="!f">10份</span>
                        <a-form-item v-if="f">
                          <a-input
                            v-decorator="['xx3', { rules: [{ required: true, message: '请输入' }] }]"
                            name="xx3"
                          />
                        </a-form-item> -->
                      </a-descriptions-item>
                      <a-descriptions-item label="号段" :span="1">
                        <span>{{ findResultOne.RkHdRange }}</span>
                        <!-- <span v-if="!f">3712000020-3712000029</span>
                        <a-form-item v-if="f">
                          <a-input
                            v-decorator="['xx3', { rules: [{ required: true, message: '请输入' }] }]"
                            name="xx3"
                          />
                        </a-form-item> -->
                      </a-descriptions-item>
                      <a-descriptions-item label="备注" :span="2">
                        <span>{{ findResultOne.Remark }}</span>
                        <!--<span v-if="!f">-</span>
                        <a-form-item v-if="f">
                          <a-input
                            v-decorator="['xx3', { rules: [{ required: true, message: '请输入' }] }]"
                            name="xx3"
                          />
                        </a-form-item> -->
                      </a-descriptions-item>
                    </a-descriptions>
                    <a-row type="flex" justify="end">
                      <a-form-item>
                        填表人：{{ findResultOne.RkAgent }} &nbsp;&nbsp;&nbsp;&nbsp;填表时间：{{ findResultOne.FSuTime }}
                        <!-- 2018年11月19日 -->
                      </a-form-item>
                    </a-row>
                  </template>
                  <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                    <a-button
                      type="primary"
                      @click="handleCancel"
                      style="width:315px; height: 40px;margin-top:30px;"
                    >
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
              @ok="handleDeletOk"
              @cancel="handleCancel"
              width="400px"
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
                    是否确认删除
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
          </div>
          <!-- 页面表格 -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="data"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a slot="action" @click="find(record)">查看&nbsp;&nbsp;</a>
              <a slot="action" @click="delet(record)">删除&nbsp;&nbsp;</a>
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
import http from '@/utils/httpapi'
import formatTime from '@/utils/public.js'

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
  { title: '入库日期', width: 200, align: 'center', dataIndex: 'FSctime', key: 'FSctime' },
  { title: '入库单位名称', width: 200, align: 'center', dataIndex: 'RkUnit', key: 'RkUnit' },
  { title: '证章种类', width: 200, align: 'center', dataIndex: 'ZzType', key: 'ZzType' },
  { title: '入库数量', width: 220, align: 'center', dataIndex: 'RkNumber', key: 'RkNumber' },
  { title: '数量单位', width: 200, align: 'center', dataIndex: 'RkSldw', key: 'RkSldw' },
  { title: '经办人', width: 200, align: 'center', dataIndex: 'RkAgent', key: 'RkAgent' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 250,
    scopedSlots: { customRender: 'action' }
  }
]

// const data = [{
//     xx1: '2018-11-19',
//     xx2: '平度市畜牧兽医局',
//     xx3: '动物B证'
//   }]

export default {
  inject: ['reload'], // 页面刷新this.reload()使用
  data () {
    return {
      // 总条数
      totalnum: 0,
      // 当前页
      yenum: 1,
      // 单位选择当前页数
      offset: 1,
      // 每页条数
      limit: 10,
      // 模糊查询当前页
      findBynameyenum: 1,

      queryParam: { status: 0, status1: 0 },
      fromdata: '',
      columns,
      data: [],
      selectwhere: '',
      UserId: sessionStorage.getItem('FStId'),

      // from 表单
      form: this.$form.createForm(this),
      formType: '',
      number: 0,
      // 点击 弹出框
      visible: false,
      findinfo: false,
      deletinfo: false,
      confirmLoading: false,

      // 查看
       findResultOne: { FStId: '', RkUnit: '', FScTime: '', ZzType: '', RkAgent: '', RkNumber: '', RkSldw: '', RkHdRange: '', Remark: '' },

      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      loading: false,
      hDnum: 0,
      rkdwName: '',
      user: JSON.parse(localStorage.getItem('AllInfo'))
    }
  },
  created () {
    yenum1 = 1
    var that = this
    var p = {
        limit: that.limit,
        offset: that.offset,
        selectwhere: that.selectwhere
      }
    this.findAll(p)
  },
  methods: {
    mocheck () {
      if (this.rkdwName) {
        this.selectwhere = 'RkUnit:' + this.rkdwName
      } else {
        this.selectwhere = ''
      }
      var p = {
        limit: this.limit,
        offset: this.offset,
        selectwhere: this.selectwhere
      }
      this.findAll(p)
    },
     findAll (p) {
       console.log(http + '/Quarantine/ZZGL_PutStorageCAList?pageindex=' + p.offset + '&pagesize=' + p.limit + '&selectwhere=' + p.selectwhere)
      this.$axios({
        url: http + '/Quarantine/ZZGL_PutStorageCAList?pageindex=' + p.offset + '&pagesize=' + p.limit + '&selectwhere=' + p.selectwhere,
        method: 'get',
        headers: {
          UserId: this.UserId
        }
      }).then(res => {
        console.log(res)
           if (res.data.Data) {
            var datalist = JSON.parse(res.data.Data)
            datalist.rows.forEach(item => {
              item.FSctime = formatTime(item.FSctime, 'yyyy-MM-dd')// hh:mm:ss
            })
            this.data = datalist.rows
            this.totalnum = parseInt(datalist.total)
         } else {
            this.$notification.info({ message: '未查询到任何信息' })
         }
      }).catch(rol => {
          console.log(rol)
      })
    },

    changeNum () {
      console.log('执行了')

        this.form.setFieldsValue({
          RkHdRange: '',
          RkNumber: '',
          roughlyNum: ''
        })

      // var num = this.form.getFieldValue('RkHdRange')
      // if (num === '' || !num) {
      //   this.hDnum = 0
      // } else {
      //   console.log(num)
      //   var p = num.split(',')
      //   console.log(p)
      //   if (p.length) {
      //     p.forEach(item => {
      //       if (item.split('-').length === 1 || item.split('-').length !== 2) {
      //         this.hDnum = 0
      //       } else {
      //         var pLength = item.split('-')
      //         console.log(pLength)
      //         console.log(parseInt(pLength[0]) >= parseInt(pLength[1]), !parseInt(pLength[0]), !parseInt(pLength[1]))
      //         if (parseInt(pLength[0]) >= parseInt(pLength[1]) || !parseInt(pLength[0]) || !parseInt(pLength[1])) {
      //           this.hDnum = 0
      //         } else {
      //           this.hDnum = parseInt(pLength[1]) - parseInt(pLength[0])
      //         }
      //       }
      //     })
      //   }
      // }
      // this.form.setFieldsValue({
      //   // RkHdRange: this.hDnum,
      //   RkNumber: this.hDnum
      // })
    },
    // 分页方法
    onChange (checkedValues) {
      this.selectedRowKeys = []
      console.log('checked = ', checkedValues)
      this.yenum = checkedValues
      this.offset = checkedValues
      yenum1 = checkedValues
       var p = {
        limit: this.limit,
        offset: this.offset,
        selectwhere: this.selectwhere
      }
      this.findAll(p)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
     onSelectChange (selectedRowKeys, selectedRows) {
     },
    // 新增弹窗
    showModal (formName) {
      this.formType = 'add'
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          RkAgent: sessionStorage.getItem('FuName'),
          RkUnit: this.user.FuseEName
        })
      })
    },
    // 点击确认自动生成号段
    createRkHdRange () {
      var startRoughly = this.form.getFieldValue('startRoughly')// 起始号
      var roughlyNum = this.form.getFieldValue('roughlyNum')
      console.log(startRoughly, roughlyNum)
      if (startRoughly && roughlyNum) {
        if (this.form.getFieldValue('RkHdRange') === '' || !this.form.getFieldValue('RkHdRange')) {
            this.form.setFieldsValue({
              RkHdRange: startRoughly + '-' + (parseInt(startRoughly) + parseInt(roughlyNum) - 1),
              RkNumber: roughlyNum
            })
        } else {
          this.form.setFieldsValue({
              RkHdRange: this.form.getFieldValue('RkHdRange') + ',' + startRoughly + '-' + (parseInt(startRoughly) + parseInt(roughlyNum) - 1),
              RkNumber: parseInt(roughlyNum) + parseInt(this.form.getFieldValue('RkNumber'))
            })
        }
      } else {
        this.$notification.info({
          message: '请输入起始号和数量'
        })
      }
    },
    find (v) {
      console.log('查看：' + v.FStId)
      this.$axios({
        url: http + '/Quarantine/ZZGL_PutStorageCAXQ?FStId=' + v.FStId,
        method: 'get',
        headers: {
            UserId: this.UserId
        }
      }).then(res => {
        var Clres = res.data.Data
        console.log(JSON.stringify(Clres) + '###')
        var FScTimeVal = formatTime(Clres.FScTime, 'yyyy年MM月dd日')
        var FSuTimeVal = formatTime(Clres.FSuTime, 'yyyy年MM月dd日')
        this.findinfo = true
        this.$nextTick(() => {
          var findOne = this.findResultOne
          findOne.RkUnit = Clres.RkUnit
          findOne.FScTime = FScTimeVal
          findOne.ZzType = Clres.ZzType
          findOne.RkAgent = Clres.RkAgent
          findOne.RkNumber = Clres.RkNumber
          findOne.RkSldw = Clres.RkSldw
          findOne.RkHdRange = Clres.RkHdRange
          findOne.Remark = Clres.Remark
          findOne.FSuTime = FSuTimeVal
        })
      }).catch(rol => {
          console.log(rol)
        })
    },
    delet (v) {
      console.log('删除:' + JSON.stringify(v))
      this.deletinfo = true
      this.number = v.FStId
    },
    handleDeletOk () {
       this.confirmLoading = true
        this.$axios({
          method: 'post',
          url: http + '/Quarantine/ZZGL_PutStorageCADel?FStId=' + this.number
        }).then(res => {
          setTimeout(() => {
            this.$notification.success({
              message: '删除成功'
            })
          }, 100)
          this.reload()
      })
      setTimeout(() => {
        this.data = this.data.filter(item => parseInt(item.FStId) !== this.number)
        this.deletinfo = false
        this.confirmLoading = false
        this.form.resetFields()
      }, 100)
    },
     handleSubmit (e) {
      e.preventDefault()
        var that = this
      // ZZGL_PutStorageCAInsert
       this.form.validateFields((err, v) => {
          if (!err) {
            // 新增
            if (that.formType === 'add' && this.form.getFieldValue('RkNumber')) {
               var p = {
                 // FStId: v.FStId,
                  RkUnit: v.RkUnit,
                  // FScTime: v.FScTime,
                  ZzType: v.ZzType,
                  RkAgent: v.RkAgent,
                  RkNumber: v.RkNumber,
                  RkSldw: v.RkSldw,
                  RkHdRange: v.RkHdRange,
                  Remark: v.Remark
               }
               console.log(JSON.stringify(p))
                this.$axios({
                  url: http + '/Quarantine/ZZGL_PutStorageCAInsert',
                  data: p,
                  method: 'post',
                  headers: {
                    UserId: that.UserId
                  }
                }).then(res => {
                  console.log(res)
                  if (res.data.Data === 'true') {
                    setTimeout(() => {
                      this.$notification.success({
                        message: '新增成功'
                      })
                    }, 100)
                    this.fromdata = ''
                    this.visible = false
                    this.reload()
                  } else {
                    console.log(res.Msg)
                    this.$notification.error({
                      message: res.data.Msg
                    })
                  }
                }).catch(err => {
                  console.log(err)
                })
            } else {
              this.$notification.error({
                message: '请检查号段'
              })
            }
          }
       })
      },
    // 弹窗关闭
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.findinfo = false
        this.confirmLoading = false
        this.formType = ''
        this.form.resetFields()
      }, 100)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false

      this.findinfo = false
      this.deletinfo = false
      this.form.resetFields()
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
