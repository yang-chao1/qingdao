<template>
  <div>
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item style="display: none">
        <a-input v-decorator="['FStId']" placeholder="主键Id"/>
      </a-form-item>
      <template >
        <a-descriptions bordered :column="2" size="small">
          <a-descriptions-item label="肉品品质检验合格报告单编号" :span="1">
            <a-form-item>
              <a-input
                v-decorator="['JLDNumber', { rules: [{ required: true, message: '请输入' },{ pattern: /^[0-9]*$/, message: '只能为数字' }] }]"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="检疫证编号" :span="1">
            <a-form-item>
              <a-input
                v-decorator="['PNumber', { rules: [{ required: true, message: '请输入' },{ pattern: /^[0-9]*$/, message: '只能为数字' }] }]"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="货主" :span="1">
            <a-form-item>
              <a-input
                v-decorator="['PCargoOwner', { rules: [{ required: true, message: '请输入' }] }]"
                style="width:75%"
              />
              <a-button @click="findShipper" class="abutton" type="primary" style="position: absolute;margin: 3px 5px">选择</a-button>
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="联系电话" :span="1">
            <a-form-item>
              <a-input
                v-decorator="['PPhone', { rules: [{ required: true, message: '请输入' }] }]"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="产品名称" :span="1">
            <a-form-item>
              <a-select
                v-decorator="['PName', { rules: [{ required: true, message: '请选择' }] }]"
                placeholder="请选择"
              >
                <a-select-option value="猪-肉产品">
                  猪-肉产品
                </a-select-option>
                <a-select-option value="猪-副产品">
                  猪-副产品
                </a-select-option>
                <a-select-option value="牛-肉产品">
                  牛-肉产品
                </a-select-option>
                <a-select-option value="牛-副产品">
                  牛-副产品
                </a-select-option>
                <a-select-option value="羊-肉产品">
                  羊-肉产品
                </a-select-option>
                <a-select-option value="羊-副产品">
                  羊-副产品
                </a-select-option>
                <a-select-option value="鸡-肉产品">
                  鸡-肉产品
                </a-select-option>
                <a-select-option value="鸡-副产品">
                  鸡-副产品
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="数量及单位" :span="1">
            <a-form-item>
              <a-input
                v-decorator="['PQuantity', { rules: [{ required: true, message: '请输入' }] }]"
                style="width:55%"
              />
              <a-select
                disabled
                v-decorator="['PDanWei', { rules: [{ required: true, message: '请选择' }],initialValue:'千克(公斤)'}]"
                placeholder="请选择"
                style="position: absolute;width:110px; margin: 4px"
              >
                <a-select-option value="千克(公斤)">
                  千克(公斤)
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="生产单位名称地址" :span="2">
            <a-form-item>
              <a-input
                disabled
                v-decorator="['PUnitName']"
                style="width:40%"
              />
              <a-input
                disabled
                v-decorator="['PProductionunit']"
                style="width:45%;margin-left: 1%"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="目的地" :span="2">
            <a-form-item>
              <a-select v-decorator="['PSheng', { rules: [{ required: true, message: '请输入' }] }]" style="width: 30%;margin-right: 1%;" @change="ChangeTown">
                <a-select-option value="青岛市">
                  青岛市
                </a-select-option>
              </a-select>
              <a-select
                v-decorator="['PShi', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 30%;margin-right: 1%;"
                @change="ChangeRegion"
              >
                <a-select-option value="请选择">
                  请选择
                </a-select-option>
                <a-select-option v-for="(item, index) in regInfo" :key="index" :value="JSON.stringify(index)">
                  {{ item.label }}
                </a-select-option>
              </a-select>
              <a-select
                v-decorator="['PXian', { rules: [{ required: true, message: '请输入' }] }]"
                style="width: 30%;"
                @change="ChangePeo" >
                <a-select-option value="请选择">
                  请选择
                </a-select-option>
                <a-select-option v-for="(item, index) in peoInfo" :key="index" :value="JSON.stringify(index)">
                  {{ item.label }}
                </a-select-option>
              </a-select>
              <a-input
                v-decorator="['PDiDian', { rules: [{ required: true, message: '请输入' }] }]"
                style="width:45%;"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="承运人" :span="1">
            <a-form-item>
              <a-input
                v-decorator="['PCarrier', { rules: [{ required: true, message: '请输入' }] }]"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="联系电话" :span="1">
            <a-form-item>
              <a-input
                v-decorator="['PPhoneCyr', { rules: [{ required: true, message: '请输入' }] }]"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="运载方式" :span="2">
            <a-radio-group
              v-decorator="['PYunZai']"
              :default-value="1">
              <a-radio :value="1">公路</a-radio>
              <a-radio :value="2">铁路</a-radio>
              <a-radio :value="3">水路</a-radio>
              <a-radio :value="4">航空</a-radio>
            </a-radio-group>
          </a-descriptions-item>
          <a-descriptions-item label="运载工具牌号" :span="1">
            <a-form-item>
              <a-input
                v-decorator="['PTrademark', { rules: [{ required: true, message: '请输入' }] }]"
              />
            </a-form-item>
          </a-descriptions-item>
          <!-- <a-descriptions-item label="非洲猪瘟检测单号" :span="1">
            <a-input
              v-decorator="['Fsm3', { rules: [{ required: true, message: '请输入' }] }]"
            />
          </a-descriptions-item> -->
          <a-descriptions-item label="装运前经" :span="2">
            <a-form-item>
              <a-input
                v-decorator="['PDisinfection', { rules: [{ required: true, message: '请输入' }]}]"
                style="width:40%"
              />
              <a-select
                v-decorator="['xiaoduSel']"
                placeholder="请选择"
                @select="selectXiaodu"
                style="width:180px;margin: 3px 5px"
              >
                <a-select-option value="请选择">
                  请选择
                </a-select-option>
                <a-select-option value="0.5%过氧乙酸">
                  0.5%过氧乙酸
                </a-select-option>
              </a-select>消毒
            </a-form-item>
          </a-descriptions-item>
        </a-descriptions>
        <span>本批动物经检疫合格,应于
          <a-select
            v-decorator="['PYouXiaoRi', { rules: [{ required: true, message: '请选择' }] }]"
            placeholder="请选择"
            :default-value="2"
            style="width:100px; margin: 4px 5px"
          >
            <a-select-option v-for="index in 7" :key="index">
              {{ index }}
            </a-select-option>
          </a-select>日内到达有效。</span>
        <a-descriptions bordered :column="2" size="small">
          <a-descriptions-item label="官方兽医签字" :span="1">
            <a-form-item>
              <a-input
                disabled
                v-decorator="['PVeterinary', { rules: [{ required: true, message: '请输入' }],initialValue:loggedUserName }]"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="签发日期" :span="1">
            <a-form-item>
              <a-date-picker
                disabled
                format="yyyy-MM-DD hh:mm:ss"
                v-decorator="['DateQF', { rules: [{ required: true, message: '请输入' }],initialValue:getCurrentDate() }]"/>
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="备注" :span="2">
            <a-form-item>
              <a-textarea
                v-decorator="['PMemo1']"
                rows="4"
                cols="20"
                style="width:90%" />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item label="动物卫生监督所联系电话" :span="2">
            <a-form-item>
              <a-input
                v-decorator="['PDwPhone', { rules: [{ required: true, message: '请输入' }] }]"
                style="width:30%"
              />
            </a-form-item>
          </a-descriptions-item>
        </a-descriptions>
      </template></a-form></div></template></div></template>

      <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
        <a-button type="primary" html-type="submit" style="width:315px; height: 40px;margin-top:30px;">
          确认
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    findList: {
      type: Object
    }
  },
  created () {
    console.log(this.findList)
  },
  methods: {
     //  from表单验证
     handleSubmit (e) {
      e.preventDefault()
      var that = this
      this.form.validateFields((err, v) => {
             console.log(v)
          if (!err) {
            var p = v
            p.UserId = that.UserId
            // 新增
              if (that.formType === 'add') {
               console.log(JSON.stringify(p) + '新增')
                AddInfo(p).then(res => {
                  console.log(JSON.stringify(res) + '@@@@')
                    setTimeout(() => {
                      this.$notification.success({
                        message: res.Msg
                      })
                    }, 100)
                  if (res.Result) {
                    this.formType = ''
                    this.visible = false
                    this.reload()
                   }
                }).catch(err => {
                  console.log(err)
                })
            }
          // 修改
          if (that.formType === 'update') {
              var parm = { FStId: v.FStId, UserId: this.UserId }
             FindInfoByFStId(parm).then(res => {
                console.log(JSON.stringify(parm))
                console.log(JSON.stringify(res))
                var result = res.Data// 查询最新后台的数据（包含除页面上的数据）
              for (var i in p) { result[i] = p[i] }// 当前页面修改后的数据更新至后台
               UpdateInfo(result).then(res => {
                  console.log(JSON.stringify(res) + '@@@@')
                    setTimeout(() => {
                      this.$notification.success({
                        message: res.Msg
                      })
                    }, 100)
                  if (res.Result) {
                    this.formType = ''
                    this.updateinfo = false
                    this.reload()
                  }
                }).catch(err => {
                  console.log(err)
                })
              })
           }
          }
       })
    }

  }

}
</script>

<style scoped lang="less">
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
</style>
