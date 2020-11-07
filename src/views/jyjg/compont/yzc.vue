<template>
  <div>

    <a-input size="large" class="ainput" placeholder="" />
    <a-button class="abutton" type="primary">查询</a-button>

    <a-row>
      <a-col :span="12" :offset="6">

      </a-col>
    </a-row>
    <a-table
      :pagination="false"

      :columns="columns1"
      :data-source="shu"
      style="margin-top: 5px"
    >
      <template slot="action" slot-scope="text, record">
        <a slot="action" @click="qu(record)">选择&nbsp;&nbsp;</a>

      </template>
    </a-table>
    <div>
      <a-pagination
        size="small"
        :total="50"
        show-size-changer
        show-quick-jumper
        style="margin: 10px"
        :current="3"
      />
      <span
        style="float: right;font-size:15px; margin-top:-2%;margin-right:5%"
      >当前第1 / 2 页 共 10 条记录 每页 10 条</span>
    </div>

  </div>
</template>

<script>
import { getAdminAddress } from '@/api/AdministrativeAddress'
const columns1 = [

  {
    title: '名称',
    key: 'FFarmName',
    width: 80,
    align: 'center',
    dataIndex: 'FFarmName'
  },
  {
    title: '动物种类',
    key: 'FCategory',
    align: 'center',
    dataIndex: 'FCategory',
    width: 80
  },
  {
    title: '地址',
    key: 'FCityAdd',
    align: 'center',
    dataIndex: 'FCityAdd',
    width: 80
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
  props: {
    // eslint-disable-next-line vue/require-default-prop
    shu: {
      type: Array
    }
  },
  data () {
    return {

      options: [],
      // 行政存储
      FeQD: [],
      FeQS: [],
      FeDJ: [],
      FeDjz: [],
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

      columns1

    }
  },
  created () {
    // 行政树
    getAdminAddress()
      .then((res) => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
        // this.regName = '请选择'
        res.forEach((item) => {
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
      .catch((rol) => {
        console.log(rol)
      })
  },
  methods: {
    qu (data) {
      console.log(11)
      this.$emit('child-event', data)
    },
    updateModal () {
      this.updatevisible = true
    },
    addModal () {
      this.visible = true
    },
    showModal () {
      this.showvisible = true
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
    }
  }
}
</script>

<style scoped lang="less">
.infoTop {
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
}
.dayi {
  margin-top: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.z {
  margin-left: 70%;
}
.foot1 {
  margin-left: 40px;
  position: relative;
}
.foot1:before {
  content: "注：";
  position: absolute;
  top: 0;left: -40px;
}
.er {
  margin-left: 60%;
}

.zhong {
  margin: 20px 0;
}
.hao {
  color: red;
  margin-left: 70%;
  display: inline-block;
}
.s {
  margin-left: 10px;
  font-size: 18px;
}

.qq {
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
}
.zb {
  margin-left: 55%;
}
.foot {
  letter-spacing:2px
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

/deep/ .ant-modal {
  width: 900px !important;
}
</style>
