<template>
  <div>
    <h1 class="infoTop">动物检疫合格证明<span class="s">（动物A）</span></h1>
    <h3 class="hao">NO：32343132123</h3>
    <a-descriptions :column="3" bordered>
      <a-descriptions-item label="货主" :span="1.5"> 张三 </a-descriptions-item>
      <a-descriptions-item label="联系电话" :span="1.5"> 13756783245 </a-descriptions-item>
      <a-descriptions-item label="动物种类" :span="1.5"> 狗 </a-descriptions-item>
      <a-descriptions-item label="数量及单位" :span="1.5"> 1 &nbsp;&nbsp;只 </a-descriptions-item>
      <a-descriptions-item label="起运地点" :span="3"> 广东省青岛市李沧区大佬路37号 </a-descriptions-item>
      <a-descriptions-item label="到达地点" :span="3"> 广东省深圳市宝安区 </a-descriptions-item>
      <a-descriptions-item label="用途" :span="1"> 宠用 </a-descriptions-item>
      <a-descriptions-item label="承运人" :span="1"> 南方航空 </a-descriptions-item>
      <a-descriptions-item label="联系电话" :span="1"> 21312121321 </a-descriptions-item>
      <a-descriptions-item label="运载方式" :span="2"> 航空 </a-descriptions-item>
      <a-descriptions-item label="运载工具牌号" :span="1"> CZ2312 </a-descriptions-item>
      <a-descriptions-item label="运载工具消毒情况" :span="3"> 装在前经<u>次氯氰胺</u>消毒 </a-descriptions-item>
    </a-descriptions>
    <div class="zhong">
      <h3 class="ben">本批动物经检疫合格，应于<u>3</u>日内到达有效</h3>
      <h3 class="er">官方兽医签字：<u>范例东</u></h3>
      <h3 class="er">签发日期：2020年9月10日</h3>
      <h4 class="z">（动物卫生监督所检疫专用章）</h4>
    </div>
    <a-descriptions :column="3" bordered>
      <a-descriptions-item label="畜生耳标号" :span="3"> </a-descriptions-item>
      <a-descriptions-item label="动物卫生监督检查签章" :span="3"></a-descriptions-item>
      <a-descriptions-item label="备注" :span="3"></a-descriptions-item>
    </a-descriptions>

    <div class="foot">
      <h4>1.本证书一式两份，第一联由动物卫生监督所保留，第二联随货同行</h4>
      <h4>2.跨省调运动物到达目的地后，货主或承运人应在24小时内向输入动物卫生监督机构报告。</h4>
      <h4>3.动物卫生鉴定监督机构联系电话：66088353</h4>
    </div>
    <a-button type="primary" class="dayi">打印</a-button>
  </div>
</template>

<script>
import { AnimalA, AnimalAinfo } from '@/api/cdjy'
import { getAdminAddress } from '@/api/AdministrativeAddress'
// eslint-disable-next-line no-unused-vars
var yenum = 1
var yeOffset = 10
const columns1 = [
 {
    title: '序号',
    width: 40,
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
    title: '签发日期',
    key: 'issuedDate',
    width: 80,
    align: 'center',
    dataIndex: 'issuedDate'
  },
  {
    title: '检疫证编号',
    key: 'code',
    align: 'center',
    dataIndex: 'code',
    width: 80
  },
  {
    title: '货主',
    key: 'consignee',
    align: 'center',
    dataIndex: 'consignee',
    width: 80
  },
  {
    title: '动物种类',
    key: 'sort',
    align: 'center',
    dataIndex: 'sort',
    width: 80
  },
  {
    title: '数量',
    key: 'num',
    align: 'center',
    dataIndex: 'num',
    width: 80
  },
  {
    title: '单位',
    key: 'unit',
    align: 'center',
    dataIndex: 'unit',
    width: 80
  },
  {
    title: '用途',
    key: 'purpose',
    align: 'center',
    dataIndex: 'purpose',
    width: 80
  },
  {
    title: '启运地点',
    key: 'dispStart',
    align: 'center',
    dataIndex: 'dispStart',
    width: 80
  },
  {
    title: '到达地点',
    key: 'dispEnd',
    align: 'center',
    dataIndex: 'dispEnd',
    width: 80
  },
  {
    title: '承运人',
    key: 'carrier',
    align: 'center',
    dataIndex: 'carrier',
    width: 80
  },
  {
    title: '有效到达日',
    key: 'validDate',
    align: 'center',
    dataIndex: 'validDate',
    width: 80
  },

  {
    title: '官方兽医签字',
    key: 'veterinarySign',
    align: 'center',
    dataIndex: 'veterinarySign',
    width: 80
  },
  {
    title: '检疫证状态',
    key: 'isPrint',
    align: 'center',
    dataIndex: 'isPrint',
    width: 80
  },

  {
    title: '网格名称',
    key: 'Gname',
    align: 'center',
    dataIndex: 'Gname',
    width: 80
  },

  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 80,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  props: {

  },
  data () {
    return {
      infoA: {},
      data1: [],
      selectWhere: '',
       // header 里的 userid
      UserId: sessionStorage.getItem('FStId'),
       // 总条数
      total: 0,
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

      queryParam: { status: 0, status1: 0 },
      visible: false,
      options: [],
      columns1

    }
  },
  created () {
    console.log(this.$attrs)
     this.findAll({
        offset: this.offset,
        limit: this.limit,
        selectWhere: this.selectWhere
      })
    getAdminAddress()
      .then((res) => {
        // this.options = JSON.parse(res)
        console.log(res)
        this.options = res
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    cx () {
      this.findAll({
        offset: this.offset,
        limit: this.limit,
        selectWhere: this.selectWhere
      }).then(res => {
        console.log(res)
      })
    },
    async findAll (data) {
     const res = await AnimalA(data, this.UserId)
     this.data1 = JSON.parse(res.Data).rows
     this.total = parseInt(JSON.parse(res.Data).total)
    },
   onShowSizeChange (current, pageSize) {
       console.log('1111', current, pageSize)
      const data = {
        limit: pageSize,
        offset: current,
        selectWhere: ''
        }
        yeOffset = pageSize
        this.findAll(data)
        this.limit = pageSize
        yenum = current

        this.totalPage = Math.ceil(this.total / this.limit)
    },
      onChanges (checkedValues) {
        this.selectedRowKeys = []
        console.log(checkedValues)
        yenum = checkedValues

        this.offset = checkedValues
      var p = {
          limit: this.limit,
          offset: this.offset,
          selectWhere: ''
        }
        this.findAll(p)
    },
    showModal (id) {
      AnimalAinfo(id).then(res => {
        this.infoA = res.Data[0]
      }).catch(res => {
        console.log('失败')
      })
      this.visible = true
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
