<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <!-- <a-form layout="inline" style="margin-top:30px;" @submit="handleSubmit" :form="form">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="物资名称">
                    <a-input
                      v-decorator="['xx']"
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
                    <a-button type="primary" html-type="submit" style="height:40px" >查询</a-button>
                  </span>
                </a-col>
              </div>
            </a-row>
          </a-form> -->
          <!-- 页面表格 -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="data"
            :scroll="{ x: 1000 }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a slot="action" @click="find(record)" v-if="record.ZzType!==lookZzTypeEbr">查看&nbsp;&nbsp;</a>
            </template>
          </a-table>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
// 接口请求调用
import http from '@/utils/httpapi'

const columns = [
  { title: '票证类型', width: 200, align: 'center', dataIndex: 'ZzType', key: 'ZzType' },
  { title: '数量(张)',
    width: 200,
    align: 'center',
    dataIndex: 'Column1',
    key: 'Column1',
    customRender: (value, row, index) => {
      const obj = {
        children: value,
        attrs: {}
      }
      // if (index === 4) {
      //   obj.attrs.colSpan = 2
      // }
        return obj
    }
  }, // FZzNumber--->替换成Column1--->替换成ZShu
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 250,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  inject: ['reload'], // 页面刷新this.reload()使用
  data () {
    return {
      queryParam: { status: 0, status1: 0 },
      columns,
      data: [],
      isFirst: true, // 点击查询区分判定是否是第一次
      lookZzTypeEbr: '',
      UserId: sessionStorage.getItem('FStId'),

      // from 表单
      form: this.$form.createForm(this),

      // 点击 弹出框
      findinfo: false,
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      loading: false
    }
  },
  created () {
     this.findAll()
  },
  methods: {
    findAll () {
      this.$axios({
        url: http + '/Material/P_ZZGL_HdSum_ReaGet?ZzType=',
        method: 'get',
        headers: {
          UserId: this.UserId
        }
      }).then(res => {
          console.log(JSON.stringify(res) + '&&&')
        if (res.data.Data) {
            var datalist = res.data.Data.ZzTypeNum
            this.data = datalist
        }
      }).catch(rol => {
          console.log(rol)
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 弹窗
    showModal (formName) {
      this.fromdata = 'add'
      this.visible = true
    },
    find (v) {
      console.log(JSON.stringify(v))
       this.$axios({
        url: http + '/Material/P_ZZGL_HdSum_ReaGet?ZzType=' + v.ZzType,
        method: 'get',
        headers: {
          UserId: this.UserId
        }
      }).then(res => {
        this.lookZzTypeEbr = v.ZzType + '耳标号'
        var datalist = res.data.Data
        console.log(JSON.stringify(datalist) + '&&&')
        if (this.isFirst) { this.isFirst = false } else { this.data.pop() }
        if (datalist && datalist.FZzNumber) {
           const haoduan = {
            ZzType: v.ZzType + '耳标号',
            Column1: datalist.FZzNumber
          }
          this.data.push(haoduan)
        } else {
          const content = {
            ZzType: v.ZzType + '耳标号',
            Column1: '空！'
          }
          this.data.push(content)
        }
      }).catch(rol => {
          console.log(rol)
      })
    },
     handleSubmit (e) {
      e.preventDefault()
    },
    // 弹窗关闭
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.findinfo = false
        this.confirmLoading = false
        this.form.resetFields()
      }, 100)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.findinfo = false
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
