<template>
  <div class="Monitor">
    <page-header-wrapper>
      <div class="div1">
        <a-row>
          <a-col :span="12">
            <div>
              <div class="title">
                <span style="position: absolute;margin-left:-38%">青岛市</span>
                区&nbsp;&nbsp;&nbsp;&nbsp;(市)
              </div>

              <p v-for="(prov, index) of provs" :key="index" @click="cl(index)" :class="i == index ? 'add' : ''">
                {{ prov.name }}
                <span
                  v-show="i == index"
                  style="position: relative;right: -20px;"
                  @click="removeItems(index, cityRep)"
                ><a-icon
                  type="close"
                /></span>
                <span
                  v-show="i == index"
                  style="position: relative;right: -40px;"
                  @click="alterItems(index, cityRep)"
                ><a-icon
                  type="edit"
                  theme="twoTone"
                /></span>
              </p>
              <a-col :offset="9">
                <a-button v-permission="{active:'Areadd'}" type="primary" icon="plus" style="width:40%" @click="add(cityRep)">
                  新增
                </a-button>
              </a-col>
            </div>
          </a-col>
          <a-col :span="12">
            <div>
              <div class="title">动监站</div>
              <!-- {{ cities[i] }} -->
              <p v-for="(city, index) of citie" :key="index" @click="showStand(index)">
                {{ city.name }}
                <span
                  v-show="standSH && standIcon == index"
                  style="position: relative;right: -20px;"
                  @click="removeItems(index, standRep)"
                ><a-icon
                  type="close"
                /></span>
                <span
                  v-show="standSH && standIcon == index"
                  style="position: relative;right: -40px;"
                  @click="alterItems(index, standRep)"
                ><a-icon
                  type="edit"
                  theme="twoTone"
                /></span>
              </p>
              <a-col :offset="9">
                <a-button v-permission="{active:'Areadd'}" type="primary" icon="plus" style="width:40%" @click="add(standRep)">
                  新增
                </a-button>
              </a-col>
            </div>
          </a-col>
        </a-row>
      </div>
      <!-- 新增弹窗 -->
      <a-modal
        title="新增区划"
        :visible="addinfo"
        :confirm-loading="confirmLoading"
        :footer="null"
        @cancel="handleCancel"
        width="600px"
      >
        <a-form @submit="handleSubmit" :form="form">
          <a-form-item
            label="区划名称"
            :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          >
            <a-input
              v-decorator="[
                'FuName',
                {
                  rules: [{ required: true, message: '请输入区划名称' }]
                }
              ]"
              placeholder="请输入区划名称"
            />
          </a-form-item>
          <a-form-item
            label="区划代码"
            :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          >
            <a-input v-decorator="['FuCode']" placeholder="请输入区划代码" />
          </a-form-item>
          <a-form-item
            label="区划类型"
            :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          >
            <a-input v-decorator="['FuType']" placeholder="请输入区划类型" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" style="width:300px; height: 40px; margin-left: 115px">
              确认
            </a-button>
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 修改弹窗 -->
      <a-modal
        title="修改区划"
        :visible="updateinfo"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancelaltalterItems"
        width="600px"
        :footer="null"
      >
        <a-form @submit="handleSubmitalter" :form="formAlter">
          <!-- <a-form-item
            label="id"
            style="display: none;"
            :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          >
            <a-input
              v-decorator="[
                'FuNamexg',
                {
                  rules: [{ required: true, message: '请输入区划名称' }]
                }
              ]"
              placeholder="请输入区划名称"
            />
          </a-form-item> -->
          <a-form-item
            label="区划名称"
            :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          >
            <a-input
              v-decorator="['FuName', { rules: [{ required: true, message: '请输入区划名称' }] }]"
              placeholder="请输入区划名称"
            />
          </a-form-item>
          <a-form-item
            label="区划代码"
            :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          >
            <a-input
              v-decorator="['FuCode', { rules: [{ required: true, message: '请输入区划代码' }] }]"
              placeholder="请输入区划代码"
            />
          </a-form-item>
          <a-form-item
            label="区划类型"
            :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
          >
            <a-input v-decorator="['FuType']" placeholder="请输入区划类型" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" style="width:300px; height: 40px; margin-left: 115px">
              确认
            </a-button>
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 删除弹窗 -->
      <a-modal
        :visible="removeCheck"
        :confirm-loading="confirmLoading"
        title="删除区划"
        @ok="handleOkRemove"
        @cancel="handleCancelaltremove"
      >
        <p>是否删除</p>
      </a-modal>
    </page-header-wrapper>
  </div>
</template>

<script>
// const id = 0
import http from '@/utils/httpapi'
import { GetToken } from '@/api/getToken'
// import Qs from 'qs'

export default {
  inject: ['reload'],
  data () {
    return {
      formItemLayout: {
        labelCol: {
          lg: { span: 8 },
          sm: { span: 8 }
        },
        wrapperCol: {
          lg: { span: 16 },
          sm: { span: 20 }
        }
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 16, offset: 8 },
          sm: { span: 16, offset: 8 }
        }
      },
      addinfo: false,
      updateinfo: false,
      confirmLoading: false,
      i: 0,
      // 区市的数据
      provs: [],
      // 站点总的数据
      cities: [],
      citie: [],
      // from 表单
      form: this.$form.createForm(this),
      formAlter: this.$form.createForm(this),

      // 区市的数据
      cityData: {
        FuName: '',
        FuCode: '',
        FuType: '',
        FStId: ''
      },
      // 代表区
      cityRep: 'cityRep',
      // 代表站
      standRep: 'standRep',
      // 区或站
      cityORstandrep: '',
      // 站的key
      cityKey: 0,
      // 控制站是否显示删除与修改按钮
      standIcon: 0,
      standSH: false,
      // 删除
      removeCheck: false,
      // 删除的数据
      removeCity: {
        FStId: ''
      },
      // token
      userToken: '',
      // 时间戳
      timestamp: new Date().valueOf(),
      UserId: sessionStorage.getItem('FStId')
    }
  },
  created () {
    GetToken()
      .then(res => {
        console.log(res)
        this.userToken = res.access_token
        this.timestamp = new Date().valueOf()
      })
      .catch(rol => {
        console.log(rol)
      })
    this.getqhdata()
  },
  // created () {
  //   this.getqhdata()
  // },
  methods: {
    GetTokenitem () {
      GetToken()
        .then(res => {
          this.userToken = res.access_token
          this.timestamp = new Date().valueOf()
          console.log(res)
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 请求区站数据
    async getqhdata () {
      await this.$axios.get(http + '/unit/Getunitone').then(res => {
        var data = JSON.parse(res.data)
        console.log('总体数据')
        console.log(data)
        data.forEach(item => {
          if (item.child) {
              if (item.child) {
                console.log(item.child)
                this.provs = item.child
                item.child.forEach(item2 => {
                  // console.log(item2)
                  this.cities.push(item2.child)
                  // item2 区市级别数据
                  // console.log(item2)
                  // this.provs.push({ id: item2.key, city: item2.name, type: item2.type })
                  // console.log(item2.child)
                  // sandata 动监站数据
                  // var sandata = item2.child
                  // var sandata1 = []
                  // for (let i = 0; i < sandata.length; i++) {
                  //   // console.log(sandata[i].name)
                  //   sandata1.push({ name: sandata[i].name, id: sandata[i].key, type: sandata[i].type })
                  // }
                  // this.cities.push(sandata1)
                  // console.log(this.cities)
                })
              }
          }
        })
        this.citie = this.cities[this.i]
        console.log(this.provs)
      })
    },
    // 修改事件触发 打开修改弹窗
    alterItems (ind, vID) {
      // console.log(ind, vID, this.cityRep)
      // console.log(this.provs[ind])
      this.updateinfo = true
      if (this.cityRep === vID) {
        this.cityData.FStId = this.provs[ind].key
        this.$nextTick(() => {
          this.formAlter.setFieldsValue({
            FuName: this.provs[ind].name,
            FuCode: this.provs[ind].key,
            FuType: this.provs[ind].type
          })
        })
      } else {
        this.cityData.FStId = this.cities[this.i][ind].key
        this.$nextTick(() => {
          this.formAlter.setFieldsValue({
            FuName: this.cities[this.i][ind].name,
            FuCode: this.cities[this.i][ind].key,
            FuType: this.cities[this.i][ind].type
          })
        })
      }
    },

    // 关闭修改弹窗
    handleCancelaltalterItems () {
      this.updateinfo = false
      // this.cityData.FStId = ''
    },

    // 修改区站数据
    async alterData (value) {
      await this.$axios
        .post(http + '/unit/UpdateQH', value)
        .then(res => {
          console.log(res)
          if (res.data.Result) {
            this.$notification.success({
              message: '修改成功'
            })
            this.getqhdata()
            this.reload()
          } else {
            this.$notification.error({
              message: '修改失败'
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 修改表单提交
    handleSubmitalter (e) {
      this.formAlter.validateFields((res, values) => {
        console.log(res, values)
        if (!res) {
          this.cityData.FuCode = values.FuCode
          this.cityData.FuName = values.FuName
          this.cityData.FuType = values.FuType
          console.log(this.cityData)
          this.alterData(this.cityData)
          console.log(e)
          this.handleCancelaltalterItems()
        }
      })
    },
    // 删除事件触发
    removeItems (ind, typeA) {
      console.log(this.provs[ind])
      console.log(typeA)
      if (this.cityRep === typeA) {
        if (this.cities[ind].length) {
          this.$notification.error({
            message: '此区（市）下辖有动监站，无法删除'
          })
          return
        } else {
          this.removeCity.FStId = this.provs[ind].key
        }
      } else {
        console.log(this.cities[this.i][ind].id)
        this.removeCity.FStId = this.cities[this.i][ind].key
      }
      this.removeCheck = true
    },
    // 关闭删除弹窗
    handleCancelaltremove () {
      this.removeCheck = false
      this.removeCity.FStId = ''
    },
    // 确认删除
    handleOkRemove () {
      this.removeCheck = false
      console.log(this.removeCity.FStId)
      this.removeData(this.removeCity.FStId)
    },

    // 删除区站数据
    async removeData (valId) {
      console.log(valId)
      await this.$axios
        .delete(http + '/unit/UnitDel?FStId=' + valId)
        .then(res => {
          console.log(res)
          if (res.data.Result) {
            this.$notification.success({
              message: '删除成功'
            })
            this.handleCancelaltremove()
            this.getqhdata()
            this.reload()
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 控制站的删除与修改按钮
    showStand (vID) {
      this.standIcon = vID
      this.standSH = true
    },
    // 新增区划确认
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          // var data = JSON.stringify(values)
          this.newAddSH(values)
          this.form.resetFields()
        }
      })
    },
    // 新增
    async newAddSH (data) {
      this.GetTokenitem()
      console.log(data)
      console.log(this.cityORstandrep)
      if (!this.cityORstandrep) {
        console.log('站添加')
        this.cityKey = this.provs[this.i].key
        this.$axios({
          method: 'POST',
          url:
            http +
            '/unit/insertQH?FuName=' +
            data.FuName +
            '&FuCode=' +
            data.FuCode +
            '&FuType=' +
            data.FuType +
            '&FuParent=' +
            this.cityKey,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            UserId: this.UserId,
            AccessToken: this.userToken,
            timestamp: this.timestamp
          }
        })
          .then(res => {
            if (res.data.Result) {
              this.getqhdata()
              this.$notification.success({
                message: '新增成功'
              })
              this.addinfo = false
              this.reload()
            } else {
              this.$notification.error({
                message: '新增失败'
              })
            }
          })
          .catch(rol => {
            console.log(rol)
          })
      } else {
        console.log('区级添加')
        this.$axios({
          method: 'POST',
          url:
            http +
            '/unit/insertQH?FuName=' +
            data.FuName +
            '&FuCode=' +
            data.FuCode +
            '&FuType=' +
            data.FuType +
            '&FuParent=1',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            UserId: this.UserId,
            AccessToken: this.userToken,
            timestamp: this.timestamp
          }
        })
          .then(res => {
            console.log(res)
            if (res.data.Result) {
              this.getqhdata()
              this.$notification.success({
                message: '新增区成功'
              })
              this.reload()
              this.addinfo = false
            } else {
              this.$notification.error({
                message: '新增失败'
              })
            }
          })
          .catch(rol => {
            console.log(rol)
          })
      }
    },

    // 区划增加弹窗
    add (CorS) {
      this.addinfo = true
      if (CorS === this.cityRep) {
        this.cityORstandrep = 1
      } else {
        this.cityORstandrep = 0
      }
    },
    // update () {
    //   this.updateinfo = true
    // },
    cl (index) {
      console.log(this.provs)
      console.log(this.cities)
      this.i = index
      this.citie = this.cities[this.i]
      this.cityKey = this.provs[index].key
    },
    // 弹窗关闭
    handleOk (e) {
      this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.addinfo = false
        this.confirmLoading = false
      }, 1000)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.addinfo = false
    }
  }
}
</script>
<style scoped>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all 0.3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
.title {
  font-size: 30px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.div1 {
  background-color: white;
  padding-bottom: 20px;
}
p {
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 0px;
}

p:hover {
  background-color: rgba(0, 255, 255, 0.13);
}
.add {
  background-color: rgba(0, 255, 255, 0.13);
}
</style>
