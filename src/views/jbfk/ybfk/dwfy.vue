<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;" @submit="handleSubmit" :form="form">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="养殖场名称">
                    <a-input v-decorator="['xx']" size="large" style="width: 150%" />
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
                    <a-button type="primary" html-type="submit" style="height:40px">查询</a-button>
                  </span>
                </a-col>
              </div>
            </a-row>
          </a-form>
          <div style="margin-top:35px;">
            <a-button v-permission="{active:'Animalpreventiondele'}" @click="delAll" type="primary" style="height:40px">批量删除</a-button>

            <!--  查看弹窗 -->
            <a-modal
              title="动物防疫详情"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1000px"
              :destroyOnClose="true"
            >
              <div>
                <a-form @submit="handleSubmit" :form="updateinfoform">
                  <a-row>
                    <a-col :span="12"> </a-col>
                    <a-col :span="12"> </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="防疫编号"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          :disabled="!this.f"
                          v-decorator="['PreventionNumber', { rules: [{ required: true, message: '请输入' }] }]"
                          name="PreventionNumber"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="养殖场名称"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          :disabled="!this.f"
                          v-decorator="['FarmName', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FarmName"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="动物种类"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          :disabled="!this.f"
                          v-decorator="['AnimalZL', { rules: [{ required: true, message: '请输入' }] }]"
                          name="AnimalZL"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="免疫种类"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          :disabled="!this.f"
                          v-decorator="['MYZL', { rules: [{ required: true, message: '请输入' }] }]"
                          name="MYZL"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="实免数"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          :disabled="!this.f"
                          v-decorator="['SMS', { rules: [{ required: true, message: '请输入' }] }]"
                          name="SMS"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="创建时间"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          :disabled="!this.f"
                          v-decorator="['CreateTIme', { rules: [{ required: true, message: '请输入' }] }]"
                          name="CreateTIme"
                        /> </a-form-item
                      ></a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="图片地址"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          v-if="imgInfo.length == 0"
                          :disabled="!this.f"
                          v-decorator="['IMGURL', { rules: [{ required: true, message: '请输入' }] }]"
                          name="IMGURL"
                        />
                        <viewer :images="imgInfo" style="width: 180px;" v-if="imgInfo.length !== 0">
                          <img
                            v-for="(item, index) in imgInfo"
                            :src="item.src"
                            :key="index"
                            style="width:40px; height:40px;"
                          />
                        </viewer>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="耳标号"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-textarea
                          autosize
                          :disabled="!this.f"
                          v-decorator="['EarLabel', { rules: [{ required: true, message: '请输入' }] }]"
                          name="EarLabel"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- <div class="zb">
                    填表人：  xxx 填表时间：12123123

                  </div> -->
                </a-form>
              </div>
            </a-modal>
            <!-- 删除弹窗 -->
            <a-modal
              title="删除"
              :visible="delInfo"
              @ok="handleDel"
              @cancel="handleCancel"
              width="400px"
              :destroyOnClose="true"
            >
              <p>是否删除？</p>
            </a-modal>
          </div>
          <!-- 页面表格 -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="HusbStockGetList"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a v-permission="{active:'Animalpreventionsele'}" slot="action" @click="find(record)">查看&nbsp;&nbsp;</a>
              <!-- <a v-permission="{active:'Animalpreventionupd'}" slot="action" @click="update(record)">修改&nbsp;&nbsp;</a> -->
              <!-- <a slot="action" @click="delet(record)">删除&nbsp;&nbsp;</a> -->
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
            >当前第 {{ offset }}/{{ Math.ceil(totalnum / 10) }} 页 共 {{ totalnum }} 条记录 每页 10 条</span
            >
          </div>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
// 接口请求调用
import { getQuaEntrancexq, getQuaEntranceUpdate } from '@/api/tzgl/rccy'

import { getFYGetList, getFYDelItem, getFYGetXQ } from '@/api/jbfk/dwfy.js'
import mapaddres from '../../../../static/citys'
import Qs from 'qs'
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
  { title: '防疫编号', width: 200, align: 'center', dataIndex: 'PreventionNumber', key: 'PreventionNumber' },
  { title: '养殖场名称', width: 220, align: 'center', dataIndex: 'FarmName', key: 'FarmName' },
  {
    title: '创建时间',
    width: 220,
    align: 'center',
    dataIndex: 'CreateTIme',
    key: 'CreateTIme',
    customRender: (t, r, index) => {
      return formatTime(t, 'yyyy-MM-dd')
    }
  },
  { title: '动物种类', width: 200, align: 'center', dataIndex: 'AnimalZL', key: 'AnimalZL' },
  { title: '免疫种类', width: 200, align: 'center', dataIndex: 'MYZL', key: 'MYZL' },
  { title: '实免数', width: 200, align: 'center', dataIndex: 'SMS', key: 'SMS' },
  { title: '耳标号', width: 200, align: 'center', dataIndex: 'EarLabel', key: 'EarLabel' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]

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
      selectwhere: 1,
      FarmName: '',

      queryParam: { status: 0, status1: 0 },
      fromdata: '',
      columns,
      HusbStockGetList: [],

      // from 表单
      form: this.$form.createForm(this),
      updateinfoform: this.$form.createForm(this),

      // 点击 弹出框
      visible: false,
      FStIdItme: '',
      delInfo: false,
      f: true,
      updateinfo: false,
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      loading: false,
      FStId: sessionStorage.getItem('FStId'),
      FuseEName: sessionStorage.getItem('FuseEName'),
      infores: {},
      delTF: false,
      delAllInfo: [],
      imgInfo: [],
      photoTop: 'data:image/jpg;base64,'
    }
  },
  created () {
    console.log(mapaddres)

    yenum1 = 1
    this.getHusbStockGetList()
  },
  methods: {
    // 获取列表数据
    getHusbStockGetList () {
      var p = {
        UserId: this.FStId,
        offset: this.offset,
        limit: this.limit,
        FarmName: this.FarmName,
        selectwhere: this.selectwhere
      }
      getFYGetList(p)
        .then(res => {
          console.log(JSON.parse(res.Data))
          var Clres = JSON.parse(res.Data)
          this.HusbStockGetList = Clres.rows
          this.totalnum = parseInt(Clres.total)
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 获取单条数据
    getitemOne (v) {
      var p = { FStId: v, UserId: this.FStId }
      getQuaEntrancexq(p)
        .then(res => {
          console.log(res)
          if (res.Result) {
            var Clres = res.Data
            this.infores = Clres
            this.updateinfo = true
            this.$nextTick(() => {
              this.updateinfoform.setFieldsValue({
                eOwner: Clres.eOwner,
                eDate: formatTime(Clres.eDate, 'yyyy-MM-dd hh:mm:ss'),
                eNo: Clres.eNo,
                CPHM: Clres.CPHM,
                eAnimal: Clres.eAnimal,
                eNum: Clres.eNum,
                eUnit: Clres.eUnit,
                eCOwner: Clres.eCOwner,
                ePhone: Clres.ePhone,
                YZCMC: Clres.YZCMC,
                eSeedbed: Clres.eSeedbed,
                EBH: Clres.EBH,
                eHealthy: Clres.eHealthy,
                eRummager: Clres.eRummager
              })
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    showJY () {
      console.log(this.form.getFieldValue('eNo'), this.form.getFieldError('eNo'))
      if (this.form.getFieldValue('eNo') && !this.form.getFieldError('eNo')) {
        //  var v = 3701008901
        this.$axios({
          method: 'get',
          url:
            'http://www.miliotech.com:8886/QDZSAPP/HtmlAshxQua/RuChanChaYan.ashx?JYZMHM=' +
            this.form.getFieldValue('eNo')
        }).then(res => {
          console.log(res)
          if (!res.data.errorCode) {
            // 基本信息
            var Clres = res.data.data.result1[0]

            // var ClresEB = res.data.data.list[0]
            this.$nextTick(() => {
              this.form.setFieldsValue({
                CPHM: Clres.Column1, // 车牌号
                eAnimal: Clres.Column9, // 动物种类
                eNum: Clres.Column2, // 数量     Znum :Clres. //总数
                eUnit: Clres.Column3, // 单位
                eCOwner: Clres.Column4, // 货主（经纪人）
                ePhone: Clres.Column5, // 联系电话
                YZCMC: Clres.Column6, // 养殖场名称
                eSeedbed: Clres.Column7, // 来源地  eAdd //来源地
                EBH: Clres.Column8, // 耳标号
                FKaiName: Clres.Column10 // 开证人
              })
            })
          } else {
            this.$notification.error({
              message: res.data.errorMsg
            })
          }
        })
      }
    },
    // 分页方法
    onChange (checkedValues) {
      this.selectedRowKeys = []
      console.log('checked = ', checkedValues)
      this.yenum = checkedValues
      this.offset = checkedValues
      yenum1 = checkedValues
      this.getHusbStockGetList()
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
        arr.push(item.FStId)
        console.log('arr 数组' + arr)
        this.allFStid = arr
        console.log('FStid数组' + this.allFStid)
      })
      arr = []
    },
    selectChangeitem (v) {
      console.log(v)
    },
    // 弹窗
    showModal (formName) {
      this.fromdata = 'add'
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          eOwner: this.FuseEName
        })
      })

      // this.$axios({
      //   url: 'http://www.miliotech.com:8886/QDZSAPP/HtmlAshxQua/GetQY.ashx?FStId=' + this.FStId,
      //   methods: 'post'
      // })
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(rol => {
      //     console.log(rol)
      //   })
    },
    find (v) {
      console.log(v)
      this.f = false
      this.updateinfo = true
      this.imgInfo = []
      getFYGetXQ(v.FStId).then(res => {
        console.log(res)
        this.imgInfo = []
        res.Data[0].CreateTIme = formatTime(v.CreateTIme, 'yyyy-MM-dd')
        if (res.Data[0].IMGURL) {
          this.imgInfo.push({ src: this.photoTop + res.Data[0].IMGURL })
        }
        if (res.Data[0].IMGURL2) {
          this.imgInfo.push({ src: this.photoTop + res.Data[0].IMGURL2 })
        }
        if (res.Data[0].IMGURL3) {
          this.imgInfo.push({ src: this.photoTop + res.Data[0].IMGURL3 })
        }
        if (res.Data[0].IMGURL4) {
          this.imgInfo.push({ src: this.photoTop + res.Data[0].IMGURL4 })
        }

        this.$nextTick(() => {
          this.updateinfoform.setFieldsValue(res.Data[0])
        })
      })

      // this.getitemOne(v.FStId)
    },
    // 修改
    update (v) {
      console.log(v)
      this.f = true
      this.fromdata = 'update'
      this.updateinfo = true
      getFYGetXQ(v.FStId).then(res => {
        console.log(res)
        this.imgInfo = []
        res.Data[0].CreateTIme = formatTime(v.CreateTIme, 'yyyy-MM-dd')
        if (res.Data[0].IMGURL) {
          this.imgInfo.push({ src: this.photoTop + res.Data[0].IMGURL })
        }
        if (res.Data[0].IMGURL2) {
          this.imgInfo.push({ src: this.photoTop + res.Data[0].IMGURL2 })
        }
        if (res.Data[0].IMGURL3) {
          this.imgInfo.push({ src: this.photoTop + res.Data[0].IMGURL3 })
        }
        if (res.Data[0].IMGURL4) {
          this.imgInfo.push({ src: this.photoTop + res.Data[0].IMGURL4 })
        }

        this.$nextTick(() => {
          this.updateinfoform.setFieldsValue(res.Data[0])
        })
      })
    },
    delet (v) {
      this.FStIdItme = v.FStId
      this.delInfo = true
    },
    delAll () {
      if (!this.allFStid.length) {
        this.$notification.error({
          message: '请选择一条数据'
        })
      } else {
        this.delInfo = true
        this.delTF = true
      }
    },
    handleSubmit (e) {
      console.log('执行了')
      e.preventDefault()

      if (this.fromdata === 'add') {
        this.form.validateFields((err, v) => {
          console.log(v)
          console.log(v)
          if (!err) {
            v.eExamine = ''
            v.eRemark = ''
            v.eDZQ = ''
            v.eZwjcjg = ''
            v.eChandi = ''
            v.Znum = v.eNum
            v.eAdd = v.eSeedbed
            v.eVNo = v.CPHM
            v.xs = new Date().getHours()
            this.$axios({
              method: 'post',
              url: 'http://www.miliotech.com:8886/QDZSAPP/HtmlAshxQua/add.ashx',
              data: Qs.stringify({
                json: JSON.stringify(v),
                uid: this.FStId,
                type: 1
              })
            }).then(res => {
              console.log(res)
              if (res.status === 200) {
                this.$notification.success({
                  message: '新增成功'
                })
                this.visible = false
                this.reload()
              }
            })
          } else {
            this.$notification.error({
              message: '请检查输入数据'
            })
          }
        })
      } else if (this.fromdata === 'update') {
        this.updateinfoform.validateFields((err, v) => {
          console.log(v)
          var formInfo = this.updateinfoform
          this.infores.eOwner = formInfo.getFieldValue('eOwner')
          this.infores.eDate = formInfo.getFieldValue('eDate')
          this.infores.eNo = formInfo.getFieldValue('eNo')
          this.infores.CPHM = formInfo.getFieldValue('CPHM')
          this.infores.eAnimal = formInfo.getFieldValue('eAnimal')
          this.infores.eNum = formInfo.getFieldValue('eNum')
          this.infores.eUnit = formInfo.getFieldValue('eUnit')
          this.infores.eCOwner = formInfo.getFieldValue('eCOwner')
          this.infores.ePhone = formInfo.getFieldValue('ePhone')
          this.infores.YZCMC = formInfo.getFieldValue('YZCMC')
          this.infores.eSeedbed = formInfo.getFieldValue('eSeedbed')
          this.infores.EBH = formInfo.getFieldValue('EBH')
          this.infores.eRummager = formInfo.getFieldValue('eRummager')
          this.infores.eHealthy = formInfo.getFieldValue('eHealthy')
          this.infores.Znum = formInfo.getFieldValue('eNum')
          this.infores.eAdd = formInfo.getFieldValue('eSeedbed')
          this.infores.eVNo = formInfo.getFieldValue('CPHM')
          this.infores.xs = new Date().getHours()

          if (!err) {
            getQuaEntranceUpdate(this.infores, this.FStId)
              .then(res => {
                console.log(res)
                if (res.Result) {
                  this.$notification.success({
                    message: '修改成功'
                  })
                  this.visible = false
                  this.reload()
                }
              })
              .catch(rol => {
                console.log(rol)
              })
          } else {
            this.$notification.error({
              message: '请检查输入数据'
            })
          }
        })
      }
    },
    // 确定删除
    handleDel () {
      var p = {
        UserId: this.FStId,
        FStId: this.allFStid
      }
      getFYDelItem(p)
        .then(res => {
          console.log(res)
          if (res.Result) {
            this.$notification.success({
              message: '删除成功'
            })
            this.delInfo = false
            this.reload()
          }
        })
        .catch(rol => {
          console.log(rol)
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
      this.delInfo = false
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
