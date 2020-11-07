<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <div style="display: flex;justify-content: flex-end;">
            <a-tree-select
              style="margin: 10px ;width: 250px;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="所在地"
              allowClear
              :tree-data="options"
            >
            </a-tree-select>
          </div>
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="InfoClresTF"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a v-permission="{active: 'ISLETagssele'}" slot="action" @click="showModal(record)">查看&nbsp;&nbsp;</a>
            </template>
          </a-table>
        </div>
      </div>
    </page-header-wrapper>
    <!-- 查看弹窗 -->
    <a-modal
      :title="'查看'"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      :footer="null"
      width="1000px"
      :destroyOnClose="true"
    >
      <div style="margin-bottom: 50px;">
        <h1 style="text-align:center"><b>耳标库存详情</b></h1>
        <!-- <a-table
          :columns="columnsFind"
          :data-source="findDataInfo"
          :scroll="{ x: 900 }"
          style="margin-top:5px;"
        >
        </a-table> -->
        <textarea style="width: 100%;" v-model="erBiao"> </textarea>
      </div>
    </a-modal>
  </div>
</template>
<script>
// 接口请求调用
import { husbStockGet } from '@/api/jbfk'
import { getAdminAddress } from '@/api/AdministrativeAddress'

// 当前页
// var yenum1 = 1

const columns = [
  { title: '耳标类型', width: 200, align: 'center', dataIndex: 'BHAnimal', key: 'BHAnimal' },
  { title: '数量(枚)', width: 200, align: 'center', dataIndex: 'Column1', key: 'Column1' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]

// const InfoClres = [{
//     BHAnimal: '猪耳标',
//     Column1: '0'
//   }, {
//     BHAnimal: '牛耳标',
//     Column1: '0'
//   }, {
//     BHAnimal: '羊耳标',
//     Column1: '0'
//   }]

export default {
  data () {
    return {
      queryParam: { status: 0, status1: 0 },
      fromdata: '',
      columns,

      InfoClresTF: [],

      // from 表单
      form: this.$form.createForm(this),
      columnsFind: [
         { title: '箱号', width: 200, align: 'center', dataIndex: 'CartonNo', key: 'CartonNo' },
         { title: '箱号', width: 200, align: 'center', dataIndex: 'FZzNumber', key: 'FZzNumber' }
      ],
      findDataInfo: [],
      // 点击 弹出框
      visible: false,
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
      options: [],
      UserId: sessionStorage.getItem('FStId'),
      erBiao: '',
      BHAnimalname: '',
      InfoClresList: []
    }
  },
  components: {
    husbStockGet
  },
  created () {
    // var parameter = {
    //   UserId: this.UserId
    // }
    // husbStockGet(parameter).then(res => {
    //   console.log(res)
    //  })
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
        console.log(this.FeQD, this.FeQS, this.FeDJ)
      })
      .catch(rol => {
        console.log(rol)
      })
      // this.UserId = 29693
    this.BHAnimalcheck()
  },
  methods: {
    // 弹窗
    showModal (record) {
      this.BHAnimalname = record.BHAnimal
      this.visible = true
      var p = {
        BHAnimal: this.BHAnimalname,
        UserId: this.UserId
      }
      husbStockGet(p)
        .then(res => {
          console.log(res)
          if (res.Result) {
            // this.findDataInfo = res.Data
            if (res.Data.FZzNumber) {
              this.erBiao = res.Data.FZzNumber
            } else {
              this.erBiao = res.Msg
            }
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 查询所有
    BHAnimalcheck (valName) {
      var p = {
        BHAnimal: this.BHAnimalname,
        UserId: this.UserId
      }
      if (this.UserId === '1') {
        this.InfoClresTF = [
          {
            BHAnimal: '猪耳标',
            Column1: '0'
          },
          {
            BHAnimal: '牛耳标',
            Column1: '0'
          },
          {
            BHAnimal: '羊耳标',
            Column1: '0'
          }
        ]
        husbStockGet(p).then(res => {
          console.log(res)
        })
      } else {
        husbStockGet(p)
        .then(res => {
          if (res.Data) {
            var Clres = res.Data
            console.log(Clres)
            this.InfoClresTF = Clres.BHAnimal
          }

          this.erBiao = res.Msg
        })
        .catch(rol => {
          console.log(rol)
        })
      }
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
