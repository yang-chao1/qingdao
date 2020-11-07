<template>
  <div>
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-input size="large" v-model="selectwhere" class="ainput" placeholder="请输入货主姓名" />
      <a-button class="abutton" type="primary" @click="cx">查询</a-button>

      <a-button class="abutton" type="primary" @click="handleEdit()">导出</a-button>
      <a-button
        class="abutton"

        v-permission="{active:'QWRSheetEofAOriginadd'}"
        type="primary"
        icon="plus"

        @click="addModal">新增</a-button>
      <a-button class="abutton" v-permission="{active:'QWRSheetEofAOrigindele'}" type="primary" @click="delet">批量删除</a-button>
      <a-row>
        <a-col :span="12" :offset="12">
          <a-tree-select
            labelInValue
            @change="getAddree"
            style="width: 25%; float:right;"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="所在地"
            :tree-data="options"
          >
          </a-tree-select>
        </a-col>
      </a-row>
      <a-table
        :rowKey="record=>record.FStIds"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="false"
        :scroll="{ x: 2000 }"
        :columns="columns1"
        :data-source="data1"
        style="margin-top: 5px"
      >
        <template slot="dd" slot-scope="text, record">
          {{ record.startaddress }}{{ record.startaddress1 }}{{ record.startaddress2 }}{{ record.startaddress3|replaceX }}
        </template>
        <template slot="ddao" slot-scope="text, record">
          {{ record.rdddzxx }}{{ record.rdddzxx1 }}{{ record.rdddzxx2 }}{{ record.rdddzxx3|replaceX }}
        </template>
        <template slot="action" slot-scope="text, record">
          <a v-permission="{active:'QWRSheetEofAOriginsele'}" slot="action" @click="showModal(record.FStId)">查看&nbsp;&nbsp;</a>
          <a v-permission="{active:'QWRSheetEofAOriginupd'}" slot="action" @click="updateModal(record.FStId)">修改&nbsp;&nbsp;</a>

          <!-- <template>
            <a-popconfirm
              placement="topRight"
              title="确认删除？"
              ok-text="确定"
              @confirm="confirm(record.FStId)"
              cancel-text="取消"
            >
              <a>删除&nbsp;&nbsp;</a>
            </a-popconfirm>
          </template> -->
        </template>
      </a-table>
      <div>
        <a-pagination
          size="small"
          :total="total"
          :default-current="offset"
          show-size-changer
          show-quick-jumper
          style="margin: 10px"
          :current="offset"
          @change="onChanges"
          @showSizeChange="onShowSizeChange"
        />
        <span
          style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
        >当前第 {{ this.offset }}/{{ Math.ceil(this.total / this.limit) }} 页 共 {{ this.total }} 条记录 每页
          {{ this.limit }} 条</span
        >
      </div>
    </a-card>
    <!-- 增加表单-->
    <a-modal
      :zIndex="999"
      :destroyOnClose="true"
      @cancel="rel"
      title="增加申报单"
      width="1000px"
      :footer="null"
      v-model="visible">
      <dwcd-add ref="avatar"></dwcd-add>
    </a-modal>
    <!-- 修改表单-->
    <a-modal title="修改申报单" :footer="null" v-model="updatevisible" width="1000px">
      <dwcd-update @gb="gb" :updateinfo="uinfo"></dwcd-update>
    </a-modal>
    <!-- 显示表单 title="详情"-->
    <a-modal v-model="showvisible" :footer="null" width="1000px">
      <dwcd-info :myinfo="info"></dwcd-info>
    </a-modal>
    <!-- 删除提示 -->
    <a-modal
      title="删除"
      :visible="delInfo"
      @ok="pil"
      @cancel="handleCancel"
      width="400px"
      :destroyOnClose="true"
    >
      <p>是否删除？</p>
    </a-modal>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getAddreeCondition } from '@/assets/getAddree'
import dwcdUpdate from './dwcdjyCompont/dwcdjyUpdate.vue'
import dwcdAdd from './dwcdjyCompont/dwcdjyAdd.vue'
import dwcdInfo from './dwcdjyCompont/dwcdjyInfo.vue'
import dwjyAinfo from '@/views/jyjg/dwjy/dwcdjyCompont/dwjy'

// eslint-disable-next-line no-irregular-whitespace
import formatTime from '@/utils/public.js'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import { getAnimalOriginList, getAnimalOriginInfo, DeclarationCDDel } from '@/api/cdjyEb/cdjyshbd'
var yenum = 1

// eslint-disable-next-line no-unused-vars
var yeOffset = 10

const columns1 = [
  {
    title: '序号',
    width: 80,
    key: 'FStId',
    align: 'center',
    dataIndex: 'FStId',
    customRender: (t, r, index) => {
      if (yenum === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenum - 1) * yeOffset + 1
      }
    }
  },
  {
    title: '记录单编号',
    key: 'recordNo',
    width: 250,
    align: 'center',
    dataIndex: 'recordNo'
  },
  {
    title: '报检时间',
    key: 'DateQF',
    align: 'center',
    dataIndex: 'DateQF',
    width: 120,
    customRender: (t, r, index) => {
      return formatTime(t, 'yyyy-MM-dd')
    }
  },
  {
    title: '检疫时间',
    key: 'FSuTime',
    align: 'center',
    dataIndex: 'FSuTime',
    width: 120,
    customRender: (t, r, index) => {
      return t ? formatTime(t, 'yyyy-MM-dd') : ''
    }
  },
  {
    title: '货主姓名',
    key: 'shippername',
    align: 'center',
    dataIndex: 'shippername',
    width: 150
  },
  {
    title: '动物种类',
    key: 'animalsort',
    align: 'center',
    dataIndex: 'animalsort',
    width: 120
  },
  {
    title: '用途',
    key: 'myuse',
    align: 'center',
    dataIndex: 'myuse',
    width: 120
  },
  {
    title: '养殖场、村、原驻地或捕获地名称',
    key: 'farmsnme',
    align: 'center',
    dataIndex: 'farmsnme',
    width: 250
  },
  {
    title: '检疫地点',
    key: 'quarantineaddress',
    align: 'center',
    dataIndex: 'quarantineaddress',
    width: 120
  },
  // {
  //   title: '启运地点',
  //   key: 'rqydzxx',
  //   align: 'center',
  //   dataIndex: 'rqydzxx',
  //   width: 80
  // },
   {
    title: '启运地点',
    key: 'dd',
    align: 'center',

    width: 320,
    scopedSlots: { customRender: 'dd' }

  },
  // {
  //   title: '到达地点',
  //   key: 'rdddzxxs',
  //   align: 'center',
  //   dataIndex: 'rdddzxxs',
  //   width: 80
  // },
 {
    title: '到达地点',
    key: 'ddao',
    align: 'center',
   scopedSlots: { customRender: 'ddao' },
    width: 320
  },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    align: 'center',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}
export default {
  components: {
    dwcdInfo,
    dwcdAdd,
    dwcdUpdate,
    dwjyAinfo
  },
   inject: ['reload'],
  data () {
    return {
      addree: '',
       selectedRowKeys: [],
      options: [],
      // 行政存储
      FeQD: [],
      FeQS: [],
      FeDJ: [],
      FeDjz: [],
      yenum,
      xingzheng: false,
      // 区，动监站选择
      regionTF: false,
      regInfo: [],
      peoTF: false,
      peoInfo: [],

      // 区名称
      regName: '请选择',
      // 动监站名称
      peoName: '请选择',

      form: {
        name: '',
        phone: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rowSelection,
      visible: false,
      updatevisible: false,
      showvisible: false,
      idList: '',
      columns1,
      data1: [],
      info: {},
      uinfo: {},
      limit: 10,
      offset: 1,
      total: 0,
      delInfo: false,
      UserId: sessionStorage.getItem('FStId'),
      selectwhere: ''
    }
  },
  created () {
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
    this.getAll({
      selectwhere: this.selectwhere,
      UserId: this.UserId,
      limit: this.limit,
      offset: this.offset
    })
  },
  methods: {
    rel () {
      this.$refs.avatar.relod()
    },
    getAddree (val) {
      // eslint-disable-next-line no-unused-vars
      const arr = ['startaddress1', 'startaddress2', 'startaddress3']
    this.addree = getAddreeCondition(arr, val.label, this.options)
    this.limit = 10
    this.offset = 1
    yenum = 1
       this.getAll({
      selectwhere: this.selectwhere,
      UserId: this.UserId,
      limit: 10,
      offset: 1,
      addree: this.addree
    })
    },
    cx () {
      yenum = 1
    //   this.getAll({
    //   selectwhere: this.selectwhere,
    //   UserId: this.UserId,
    //   limit: this.limit,
    //   offset: 1
    // })
    const p = {
       selectwhere: this.selectwhere,
      UserId: this.UserId,
      limit: this.limit,
      offset: 1
    }
     getAnimalOriginList(p)
        .then(res => {
          console.log(res)
          const Clres = JSON.parse(res.Data)

          this.data1 = Clres.rows
          this.total = parseInt(Clres.total)
          this.offset = 1
        })
        .catch(rol => {
          console.log(rol)
        })
    },
     getAll (p) {
      getAnimalOriginList(p)
        .then(res => {
          console.log(res)
          const Clres = JSON.parse(res.Data)
          console.log(Clres)
          this.data1 = Clres.rows
          this.total = parseInt(Clres.total)
        })
        .catch(rol => {
          console.log(rol)
        })
    },
      delet (v) {
       if (!this.selectedRowKeys.length) {
        this.$notification.error({
          message: '请选择一条数据'
        })
      } else {
      this.FStIdItme = v.FStId
      this.delInfo = true
      }
    },
        handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.updateinfo = false
      this.jinyong = false
      this.userdanwei1 = ''
      this.isPositiveResult = false
      this.SBmodalTF = false
      this.selectedRowKeys1 = []
      this.delAllTF = false
      this.delInfo = false
      // 给对应的表单元素赋值
      this.form.setFieldsValue({
        FuseEName: this.userdanwei1
      })
      this.form.resetFields()
    },
    gb () {
      this.updatevisible = false
    },

    deleteInfo (ids) {
      DeclarationCDDel(ids, this.UserId)
        .then(res => {
          this.$message.success('删除成功')
          yenum = 1
         this.reload()
        })
        .catch(res => {
          this.$message.error('服务器错误')
        })
    },
     onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRows)
      this.selectedRowKeys = selectedRowKeys
      var arr = ''
      selectedRows.forEach(item => {
        arr = arr + ',' + item.FStId
      })
      this.idList = arr.substring(1)
    },
  async pil () {
        if (this.selectedRowKeys.length > 0) {
          console.log(this.idList)
          await this.deleteInfo(this.idList)
         this.idList = ''
      } else {
        alert('请选择要删除的数据')
      }
    },
    confirm (id) {
      console.log(id)
      this.deleteInfo(id)
    },
    onShowSizeChange (current, pageSize) {
      console.log('1111', current, pageSize)
      yeOffset = pageSize
      this.offset = current
      this.limit = pageSize
      yenum = current
      const p = {
        selectwhere: this.selectwhere,
        UserId: this.UserId,
        limit: this.limit,
        offset: this.offset,
        addree: this.addree
      }
      this.getAll(p)
      this.totalPage = Math.ceil(this.total / this.limit)
    },
    onChanges (checkedValues) {
      this.selectedRowKeys = []
      console.log(checkedValues)
      yenum = checkedValues
      this.offset = checkedValues
      const p = {
        selectwhere: this.selectwhere,
        UserId: this.UserId,
        limit: this.limit,
        offset: this.offset,
        addree: this.addree
      }
      this.getAll(p)
    },

    updateModal (FstId) {
      getAnimalOriginInfo(FstId, this.UserId)
        .then(res => {
          console.log(res)
          this.uinfo = res.Data
          this.updatevisible = true
        })
        .catch(res => {
          this.$message.error('服务器错误')
        })
    },
    addModal () {
      this.visible = true
    },

    showModal (FstId) {
      getAnimalOriginInfo(FstId, this.UserId)
        .then(res => {
          console.log(res)
          this.info = res.Data
          this.showvisible = true
        })
        .catch(res => {
          this.$message.error('服务器错误')
        })
    },

    // 市级选择触发
    ChangeTown (val) {
      console.log(val)
    },
    ChangeRegion (val) {
      console.log(val)
      if (val === '请选择') {
        this.peoTF = false
      } else {
        this.peoTF = false
        setTimeout(() => {
          this.peoTF = true
          this.regName = this.regInfo[val].label
          this.peoName = '请选择'
          this.peoInfo = this.regInfo[val].children
        }, 0)
      }
    },
    ChangePeo (val) {
      if (val === '请选择') {
        this.peoName = '请选择'
      } else {
        this.peoTF = true
        this.peoName = this.peoInfo[val].label

        console.log(this.regName, this.peoName)
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

<style scoped lang="less">
.qq {
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
}
.zb {
  margin-left: 55%;
}
.foot {
  letter-spacing: 2px;
}
.maintop {
  font-size: 20px;
  margin-left: 50%;
  margin-bottom: 10px;
  display: inline-block;
  transform: translateX(-50%);
}

.test {
  display: inline-block;
  width: 700px;
  letter-spacing: 2px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.card {
  margin-top: 30px;
}

.ainput {
  width: 400px;
  margin-right: 20px;
}

.abutton {
  margin-right: 30px;
}

</style>
