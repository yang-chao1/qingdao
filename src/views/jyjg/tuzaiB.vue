<template>
  <div>
    <page-header-wrapper> </page-header-wrapper>
    <a-card class="card">
      <a-input size="large" class="ainput" placeholder="" />
      <a-button class="abutton" type="primary">查询</a-button>
      <a-button class="abutton" type="primary">定制</a-button>
      <a-button type="primary">导出</a-button>
      <!-- <a-row>
        <a-col :span="12" :offset="6">
           <a-tree-select
              style="width: 25%;position: relative;left: 100%; top: 0;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="所在地"
               :tree-data="options"
            >
            </a-tree-select>
        </a-col>
      </a-row> -->
      <a-table
        :loading="isloading"
        :pagination="false"
        :columns="columns1"
        :data-source="listInfo"
        :scroll="{ x: 2000 }"
        style="margin-top: 5px"
      >

      </a-table>
      <div>
        <a-pagination
          size="small"
          :total="total"
          show-size-changer
          show-quick-jumper
          style="margin: 10px"
          :current="offset"
          @change="changePage"
          @showSizeChange="onShowSizeChange"
        />
        <span
          style="float: right;font-size:15px; margin-top:-2%;margin-right:5%"
        >当前第{{ offset }} / {{ totalPage }} 页 共 {{ total }} 条记录 每页 {{ limit }} 条</span>
      </div>
    </a-card>

  </div>
</template>

<script>
import { getAdminAddress } from '@/api/AdministrativeAddress'
import { getProductB } from '@/api/tzjysl/jyczB'
import formatTime from '@/utils/public.js'

const columns1 = [
  {
    title: '序号',
    width: 80,
    key: 'FStId',
    align: 'center',
    dataIndex: 'FStId'
  },
  {
    title: '签发日期',
    key: 'issuedDate',
    width: 180,
    align: 'center',
    dataIndex: 'issuedDate',
    customRender: (t, r, index) => {
      return t ? formatTime(t, 'yyyy-MM-dd hh:mm:ss') : ''
    }
  },
  {
    title: '检疫证编号',
    key: 'code',
    align: 'center',
    dataIndex: 'code',
    width: 180
  },
  {
    title: '货主',
    key: 'consignee',
    align: 'center',
    dataIndex: 'consignee',
    width: 200
  },
  {
    title: '产品名称',
    key: 'productName',
    align: 'center',
    dataIndex: 'productName',
    width: 150
  },
  {
    title: '数量',
    key: 'num',
    align: 'center',
    dataIndex: 'num',
    width: 120
  },
  {
    title: '单位',
    key: 'unit',
    align: 'center',
    dataIndex: 'unit',
    width: 120
  },
  {
    title: '产地',
    key: 'changdi',
    align: 'center',
    dataIndex: 'changdi',
    width: 320
  },
  {
    title: '生产单位名称地址',
    key: 'prodUnitNameAdd',
    align: 'center',
    dataIndex: 'prodUnitNameAdd',
    width: 320
  },

  {
     title: '目的地',
    key: 'dispEnd',
    align: 'center',
    dataIndex: 'dispEnd',
    width: 320
  },
  {
    title: '官方兽医签字',
    key: 'veterinarySign',
    align: 'center',
    dataIndex: 'veterinarySign',
    width: 150
  },
  {
    title: '检疫证状态',
    key: 'isPrint',
    align: 'center',
    dataIndex: 'isPrint',
    width: 120
  },

  {
    title: '网格名称',
    key: 'Gname',
    align: 'center',
    dataIndex: 'Gname',
    width: 120
  }

]

var yenum = 1
var yeOffset = 10
export default {
  data () {
    return {
      yenum,
      yeOffset,
      limit: 10,
      offset: 1,
      total: 0,
      totalPage: 1,
      UserId: sessionStorage.getItem('FStId'),
      // 模糊查询
      consignee: '',
      visible: false,
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
      columns1,
      listInfo: [],
      isloading: false
    }
  },
  created () {
    this.isloading = true
    getAdminAddress()
      .then((res) => {
        // this.options = JSON.parse(res)
        console.log(res)
        this.options = res
      })
      .catch((err) => {
        console.log(err)
      })
    this.getProductBlist()
  },
  methods: {
    getProductBlist () {
      var p = {
        limit: this.limit,
        offset: this.offset,
        UserId: this.UserId,
        consignee: this.consignee
      }
      getProductB(p).then(res => {
        this.isloading = false
        console.log(res)
        if (res.Result) {
          var Clres = JSON.parse(res.Data)
          this.listInfo = Clres.rows
          this.total = parseInt(Clres.total)
          this.totalPage = Math.ceil(this.total / this.limit)
        }
      }).catch(rol => {
        console.log(rol)
      })
    },
    showModal () {
      this.visible = true
    },
     // 页码改变
    changePage (current, pageSize) {
      //  current 改变后的页码，pageSize 每页显示条数
      console.log('log:', current, pageSize)
      this.offset = current
      yenum = current

      this.getProductBlist()
    },
    // 每页数量改变
    onShowSizeChange (current, pageSize) {
      // console.log(current, pageSize)
       this.limit = pageSize
      yenum = current
      yeOffset = pageSize

      this.getProductBlist()
    }
  }
}
</script>

<style scoped lang="less">
.z {
  margin-left: 70%;
}
.zhong {
  margin: 20px 0;
}
.dayi {
  margin-top: 30px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.foot {
  margin-left: 40px;
  position: relative;
}
.foot:before {
  content: "注：";
  position: absolute;
  top: 0;left: -40px;

}
.er {
  margin-left: 60%;
}
.ben {
  margin-left: 20%;
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

.infoTop {
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
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
  width: 800px !important;
}
/deep/ .a-button {
  margin-right: 40px !important;
}
</style>
