<template>
  <div>
    <page-header-wrapper>
      <a-card class="card">
        <a-form layout="inline" style="margin-top:30px;" @submit="handleSubmit">
          <a-col :md="10" :sm="24">
            <a-form-item label="货主姓名">
              <a-input v-model="selectwhere" size="large" style="width: 150%" />
            </a-form-item>
          </a-col>
          <a-button class="abutton" @click="cx" type="primary">查询</a-button>
        </a-form>
        <div style="margin-top:35px;">
          <a-button v-permission="{active:'QRofeggSandsemenaadd'}" class="abutton" type="primary" icon="plus" @click="addModal">新增</a-button>
          <a-button class="abutton" type="primary" @click="handleEdit()">导出</a-button>
          <a-button v-permission="{active:'QRofeggSandsemenadele'}" class="abutton" type="primary" @click="pil">批量删除</a-button>
        </div>
        <a-col :span="12" :offset="12">
          <a-tree-select
            labelInValue
            @change="getAddree"
            style="width: 25%; float:right;"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="所在地"
            :tree-data="options"
          >
          </a-tree-select>
        </a-col>
        <!-- 页面表格 -->
        <a-table
          :pagination="false"
          :scroll="{ x: 1300 }"
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :columns="columns1"
          :data-source="data1"
          style="margin-top: 25px"
        >
          <template slot="action" slot-scope="text, record">
            <a v-permission="{active:'QRofeggSandsemenasele'}" slot="action" @click="findModal(record)">查看&nbsp;&nbsp;</a>
            <a v-permission="{active:'QRofeggSandsemenaupd'}" slot="action" @click="updateModal(record)">修改&nbsp;&nbsp;</a>
            <!-- <a slot="action" @click="deletModal(record)">删除&nbsp;&nbsp;</a> -->
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
          >当前第 {{ this.yenum }}/{{ Math.ceil(this.totalnum / 10) }} 页 共 {{ this.totalnum }} 条记录 每页 10
            条</span
          >
        </div>
      </a-card>
      <!-- 增加表单-->
      <a-modal
        :footer="null"
        title="种蛋、胚胎、精液检疫工作记录单新增"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        width="1200px"
        :destroyOnClose="true"
      >
        <a-form @submit="handleSubmit" :form="form">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="记录单编号："
                :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input v-decorator="['recordNo']" disabled />
                <a-input v-decorator="['id']" style="display:none" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="动物卫生监督所（分所）名称:"
                :labelCol="{ lg: { span: 11 }, sm: { span: 6 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['supervisename', { rules: [{ required: true, message: '请输入' }] }]"
                  name="supervisename"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <div class="qq">基本情况：</div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="报检时间"
                :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 11 }, sm: { span: 12 } }"
              >
                <a-date-picker
                  format="yyyy-MM-DD HH:mm"
                  show-time
                  disabled
                  v-decorator="['inspectiontime']"
                  style="width: 80%"
                />
                <a-button
                  @click="findQCPNumberInfo"
                  class="abutton"
                  type="primary"
                  style="position: absolute; margin: 3px 5px"
                >申报单</a-button
                >
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="检疫时间"
                :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-date-picker
                  :disabled="this.kaiTF"
                  format="yyyy-MM-DD HH:mm"
                  show-time
                  v-decorator="[
                    'quarantinetime',
                    { rules: [{ required: true, message: '请输入' }], initialValue: getCurrentDate() }
                  ]"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item
                label="货主姓名"
                :labelCol="{ lg: { span: 10 }, sm: { span: 6 } }"
                :wrapperCol="{ lg: { span: 13 }, sm: { span: 8 } }"
              >
                <a-input
                  v-decorator="['shippername', { rules: [{ required: true, message: '请输入' }] }]"
                  disabled
                  style="width:80%"
                />
                <a-button
                  @click="findShipper"
                  class="abutton"
                  type="primary"
                  style="position: absolute;margin: 3px 5px"
                >选择</a-button
                >
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="联系电话"
                :labelCol="{ lg: { span: 11 }, sm: { span: 6 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input disabled v-decorator="['teltphone']" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="身份证号码"
                :labelCol="{ lg: { span: 8 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 14 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="[
                    'idcardnum',
                    {
                      rules: [
                        {
                          pattern: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                          message: '请输入身份证号'
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="养殖场名称:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 10 } }"
              >
                <a-input disabled v-decorator="['farmsnme']" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="检疫地点:"
                :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input v-decorator="['quarantineaddress', { initialValue: '现场' }]" disabled />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="供体动物种类:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 10 } }"
              >
                <!-- <a-input
                  v-decorator="['animalsort']"
                  disabled/> -->
                <a-select
                  :disabled="this.kaiTF"
                  v-decorator="['animalsort', { rules: [{ required: true, message: '请选择' }] }]"
                >
                  <a-select-option value="马">马</a-select-option>
                  <a-select-option value="猪">猪</a-select-option>
                  <a-select-option value="牛">牛</a-select-option>
                  <a-select-option value="羊">羊</a-select-option>
                  <a-select-option value="鹿">鹿</a-select-option>
                  <a-select-option value="骆驼">骆驼</a-select-option>
                  <a-select-option value="驴">驴</a-select-option>
                  <a-select-option value="骡">骡</a-select-option>
                  <a-select-option value="鸡">鸡</a-select-option>
                  <a-select-option value="鸭">鸭</a-select-option>
                  <a-select-option value="鹅">鹅</a-select-option>
                  <a-select-option value="鹌鹑">鹌鹑</a-select-option>
                  <a-select-option value="鸽">鸽</a-select-option>
                  <a-select-option value="兔">兔</a-select-option>
                  <a-select-option value="蜜蜂">蜜蜂</a-select-option>
                  <a-select-option value="其他">其他</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="牲畜耳标号:"
                :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input :disabled="this.kaiTF" v-decorator="['onimalsortName']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="动物产品种类:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input :disabled="this.kaiTF" v-decorator="['onimalsort']" />
                <!-- <a-select v-decorator="['onimalsort']" style="width: 160px" placeholder="请选择">
                  <a-select-option value="1"> 嘛 </a-select-option>
                  <a-select-option value="2"> 交易市场 </a-select-option>
                  <a-select-option value="3"> 散养户 </a-select-option>
                  <a-select-option value="4"> 其他 </a-select-option>
                </a-select> -->
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="数量及单位:"
                :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 13 }, sm: { span: 8 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['animalnum', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width:40%"
                />
                <a-select
                  :disabled="this.kaiTF"
                  v-decorator="['QCPDanWei', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                  style="width:45%;margin-left:1%"
                >
                  <a-select-option value="1"> 头 </a-select-option>
                  <a-select-option value="2"> 只 </a-select-option>
                  <a-select-option value="3"> 箱 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="14">
              <a-form-item
                label="生产单位名称地址:"
                :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
              >
                <!-- <a-select
                  v-decorator="['startaddress', { rules: [{ required: true, message: '请输入' }],initialValue:'青岛市'}]"
                  style="width: 120px; margin-right: 10px"
                  @select="ChangeTown">
                  <a-select-option value="青岛市"> 青岛市 </a-select-option>
                </a-select>
                <a-select
                  v-decorator="['startaddress1', { rules: [{ required: true, message: '请输入' }]}]"
                  placeholder="请选择"
                  style="width: 120px; margin-right: 10px"
                  @select="ChangeRegion($event,'qy')">
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in regInfo" :key="index" :value="JSON.stringify(index)">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <a-select v-decorator="['startaddress2', { rules: [{ required: true, message: '请输入' }]}]" placeholder="请选择" style="width: 150px" v-if="peoTF" @select="ChangePeo($event,'qy')">
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in peoInfo" :key="index" :value="JSON.stringify(index)">
                    {{ item.label }}
                  </a-select-option>
                </a-select> -->
                <a-input v-decorator="['startaddress']" style="width:32%;margin-right: 1%" disabled />
                <a-input v-decorator="['startaddress1']" style="width:32%;margin-right: 1%" disabled />
                <a-input
                  v-decorator="['startaddress2', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width:32%;"
                  disabled
                />
                <a-input
                  v-decorator="['rqydzxx']"
                  placeholder="启运地点"
                  style="display:none;"
                  :disabled="this.kaiTF"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 22 }, sm: { span: 8 } }"
              >
                <a-input :disabled="this.kaiTF" v-decorator="['startaddress3']" placeholder="请输入乡（镇）" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 18 }, sm: { span: 8 } }"
              >
                <a-input :disabled="this.kaiTF" v-decorator="['SCDWMC']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="14">
              <a-form-item
                label="到达地点"
                :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
              >
                <!-- <a-select v-decorator="['rdddzxx', { rules: [{ required: true, message: '请输入' }],initialValue:'青岛市'}]" style="width: 120px; margin-right: 10px" @select="ChangeTown" >
                  <a-select-option value="青岛市"> 青岛市 </a-select-option>
                </a-select>
                <a-select v-decorator="['rdddzxx1', { rules: [{ required: true, message: '请输入' }]}]" placeholder="请选择" style="width: 120px; margin-right: 10px" @select="ChangeRegion($event,'dd')">
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in regInfo1" :key="index" :value="JSON.stringify(index)">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <a-select v-decorator="['rdddzxx2', { rules: [{ required: true, message: '请输入' }]}]" placeholder="请选择" style="width: 150px" v-if="peoTF1" @select="ChangePeo($event,'dd')" >
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in peoInfo1" :key="index" :value="JSON.stringify(index)">
                    {{ item.label }}
                  </a-select-option>
                </a-select> -->
                <a-input v-decorator="['rdddzxx']" style="width:32%;margin-right: 1%" disabled />
                <a-input v-decorator="['rdddzxx1']" style="width:32%;margin-right: 1%" disabled />
                <a-input v-decorator="['rdddzxx2']" style="width:32%;" disabled />
                <a-input v-decorator="['rdddzxxs']" placeholder="到达地点" style="display:none;" />
              </a-form-item>
            </a-col>
            <!-- <a-col :span="8">
              <a-form-item
                label="到达类型:"
                :labelCol="{ lg: { span: 9 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
              >
                <a-select v-model="form.region" style="width: 160px" placeholder="请选择">
                  <a-select-option value="1"> 养殖场 </a-select-option>
                  <a-select-option value="2"> 交易市场 </a-select-option>
                  <a-select-option value="3"> 散养户 </a-select-option>
                  <a-select-option value="4"> 其他 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col> -->
            <a-col :span="4">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 22 }, sm: { span: 8 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['rdddzxx3']"
                  placeholder="请输入乡（镇）"
                /></a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 18 }, sm: { span: 8 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['rdddzxx4']"
                /></a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="运载工具牌号"
                :labelCol="{ lg: { span: 7 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input :disabled="this.kaiTF" v-decorator="['toolid']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <div class="qq">查验材料与疫情调查</div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item
                label="《种畜禽生产经营许可证》"
                :labelCol="{ lg: { span: 15 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 8 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  v-decorator="['zxqsc', { rules: [{ required: true, message: '请输入' }], initialValue: '有' }]"
                >
                  <a-radio value="有">有</a-radio>
                  <a-radio value="无">无</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="发证单位	"
                :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-input :disabled="this.kaiTF" v-decorator="['fzdw']" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="编号"
                :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 14 }, sm: { span: 12 } }"
              >
                <a-input :disabled="this.kaiTF" v-decorator="['bhid']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="15">
              <a-form-item
                label="《跨省引进乳用种用动物检疫审批表 》审批单位"
                :labelCol="{ lg: { span: 12 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
              >
                <a-input :disabled="this.kaiTF" v-decorator="['spdw']" />
              </a-form-item>
            </a-col>
            <a-col :span="9">
              <a-form-item
                label="审批表编号"
                :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-input :disabled="this.kaiTF" v-decorator="['spbhb']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="《动物防疫条件合格证》"
                :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  :disabled="this.kaiTF"
                  v-decorator="['dwtjhgz', { rules: [{ required: true, message: '请输入' }], initialValue: '有' }]"
                >
                  <a-radio value="有">有</a-radio>
                  <a-radio value="无">无</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="是否经强制免疫并在有效期内"
                :labelCol="{ lg: { span: 16 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 8 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  :disabled="this.kaiTF"
                  v-decorator="['qzmy', { rules: [{ required: true, message: '请输入' }], initialValue: '是' }]"
                >
                  <a-radio value="是">是</a-radio>
                  <a-radio value="否">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item
                label="养殖场疫情（六个月内）"
                :labelCol="{ lg: { span: 14 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  :disabled="this.kaiTF"
                  v-decorator="['outbreak', { rules: [{ required: true, message: '请输入' }], initialValue: '无' }]"
                >
                  <a-radio value="有">有</a-radio>
                  <a-radio value="无">无</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="养殖档案"
                :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  :disabled="this.kaiTF"
                  v-decorator="['recordrule', { rules: [{ required: true, message: '请输入' }], initialValue: '符合' }]"
                >
                  <a-radio value="符合">符合</a-radio>
                  <a-radio value="不符合">不符合</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="耳标佩戴是否符合规定"
                :labelCol="{ lg: { span: 12 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  :disabled="this.kaiTF"
                  v-decorator="['logorule', { rules: [{ required: true, message: '请输入' }], initialValue: '是' }]"
                >
                  <a-radio value="是">是</a-radio>
                  <a-radio value="否">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="是否疫区"
                :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  :disabled="this.kaiTF"
                  v-decorator="['eridemicarea', { rules: [{ required: true, message: '请输入' }], initialValue: '否' }]"
                >
                  <a-radio value="是">是</a-radio>
                  <a-radio value="否">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="其他项目检查"
                :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-input :disabled="this.kaiTF" v-decorator="['other']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="20">
              <a-form-item
                label="临床检查	"
                :labelCol="{ lg: { span: 5 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 15 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  :disabled="this.kaiTF"
                  v-decorator="['clinical', { rules: [{ required: true, message: '请输入' }], initialValue: '合格' }]"
                >
                  <a-radio value="合格">合格</a-radio>
                  <a-radio value="不合格">不合格</a-radio>
                </a-radio-group>
              </a-form-item>

              <div style="float: left;" v-if="this.kaiTF ">
                <a-button @click="showA" type="primary" v-show="!this.ABTF && FrName=='官方兽医'">
                  动物A
                </a-button>

                <a-button @click="showB" type="primary" v-show="this.ABTF && FrName=='官方兽医'">
                  动物B
                </a-button>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item
                label="法定检疫对象实验室检测情况	"
                :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 8 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  :disabled="this.kaiTF"
                  v-decorator="['situation', { rules: [{ required: true, message: '请输入' }], initialValue: '合格' }]"
                >
                  <a-radio value="合格">合格</a-radio>
                  <a-radio value="不合格">不合格</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="是否符合检疫规定	"
                :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  :disabled="this.kaiTF"
                  v-decorator="[
                    'quarantinerule',
                    { rules: [{ required: true, message: '请输入' }], initialValue: '是' }
                  ]"
                >
                  <a-radio value="是">是</a-radio>
                  <a-radio value="否">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="出具《动物检疫合格证明》编号	"
                :labelCol="{ lg: { span: 10 }, sm: { span: 1 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-input v-decorator="['code']" disabled />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="检疫人员签字"
                :labelCol="{ lg: { span: 7 }, sm: { span: 1 } }"
                :wrapperCol="{ lg: { span: 17 }, sm: { span: 12 } }"
              >
                <a-input
                  v-decorator="[
                    'vetname',
                    { rules: [{ required: true, message: '请输入' }] }
                  ]"
                  disabled
                  style="width:45%"
                />
                <a-date-picker
                  :disabled="this.kaiTF"
                  v-decorator="[
                    'Gftime',
                    { rules: [{ required: true, message: '请输入' }], initialValue: getCurrentDate() }
                  ]"
                  format="yyyy-MM-DD HH时"
                  style="width:45%;margin-left:1%;text-align: right;"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="货主签字"
                :labelCol="{ lg: { span: 7 }, sm: { span: 1 } }"
                :wrapperCol="{ lg: { span: 17 }, sm: { span: 12 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['rhzqz', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width:45%"
                />
                <a-date-picker
                  :disabled="this.kaiTF"
                  v-decorator="['rhzdate', { initialValue: getCurrentDate() }]"
                  format="yyyy-MM-DD HH时"
                  style="width: 45%;margin-left:1%;"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item :wrapper-col="{ span: 12, offset: 7 }" v-if="!this.kaiTF">
            <a-button :disabled="butDisabled" type="primary" html-type="submit" style="width:315px; height: 40px;">
              保存
            </a-button>
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 修改表单-->
      <a-modal
        :footer="null"
        title="种蛋、胚胎、精液检疫工作记录单修改"
        :visible="updateinfo"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        width="1200px"
        :destroyOnClose="true"
      >
        <a-form @submit="handleSubmit" :form="form">
          <a-form-item style="display: none">
            <a-input v-decorator="['FStId']" placeholder="主键Id" />
          </a-form-item>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="记录单编号："
                :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input v-decorator="['recordNo']" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="动物卫生监督所（分所）名称:"
                :labelCol="{ lg: { span: 11 }, sm: { span: 6 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
              >
                <a-input
                  v-decorator="['supervisename', { rules: [{ required: true, message: '请输入' }] }]"
                  name="supervisename"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <div class="qq">基本情况：</div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="报检时间"
                :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-date-picker
                  format="yyyy-MM-DD HH:mm"
                  show-time
                  disabled
                  v-decorator="['inspectiontime']"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="检疫时间"
                :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-date-picker
                  format="yyyy-MM-DD HH:mm"
                  show-time
                  v-decorator="[
                    'quarantinetime',
                    { rules: [{ required: true, message: '请输入' }], initialValue: getCurrentDate() }
                  ]"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item
                label="货主姓名"
                :labelCol="{ lg: { span: 10 }, sm: { span: 6 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input
                  v-decorator="[
                    'shippername',
                    { rules: [{ required: true, message: '请输入' }], initialValue: '默认姓名' }
                  ]"
                  disabled
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="联系电话"
                :labelCol="{ lg: { span: 11 }, sm: { span: 6 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input disabled v-decorator="['teltphone']" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="身份证号码"
                :labelCol="{ lg: { span: 8 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 14 } }"
              >
                <a-input
                  v-decorator="[
                    'idcardnum',
                    {
                      rules: [
                        {
                          pattern: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                          message: '请输入身份证号'
                        }
                      ]
                    }
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="养殖场名称:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 10 } }"
              >
                <a-input disabled v-decorator="['farmsnme']" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="检疫地点:"
                :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input v-decorator="['quarantineaddress', { initialValue: '现场' }]" disabled />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="供体动物种类:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 10 } }"
              >
                <a-input v-decorator="['animalsort']" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="牲畜耳标号:"
                :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input v-decorator="['onimalsortName']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="动物产品种类:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input v-decorator="['onimalsort']" />
                <!-- <a-select v-decorator="['onimalsort']" style="width: 160px" placeholder="请选择">
                  <a-select-option value="1"> 嘛 </a-select-option>
                  <a-select-option value="2"> 交易市场 </a-select-option>
                  <a-select-option value="3"> 散养户 </a-select-option>
                  <a-select-option value="4"> 其他 </a-select-option>
                </a-select> -->
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="数量及单位:"
                :labelCol="{ lg: { span: 8 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 13 }, sm: { span: 8 } }"
              >
                <a-input
                  v-decorator="['animalnum', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width:40%"
                />
                <a-select
                  v-decorator="['QCPDanWei', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                  style="width:45%;margin-left:1%"
                >
                  <a-select-option value="1"> 头 </a-select-option>
                  <a-select-option value="2"> 只 </a-select-option>
                  <a-select-option value="3"> 箱 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="14">
              <a-form-item
                label="生产单位名称地址:"
                :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
              >
                <!-- <a-select
                  v-decorator="['startaddress', { rules: [{ required: true, message: '请输入' }],initialValue:'青岛市'}]"
                  style="width: 120px; margin-right: 10px"
                  @select="ChangeTown">
                  <a-select-option value="青岛市"> 青岛市 </a-select-option>
                </a-select>
                <a-select
                  v-decorator="['startaddress1', { rules: [{ required: true, message: '请输入' }]}]"
                  placeholder="请选择"
                  style="width: 120px; margin-right: 10px"
                  @select="ChangeRegion($event,'qy')">
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in regInfo" :key="index" :value="JSON.stringify(index)">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <a-select v-decorator="['startaddress2', { rules: [{ required: true, message: '请输入' }]}]" placeholder="请选择" style="width: 150px" v-if="peoTF" @select="ChangePeo($event,'qy')">
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in peoInfo" :key="index" :value="JSON.stringify(index)">
                    {{ item.label }}
                  </a-select-option>
                </a-select> -->
                <a-input v-decorator="['startaddress']" style="width:32%;margin-right: 1%" disabled />
                <a-input v-decorator="['startaddress1']" style="width:32%;margin-right: 1%" disabled />
                <a-input v-decorator="['startaddress2']" style="width:32%;" disabled />
                <a-input v-decorator="['rqydzxx']" placeholder="启运地点" style="display:none;" />
              </a-form-item>
            </a-col>
            <!-- <a-col :span="8">
              <a-form-item
                label="地点类型:"
                :labelCol="{ lg: { span: 9 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
              >
                <a-select v-model="form.region" style="width: 160px" placeholder="请选择">
                  <a-select-option value="1"> 养殖场 </a-select-option>
                  <a-select-option value="2"> 交易市场 </a-select-option>
                  <a-select-option value="3"> 散养户 </a-select-option>
                  <a-select-option value="4"> 其他 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col> -->
            <a-col :span="4">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 22 }, sm: { span: 8 } }"
              >
                <a-input v-decorator="['startaddress3']" placeholder="请输入乡（镇）" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 18 }, sm: { span: 8 } }"
              >
                <a-input v-decorator="['SCDWMC']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="14">
              <a-form-item
                label="到达地点"
                :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
              >
                <!-- <a-select v-decorator="['rdddzxx', { rules: [{ required: true, message: '请输入' }],initialValue:'青岛市'}]" style="width: 120px; margin-right: 10px" @select="ChangeTown" >
                  <a-select-option value="青岛市"> 青岛市 </a-select-option>
                </a-select>
                <a-select v-decorator="['rdddzxx1', { rules: [{ required: true, message: '请输入' }]}]" placeholder="请选择" style="width: 120px; margin-right: 10px" @select="ChangeRegion($event,'dd')">
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in regInfo1" :key="index" :value="JSON.stringify(index)">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <a-select v-decorator="['rdddzxx2', { rules: [{ required: true, message: '请输入' }]}]" placeholder="请选择" style="width: 150px" v-if="peoTF1" @select="ChangePeo($event,'dd')" >
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in peoInfo1" :key="index" :value="JSON.stringify(index)">
                    {{ item.label }}
                  </a-select-option>
                </a-select> -->
                <a-input v-decorator="['rdddzxx']" style="width:32%;margin-right: 1%" disabled />
                <a-input v-decorator="['rdddzxx1']" style="width:32%;margin-right: 1%" disabled />
                <a-input v-decorator="['rdddzxx2']" style="width:32%;" disabled />
                <a-input v-decorator="['rdddzxxs']" placeholder="到达地点" style="display:none;" />
              </a-form-item>
            </a-col>
            <!-- <a-col :span="8">
              <a-form-item
                label="到达类型:"
                :labelCol="{ lg: { span: 9 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
              >
                <a-select v-model="form.region" style="width: 160px" placeholder="请选择">
                  <a-select-option value="1"> 养殖场 </a-select-option>
                  <a-select-option value="2"> 交易市场 </a-select-option>
                  <a-select-option value="3"> 散养户 </a-select-option>
                  <a-select-option value="4"> 其他 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col> -->
            <a-col :span="4">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 22 }, sm: { span: 8 } }"
              >
                <a-input
                  v-decorator="['rdddzxx3']"
                  placeholder="请输入乡（镇）"
                /></a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 18 }, sm: { span: 8 } }"
              >
                <a-input
                  v-decorator="['rdddzxx4']"
                /></a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="运载工具牌号"
                :labelCol="{ lg: { span: 7 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input v-decorator="['toolid']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <div class="qq">查验材料与疫情调查</div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item
                label="《种畜禽生产经营许可证》"
                :labelCol="{ lg: { span: 15 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 8 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  v-decorator="['zxqsc', { rules: [{ required: true, message: '请输入' }], initialValue: '有' }]"
                >
                  <a-radio value="有">有</a-radio>
                  <a-radio value="无">无</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="发证单位	"
                :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-input v-decorator="['fzdw']" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="编号"
                :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 14 }, sm: { span: 12 } }"
              >
                <a-input v-decorator="['bhid']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="15">
              <a-form-item
                label="《跨省引进乳用种用动物检疫审批表 》审批单位"
                :labelCol="{ lg: { span: 12 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
              >
                <a-input v-decorator="['spdw']" />
              </a-form-item>
            </a-col>
            <a-col :span="9">
              <a-form-item
                label="审批表编号"
                :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-input v-decorator="['spbhb']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="《动物防疫条件合格证》"
                :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  v-decorator="['dwtjhgz', { rules: [{ required: true, message: '请输入' }], initialValue: '有' }]"
                >
                  <a-radio value="有">有</a-radio>
                  <a-radio value="无">无</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="是否经强制免疫并在有效期内"
                :labelCol="{ lg: { span: 16 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 8 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  v-decorator="['qzmy', { rules: [{ required: true, message: '请输入' }], initialValue: '是' }]"
                >
                  <a-radio value="是">是</a-radio>
                  <a-radio value="否">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item
                label="养殖场疫情（六个月内）"
                :labelCol="{ lg: { span: 14 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  v-decorator="['outbreak', { rules: [{ required: true, message: '请输入' }], initialValue: '无' }]"
                >
                  <a-radio value="有">有</a-radio>
                  <a-radio value="无">无</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="养殖档案"
                :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  v-decorator="['recordrule', { rules: [{ required: true, message: '请输入' }], initialValue: '符合' }]"
                >
                  <a-radio value="符合">符合</a-radio>
                  <a-radio value="不符合">不符合</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="耳标佩戴是否符合规定"
                :labelCol="{ lg: { span: 12 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  v-decorator="['logorule', { rules: [{ required: true, message: '请输入' }], initialValue: '是' }]"
                >
                  <a-radio value="是">是</a-radio>
                  <a-radio value="否">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="是否疫区"
                :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  v-decorator="['eridemicarea', { rules: [{ required: true, message: '请输入' }], initialValue: '否' }]"
                >
                  <a-radio value="是">是</a-radio>
                  <a-radio value="否">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="其他项目检查"
                :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-input v-decorator="['other']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="20">
              <a-form-item
                label="临床检查	"
                :labelCol="{ lg: { span: 5 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 15 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  v-decorator="['clinical', { rules: [{ required: true, message: '请输入' }], initialValue: '合格' }]"
                >
                  <a-radio value="合格">合格</a-radio>
                  <a-radio value="不合格">不合格</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item
                label="法定检疫对象实验室检测情况	"
                :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 8 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  v-decorator="['situation', { rules: [{ required: true, message: '请输入' }], initialValue: '合格' }]"
                >
                  <a-radio value="合格">合格</a-radio>
                  <a-radio value="不合格">不合格</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="是否符合检疫规定	"
                :labelCol="{ lg: { span: 11 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  v-decorator="[
                    'quarantinerule',
                    { rules: [{ required: true, message: '请输入' }], initialValue: '是' }
                  ]"
                >
                  <a-radio value="是">是</a-radio>
                  <a-radio value="否">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="出具《动物检疫合格证明》编号	"
                :labelCol="{ lg: { span: 10 }, sm: { span: 1 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-input v-decorator="['code']" disabled />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="检疫人员签字"
                :labelCol="{ lg: { span: 7 }, sm: { span: 1 } }"
                :wrapperCol="{ lg: { span: 17 }, sm: { span: 12 } }"
              >
                <a-input
                  v-decorator="[
                    'vetname',
                    { rules: [{ required: true, message: '请输入' }] }
                  ]"
                  disabled
                  style="width:45%"
                />
                <a-date-picker
                  v-decorator="[
                    'Gftime',
                    { rules: [{ required: true, message: '请输入' }], initialValue: getCurrentDate() }
                  ]"
                  format="yyyy-MM-DD HH时"
                  style="width:45%;margin-left:1%;text-align: right;"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="货主签字"
                :labelCol="{ lg: { span: 7 }, sm: { span: 1 } }"
                :wrapperCol="{ lg: { span: 17 }, sm: { span: 12 } }"
              >
                <a-input
                  v-decorator="['rhzqz', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width:45%"
                />
                <a-date-picker
                  v-decorator="['rhzdate', { initialValue: getCurrentDate() }]"
                  format="yyyy-MM-DD HH时"
                  style="width: 45%;margin-left:1%;"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
            <a-button type="primary" html-type="submit" style="width:315px; height: 40px;">
              确认
            </a-button>
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 显示表单-->
      <a-modal
        :footer="null"
        :zIndex="1000"
        :visible="findinfo"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        width="1100px"
        :destroyOnClose="true"
      >
        <!--  title="种蛋、胚胎、精液检疫工作记录单查看" -->
        <div id="printNew">
          <!--class="m4" style="width: 1000px;margin-top:20px;padding-left: 25px;" -->
          <h3 class="h3Title">种蛋、胚胎、精液检疫工作记录单</h3>
          <table align="center" class="edit" style="width: 98%">
            <tbody>
              <tr>
                <td>记录单编号：{{ findList.recordNo }} 动物卫生监督所（分所）名称：{{ findList.supervisename }}</td>
              </tr>
              <tr>
                <td>
                  <table class="kv-table" style="width: 1000px;" id="myTable">
                    <tbody>
                      <tr>
                        <td rowspan="8" style="text-align: center;" class="kv-label">基本情况</td>
                        <td style="text-align: center;" class="kv-label">报检时间</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.inspectiontime }}
                        </td>
                        <td colspan="3" style="text-align: center;" class="kv-label">检疫时间</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.quarantinetime }}
                        </td>
                      </tr>
                      <tr>
                        <td align="center" class="kv-label">货主姓名</td>
                        <td colspan="2" class="kv-content">
                          {{ findList.shippername }}
                        </td>
                        <td align="center" class="kv-label">联系电话</td>
                        <td class="kv-content">
                          {{ findList.teltphone }}
                        </td>
                        <td colspan="2" align="center" class="kv-label">身份证号码</td>
                        <td colspan="2" class="kv-content">
                          {{ findList.idcardnum }}
                        </td>
                      </tr>
                      <tr>
                        <td align="center" class="kv-label">养殖场名称</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.farmsnme }}
                        </td>
                        <td colspan="2" align="center" class="kv-label">检疫地点</td>
                        <td colspan="4" class="kv-content">
                          {{ findList.quarantineaddress }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="1" align="center" class="kv-label">供体动物种类</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.animalsort }}
                        </td>
                        <td align="center" colspan="2" class="kv-label">牲畜耳标号</td>
                        <td colspan="4" class="kv-content">
                          {{ findList.onimalsortName }}
                        </td>
                      </tr>
                      <tr>
                        <td align="center" class="kv-label">动物产品种类</td>
                        <td colspan="4" class="kv-content">
                          {{ findList.onimalsort }}
                        </td>
                        <td align="center" colspan="2" class="kv-label">数量</td>
                        <td colspan="3" class="kv-content">{{ findList.animalnum }}{{ findList.QCPDanWei }}</td>
                      </tr>
                      <tr>
                        <td align="center" class="kv-label">生产单位名称地址</td>
                        <td colspan="9" class="kv-content">
                          {{ findList.rqydzxx }}
                        </td>
                      </tr>
                      <tr>
                        <td align="center" class="kv-label">到达地点</td>
                        <td colspan="9" class="kv-content">
                          {{ findList.rdddzxxs }}
                        </td>
                      </tr>
                      <tr>
                        <td align="center" class="kv-label">运载工具牌号</td>
                        <td colspan="9" class="kv-content">
                          {{ findList.toolid }}
                        </td>
                      </tr>
                      <tr>
                        <td rowspan="5" align="center" class="kv-label">查验材料与疫情调查</td>
                        <td align="center" class="kv-label">《种畜禽生产经营许可证》</td>
                        <td colspan="1" class="kv-content">
                          {{ findList.zxqsc }}
                        </td>
                        <td colspan="2" align="center" class="kv-label">发证单位</td>
                        <td colspan="1" class="kv-content">
                          {{ findList.fzdw }}
                        </td>
                        <td colspan="2" align="center" class="kv-label">编号</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.bhid }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="1" align="center" class="kv-label">
                          《跨省引进乳用种 用动物检疫审批表 》审批单位
                        </td>
                        <td colspan="3" class="kv-content">
                          {{ findList.spdw }}
                        </td>
                        <td colspan="2" align="center" class="kv-label">审批表编号</td>
                        <td colspan="5" class="kv-content">
                          {{ findList.spbhb }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3" align="center" class="kv-label">《动物防疫条件合格证》</td>
                        <td colspan="2" class="kv-content">
                          {{ findList.dwtjhgz }}
                        </td>
                        <td colspan="3" align="center" class="kv-label">是否经强制免疫并在有效期内</td>
                        <td colspan="2" class="kv-content">
                          {{ findList.qzmy }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="1" align="center" class="kv-label">养殖场疫情（六个月内）</td>
                        <td colspan="1" class="kv-content">
                          {{ findList.outbreak }}
                        </td>
                        <td align="center" class="kv-label">养殖档案</td>
                        <td colspan="2" class="kv-content">
                          {{ findList.recordrule }}
                        </td>
                        <td colspan="3" align="center" class="kv-label">耳标佩戴是否符合规定</td>
                        <td colspan="2" class="kv-content">
                          {{ findList.logorule }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" align="center" class="kv-label">是否疫区</td>
                        <td colspan="2" class="kv-content">
                          {{ findList.eridemicarea }}
                        </td>
                        <td colspan="1" align="center" class="kv-label">其他项目检查</td>
                        <td colspan="5" class="kv-content">
                          {{ findList.other }}
                        </td>
                      </tr>
                      <tr>
                        <td align="center" class="kv-label"><i class="i_star"></i>临床检查</td>
                        <td colspan="10" class="kv-content">
                          <div style="float: left;">
                            {{ findList.clinical }}
                            <a-button @click="showA" type="primary" v-show="!this.ABTF && FrName=='官方兽医'">
                              动物A
                            </a-button>

                            <a-button @click="showB" type="primary" v-show="this.ABTF && FrName=='官方兽医'">
                              动物B
                            </a-button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" class="kv-label">实验室检查</td>
                        <td colspan="5" align="center" class="kv-label" style="border-right: none;">
                          法定检疫对象实验室检测情况
                        </td>
                        <td colspan="5" style="border-left: none" class="kv-content">
                          {{ findList.situation }}
                        </td>
                      </tr>
                      <tr>
                        <td id="tr1" rowspan="5" align="center" class="kv-label">检疫结果处理</td>

                        <td colspan="2" style="text-align: center;" class="kv-label">是否符合检疫规定</td>
                        <td colspan="2" class="kv-content">
                          {{ findList.quarantinerule }}
                        </td>
                        <td colspan="2" align="center" class="kv-label">
                          <i id="i1" class="i_star"></i>出具《动物检疫合格证明》编号
                        </td>
                        <td colspan="4" class="kv-content">
                          {{ findList.code }}
                        </td>
                      </tr>

                      <tr>
                        <td align="center" class="kv-label">检疫员姓名</td>
                        <td colspan="3" class="kv-content">
                          <div style="float: left; text-align: left;">
                            {{ findList.vetname }}
                          </div>
                          <div style="text-align: right;">
                            {{ findList.Gftime }}
                          </div>
                        </td>
                        <td align="center" class="kv-label">货主签字</td>
                        <td colspan="6" class="kv-content">
                          <div style="float: left; text-align: left;">
                            {{ findList.rhzqz }}
                          </div>
                          <div style="text-align: right;">
                            {{ findList.rhzdate }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <div style="text-align: center;">
                    <div
                      data-val-displaymode="SingleParagraph"
                      id="ValidationSummary1"
                      data-valsummary="true"
                      style="color:Red;display:none;"
                    ></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table class="divPublic" style="width: 938px;">
            <tbody>
              <tr>
                <td align="right">
                  <span class="spanTitle">填表人：</span>
                  <span id="FSuserName"> {{ findList.FSuserName }}</span
                  >&nbsp; <span class="spanTitle">填表时间：</span><span id="FSuTime">{{ findList.FSuTime }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div id="myPrintArea"></div>
        </div>
        <a-button type="primary" v-print="'#printNew'" style="margin:20px 50%;transform:translateX(-50%)">打印</a-button>
      </a-modal>

      <!-- 删除弹窗 -->
      <a-modal
        okText="确认"
        cancelText="取消"
        title="删除"
        :visible="deletinfo"
        :confirm-loading="confirmLoading"
        @ok="handleDeletOk"
        @cancel="handleCancel"
        width="400px"
      >
        <div>
          <a-form @submit="handleSubmit" :form="form">
            <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
              是否确认删除
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
      <!-- 弹出层选择申报单信息 -->
      <a-modal
        :footer="null"
        title="选择申报单信息"
        :visible="selectSbdinfo"
        :confirm-loading="confirmLoading"
        @cancel="handleCancelSbd"
        width="800px"
        :zIndex="1000"
        :destroyOnClose="true"
      >
        <div>
          <span>关键字:</span>
          <a-input v-model="selectwhere" style="width:220px;margin-left:1%" />
          <a-button @click="searchSbd" type="primary" style="position: absolute; margin-left:1%;">
            搜索
          </a-button>
        </div>
        <a-table
          :pagination="false"
          :columns="columnsSbd"
          :data-source="dataSbd"
          :scroll="{ x: 1300 }"
          style="margin-top:5px;"
        >
          <!-- :row-selection="{selectedRowKeys: selectedRowKeysSbd, onChange: onSelectChangeSbd,type:'radio'} " -->
          <template slot="action" slot-scope="text, record">
            <a slot="action" @click="selectedSbdData(record)">选择&nbsp;&nbsp;</a>
          </template>
        </a-table>
        <div>
          <a-pagination
            show-quick-jumper
            :default-current="offsetSbd"
            :total="totalnumSbd"
            show-less-items
            @change="onChangeSbd"
            :current="offsetSbd"
            style="margin: 10px"
          />
          <span
            style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
          >当前第 {{ this.yenumSbd }}/{{ Math.ceil(this.totalnumSbd / this.limitSbd) }} 页 共
            {{ this.totalnumSbd }} 条记录 每页 10 条</span
          >
        </div>
      </a-modal>
      <!-- 弹出层选择货主信息 -->
      <a-modal
        title="选择货主信息"
        :visible="selectShipperinfo"
        :footer="null"
        @cancel="handleCancelHZ"
        width="1000px"
        :zIndex="1001"
        :destroyOnClose="true"
      >
        <clu
          :columns1="clo"
          :totalnum="tt"
          :shu="shu"
          @child-event1="father"
          @tiao="tiao"
          :haveType="true"
          :typeDatas="typeDatas"
        >
        </clu>
      </a-modal>
    </page-header-wrapper>

    <!-- <a-modal :zIndex="1001" width="1000px" v-model="showvisible" :footer="null" >
      <product-binfo :info="info" ></product-binfo>
    </a-modal>

    <a-modal :zIndex="1001" width="1000px" v-model="showvisibleA" :footer="null">
      <product-ainfo :info="info" ></product-ainfo>
    </a-modal> -->
    <a-modal
      width="1000px"
      :zIndex="1000"
      :destroyOnClose="true"
      title="动物产地检疫(动物A)"
      v-model="showvisibleA"
      :footer="null"
    >
      <dwjy-binfot ref="dw" :myinfo="info" :showvisible="showvisible" :JLDLX="JLDLX"></dwjy-binfot>
    </a-modal>
    <!-- 动物A跳转 -->
    <a-modal
      width="1000px"
      :zIndex="1000"
      :destroyOnClose="true"
      title="动物产地检疫(动物B)"
      v-model="showvisible"
      :footer="null"
    >
      <dwjy-ainfot ref="dw" :myinfo="info" :JLDLX="JLDLX"></dwjy-ainfot>
    </a-modal>
  </div>
</template>

<script>
import { placexiangx } from '@/assets/playdz'
import { getAddreeCondition } from '@/assets/getAddree'
import httper from '@/utils/httper'
import {
  FindAllInfo,
  AddInfo,
  FindInfoByFStId,
  UpdateInfo,
  DeleteInfo,
  FindSbdInfo,
  FindShipperInfo
} from '@/api/cdjyEb/zdgz'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import formatTime from '@/utils/public.js' // 序号控制
import productBinfo from '../dwjy/AnimaJyzmcompont/productBinfo'
import productAinfo from '../dwjy/AnimaJyzmcompont/productAinfo'
import clu from '../compont/clu2.vue'
import dwjyBinfot from '@/views/jyjg/dwjy/dwcdjyCompont/dwjyA'
import dwjyAinfot from '@/views/jyjg/dwjy/dwcdjyCompont/dwjy'
// 序号控制
var yenum1 = 1
const columns1 = [
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
  {
    title: '官方兽医姓名',
    key: 'FSuserName',
    width: 150,
    align: 'center',
    dataIndex: 'FSuserName'
  },
  {
    title: '记录单编号',
    key: 'recordNo',
    align: 'center',
    dataIndex: 'recordNo',
    width: 280
  },
  {
    title: '状态',
    key: 'FSm1',
    width: 100,
    align: 'center',
    dataIndex: 'FSm1'
  },
  {
    title: '检疫时间',
    key: 'quarantinetime',
    align: 'center',
    dataIndex: 'quarantinetime',
    width: 200
  },
  {
    title: '货主姓名',
    key: 'shippername',
    align: 'center',
    dataIndex: 'shippername',
    width: 150
  },

  {
    title: '动物种类',
    key: 'animalsort',
    align: 'center',
    dataIndex: 'animalsort',
    width: 150
  },
  {
    title: '数量',
    key: 'animalnum',
    align: 'center',
    dataIndex: 'animalnum',
    width: 120
  },
  {
    title: '养殖场名称',
    key: 'farmsnme',
    align: 'center',
    dataIndex: 'farmsnme',
    width: 200
  },

  {
    title: '检疫地点',
    key: 'quarantineaddress',
    align: 'center',
    dataIndex: 'quarantineaddress',
    width: 200
  },
  {
    title: '报检时间',
    key: 'inspectiontime',
    align: 'center',
    dataIndex: 'inspectiontime',
    width: 200
  },
  {
    title: '货主签字',
    key: 'rhzqz',
    align: 'center',
    dataIndex: 'rhzqz',
    width: 200
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

const columnsSbd = [
  { title: '编号', width: 220, align: 'center', dataIndex: 'QDWNumber', key: 'QDWNumber' },
  {
    title: '报检时间',
    width: 150,
    align: 'center',
    dataIndex: 'DateQF',
    key: 'DateQF',
    customRender: (t, r, index) => {
      return t ? formatTime(t, 'yyyy-MM-dd') : ''
    }
  },
  { title: '货主', width: 150, align: 'center', dataIndex: 'QDWCargoOwner', key: 'QDWCargoOwner' },
  { title: '电话', width: 200, align: 'center', dataIndex: 'QDWPhone', key: 'QDWPhone' },
  { title: '养殖场名称', width: 150, align: 'center', dataIndex: 'QDWCunQy', key: 'QDWCunQy' },
  { title: '动物种类', width: 150, align: 'center', dataIndex: 'QDWXuZhongZ', key: 'QDWXuZhongZ' },
  { title: '数量', width: 150, align: 'center', dataIndex: 'QDWQuantity', key: 'QDWQuantity' },
  { title: '单位', width: 150, align: 'center', dataIndex: 'QDWDanWei', key: 'QDWDanWei' },
  { title: '启运地', width: 280, align: 'center', dataIndex: 'QDAddQy', key: 'QDAddQy' },
  { title: '到达地', width: 280, align: 'center', dataIndex: 'QDWAddDd', key: 'QDWAddDd' },
  { title: '官方兽医', width: 150, align: 'center', dataIndex: 'QDWAttn', key: 'QDWAttn' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]

// 货主列表弹窗
const clo = [
  { title: '名称', key: 'FSyzcmc', align: 'center', width: 230, dataIndex: 'FSyzcmc' },
  { title: '动物种类', key: 'FSxz', align: 'center', width: 180, dataIndex: 'FSxz' },
  { title: '地址', key: 'FSdz', align: 'center', width: 320, dataIndex: 'FSdz' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    align: 'center',
    width: 140,
    scopedSlots: { customRender: 'action' }
  }
]
const typeDatas = [
  { id: 'gmyzc', label: '规模养殖场' },
  { id: 'syh', label: '散养户' }
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
  inject: ['reload'], // 页面刷新this.reload()使用
  components: {
    productBinfo,
    productAinfo,
    clu,
    dwjyBinfot,
    dwjyAinfot
  },
  data () {
    return {
      printObj: {
        id: 'printNew',
        popTitle: '动物检疫（产品A）', // 文件标题
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      butDisabled: false,
      addree: '',
      idList: '',
      totalnum: 0, // 总条数
      yenum: 1, // 当前页
      offset: 1, // 当前选择页数
      limit: 10, // 每页条数
      selectedRowKeys: [],
      selectedRow: [],
      options: [],

      // 申报单列表
      totalnumSbd: 0, // 总条数
      yenumSbd: 1, // 当前页
      offsetSbd: 1, // 当前选择页数
      limitSbd: 10, // 每页条数
      columnsSbd,
      dataSbd: [],
      selectedRowKeysSbd: [],
      selectSbdinfo: false, // 申报单信息弹窗
      keyWord: '',

      // 货主列表
      offsetHz: 1,
      limitHz: 10,
      Type: 'gmyzc', // 默认规模养殖场
      FFarmName: '',
      clo, // 列
      tt: 0, // 总条数
      shu: [], // 数据
      selectShipperinfo: false,
      typeDatas,
      // 行政存储
      FeQD: [],
      FeQS: [],
      FeDJ: [],
      FeDjz: [],
      xingzheng: false,
      // // 区，动监站选择
      // regionTF: false,
      // regionTF1: false,
      regInfo: [],
      // regInfo1: [], // 到达地点使用
      // peoTF: false,
      // peoTF1: false,
      // peoInfo: [],
      // peoInfo1: [],

      // 区名称
      regName: '请选择',
      regName1: '请选择',
      // // 动监站名称
      peoName: '请选择',
      peoName1: '请选择',

      // from 表单
      form: this.$form.createForm(this),
      formType: '',
      number: 0,
      findList: [],

      rowSelection,
      visible: false,
      updateinfo: false,
      findinfo: false,
      deletinfo: false,
      confirmLoading: false,

      columns1,
      data1: [],
      selectwhere: '',
      // 查询参数
      queryParam: {},
      UserId: sessionStorage.getItem('FStId'),
      showvisibleA: false,
      showvisible: false,
      info: {},
      ABTF: false,
      JLDLX: 'AH_AEmbryoQuarantine',
      kaiTF: false,
      FrName: JSON.parse(localStorage.getItem('AllInfo')).FrName
    }
  },
  created () {
    // 行政树
    getAdminAddress()
      .then(res => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
        // this.regInfo1 = this.options[0].children
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
        // for (var i = 0; i < this.FeQS.length - 1; i++) {

        // }
        console.log(this.FeQD, this.FeQS, this.FeDJ)
      })
      .catch(rol => {
        console.log(rol)
      })
    this.findAll()
  },
  methods: {
      getAddree (val) {
      // eslint-disable-next-line no-unused-vars
      const arr = ['startaddress1', 'startaddress2', 'startaddress3']
    this.addree = getAddreeCondition(arr, val.label, this.options)
    this.limit = 10
    this.offset = 1
    yenum1 = 1
      this.findAll()
    },
    cx () {
      this.limit = 10
      this.offset = 1
      this.findAll()
    },
    pil () {
      if (this.selectedRowKeys.length > 0) {
        console.log(this.idList)
        const p = {
          FStId: this.idList,
          UserId: this.UserId
        }
        DeleteInfo(p)
          .then(res => {
            this.$message.success('删除成功')
          })
          .catch(res => {
            this.$message.error('删除失败')
          })
        this.idList = ''
        yenum1 = 1
        this.reload()
      } else {
        alert('请选择要删除的数据')
      }
    },
    getCurrentDate () {
      var currentDate = formatTime(null, 'yyyy-MM-dd hh:mm:ss')
      return currentDate
    },
    // 获取申报单编号
    getHao () {
      const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))
      this.$axios
        .post(
          `${httper}/SetSBDBH.ashx?FSunitUstrId=${AllInfo.FSuserId}&lx=sb&FSunitId=${AllInfo.FSunitId}&FSunitName=${AllInfo.FSunitName}&uid=${AllInfo.FStId}`
        )
        .then(res => {
          console.log(res)

          if (res.data.data.result) {
            this.$nextTick(() => {
              const FuName = sessionStorage.getItem('FuName')
              this.form.setFieldsValue({ vetname: FuName })

              this.form.setFieldsValue({ recordNo: res.data.data.result })
              this.form.setFieldsValue({ supervisename: AllInfo.FuseEName })
            })
          }
        })
    },
    showA () {
      console.log('产品A')
      this.info = this.findList
      this.showvisibleA = true
      console.log(this.info)
    },
    showB () {
      console.log('产品B')
      this.info = this.findList
      this.showvisible = true
      console.log(this.info)
    },
    findAll () {
      var that = this
      var p = {
        limit: that.limit,
        offset: that.offset,
        selectwhere: that.selectwhere,
        UserId: this.UserId,
        addree: this.addree
      }
      FindAllInfo(p)
        .then(res => {
          if (res.Result) {
            var datalist = JSON.parse(res.Data)
            console.log(res)
            // console.log(JSON.stringify(datalist) + '&&')
            datalist.rows.forEach(item => {
              item.inspectiontime = formatTime(item.inspectiontime, 'yyyy-MM-dd')
              item.quarantinetime = formatTime(item.quarantinetime, 'yyyy-MM-dd')
            })
            this.data1 = datalist.rows
            if (datalist.rows.length) {
              this.findList = datalist.rows[0]
            }
            this.totalnum = parseInt(datalist.total)
          } else {
            this.$notification.info({ message: '未查询到任何信息' })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    addModal () {
      this.getHao()
      this.formType = 'add'
      this.visible = true
    },
    updateModal (v) {
      console.log(v.FStId)
      this.formType = 'update'
      var p = {
        FStId: v.FStId,
        UserId: this.UserId
      }
      FindInfoByFStId(p).then(res => {
        console.log(JSON.stringify(res.Data) + '@@@@')
        if (res.Result) {
          this.updateinfo = true
          this.$nextTick(() => {
            var datalist = res.Data
            this.form.setFieldsValue(datalist)
          })
        } else {
          this.$notification.info({ message: '未查询到任何信息' })
          // this.$notification.info({ message: res.Msg })
        }
      })
    },
    findModal (v) {
      console.log(v)
      var p = {
        FStId: v.FStId,
        UserId: this.UserId
      }
      FindInfoByFStId(p).then(res => {
        if (res.Result) {
          this.findinfo = true
          this.$nextTick(() => {
            res.Data.inspectiontime = formatTime(res.Data.inspectiontime, 'yyyy年MM月dd日')
            res.Data.quarantinetime = formatTime(res.Data.quarantinetime, 'yyyy年MM月dd日')
            res.Data.Gftime = formatTime(res.Data.Gftime, 'yyyy年MM月dd日')
            res.Data.rhzdate = formatTime(res.Data.rhzdate, 'yyyy年MM月dd日')
            res.Data.FSuTime = formatTime(res.Data.FSuTime, 'yyyy年MM月dd日')
            this.findList = res.Data
            if (this.findList.clinical === '合格') {
              this.kaiTF = true
            }
            if (this.findList.rdddzxx === '山东省' && this.findList.clinical === '合格') {
              this.ABTF = true
            } else if (this.findList.clinical === '合格') {
              this.ABTF = false
            }
          })
        } else {
          this.$notification.info({ message: '未查询到任何信息' })
          // this.$notification.info({ message: res.Msg })
        }
      })
    },
    deletModal (v) {
      this.number = v.FStId
      this.deletinfo = true
    },
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
      this.selectedRowKeys = []
      yenum1 = checkedValues
      this.offset = checkedValues
      this.findAll()
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys, selectedRow) {
      console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRow)
      this.selectedRowKeys = selectedRowKeys
      this.selectedRow = selectedRow
      var arr = ''
      selectedRow.forEach(item => {
        arr = arr + ',' + item.FStId
      })
      this.idList = arr.substring(1)
    },
    // 市级选择触发
    // ChangeTown (val) {
    //   console.log(val)
    // },
    // ChangeRegion (val, type) {
    //   console.log(val + ':' + type)
    //   if (val === '请选择' || val === '') {
    //     this.peoTF = false
    //   } else if (type === 'qy') {
    //     this.peoTF = true
    //       this.peoName = '请选择'
    //       this.peoInfo = []
    //     this.form.setFieldsValue({ startaddress2: '' })
    //       if (this.regInfo[val]) {
    //           this.peoInfo = []
    //         this.regName = this.regInfo[val].label
    //         this.peoInfo = this.regInfo[val].children
    //       }
    //   } else if (type === 'dd') {
    //     this.peoTF1 = true
    //       this.peoName1 = '请选择'
    //      this.form.setFieldsValue({ rdddzxx2: '' })
    //       if (this.regInfo[val]) {
    //         this.peoInfo1 = []
    //         this.regName1 = this.regInfo1[val].label
    //         this.peoInfo1 = this.regInfo1[val].children
    //       }
    //   }
    // },
    // ChangePeo (val, type) {
    //   if (val === '请选择' || val === '') {
    //     this.peoName = '请选择'
    //   } else if (type === 'qy') {
    //     this.peoTF = true
    //     this.peoName = this.peoInfo[val].label
    //   console.log(this.regName, this.peoName)
    //     // const shi = this.form.getFieldValue('startaddress')
    //     // const rqydzxx = shi + this.regName + this.peoName// 启运地点
    //     // this.form.setFieldsValue({ rqydzxx: rqydzxx })
    //   } else if (type === 'dd') {
    //      console.log(this.regName1, this.peoName1)
    //     this.peoTF1 = true
    //     this.peoName1 = this.peoInfo1[val].label
    //     console.log(this.regName, this.peoName)
    //     //  const shi1 = this.form.getFieldValue('rdddzxx')
    //     // var rdddzxxs = shi1 + this.regName1 + this.peoName1// 到达地点
    //     // this.form.setFieldsValue({ rdddzxxs: rdddzxxs })
    //   }
    // },
    // 申报单弹窗操作
    findQCPNumberInfo () {
      var p = {
        offsetSbd: this.offsetSbd,
        limitSbd: this.limitSbd,
        selectwhere: this.selectwhere,
        UserId: this.UserId
      }
      console.log(JSON.stringify(p))
      FindSbdInfo(p)
        .then(res => {
          this.selectSbdinfo = true
          // console.log(JSON.stringify(res) + '@@@@')
          if (res.Data) {
            var datalist = JSON.parse(res.Data)
            this.dataSbd = datalist.rows
            this.totalnumSbd = parseInt(datalist.total)
          } else {
            this.$notification.info({ message: '未查询到任何信息' })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notification.info({ message: '系统繁忙，请稍后再试' })
        })
    },
    searchSbd () {
      // 申报单搜索
      this.findQCPNumberInfo()
    },
    // 申报单弹窗分页方法
    onChangeSbd (checkedValues) {
      this.selectedRowKeysSbd = []
      console.log('checked = ', checkedValues)
      this.yenumSbd = checkedValues
      this.offsetSbd = checkedValues
      // yenum1Sbd = checkedValues
      this.findQCPNumberInfo()
    },
    // onSelectChangeSbd (selectedRowKeys, selectedRows) { // 废弃
    //    console.log(selectedRowKeys)
    //     this.selectedRowKeysSbd = selectedRowKeys
    //    if (selectedRows) {
    //      console.log(JSON.stringify(selectedRows))
    //      var dataRow = selectedRows[0]
    //     this.selectSbdinfo = false
    //     this.$nextTick(() => {
    //       this.form.setFieldsValue({
    //         shippername: dataRow.QCPCargoOwner, // 货主姓名
    //         teltphone: dataRow.QCPPhone, // 联系电话
    //         QCPNumber: dataRow.QCPNumber, // 申报单编号
    //         FUnit: dataRow.QCPDanWei, // 单位
    //         QCProduct: dataRow.QCProduct, // 动物种类
    //         FCount: dataRow.QCPQuantity // 申报数量
    //       })
    //     })
    //   }
    // },
    selectedSbdData (data) {
      // 选择申报单后填充form数据
      console.log(JSON.stringify(data) + '###选择的数据')
      this.selectSbdinfo = false
      this.$nextTick(() => {
        this.form.setFieldsValue({
          id: data.FStId,
          inspectiontime: data.DateQF, // 报检时间
          shippername: data.QDWCargoOwner, // 货主姓名
          teltphone: data.QDWPhone, // 联系电话
          farmsnme: data.QDWCunQy, // 养殖场名称
          // QCPNumber: data.QCPNumber, // 申报单编号
          animalnum: data.QDWQuantity, // 数量
          QCPDanWei: data.QDWDanWei, // 单位
          animalsort: data.QDWXuZhong, // 供体动物种类
          onimalsortName: data.QDWErBiaoHao, // 牲畜耳标号
          onimalsort: data.QDWXuZhongZ, // 动物产品种类
          FCount: data.QCPQuantity, // 申报数量
          // 生产单位名称地址（启运地址）
          startaddress: data.QDWShengQy,
          startaddress1: data.QDWShiQy,
          startaddress2: data.QDWXianQy,
          startaddress3: data.QDWXiangQy,
          SCDWMC: data.QDWCunQy, // 启运类型后面的养殖场名称
          rqydzxx: data.QDAddQy, // 启运地址全称
          // 到达地址
          rdddzxx: data.QDWShengDd,
          rdddzxx1: data.QDWShiDd,
          rdddzxx2: data.QDWXianDd,
          rdddzxx3: data.QDWXiangDd,
          rdddzxx4: data.QDWCunDd,
          rdddzxxs: data.QDWAddDd, // 到达地址全称
          rhzqz: data.QDWAttn // 货主签字
        })
      })
    },
    handleCancelSbd (e) {
      this.selectSbdinfo = false
      this.selectwhere = ''
    },
    // 选择货主信息
    findShipper () {
      var p = {
        offset: this.offsetHz,
        limit: this.limitHz,
        Type: this.Type,
        FFarmName: this.FFarmName,
        UserId: this.UserId
      }
      // console.log(JSON.stringify(p))
      FindShipperInfo(p)
        .then(res => {
          this.selectShipperinfo = true
          console.log(JSON.stringify(res) + '@@@@')
          if (res.Data) {
            var datalist = JSON.parse(res.Data)
            this.shu = datalist.rows
            this.tt = parseInt(datalist.total)
          } else {
            this.$notification.info({ message: '未查询到任何信息' })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notification.info({ message: '系统繁忙，请稍后再试' })
        })
    },
    tiao (data) {
      this.offsetHz = data.offset
      this.limitHz = data.limit
      if (data.Type) this.Type = data.Type // 选了类型
      this.FFarmName = data.selectWhere ? data.selectWhere : ''
      console.log(JSON.stringify(data) + '@@@')
      this.findShipper()
      // TZGet(data).then(res => {
      //    this.shu = JSON.parse(res.Data).rows
      //    this.tt = parseInt(JSON.parse(res.Data).total)
      //   })
    },
    father (data) {
      console.log(JSON.stringify(data) + '@@@选择的数据')
      this.selectShipperinfo = false
      this.$nextTick(() => {
         const adree = data.FSdz
         // eslint-disable-next-line no-unused-vars
         const arr = placexiangx(adree)
        this.form.setFieldsValue({
            startaddress: arr[0],
          startaddress1: arr[1],
          startaddress2: arr[2],
          startaddress3: arr[3].replace('/', ''),
          startaddress4: data.FSxxdz, // 启运类型后面的养殖场名称

          shippername: data.FSfzr, // 货主名称
          farmsnme: data.FSyzcmc, // 养殖场名称
          SCDWMC: data.FSxxdz, // 启运类型后面的养殖场名称
          animalsort: data.FSxz, // 种类
          /// startaddress: data.FSdz, // 地址全称
          teltphone: data.FSlxdh, // 电话
        startaddress5: data.FSyzclx === '散养户' ? '散养户' : '养殖场'

        })
      })
    },
    handleCancelHZ (e) {
      this.selectShipperinfo = false
      this.Type = 'gmyzc'
      this.FFarmName = ''
    },
    // 弹窗关闭
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.updateinfo = false
        this.findinfo = false
        this.deletinfo = false
        this.confirmLoading = false
        this.formType = ''
        this.form.resetFields()
      }, 100)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.updateinfo = false
      this.findinfo = false
      this.deletinfo = false
      this.kaiTF = false
      this.formType = ''
      this.findList = {}
      this.form.resetFields()
    },
    handleDeletOk () {
      // 删除
      this.confirmLoading = true
      var p = {
        FStId: this.number,
        UserId: this.UserId
      }
      DeleteInfo(p).then(res => {
        var result = res.Result
        var Msg = res.Msg
        setTimeout(() => {
          this.$notification.success({
            message: Msg
          })
        }, 100)
        if (result) {
          this.deletinfo = false
          this.confirmLoading = false
          this.form.resetFields()
          this.reload()
        }
      })
    },
    // from表单验证
    handleSubmit (e) {
      e.preventDefault()
      var that = this
      const sheng = that.form.getFieldValue('startaddress')
      const shi = that.form.getFieldValue('startaddress1')
      const qu = that.form.getFieldValue('startaddress2')
      const xiang = that.form.getFieldValue('startaddress3')
      const cun = that.form.getFieldValue('SCDWMC')
      const rqydzxx = sheng + shi + qu + xiang + cun // 启运地点
      this.form.setFieldsValue({ rqydzxx: rqydzxx })

      const sheng1 = that.form.getFieldValue('rdddzxx')
      const shi1 = that.form.getFieldValue('rdddzxx1')
      const qu1 = that.form.getFieldValue('rdddzxx2')
      const xiang1 = that.form.getFieldValue('rdddzxx3')
      const cun1 = that.form.getFieldValue('rdddzxx4')
      var rdddzxxs = sheng1 + shi1 + qu1 + xiang1 + cun1 // 到达地点
      this.form.setFieldsValue({ rdddzxxs: rdddzxxs })
      this.form.validateFields((err, v) => {
        if (!err) {
          var p = v
          p.UserId = that.UserId
          // 新增
          if (that.formType === 'add') {
            this.butDisabled = true
            this.$message.loading('正在新增，请等待', 0)
            p.FSm1 = '已保存' // 状态
            console.log(JSON.stringify(p))
            AddInfo(p)
              .then(res => {
                 this.$message.destroy()
                  this.butDisabled = false
                setTimeout(() => {
                  this.$notification.success({
                    message: res.Msg
                  })
                }, 100)
                if (res.Result) {
                  this.formType = ''
                  // this.visible = false
                  // this.reload()
                  this.findAll()
                  this.kaiTF = true
                  if (this.findList.rdddzxx === '山东省' && this.findList.clinical === '合格') {
                    this.ABTF = true
                  } else if (this.findList.clinical === '合格') {
                    this.ABTF = false
                  }
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
          // 修改
          if (that.formType === 'update') {
            var parm = { FStId: v.FStId, UserId: this.UserId }
            FindInfoByFStId(parm).then(res => {
              const result = res.Data // 查询最新后台的数据（包含除页面上的数据）
              for (var i in p) {
                result[i] = p[i]
              } // 当前页面修改后的数据更新至后台
              console.log(JSON.stringify(result) + '##修改的数据')
              UpdateInfo(result)
                .then(res => {
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
                })
                .catch(err => {
                  console.log(err)
                })
            })
          }
        } else {
          this.$notification.error({
            message: '请检查输入信息'
          })
        }
      })
    },
    // 列表定制
    handleEdit () {
      this.$notification.error({
        message: '待开发，敬请期待'
      })
    }
  }
}
</script>

<style scoped lang="less">
@media print {
  #printNew {
    width: 1100px;
    td{
      height: 65px;
    }
  }
}
#printNew{
  padding: 20px;
}
.m4 {
  margin: 5px 120px 10px 0px;
  overflow: auto;
  background-color: #f0f0f0;
}

.kv-table {
  border-right: 1px solid #cacaca \9;
  *border-right: 1px solid #cacaca;
}

.kv-table .kv-table-row {
  border-bottom: 1px solid #cacaca;
}

.kv-table .kv-table-row .kv-item {
  padding-left: 134px;
}

.kv-table .kv-table-row .kv-item .kv-label1 {
  height: 35px;
  border-style: none solid;
  border-width: 1px;
  border-color: #cacaca;
}
.kv-table .kv-table-row .kv-item .kv-label {
  float: left;
  padding: 0 10px;
  margin-left: -134px;
  width: 112px;
  background: #f5f5f5;
  border: 1px solid #cacaca;
  border-bottom: none;
  border-top: none;
}

.kv-table .kv-table-row .kv-item .kv-content-wrap {
  float: left;
  width: 100%;
}

.kv-table .kv-table-row .kv-item .kv-content {
  padding: 10px;
}

.kv-table .kv-table-row.col-3 .kv-item-wrap {
  float: left;
  width: 33.33%;
}

.kv-table .kv-table-row.col-2 .kv-item-wrap {
  float: left;
  width: 33.33%;
}

table.kv-table {
  width: 100%;
}

table.kv-table .kv-label {
  padding: 0 10px;
  width: 114px;
  background: #f5f5f5;
  border: 1px solid #cacaca;
  border-top: none;
  text-align: left;
}

table.kv-table td.kv-content,
table.kv-table td.kv-label {
  height: 29px;
  padding: 5px;
  border-bottom: 1px solid #cacaca;
  font-size: 14px;
}

table.kv-table tr:first-child td.kv-content,
table.kv-table tr:first-child td.kv-label {
  border-top: 1px solid #cacaca;
}

table.kv-table tr td.kv-content:last-child {
  border-right: 1px solid #cacaca;
  border-left: 1px solid #cacaca;
}

table.kv-table tr .button {
  text-align: center;
  border-radius: 0;
  text-indent: 0;
  height: 32px;
}

table.kv-table .kv-content {
  /*width: 260px;*/
  padding: 5px 10px;
}

table.kv-table .textarea-wrap textarea {
  width: 98%;
}
#myTable.kv-table tr td:not(.kv-label) {
  background: #fff;
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
  letter-spacing: 2px;
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
.da {
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}
.h3Title {
  text-align: center;
  font-weight: bold;
}
</style>
