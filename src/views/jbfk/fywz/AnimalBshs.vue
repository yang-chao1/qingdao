<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;" :form="form">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="应用单位">
                    <a-input
                      v-model="yydwInfo"
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
            <a-button v-permission="{active:'AIRecyclingdele'}" type="primary" style="height:40px" @click="del(record)">删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <a-button type="primary" style="height:40px" @click="find(record)">导出</a-button> -->
            <a-tree-select
              style="margin-top: -1px ;width: 250px;float:right;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="所在地"
              allowClear
              :tree-data="options"
              @change="mocheck"
            >
            </a-tree-select>
          </div>
          <!-- 查看弹窗 -->
          <a-modal
            :title="'查看'"
            :visible="updateinfo"
            :confirm-loading="confirmLoading"
            @ok="handleOk"
            @cancel="handleCancel"
            :footer="null"
            width="1000px"
            :destroyOnClose="true"
          >
            <div style="margin-bottom: 50px;">
              <h1 style="text-align:center"><b>动物标识回收</b></h1>
              <template >
                <a-descriptions bordered>
                  <a-descriptions-item label="应用单位" :span="4">
                    {{ examine.YYDW }}
                  </a-descriptions-item>
                  <a-descriptions-item label="回收人" :span="2">
                    {{ examine.HSR }}
                  </a-descriptions-item>
                  <a-descriptions-item label="回收日期" :span="2">
                    {{ examine.FDate }}
                  </a-descriptions-item>
                  <a-descriptions-item label="GPS地址" :span="4">
                    {{ examine.GPS }}
                  </a-descriptions-item>
                </a-descriptions>
              </template>
              <template >
                <a-descriptions bordered layout="vertical" :column="5">
                  <a-descriptions-item label="动物种类" :span="1">
                    {{ examine.DWZL }}
                  </a-descriptions-item>
                  <a-descriptions-item label="库存数量" :span="1">
                    {{ examine.KCSL }}
                  </a-descriptions-item>
                  <a-descriptions-item label="回收数量" :span="1">
                    {{ examine.HSSL }}
                  </a-descriptions-item>
                  <a-descriptions-item label="回收数量单位" :span="1">
                    {{ examine.HSDW }}
                  </a-descriptions-item>
                  <a-descriptions-item label="动物标识字段" :span="2">
                    {{ examine.EarTags }}
                  </a-descriptions-item>
                </a-descriptions>
                <a-descriptions bordered>
                  <a-descriptions-item label="备注" :span="3">
                    {{ examine.BZ }}
                  </a-descriptions-item>
                </a-descriptions>
                <a-descriptions layout="vertical" bordered>
                  <a-descriptions-item label="资料留存" :span="3">
                  </a-descriptions-item>
                </a-descriptions>
                <a-descriptions bordered>
                  <a-descriptions-item label="回收签字" :span="2">
                    {{ examine.YYDW }}
                  </a-descriptions-item>
                  <a-descriptions-item label="养殖场（户）签字" :span="2">
                    {{ examine.YYDW }}
                  </a-descriptions-item>
                </a-descriptions>
                <a-row type="flex" justify="end" align="bottom">
                  <span> 填表人：{{ examine.FSuserName }}  填表时间：{{ examine.FSuTime }}</span>
                </a-row>
              </template>
            </div>
          </a-modal>
          <!-- 删除弹窗 -->
          <a-modal
            :title="'删除'"
            :visible="Delinfo"
            :confirm-loading="confirmLoading"
            @ok="DelOk"
            @cancel="DelNo"
            width="400px"
            :destroyOnClose="true"
          >
            是否删除
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
            <a v-permission="{active:'AIRecyclingsele'}" slot="action" @click="find(record)">查看&nbsp;&nbsp;</a>
          </template>
        </a-table>
        <div>
          <a-pagination
            show-quick-jumper
            :default-current="offset"
            :total="limit"
            show-less-items
            @change="onChange"
            :current="offset"
            style="margin: 10px"
          />
          <span
            style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
          >当前第 {{ this.yenum }}/{{ Math.ceil(this.totalnum / this.limit) }} 页 共 {{ this.totalnum }} 条记录 每页 {{ this.limit }}
            条</span
          >
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
// 接口请求调用
import { badgeHSGet, badgeHSGetCK, badgeHSDel } from '@/api/jbfk'
import formatTime from '@/utils/public'
import { getAdminAddress } from '@/api/AdministrativeAddress'
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
  { title: '应用单位', width: 200, align: 'center', dataIndex: 'YYDW', key: 'YYDW' },
  { title: '发放时间',
width: 200,
align: 'center',
dataIndex: 'FDate',
key: 'FDate',
  customRender: (t, r, index) => {
      return formatTime(t, 'yyyy-MM-dd')
    }

  },
  { title: '回收人', width: 200, align: 'center', dataIndex: 'HSR', key: 'HSR' },
  { title: 'GPS地址', width: 220, align: 'center', dataIndex: 'GPS', key: 'GPS' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [{
    xx1: '刘巧章',
    xx2: '2020-09-03',
    xx3: ' 平度市蓼兰镇侯华春猪场'
  }]

export default {
  inject: ['reload'],
  data () {
    return {
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
      examine: { },
      arrayDel: '',
      queryParam: { status: 0, status1: 0 },
      fromdata: '',
      columns,
      data,
      Delinfo: false,
      yydwInfo: '',
      // from 表单
      form: this.$form.createForm(this),

      // 点击 弹出框
      visible: false,
      f: true,
      updateinfo: false,
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      loading: false,
      // 行政存储
      FeQD: [],
      FeQS: [],
      FeDJ: [],
      FeDjz: [],
      options: []
    }
  },
  created () {
       var parameter = { UserId: sessionStorage.getItem('FStId'),
        Query: {
          offset: this.yenum,
          limit: this.limit,
          YYDW: ''
        }
      }
    yenum1 = 1
    badgeHSGet(parameter).then(res => {
      console.log(111)
      console.log(res.Data)
      var spas = JSON.parse(res.Data)
      this.data = spas.rows
      this.totalnum = spas.total
     })
     // 行政树
    getAdminAddress()
      .then(res => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
        // this.regName = '请选择'
        res.forEach(item => {
          this.FeQD = item
          item.children.forEach((items, index) => {
            this.FeQS.push(items)
            items.children.forEach((itemOl, index) => {
              this.FeDjz.push(itemOl)
            })
          })
        })
        // for (var i = 0; i < this.FeQS.length - 1; i++) {

        // }
        console.log(this.FeQD, this.FeQS, this.FeDJ)
      })
      .catch(rol => {
        console.log(rol)
      })
  },
  methods: {
    // 模糊查询
    mocheck (che, val) {
      console.log(che, val)
    },
    // 分页方法
    onChange (checkedValues, a, b) {
      this.selectedRowKeys = []
      console.log('checked = ', checkedValues)
      console.log('a = ', a)
      console.log('b = ', b)
      this.yenum = checkedValues
      this.offset = checkedValues
      yenum1 = checkedValues
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
     onSelectChange (selectedRowKeys, selectedRows) {
       console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      var arrays = []
      selectedRows.forEach(function (item, index) {
        arrays.push(item.FStId)
      })
      this.arrayDel = arrays.toString()
      console.log(this.arrayDel)
     },
    // 弹窗
    showModal (formName) {
      this.fromdata = 'add'
      this.visible = true
    },
    find (v) {
      console.log(v)
      badgeHSGetCK(v.FStId).then(res => {
      console.log(111)
      console.log(res)
      res.Data[0].FDate = formatTime(res.Data[0].FDate, 'yyyy-MM-dd')
      res.Data[0].FSuTime = formatTime(res.Data[0].FDate, 'yyyy-MM-dd hh:mm:ss')
      this.examine = res.Data[0]
     })
      this.f = false
      this.updateinfo = true
    },
    del () {
      if (!this.arrayDel) {
        this.$notification.error({
        message: '请选择一条数据'
      })
      } else {
        this.Delinfo = true
      }
      // e.preventDefault()
    },
    DelOk () {
      if (this.arrayDel) {
        badgeHSDel(this.arrayDel).then(res => {
          if (res.Result) {
            this.$notification.success({
              message: '删除成功'
            })
            this.Delinfo = false
            this.reload()
          } else {
            this.$notification.error({
              message: '删除失败,请联系管理人员'
            })
          }
     })
    } else {
      this.$notification.error({
        message: '请选择一条数据'
      })
    }
    },
    DelNo () {
      this.Delinfo = false
    },
     update (v) {
        this.f = true
         this.updateinfo = true
          console.log('修改' + v.FStId)
     },
     handleSubmit (e) {
      this.form.validateFields((err, values) => {
        //  formData.forEach((value, key) => jsonData[key] = value);
        if (!err) {
           var parameter = { UserId: sessionStorage.getItem('FStId'),
        Query: {
          offset: this.yenum,
          limit: this.limit,
          YYDW: values.xx
        }
      }
          console.log('Received values of form: ', values.xx)
          badgeHSGet(parameter).then(res => {
      console.log(111)
      console.log(res.Data)
      var spas = JSON.parse(res.Data)
      this.data = spas.rows
      this.totalnum = spas.total
     })
        }
      })
      },
    // 弹窗关闭
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.updateinfo = false
        this.confirmLoading = false
        this.form.resetFields()
      }, 100)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.updateinfo = false
      this.jinyong = false
      this.userdanwei1 = ''
      this.selectedRowKeys1 = []
      // 给对应的表单元素赋值
      this.form.setFieldsValue({
        FuseEName: this.userdanwei1
      })
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
