<template>
  <div>
    <page-header-wrapper>
      <!-- 列表  ------------------------------- -->

      <div class="div1" v-show="ListPages">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="通知标题">
                    <a-input v-model="queryParam.id" size="large" @blur="mocheck" style="width: 100%" />
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
                    <a-select placeholder="请选择" default-value="0" style="width:80px">
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
            <!-- 查看 -->
            <a-modal
              okText="确认"
              cancelText="取消"
              title="查看"
              :visible="fintinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="800px"
            >
              <div>
                <p><b>标题</b>：《{{ Fititle }}》</p>
                <p><b>级别</b>：【{{ FiJB }}】</p>
                <p>
                  <b>内容</b>：
                  <span v-html="FiContent">{{ FiContent }} </span>
                </p>
                <!--{{ Fititle }} {{ FiJB }} <p>级别：【普通】</p>-->
                <!-- <section v-html="html"></section> -->

                <!-- <mavon-editor :toolbars="toolbars" v-model="html1" @change="updateDoc"></mavon-editor> -->
                <!-- <editor-bar v-model="FiContent" :isClear="isClear"></editor-bar> old-->
                <!-- <div v-html="html" contenteditable="true" @keyup="inputDiv($event)"></div> -->
              </div>
            </a-modal>
            <!-- 删除弹窗 -->
            <a-modal
              okText="确认"
              cancelText="取消"
              title="删除"
              :visible="deletinfo"
              :confirm-loading="confirmLoading"
              @ok="DeleteByFStId"
              @cancel="handleCancel"
              width="400px"
            >
              <div>
                <a-form @submit="DeleteByFStId" :form="form">
                  <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
                    是否确认删除
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
            <div class="anniu">
              <a-button v-permission="{active:'nceadd'}" type="primary" style="height:40px" icon="plus" @click="showModal()">新增</a-button>
              <a-button v-permission="{active:'ncedele'}" type="primary" style="height:40px" @click="delet">批量删除</a-button>
              <!-- <a-button type="primary" style="height:40px; width:80px;" @click="handleEdit()">导出</a-button> -->
            </div>
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
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="data"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a v-permission="{active:'ncesele'}" slot="action" @click="fint(record)">查看&nbsp;&nbsp;</a>
              <a v-permission="{active:'nceupd'}" slot="action" @click="update(record)">修改&nbsp;&nbsp;</a>
            </template>
          </a-table>
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
            >当前第 {{ this.yenum }}/{{ Math.ceil(this.totalnum / 10) }} 页 共 {{ this.totalnum }} 条记录 每页 10
              条</span
            >
          </div>
        </div>
      </div>

      <!--新增   ------------------------------- -->

      <div class="div1" v-show="newly">
        <!-- 新增and修改 -->

        <a-form @submit="handleSubmit" :form="form">
          <a-form-item
            label="标题"
            :labelCol="{ lg: { span: 3 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
          >
            <a-input
              v-decorator="['Fititle', { rules: [{ required: true, message: '请输入标题' }] }]"
              name="name"
              placeholder="标题"
            />
          </a-form-item>
          <a-form-item
            label="级别"
            :labelCol="{ lg: { span: 3 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
          >
            <a-select
              v-decorator="['FiJB', { rules: [{ required: true, message: '请选择级别' }] }]"
              placeholder="请选择"
              @change="handleSelectChange"
            >
              <a-select-option value="普通">
                普通
              </a-select-option>
              <a-select-option value="重要">
                重要
              </a-select-option>
              <a-select-option value="紧急">
                紧急
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="通知单位类型"
            :labelCol="{ lg: { span: 3 }, sm: { span: 7 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          >
            <a-checkbox-group
              @change="onChange1"
              v-decorator="['FiLx', { rules: [{ required: true, message: '请选择级别' }] }]"
            >
              <a-row>
                <a-col :span="8">
                  <a-checkbox value="行政单位">
                    行政单位
                  </a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="种畜禽">
                    种畜禽
                  </a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="规模养殖场">
                    规模养殖场
                  </a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="执法机构">
                    执法机构
                  </a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="奶牛场">
                    奶牛场
                  </a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="屠宰场">
                    屠宰场
                  </a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="检疫申报点">
                    检疫申报点
                  </a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="诊疗机构">
                    诊疗机构
                  </a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="兽药生产企业">
                    兽药生产企业
                  </a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="兽药经营企业">
                    兽药经营企业
                  </a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="饲料生产企业">
                    饲料生产企业
                  </a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="饲料经营企业">
                    饲料经营企业
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 18, offset: 3 }">
            <div>
              <editor-bar
                v-decorator="['value', { rules: [{ required: true ,message:'请输入提示'}] }]"
                :isClear="isClear"
                @change="change"
              ></editor-bar>
              <!-- <mavon-editor :toolbars="toolbars" v-model="value" @change="updateDoc"></mavon-editor> -->
            </div>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 7, offset: 8 }">
            <a-button type="primary" html-type="submit">
              {{ this.formDate === 'update' ? '修改' : '新增' }}
            </a-button>
            <a-button type="primary" @click="fanhui" style="float:right;">
              返回
            </a-button>
          </a-form-item>
          <!-- <router-link :to="{ name: 'Analysis' }">
        <a-button type="primary" style="height:40px" icon="plus" @click="fanhui1">返回1</a-button>
      </router-link> -->
        </a-form>
      </div>
      <!-- -------------------------------------------- -->
    </page-header-wrapper>
  </div>
</template>
<script>
// import { DeleteInform, findByFStId } from '@/api/analysis'
import EditorBar from '../../components/wangEnduit/wangEnduit'

import http from '@/utils/httpapi'
import { getAdminAddress } from '@/api/AdministrativeAddress'

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
  { title: '通知标题', width: 250, align: 'center', dataIndex: 'Fititle', key: 'Fititle' },
  { title: '发布日期', width: 180, align: 'center', dataIndex: 'FiDate', key: 'FiDate' },
  { title: '级别', width: 150, align: 'center', dataIndex: 'FiJB', key: 'FiJB' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  components: { EditorBar },
  name: 'BaseForm',
  inject: ['reload'],
  data () {
    return {
      // 模糊查询当前页
      findBynameyenum: 1,
      // 每页条数
      limit: 10,
      offset: 1,
      // 总条数
      totalnum: 0,
      yenum: 1,
      // 列表页    显示隐藏
      ListPages: true,
      //  新增        显示隐藏
      newly: false,

      options: [
        // {
        //   value: '青岛',
        //   label: '青岛',
        //   children: [
        //     {
        //       value: '崂山',
        //       label: '崂山',
        //       children: [
        //         {
        //           value: '动监站',
        //           label: '动监站'
        //         }
        //       ]
        //     }
        //   ]
        // }
      ],
      isClear: false,
      value: '',
      hasSelected: 'true',
      // from 表单
      form: this.$form.createForm(this),

      // 点击 新增弹出框
      // ModalText: '请不要输入错误噢~',
      visible: false,
      fintinfo: false,
      updateinfo: false,
      deletinfo: false,
      confirmLoading: false,
      html: '',
      html1: '',
      data: [],
      columns,
      mdl: {},
      // 查看
      Fititle: '',
      FiJB: '',
      FiContent: '',
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      loading: false,
      number: 0,
      leixinglist: '',
      value1: '',
      allFStid: [],
      formDate: '',
      UserId: sessionStorage.getItem('FStId'),
      // 模糊查询
      FSunitUstrId: '',
      Fititles: '',
      allU: JSON.parse(sessionStorage.getItem('AllInfo'))
    }
  },
  created () {
    yenum1 = 1
    getAdminAddress()
      .then(res => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
      })
      .catch(rol => {
        console.log(rol)
      })
    this.getAllInfo()
  },
  methods: {
    // 模糊查询
    mocheck (checkedValues, e) {
      console.log(checkedValues, e, this.queryParam.id)
      if (!checkedValues.length && !this.queryParam.id) {
        this.reload()
      }
      if (!e) {
        this.Fititle = this.queryParam.id
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
        // for (var i = 0; i < e.length; i++) {
        //   this.FSunitUstrId = e[e.length - 1].key
        // }
      }
      this.limit = 10
      this.offset = 1
      yenum1 = 1
      this.getAllInfo()
    },
    getAllInfo () {
      this.$axios({
        url:
          http +
          '/Management/AppletInformGet?FSunitUstrId=' +
          this.FSunitUstrId +
          '&Fititle=' +
          this.Fititle +
          '&offset=' +
          this.offset +
          '&limit=' +
          this.limit,
        // url: http + '/Management/AppletInformGet?offset=1&limit=' + this.limit,
        method: 'get',
        headers: {
          UserId: this.UserId
        }
      })
        .then(res => {
          var datalist = JSON.parse(res.data.Data)
          datalist.rows.forEach(item => {
            item.FiDate = item.FiDate.toString().substring(0, item.FiDate.toString().indexOf('T'))
          })
          this.data = datalist.rows
          this.totalnum = datalist.total
        })
        .catch(err => {
          console.log('通知管理 失败' + err)
        })
    },

    // 获取可编辑div 内容
    inputDiv (e) {
      console.log(e.target)
    },
    // 批量删除
    DeleteByFStId () {
      if (this.allFStid.length > 0) {
        this.allFStid.forEach(item => {
          this.data = this.data.filter(item1 => parseInt(item1.FStId) !== item)
        })
        this.$axios
          .post(http + '/Management/AppletInformDel?FStId=' + this.allFStid)
          .then(res => {
            console.log('批量删除成功' + res)
            setTimeout(() => {
              this.$notification.success({
                message: '批量删除成功'
                // description: `${timeFix()}，欢迎回来`
              })
            }, 100)
            yenum1 = 1
            this.reload()
          })
          .catch(err => {
            console.log('批量删除失败' + err)
          })
      } else {
        alert('请选择要删除的数据')
      }
    },
    delet (v) {
      console.log('删除')
      console.log(v.FStId)
      this.deletinfo = true
      this.number = v.FStId
    },
    update (v) {
      console.log(v)
      // this.getAllInfo()
      // 列表页    显示隐藏
      this.ListPages = false
      //  新增        显示隐藏
      this.number = v.FStId
      this.newly = true
      this.formDate = 'update'
      this.$axios
        .get(http + '/Management/AppletInformGetWhere?FStId=' + v.FStId)
        .then(res => {
          console.log(res)
          this.value = JSON.parse(JSON.stringify(res.data.Data[0].FiContent))
          // console.log(JSON.stringify(res.data.Data[0].FiLx))
          if (res.data.Result) {
            res.data.Data.forEach((item, index) => {
              if (index === 0) {
                this.$nextTick(() => {
                  this.form.setFieldsValue({
                    Fititle: item.Fititle,
                    FiJB: item.FiJB,
                    FiLx: item.FiLx.split(','),
                    value: item.FiContent
                  })
                })
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    fint (v) {
      console.log('查看')
      this.fintinfo = true
      console.log(this.fintinfo)
      this.$axios
        .get(http + '/Management/AppletInformGetWhere?FStId=' + v.FStId)
        .then(res => {
          this.Fititle = JSON.parse(JSON.stringify(res.data.Data[0].Fititle))
          this.FiJB = JSON.parse(JSON.stringify(res.data.Data[0].FiJB))
          this.FiContent = JSON.parse(JSON.stringify(res.data.Data[0].FiContent))
          // this.html1 = this.html
          // this.html1 = this.html.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ')
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    // 解决选中文本框后点击下一页还有选中的效果
    start () {
      // ajax request after empty completing
      setTimeout(() => {
        this.selectedRowKeys = []
      }, 100)
    },
    // 分页
    onChange (checkedValues) {
      // this.start()
      console.log('checked = ', checkedValues)
      yenum1 = checkedValues
      this.offset = checkedValues
      this.getAllInfo()
      // this.$axios({
      //   url: http + '/Management/AppletInformGet?offset=' + checkedValues + '&limit=' + this.limit,
      //   method: 'get',
      //   headers: {
      //     UserId: this.UserId
      //   }
      // }).then((res) => {
      //   var datalist = JSON.parse(res.data.Data)
      //   datalist.rows.forEach(item => {
      //     item.FiDate = item.FiDate.toString().substring(0, item.FiDate.toString().indexOf('T'))
      //   })
      //   this.data = datalist.rows
      // }).catch((err) => {
      //   console.log('分页 失败' + err)
      // })
    },
    // 根据地区条件查询
    onChanges (checkedValues) {
      console.log('checked = ', checkedValues)
      // this.yenum = checkedValues
      // yenum1 = checkedValues
      // this.$axios({
      //   url: http + '/Management/AppletInformGet?offset=' + this.yenum + '&limit=' + this.limit,
      //   method: 'get'
      // }).then((res) => {
      //   console.log('通知管理' + JSON.parse(res.data.Data))
      //   var datalist = JSON.parse(res.data.Data)
      //   this.data = datalist.rows
      // }).catch((err) => {
      //   console.log('通知管理 失败' + err)
      // })
    },
    // 多选框选择方法
    onChange1 (checkedValues) {
      console.log('checked = ', checkedValues)
      // this.leixinglist = checkedValues
      for (var i = 0; i < checkedValues.length; i++) {
        this.leixinglist = this.leixinglist + ',' + checkedValues[i]
      }
      console.log(this.leixinglist)
      this.site = this.leixinglist.substring(1)
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
        arr.push(parseInt(item.FStId))
        console.log('arr 数组' + arr)
        this.allFStid = arr
        console.log('FStid数组' + this.allFStid)
      })
      arr = []
    },

    // 弹窗
    showModal () {
      // 列表页    显示隐藏
      this.ListPages = false
      //  新增        显示隐藏
      this.newly = true
      this.formDate = 'add'
    },
    handleOk (e) {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.fintinfo = false
        this.updateinfo = false
        this.deletinfo = false
        this.confirmLoading = false
        this.value = ''
      }, 100)
    },
    // handleOk1 () {
    //   this.ModalText = '弹窗在两秒后关闭'
    //   this.confirmLoading = true
    //   this.data = this.data.filter(item => parseInt(item.FStId) !== this.number)
    //   this.$axios({
    //     url: http + '/Management/AppletInformDel?FStId=' + JSON.stringify(this.number),
    //     method: 'post'
    //   })
    //     .then(res => {
    //       console.log('删除成功' + res)
    //       setTimeout(() => {
    //         this.$notification.success({
    //           message: '通知管理删除成功'
    //         })
    //       }, 100)
    //       yenum1 = 1
    //       this.reload()
    //     })
    //     .catch(err => {
    //       console.log('通知管理删除失败' + err)
    //     })
    //   setTimeout(() => {
    //     this.deletinfo = false
    //     this.confirmLoading = false
    //   }, 100)
    // },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.fintinfo = false
      this.deletinfo = false
      this.updateinfo = false
      this.value = ''
    },

    //  from表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          var time = new Date()
          var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
          if (this.formDate === 'update') {
            var p = {
              FStId: this.number,
              FiJB: values.FiJB,
              FiLx: this.leixinglist,
              Fititle: values.Fititle,
              FiContent: this.value,
              FiDate: time1
            }
            this.$axios
              .post(http + '/Management/AppletInformUp', p)
              .then(res => {
                setTimeout(() => {
                  this.$notification.success({
                    message: '通知管理修改成功'
                  })
                }, 100)
                // this.fanhui()
                this.reload()
                this.leixinglist = ''
                this.value = ''
              })
              .catch(err => {
                console.log('通知管理修改失败' + err)
              })
          } else if (this.formDate === 'add') {
            var data = {
              FiJB: values.FiJB,
              FiLx: this.leixinglist,
              Fititle: values.Fititle,
              FiContent: this.value1,
              FiDate: time1
            }
            this.$axios
              .post(http + '/Management/AppletInformAdd', data, { headers: { UserId: this.UserId } })
              .then(res => {
                setTimeout(() => {
                  this.$notification.success({
                    message: '通知管理新增成功'
                  })
                }, 100)
                this.fanhui()
                this.reload()
                this.leixinglist = ''
                this.value = ''
              })
              .catch(err => {
                console.log('通知管理新增失败' + err)
              })
          }
          console.log('Received values of form: ', values)
          this.reload()
          this.form.resetFields()
        }
      })
    },

    change (val) {
      // 此时会自动将 markdown 和 html 传递到这个方法中
      console.log('markdown内容: ' + val)
      // console.log('html内容: ' + html)
      this.value1 = val
    },
    fanhui () {
      // 列表页    显示隐藏
      this.ListPages = true
      //  新增        显示隐藏
      this.newly = false
      this.form.resetFields()
    }
  }
}
</script>
<style scoped>
.btn[data-v-5391d79e] {
  width: 129% !important;
}
.div {
  background-color: white;
  height: 80px;
}
.div1 {
  background-color: white;
  margin: 20px;
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
.anniu {
  list-style: none;
  width: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.hidden {
  display: none;
}

.show {
  display: inline;
}
</style>
