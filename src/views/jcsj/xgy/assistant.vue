<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <a-form layout="inline" style="margin-top:30px;">
          <a-row :gutter="24">
            <div class="div5">
              <a-col :sm="12">
                <a-form-item label="姓名">
                  <a-input v-model="FEPCNameMocheck" placeholder="" size="large" style="width: 100%" />
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" @click="mocheck" style="height:40px">查询</a-button>
                </a-form-item>

              </a-col>
            </div>
            <!-- 注释，暂未确定需要 -->
            <!-- <template v-if="advanced">
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
              </template> -->
            <!-- <div class="div4">
              <a-col :md="(!advanced && 8) || 24" :sm="24">
                <span
                  class="table-page-search-submitButtons"
                  :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
                >
                  <a-button type="primary" @click="mocheck" style="height:40px">查询</a-button>
                </span>
              </a-col>
            </div> -->
          </a-row>
          <div class="btns">
            <a-button
              v-permission="{ active: 'assistantAlladd' }"
              type="primary"
              style="height:40px"
              icon="plus"
              @click="showModal()"
            >新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button
              v-permission="{ active: 'assistantAlldele' }"
              type="primary"
              style="height:40px"
              icon="minus"
              @click="delteShow()"
              v-show="!this.delteItem"
            >删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button
              v-permission="{ active: 'assistantAlldele' }"
              type="primary"
              style="height:40px"
              icon="minus"
              @click="delteShow()"
              v-show="this.delteItem"
            >批量删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </a-form>
        <a-tree-select
          style="width: 15%;position: relative;
  left: 84%; top: 0;"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="所在地"
          allowClear
          :replaceFields="replaceFields"
          :tree-data="options"
          @change="mocheck"
        >
        </a-tree-select>
        <!-- ----------------------------表格内容------------------------------------- -->
        <a-table
          :pagination="false"
          :columns="column"
          :data-source="assistantInfo"
          :scroll="{ x: 1300 }"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          style="margin-top:5px;"
        >
          <template slot="action" slot-scope="text, record">
            <a slot="action" v-permission="{ active: 'assistantAllsele' }" @click="find(record)">查看&nbsp;&nbsp;</a>
            <a slot="action" v-permission="{ active: 'assistantAllupd' }" @click="update(record)">修改&nbsp;&nbsp;</a>
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
            style="margin: 10px"
          />
          <span
            style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
          >当前第 {{ this.offset }}/{{ Math.ceil(this.total / 10) }} 页 共 {{ this.total }} 条记录 每页 10 条</span
          >
        </div>
        <!-- 删除弹窗 -->
        <a-modal

          title="删除"
          :visible="assistantInfoDel"
          @ok="delte"
          @cancel="handleCancel"
          width="400px"
          :destroyOnClose="true"
        >
          <p>确定删除</p>
        </a-modal>
        <!-- 新增页面 -->
        <a-modal
          :footer="null"
          title="协管员新增"
          :visible="addAssistant"
          @ok="handleOk"
          @cancel="handleCancel"
          width="1000px"
          :destroyOnClose="true"
        >
          <assistant-add></assistant-add>
        </a-modal>
        <!-- 详情页面 -->
        <a-modal
          :footer="null"
          title="协管员查看"
          :visible="InfoAssistant"
          @ok="handleOk"
          @cancel="handleCancel"
          width="1000px"
          :destroyOnClose="true"
        >
          <assistant-infos :formDate="formDate" :assistantItem="assistantItem"></assistant-infos>
        </a-modal>
        <!-- 修改页面 -->
        <a-modal
          :footer="null"
          title="协管员修改"
          :visible="updateAssistant"
          @ok="handleOk"
          @cancel="handleCancel"
          width="1000px"
          destroyOnClose
        >
          <assistant-update :formDate="formDate" :assistantItem="assistantItem"></assistant-update></a-modal>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
// 公共接口
import { getAdminAddress } from '@/api/AdministrativeAddress'
import formatTime from '@/utils/public.js'
// 组件
import assistantAdd from '@/views/jcsj/xgy/compont/assistantAdd'
import assistantInfos from '@/views/jcsj/xgy/compont/assistantInfos'
import assistantUpdate from '@/views/jcsj/xgy/compont/assistantUpdate'
// 接口
import { getCFYYInforFileGet, getCFYYInforFileGetCK, getCFYYInforFileDe } from '@/api/assistant'
import { returnFSunitUstrIdTree } from '@/utils/returnFSunitUstrId'

const column = [
  {
    title: '序号',
    width: 80,
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
  {
    title: '姓名',
    width: 180,
    align: 'center',
    dataIndex: 'FEPCName',
    key: 'FEPCName'
  },
  {
    title: '性别',
    width: 180,
    align: 'center',
    dataIndex: 'FEPCSex',
    key: 'FEPCSex'
  },
  { title: '出生日期',
width: 250,
align: 'center',
dataIndex: 'FEPCTime',
key: 'FEPCTime',
customRender: (t, r, index) => {
    return formatTime(t, 'yyyy-MM-dd')
  } },
  { title: '联系电话', width: 200, align: 'center', dataIndex: 'FEPCTel', key: 'FEPCTel' },
  { title: '身份证号', width: 250, align: 'center', dataIndex: 'FEPCIDCard', key: 'FEPCIDCard' },
  { title: '所属县区乡镇', width: 150, align: 'center', dataIndex: 'FEPCAddress', key: 'FEPCAddress' },
  { title: '所学专业', width: 150, align: 'center', dataIndex: 'FEPCMajor', key: 'FEPCMajor' },
  { title: '学历', width: 150, align: 'center', dataIndex: 'FEPCEdu', key: 'FEPCEdu' },
  { title: '职称', width: 150, align: 'center', dataIndex: 'FEPCPost', key: 'FEPCPost' },
  { title: '工作区域', width: 180, align: 'center', dataIndex: 'FWorkArea', key: 'FWorkArea' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]
var yenum = 1
export default {
    components: {
        assistantAdd,
        assistantInfos,
        assistantUpdate
    },
    inject: ['reload'],
  data () {
    return {
      replaceFields: {
        children: 'children',
        title: 'label',
        key: 'key',
        value: 'key'
      },
      assistantInfo: [],
      assistantName: '',
      column,
      selectedRowKeys: [],
      selectedRowKeysRows: [],
      total: 0,
      limit: 10,
      offset: 1,
      options: [],
      advanced: false,
      addAssistant: false,
      formDate: '',
      FSunitUstrId: sessionStorage.getItem('FSunitUstrId'),
      UserId: sessionStorage.getItem('FStId'),
      FEPCName: '',
      InfoAssistant: false,
      updateAssistant: false,
      assistantItem: {},
      delteItem: false,
      assistantInfoDel: false,
      FEPCNameMocheck: '',
      qeCodeInfo: 'https://qdxmsupervision.qingdao.gov.cn:8182?type=1&UserName='
    }
  },
  created () {
    yenum = 1
    getAdminAddress()
      .then(res => {
        // this.options = JSON.parse(res)
        // this.options = res
        this.options = returnFSunitUstrIdTree(res)
      })
      .catch(err => {
        console.log(err)
      })
      this.getCFYYInforFileGetList()
  },
  methods: {
    // 查询列表数据
    getCFYYInforFileGetList () {
      var p = {
        limit: this.limit,
        offset: this.offset,
        FSunitUstrId: this.FSunitUstrId,
        FEPCName: this.FEPCName,
        UserId: this.UserId
      }
      getCFYYInforFileGet(p).then(res => {
        console.log(res)
        if (res.Result) {
          var Clres = JSON.parse(res.Data)
          if (Clres) {
            this.assistantInfo = Clres.rows
            this.total = parseInt(Clres.total)
          }
        }
      })
    },
    onSelectChange (selectedRowKeys, selectedRowKeysRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRowKeysRows = selectedRowKeysRows
      if (this.selectedRowKeysRows.length > 1) {
        this.delteItem = true
      } else {
        this.delteItem = false
      }
      console.log(selectedRowKeys, selectedRowKeysRows)
    },
    // 模糊查询
    mocheck (checkedValues, e) {
      console.log(checkedValues, e)
      if (checkedValues && e !== [] && e) {
        this.FSunitUstrId = checkedValues
      } else {
        this.FSunitUstrId = sessionStorage.getItem('FSunitUstrId')
      }
      this.FEPCName = this.FEPCNameMocheck
      this.getCFYYInforFileGetList()
    },
    // 新增
    showModal () {
        this.formDate = 'add'
        this.addAssistant = true
    },
    find (v) {
      console.log(v)
      this.formDate = 'info'
      getCFYYInforFileGetCK(v.FStId).then(res => {
        console.log(res)
        res.Data[0].QRCode = res.Data[0].QRCode || this.qeCodeInfo + res.Data[0].FEPCName
        this.assistantItem = res.Data[0] || {}
        // this.assistantItem.QRCode = this.assistantItem.QRCode || this.qeCodeInfo + this.assistantItem.FEPCName
        this.InfoAssistant = true
      }).catch(rol => [
        console.log(rol)
      ])
    },
    update (v) {
      console.log(this.assistantItem)
       this.formDate = 'update'
       getCFYYInforFileGetCK(v.FStId).then(res => {
        console.log(res)
        res.Data[0].QRCode = res.Data[0].QRCode || this.qeCodeInfo + res.Data[0].FEPCName
        this.assistantItem = res.Data[0] || {}
        this.assistantItem.FStId = v.FStId
        // this.assistantItem.QRCode = this.assistantItem.QRCode || this.qeCodeInfo + this.assistantItem.FEPCName
        this.updateAssistant = true
      }).catch(rol => [
        console.log(rol)
      ])
    },
    delteShow () {
      if (!this.selectedRowKeysRows.length) {
        this.$notification.error({
          message: '请选择一条数据'
        })
      } else {
        this.assistantInfoDel = true
      }
    },
    delte () {
      if (!this.selectedRowKeysRows.length) {
        this.$notification.error({
          message: '请选择一条数据'
        })
      } else if (this.selectedRowKeysRows.length === 1) {
        getCFYYInforFileDe(this.selectedRowKeysRows[0].FStId).then(res => {
          console.log(res)
          if (res.Result) {
            this.$notification.success({
              message: res.Msg
            })
            this.assistantInfoDel = false
            this.reload()
          }
        })
      } else {
        var p = ''
        this.selectedRowKeysRows.forEach(item => {
          if (p === '') {
            p = item.FStId
          } else {
            p += ',' + item.FStId
          }
        })
         getCFYYInforFileDe(p).then(res => {
          console.log(res)
          if (res.Result) {
            this.$notification.success({
              message: res.Msg
            })
            this.assistantInfoDel = false
            this.reload()
          }
      })
      }
    },
    // 分页
    onChange (v) {
      console.log(v)
      this.offset = v
      yenum = v
      this.getCFYYInforFileGetList()
    },
    handleOk () {
        this.addAssistant = false
        this.InfoAssistant = false
        this.updateAssistant = false
        this.selectedRowKeys = []
    },
    handleCancel () {
      this.formDate = ''
        this.addAssistant = false
        this.InfoAssistant = false
        this.updateAssistant = false
        this.assistantInfoDel = false
        this.assistantItem = {}
        this.selectedRowKeys = []
    }
  }
}
</script>
<style lang="less" scoped>
.div1 {
  background-color: white;
  margin: 20px;
  padding: 10px 30px;
}
.btns{
    margin-top: 20px;
}
</style>
