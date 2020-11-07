<template>
  <div>

    <a-input size="large" v-model="selectWhere" class="ainput" placeholder="" />
    <a-button class="abutton" type="primary" @click="cx">查询</a-button>

    <a-row>
      <a-col :span="12" :offset="6">

      </a-col>
    </a-row>
    <a-table
      :pagination="false"
      :scroll="{ x: 2000 }"
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

    </div>

  </div>
</template>

<script>

import { getAdminAddress } from '@/api/AdministrativeAddress'
const columns1 = [

  {
    title: '编号',
    key: 'QDWNumber',
    width: 80,
    align: 'center',
    dataIndex: 'QDWNumber'
  },
   {
    title: '报检时间',
    key: 'DateQF',
    width: 120,
    align: 'center',
    dataIndex: 'DateQF'
  },
   {
    title: '货主',
    key: 'QDWCargoOwner',
    width: 80,
    align: 'center',
    dataIndex: 'QDWCargoOwner'
  },

   {
    title: '电话',
    key: 'QDWPhone',
    width: 80,
    align: 'center',
    dataIndex: 'QDWPhone'
  },
   {
    title: '养殖场名称',
    key: 'yzcmc',
    width: 80,
    align: 'center',
    dataIndex: 'yzcmc'
  },
   {
    title: '动物种类',
    key: 'QDWXuZhongZ',
    width: 80,
    align: 'center',
    dataIndex: 'QDWXuZhongZ'
  },
  {
    title: '数量',
    key: 'QDWQuantity',
    align: 'center',
    dataIndex: 'QDWQuantity',
    width: 80
  },
   {
    title: '单位',
    key: 'QDWDanWei',
    align: 'center',
    dataIndex: 'QDWDanWei',
    width: 80
  },
  {
    title: '起运地',
    key: 'QDAddQy',
    align: 'center',
    dataIndex: 'QDAddQy',
    width: 80
  },
  {
    title: '到达地',
    key: 'QDWAddDd',
    align: 'center',
    dataIndex: 'QDWAddDd',
    width: 80
  },
  {
    title: '官方兽医',
    key: 'QDWAttn',
    align: 'center',
    dataIndex: 'QDWAttn',
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
selectWhere: '',
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

      columns1,

      info: {
        bianhao: 'sdfy12123',
        declarationtime: '2020-01-03',
        Applicant: '单位i',
        phoneNum: '12345323',
        animal: '动物种类',
        numApplicant: 30,
        yuan: '来源',
        userTu: 'userTu',
        di: 'dsfkjk',
        shiji: '2020-02-03',
        didian: 'dfd',
        name: '张三',
        ztai: '不受理',
        yuany: 'jesdfds',
        jbr: '李氏',
        slsj: '2015-10-11'
      }
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
    async cx () {
      this.$emit('child-eventxx', this.selectWhere)
    },
    qu (data) {
      console.log(11)
      this.$emit('child-eventbao', data)
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
