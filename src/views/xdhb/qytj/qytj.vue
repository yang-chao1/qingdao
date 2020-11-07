<template>
  <div>
    <page-header-wrapper>
      <a-card class="card" >
        <a-form :form="form">
          <a-row>
            <a-col :span="6">
              <a-form-item
                label="养殖场名称:"
                :labelCol="{ lg: { span: 9 }, sm: { span: 10 } }"
                :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
              >
                <a-input v-model="queryParam.id" />
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-button class="abutton" type="primary" @click="mocheck">查询</a-button>
            </a-col>
            <a-col :span="6">
              <a-form-item
                label="畜禽种类:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
              >
                <a-select @select="selectChange">
                  <a-select-option v-for="(item, index) in typeChZ" :key="index" :value="item">
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item
                label="日期:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
              >
                <a-range-picker @change="onChange" />
              </a-form-item>
            </a-col>
            <a-col :span="2">
              <a-button class="abutton" type="primary" @click="checkInfo">查询</a-button>
            </a-col>

          </a-row>
          <a-row>
            <a-col :span="24" >
              <a-tree-select
                style="width: 200px; float: right;"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                placeholder="所在地"
                :tree-data="options"
                allowClear
                :replaceFields="replaceFields"
                @change="mocheck"
              >
              </a-tree-select>
            </a-col>
          </a-row>
        </a-form>

      </a-card>
      <div class="qytjhtml" v-html="qytjInfo"></div>
    </page-header-wrapper>
  </div>
</template>
<script>
import { getAdminAddress } from '@/api/AdministrativeAddress'
import { GetSetChartAndTable } from '@/api/qytj.js'
import formatTime from '@/utils/public.js'
import { returnFSunitUstrIdTree } from '@/utils/returnFSunitUstrId'
// import { Base64 } from 'js-base64'
// import Base64 from 'js-base64'
const typeChZ = ['猪', '奶牛', '肉牛', '羊', '蛋鸡', '肉鸡（含小公鸡）', '蛋鸭', '肉鸭', '肉兔', '种兔', '鹅', '全部']
// const Base64 = require('js-base64').Base64
export default {
  data () {
    return {
      options: [],
      queryParam: {
        id: ''
      },
      replaceFields: {
        children: 'children',
        title: 'label',
        key: 'key',
        value: 'key'
      },
      form: this.$form.created(this),
      fuStrId: sessionStorage.getItem('FSunitUstrId'),
      dtartDate: formatTime(null, 'yyyy-MM-dd') + '',
      endDate: formatTime(null, 'yyyy-MM-dd') + '',
      TyName: '',
      yzcName: '',
      qytjInfo: '',
      typeChZ
    }
  },
  created () {
    // 行政树
    getAdminAddress()
      .then(res => {
        console.log(res)
        // var Clres = JSON.parse(res)
        // this.options = res
        this.options = returnFSunitUstrIdTree(res)
      })
      .catch(rol => {
        console.log(rol)
      })
    this.GetSetChartAndTableInfo()
  },
  methods: {
    GetSetChartAndTableInfo () {
      var p = {
        fuStrId: this.fuStrId,
        dtartDate: this.dtartDate,
        endDate: this.endDate,
        TyName: this.TyName,
        yzcName: this.yzcName
      }
      GetSetChartAndTable(p).then(res => {
        console.log(res)
        if (res !== '') {
          this.qytjInfo = res
        } else {
          this.$notification.error({
            message: '暂未查询到满足条件的记录'
          })
        }
      })
    },
    selectChange (v) {
      console.log(v)
      if (v === '全部') {
        this.TyName = ''
      } else {
        this.TyName = v
      }
    },
    onChange (v) {
        console.log(v)
        console.log(formatTime(v[0], 'yyyy-MM-dd'), formatTime(v[1], 'yyyy-MM-dd'))
        this.dtartDate = formatTime(v[0], 'yyyy-MM-dd') + ''
        this.endDate = formatTime(v[1], 'yyyy-MM-dd') + ''
    },
    mocheck (v) {
      this.yzcName = this.queryParam.id
      if (v) {
        this.fuStrId = v
      } else {
        this.fuStrId = sessionStorage.getItem('FSunitUstrId')
      }
      this.GetSetChartAndTableInfo()
    },
    checkInfo () {
      this.yzcName = this.queryParam.id
      this.GetSetChartAndTableInfo()
    }
  }
}
</script>
<style  scoped>
 >>> table{
   width: 100%;
   font-size: 18px;
 }
 >>>  td{
   height: 60px!important;
 }

</style>
