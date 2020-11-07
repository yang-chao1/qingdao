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
        </a-form>
        <a-button class="abutton" @click="cx" type="primary">查询</a-button>
        <div style="margin-top:35px;">
          <a-button
            v-permission="{ active: 'QWRSEforMandSadd' }"
            class="abutton"
            type="primary"
            icon="plus"
            @click="addModal"
          >新增</a-button
          >
          <a-button class="abutton" type="primary" @click="handleEdit()">导出</a-button>
          <a-button
            v-permission="{ active: 'QWRSEforMandSdele' }"
            class="abutton"
            type="primary"
            @click="pil"
          >批量删除</a-button
          >
        </div>
        <div>
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
        </div>
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
            <a
              v-permission="{ active: 'QWRSEforMandSsele' }"
              slot="action"
              @click="findModal(record)"
            >查看&nbsp;&nbsp;</a
            >
            <a
              v-permission="{ active: 'QWRSEforMandSupd' }"
              slot="action"
              @click="updateModal(record)"
            >修改&nbsp;&nbsp;</a
            >
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
          >当前第 {{ this.yenum }}/{{ Math.ceil(this.totalnum / this.limit) }} 页 共 {{ this.totalnum }} 条记录 每页
            10 条</span
          >
        </div>
      </a-card>
      <!-- 增加表单-->
      <a-modal
        :footer="null"
        title="乳用、种用动物检疫工作记录单新增"
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        width="1100px"
        :zIndex="500"
        :destroyOnClose="true"
      >
        <a-form @submit="handleSubmit" :form="form">
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="记录单编号："
                :labelCol="{ lg: { span: 7 }, sm: { span: 6 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input :disabled="this.kaiTF" v-decorator="['recordNo']" />
                <a-input :disabled="this.kaiTF" style="display:none" v-decorator="['id']" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="动物卫生监督所（分所）名称:"
                :labelCol="{ lg: { span: 10 }, sm: { span: 6 } }"
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
                  show-time
                  format="yyyy-MM-DD HH:mm"
                  disabled
                  v-decorator="['inspectiontime', { initialValue: getCurrentDate() }]"
                  style="width: 90%"
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
                :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-date-picker
                  show-time
                  format="YYYY-MM-DD HH:mm"
                  :disabled="this.kaiTF"
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
                  disabled
                  v-decorator="['shippername', { rules: [{ required: true, message: '请输入' }] }]"
                  name="shippername"
                  style="width:80%"
                />
                <a-button
                  :disabled="this.kaiTF"
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
                <a-input disabled v-decorator="['teltphone']" name="teltphone" />
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
                label="动物种类"
                :labelCol="{ lg: { span: 7 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 14 } }"
              >
                <a-select
                  :disabled="this.kaiTF"
                  v-decorator="['animalsort', { rules: [{ required: true, message: '请输入' }] }]"
                >
                  <a-select-option value="猪">猪</a-select-option>
                  <a-select-option value="牛">牛</a-select-option>
                  <a-select-option value="羊">羊</a-select-option>
                  <a-select-option value="鹿">鹿</a-select-option>
                  <a-select-option value="骆驼">骆驼</a-select-option>
                  <a-select-option value="马">马</a-select-option>
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
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="数量及单位:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 13 }, sm: { span: 8 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['animalnum', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width:40%"
                />
                <a-select
                  :disabled="this.kaiTF"
                  v-decorator="['QDWDanWei', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                  style="width:45%;margin-left:1%"
                >
                  <a-select-option value="1"> 头 </a-select-option>
                  <a-select-option value="2"> 只 </a-select-option>
                  <a-select-option value="3"> 箱 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="检疫地点:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
              >
                <a-input
                  disabled
                  v-decorator="[
                    'quarantineaddress',
                    { rules: [{ required: true, message: '请输入' }], initialValue: '现场' }
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="13">
              <a-form-item
                label="用途:"
                :labelCol="{ lg: { span: 6 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
              >
                <a-select
                  :disabled="this.kaiTF"
                  v-decorator="['myuse', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                >
                  <a-select-option value="屠宰"> 屠宰 </a-select-option>
                  <a-select-option value="乳用"> 乳用 </a-select-option>
                  <a-select-option value="饲养"> 饲养 </a-select-option>
                  <a-select-option value="种用"> 种用 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- <a-col :span="12">
              <a-form-item
                label="动物来源:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
              >
                <a-select
                  :disabled="this.kaiTF"
                  v-decorator="['animalsources', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                >
                  <a-select-option value="1"> 养殖场 </a-select-option>
                  <a-select-option value="2"> 交易市场 </a-select-option>
                  <a-select-option value="3"> 散养户 </a-select-option>
                  <a-select-option value="4"> 其他 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col> -->
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="野生动物驯养繁殖许可证号"
                :labelCol="{ lg: { span: 10 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
              >
                <a-input :disabled="this.kaiTF"></a-input
                ></a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="野生动物捕捉(猎捕)许可证号"
                :labelCol="{ lg: { span: 11 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 11 }, sm: { span: 9 } }"
              >
                <a-input :disabled="this.kaiTF"></a-input
                ></a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item
                label="启运地点:"
                :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
              >
                <a-select
                  disabled
                  v-decorator="['startaddress', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width: 30%"
                  @select="getCity($event, 'qy')"
                >
                  <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                    item.label
                  }}</a-select-option>
                </a-select>
                <a-select
                  :disabled="this.kaiTF"
                  v-decorator="['startaddress1', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                  style="width: 30%; margin-left: 10px"
                  @select="getCounty($event, 'qy')"
                >
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in cityArr" :key="index" :value="item.label">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <a-select
                  :disabled="this.kaiTF"
                  v-decorator="['startaddress2', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                  style="width: 30%; margin-left: 10px"
                >
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in countyArr" :key="index" :value="item.label">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['rqydzxx']"
                  placeholder="启运地点"
                  style="display:none;"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['startaddress3', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请输入乡（镇）"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="7">
              <a-form-item
                label="启运类型:"
                :labelCol="{ lg: { span: 10 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-select
                  :disabled="this.kaiTF"
                  v-decorator="['startaddress5', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                >
                  <a-select-option value="1"> 养殖场 </a-select-option>
                  <a-select-option value="2"> 交易市场 </a-select-option>
                  <a-select-option value="3"> 散养户 </a-select-option>
                  <a-select-option value="4"> 其他 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- <a-col :span="6">
              <a-form-item
                :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['startaddress3', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请输入乡（镇）"
                />
              </a-form-item>
            </a-col> -->
            <a-col :span="10">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['startaddress4', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请输入养殖场名称"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="到达地点"
                :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
              >
                <a-select
                  :disabled="this.kaiTF"
                  v-decorator="['rdddzxx', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width: 30%; margin-left: 10px"
                  @select="getCity($event, 'dd')"
                >
                  <a-select-option v-for="(item, index) in arr" :key="index" :value="item.label">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <a-select
                  :disabled="this.kaiTF"
                  v-decorator="['rdddzxx1', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                  style="width: 30%; margin-left: 10px"
                  @select="getCounty($event, 'dd')"
                >
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in cityArr" :key="index" :value="item.label">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <a-select
                  :disabled="this.kaiTF"
                  v-decorator="['rdddzxx2', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                  style="width: 30%; margin-left: 10px"
                >
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in countyArr" :key="index" :value="item.label">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['rdddzxxs']"
                  placeholder="到达地点"
                  style="display:none;"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['rdddzxx3', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请输入乡（镇）"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="7">
              <a-form-item
                label="到达类型"
                :labelCol="{ lg: { span: 10 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-select
                  :disabled="this.kaiTF"
                  v-decorator="['rdddzxx5', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width: 160px"
                  placeholder="请选择"
                >
                  <a-select-option value="1"> 养殖场 </a-select-option>
                  <a-select-option value="2"> 交易市场 </a-select-option>
                  <a-select-option value="3"> 散养户 </a-select-option>
                  <a-select-option value="4"> 其他 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- <a-col :span="6">
              <a-form-item
                :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['rdddzxx3', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请输入乡（镇）"
                />
              </a-form-item>
            </a-col> -->
            <a-col :span="10">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['rdddzxx4', { rules: [{ required: true, message: '请输入' }] }]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item
                label="运载工具牌号"
                :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
              >
                <a-input
                  :disabled="this.kaiTF"
                  v-decorator="['toolid', { rules: [{ required: true, message: '请输入' }] }]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <div class="qq">查验材料与疫情调查</div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="9">
              <a-form-item
                label="《种畜禽生产经营许可证》"
                :labelCol="{ lg: { span: 15 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 9 }, sm: { span: 12 } }"
              >
                <a-radio-group
                  :disabled="this.kaiTF"
                  v-decorator="['zxqsc', { rules: [{ required: true, message: '请输入' }], initialValue: '有' }]"
                >
                  <a-radio value="有">有</a-radio>
                  <a-radio value="无">无</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="7">
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
                :labelCol="{ lg: { span: 13 }, sm: { span: 7 } }"
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
                prop="resource"
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
                prop="resource"
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
              <div style="float:left;" v-if="this.kaiTF ">
                <a-button @click="showA" type="primary" v-show="!this.ABTF && FrName=='官方兽医'">
                  动物A
                </a-button>
                <a-button @click="showB" type="primary" v-show="this.ABTF&& FrName=='官方兽医'">
                  动物B
                </a-button>
              </div>
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
            <a-button type="primary" html-type="submit" style="width:315px; height: 40px;">
              保存
            </a-button>
          </a-form-item>
        </a-form>
      </a-modal>
      <!-- 修改表单-->
      <a-modal
        :footer="null"
        title="乳用、种用动物检疫工作记录单修改"
        :visible="updateinfo"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        width="1100px"
        :zIndex="500"
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
                :labelCol="{ lg: { span: 7 }, sm: { span: 6 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 8 } }"
              >
                <a-input v-decorator="['recordNo']" />
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
                  show-time
                  format="yyyy-MM-DD HH:mm:ss"
                  disabled
                  v-decorator="['inspectiontime']"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="检疫时间"
                show-time
                format="yyyy-MM-DD HH:mm"
                :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-date-picker
                  show-time
                  format="yyyy-MM-DD HH:mm:ss"
                  v-decorator="['quarantinetime']"
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
                  disabled
                  v-decorator="['shippername', { rules: [{ required: true, message: '请输入' }] }]"
                  name="shippername"
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
                <a-input disabled v-decorator="['teltphone']" name="teltphone" />
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
                label="动物种类"
                :labelCol="{ lg: { span: 7 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 14 } }"
              >
                <a-select v-decorator="['animalsort', { rules: [{ required: true, message: '请输入' }] }]">
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
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="数量及单位:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 13 }, sm: { span: 8 } }"
              >
                <a-input
                  v-decorator="['animalnum', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width:40%"
                />
                <a-select
                  v-decorator="['QDWDanWei', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                  style="width:45%;margin-left:1%"
                >
                  <a-select-option value="1"> 头 </a-select-option>
                  <a-select-option value="2"> 只 </a-select-option>
                  <a-select-option value="3"> 箱 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="检疫地点:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
              >
                <a-input v-decorator="['quarantineaddress', { rules: [{ required: true, message: '请输入' }] }]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="22" :pull="3">
              <a-form-item
                label="用途:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
              >
                <a-select
                  v-decorator="['myuse', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width: 160px"
                  placeholder="请选择"
                >
                  <a-select-option value="屠宰"> 屠宰 </a-select-option>
                  <a-select-option value="乳用"> 乳用 </a-select-option>
                  <a-select-option value="饲养"> 饲养 </a-select-option>
                  <a-select-option value="种用"> 种用 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- <a-col :span="12">
              <a-form-item
                label="动物来源:"
                :labelCol="{ lg: { span: 7 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
              >
                <a-select
                  v-decorator="['animalsources', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                >
                  <a-select-option value="1"> 养殖场 </a-select-option>
                  <a-select-option value="2"> 交易市场 </a-select-option>
                  <a-select-option value="3"> 散养户 </a-select-option>
                  <a-select-option value="4"> 其他 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col> -->

            <a-col :span="12">
              <a-form-item
                label="野生动物驯养繁殖许可证号"
                :labelCol="{ lg: { span: 11 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
              >
                <a-input></a-input
                ></a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="野生动物捕捉(猎捕)许可证号"
                :labelCol="{ lg: { span: 11 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 11 }, sm: { span: 9 } }"
              >
                <a-input></a-input
                ></a-form-item>
            </a-col>

            <a-col :span="12">
              <a-form-item
                label="启运地点:"
                :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
              >
                <a-select
                  disabled
                  v-decorator="['startaddress', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width: 30%;"
                  @select="getCity($event, 'qy')"
                >
                  <a-select-option v-for="(item, index) in arr" :value="item.label" :key="index">{{
                    item.label
                  }}</a-select-option>
                </a-select>
                <a-select
                  v-decorator="['startaddress1', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                  style="width: 30%; margin-left: 10px"
                  @select="getCounty($event, 'qy')"
                >
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in cityArr" :key="index" :value="item.label">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <a-select
                  v-decorator="['startaddress2', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                  style="width: 30%; margin-left: 10px"
                >
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in countyArr" :key="index" :value="item.label">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <a-input v-decorator="['rqydzxx']" placeholder="启运地点" style="display:none;" />
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item
                :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
              >
                <a-input
                  v-decorator="['startaddress4', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请输入养殖场名称"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="7">
              <a-form-item
                label="启运类型:"
                :labelCol="{ lg: { span: 10 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
              >
                <a-select
                  v-decorator="['startaddress5', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width: 160px"
                  placeholder="请选择"
                >
                  <a-select-option value="1"> 养殖场 </a-select-option>
                  <a-select-option value="2"> 交易市场 </a-select-option>
                  <a-select-option value="3"> 散养户 </a-select-option>
                  <a-select-option value="4"> 其他 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
              >
                <a-input
                  v-decorator="['startaddress3', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请输入乡（镇）"
                />
              </a-form-item>
            </a-col>
            <!-- <a-col :span="6">
              <a-form-item
                :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
              >
                <a-input
                  v-decorator="['startaddress4', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请输入养殖场名称"
                />
              </a-form-item>
            </a-col> -->
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item
                label="到达地点"
                :labelCol="{ lg: { span: 6 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 18 }, sm: { span: 17 } }"
              >
                <a-select
                  v-decorator="['rdddzxx', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width: 30%;"
                  @select="getCity($event, 'dd')"
                >
                  <a-select-option v-for="(item, index) in arr" :key="index" :value="item.label">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <a-select
                  v-decorator="['rdddzxx1', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                  style="width: 30%; margin-left: 10px"
                  @select="getCounty($event, 'dd')"
                >
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in cityArr" :key="index" :value="item.label">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <a-select
                  v-decorator="['rdddzxx2', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请选择"
                  style="width: 30%; margin-left: 10px"
                >
                  <a-select-option value="请选择"> 请选择 </a-select-option>
                  <a-select-option v-for="(item, index) in countyArr" :key="index" :value="item.label">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
                <!-- <Area
                  :province.sync="updateAddree.rdddzxx"
                  :city.sync="updateAddree.rdddzxx1"
                  :area.sync="updateAddree.rdddzxx2"
                /> -->
                <a-input v-decorator="['rdddzxxs']" placeholder="到达地点" style="display:none;" />
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item
                :labelCol="{ lg: { span: 0 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
              >
                <a-input
                  v-decorator="['rdddzxx3', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请输入乡（镇）"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="7">
              <a-form-item
                label="到达类型"
                :labelCol="{ lg: { span: 10 }, sm: { span: 4 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 8 } }"
              >
                <a-select
                  v-decorator="['rdddzxx5', { rules: [{ required: true, message: '请输入' }] }]"
                  style="width: 160px"
                  placeholder="请选择"
                >
                  <a-select-option value="1"> 养殖场 </a-select-option>
                  <a-select-option value="2"> 交易市场 </a-select-option>
                  <a-select-option value="3"> 散养户 </a-select-option>
                  <a-select-option value="4"> 其他 </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!-- <a-col :span="6">
              <a-form-item
                :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
              >
                <a-input
                  v-decorator="['rdddzxx3', { rules: [{ required: true, message: '请输入' }] }]"
                  placeholder="请输入乡（镇）"
                />
              </a-form-item>
            </a-col> -->
            <a-col :span="10">
              <a-form-item
                :labelCol="{ lg: { span: 2 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 16 }, sm: { span: 8 } }"
              >
                <a-input v-decorator="['rdddzxx4', { rules: [{ required: true, message: '请输入' }] }]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item
                label="运载工具牌号"
                :labelCol="{ lg: { span: 3 }, sm: { span: 3 } }"
                :wrapperCol="{ lg: { span: 8 }, sm: { span: 8 } }"
              >
                <a-input v-decorator="['toolid', { rules: [{ required: true, message: '请输入' }] }]" />
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
                :wrapperCol="{ lg: { span: 9 }, sm: { span: 12 } }"
              >
                <a-radio-group v-decorator="['zxqsc', { rules: [{ required: true, message: '请输入' }] }]">
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
                :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 16 }, sm: { span: 12 } }"
              >
                <a-input v-decorator="['bhid']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="15">
              <a-form-item
                label="《跨省引进乳用种用动物检疫审批表 》审批单位"
                :labelCol="{ lg: { span: 13 }, sm: { span: 7 } }"
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
                <a-radio-group v-decorator="['dwtjhgz', { rules: [{ required: true, message: '请输入' }] }]">
                  <a-radio value="有">有</a-radio>
                  <a-radio value="无">无</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="是否经强制免疫并在有效期内"
                :labelCol="{ lg: { span: 15 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 8 }, sm: { span: 12 } }"
              >
                <a-radio-group v-decorator="['qzmy', { rules: [{ required: true, message: '请输入' }] }]">
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
                <a-radio-group v-decorator="['outbreak', { rules: [{ required: true, message: '请输入' }] }]">
                  <a-radio value="有">有</a-radio>
                  <a-radio value="无">无</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="养殖档案"
                prop="resource"
                :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
              >
                <a-radio-group v-decorator="['recordrule', { rules: [{ required: true, message: '请输入' }] }]">
                  <a-radio value="符合">符合</a-radio>
                  <a-radio value="不符合">不符合</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="耳标佩戴是否符合规定"
                prop="resource"
                :labelCol="{ lg: { span: 12 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 10 }, sm: { span: 12 } }"
              >
                <a-radio-group v-decorator="['logorule', { rules: [{ required: true, message: '请输入' }] }]">
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
                <a-radio-group v-decorator="['eridemicarea', { rules: [{ required: true, message: '请输入' }] }]">
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
            <a-col :span="24">
              <a-form-item
                label="临床检查	"
                :labelCol="{ lg: { span: 4 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 15 }, sm: { span: 12 } }"
              >
                <a-radio-group v-decorator="['clinical', { rules: [{ required: true, message: '请输入' }] }]">
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
                :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
                :wrapperCol="{ lg: { span: 8 }, sm: { span: 12 } }"
              >
                <a-radio-group v-decorator="['situation']">
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
                <a-radio-group v-decorator="['quarantinerule', { rules: [{ required: true, message: '请输入' }] }]">
                  <a-radio value="是">是</a-radio>
                  <a-radio value="否">否</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="出具《动物检疫合格证明》编号	"
                :labelCol="{ lg: { span: 11 }, sm: { span: 1 } }"
                :wrapperCol="{ lg: { span: 11 }, sm: { span: 12 } }"
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
                <a-input v-decorator="['vetname']" disabled style="width:45%" />
                <a-date-picker
                  v-decorator="['Gftime']"
                  show-tiem
                  format="yyyy-MM-DD HH:mm"
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
                  show-tiem
                  format="yyyy-MM-DD HH:mm"
                  v-decorator="['rhzdate']"
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
      <!-- 显示表单  title="乳用、种用动物检疫工作记录单查看"-->
      <a-modal
        :footer="null"
        :visible="findinfo"
        :confirm-loading="confirmLoading"
        @ok="handleOk"
        @cancel="handleCancel"
        width="1100px"
        :zIndex="500"
        :destroyOnClose="true"
      >
        <div id="printNew">
          <table style="width: 100%;" class="printShow">
            <tbody>
              <tr>
                <td colspan="3"></td>
              </tr>
              <tr>
                <td style="padding-top: 20px;" colspan="3" align="right">记录单编号:{{ findList.recordNo }}</td>
              </tr>
              <tr>
                <td colspan="3" align="center">
                  <h3 class="h3Title">乳用、种用动物检疫工作记录单</h3>
                </td>
              </tr>
              <tr>
                <td align="left">
                  动物卫生监督所（分所）名称：
                  {{ findList.supervisename }}
                </td>
              </tr>
              <tr>
                <td>
                  <table class="kv-table printShow" style="width: 1000px;" id="myTable">
                    <tbody>
                      <tr>
                        <td class="kv-label" rowspan="7">基本情况</td>
                        <td class="kv-label">报检时间</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.inspectiontime }}
                        </td>
                        <td colspan="2" class="kv-label">检疫时间</td>
                        <td colspan="4" class="kv-content">
                          {{ findList.quarantinetime }}
                        </td>
                      </tr>
                      <tr>
                        <td class="kv-label">货主姓名</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.shippername }}
                        </td>
                        <td class="kv-label">联系电话</td>
                        <td colspan="1" class="kv-content">
                          {{ findList.teltphone }}
                        </td>
                        <td colspan="1" class="kv-label">身份证号码</td>
                        <td colspan="2" class="kv-content">
                          {{ findList.idcardnum }}
                        </td>
                      </tr>
                      <tr>
                        <td class="kv-label">养殖场名称</td>
                        <td colspan="5" class="kv-content">
                          {{ findList.farmsnme }}
                        </td>
                        <td colspan="1" class="kv-label">动物种类</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.animalsort }}
                        </td>
                      </tr>
                      <tr>
                        <td class="kv-label">数量</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.animalnum }}
                          {{ findList.QDWDanWei }}
                        </td>
                        <td colspan="1" class="kv-label">检疫地点</td>
                        <td colspan="5" class="kv-content">
                          {{ findList.quarantineaddress }}
                        </td>
                      </tr>
                      <tr>
                        <td class="kv-label">启运地点</td>
                        <td colspan="9" class="kv-content">
                          {{ findList.rqydzxx|replaceX }}
                        </td>
                      </tr>
                      <tr>
                        <td class="kv-label">到达地点</td>
                        <td colspan="9" class="kv-content">
                          {{ findList.rdddzxxs|replaceX }}
                        </td>
                      </tr>
                      <tr>
                        <td class="kv-label">运载工具牌号</td>
                        <td colspan="9" class="kv-content">
                          {{ findList.toolid }}
                        </td>
                      </tr>
                      <tr>
                        <td class="kv-label" rowspan="5">查验材料与疫情调查</td>
                        <td class="kv-label" colspan="2">《种畜禽生产经营许可证》</td>
                        <td colspan="1" class="kv-content">
                          {{ findList.zxqsc }}
                        </td>
                        <td class="kv-label">发证单位</td>
                        <td colspan="1" class="kv-content">
                          {{ findList.fzdw }}
                        </td>
                        <td colspan="1" class="kv-label">编号</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.bhid }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="kv-label">《跨省引进乳用种用动物检疫审批表》审批单位</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.spdw }}
                        </td>
                        <td colspan="1" class="kv-label">审批表编号</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.spbhb }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="kv-label">《动物防疫条件合格证》</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.dwtjhgz }}
                        </td>
                        <td colspan="1" class="kv-label">是否经强制免疫并在有效期内</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.qzmy }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="kv-label">养殖场疫情（六个月内）</td>
                        <td colspan="1" class="kv-content">
                          {{ findList.outbreak }}
                        </td>
                        <td class="kv-label">养殖档案</td>
                        <td colspan="1" class="kv-content">
                          {{ findList.recordrule }}
                        </td>
                        <td colspan="1" class="kv-label">耳标佩戴是否符合规定</td>
                        <td colspan="3" class="kv-content">
                          {{ findList.logorule }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" class="kv-label">是否疫区</td>
                        <td colspan="2" class="kv-content">
                          {{ findList.eridemicarea }}
                        </td>
                        <td class="kv-label">其他项目检查</td>
                        <td colspan="5" class="kv-content">
                          {{ findList.other }}
                        </td>
                      </tr>
                      <tr>
                        <td class="kv-label">临床检查</td>
                        <td align="center" class="kv-content" colspan="10">
                          <div style="float: left;">
                            {{ findList.clinical }}
                            <a-button
                              @click="showA"
                              type="primary"
                              v-show="!this.ABTF && findList.KZID == 0 && FrName=='官方兽医'"
                            >
                              动物A
                            </a-button>

                            <a-button
                              @click="showB"
                              type="primary"
                              v-show="this.ABTF && findList.KZID == 0 && FrName=='官方兽医'"
                            >
                              动物B
                            </a-button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="kv-label">实验室检查</td>
                        <td colspan="2" class="kv-label">法定检疫对象实验室检测情况</td>
                        <td colspan="7" style="border-left: none" class="kv-content">
                          {{ findList.situation }}
                        </td>
                      </tr>
                      <tr>
                        <td id="t1" class="kv-label" rowspan="1">检疫结果处理</td>
                        <td colspan="2" class="kv-label">是否符合检疫规定</td>
                        <td id="td1" colspan="2" class="kv-content">
                          {{ findList.quarantinerule }}
                        </td>
                        <td id="td2" colspan="2" class="kv-label">出具《动物检疫合格证明》编号</td>
                        <td id="td3" colspan="4" class="kv-content">
                          {{ findList.code }}
                        </td>
                      </tr>
                      <tr>
                        <td colspan="1" class="kv-label">官方兽医签字</td>
                        <td colspan="4" class="kv-content">
                          <div style="text-align: left; width: 100%;">
                            <span> {{ findList.vetname }}</span>
                          </div>
                          <div style="text-align: right; width: 100%;">
                            <span> {{ findList.Gftime }} </span>
                          </div>
                        </td>
                        <td class="kv-label">货主签字</td>
                        <td colspan="4" class="kv-content">
                          <div style="text-align: left; width: 100%;">
                            <span>
                              {{ findList.rhzqz }}
                            </span>
                          </div>
                          <div style="text-align: right; width: 100%;">
                            <span> {{ findList.rhzdate }} </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <div id="myPrintArea1"></div>
                  <div id="myPrintAreas" style="display: none;"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <a-button class="da" type="primary" v-print="'#printNew'">打印</a-button>
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
        :zIndex="1000"
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
    <!-- 显示表单B-->
    <!-- <a-modal :zIndex="1001" width="1000px" v-model="showvisible" :footer="null" >
      <dwjy-binfo :info="info" ></dwjy-binfo>
    </a-modal> -->
    <!-- 显示表单A-->
    <!-- <a-modal :zIndex="1001" width="1000px" v-model="showvisibleA" :footer="null">
      <dwjy-ainfo :info="info" ></dwjy-ainfo>
    </a-modal> -->
    <a-modal
      width="1000px"
      :zIndex="1000"
      :destroyOnClose="true"
      title="动物产地检疫A"
      v-model="showvisibleA"
      :footer="null"
    >
      <dwjy-binfot ref="dw" :myinfo="info" :showvisible="showvisibleA" :JLDLX="JLDLX"></dwjy-binfot>
    </a-modal>
    <!-- 动物B跳转 -->
    <a-modal
      width="1000px"
      :zIndex="1000"
      :destroyOnClose="true"
      title="动物产地检疫B"
      v-model="showvisible"
      :footer="null"
    >
      <dwjy-ainfot ref="dw" :myinfo="info" :showvisible="showvisible" :JLDLX="JLDLX"></dwjy-ainfot>
    </a-modal>
  </div>
</template>

<script>
import Area from '@/views/component/area/index'
import { placexiangx } from '@/assets/playdz'
import { getAddreeCondition } from '@/assets/getAddree'
import httper from '@/utils/httper'
import { FindAllInfo, FindInfoByFStId, UpdateInfo, DeleteInfo, FindSbdInfo, FindShipperInfo } from '@/api/cdjyEb/lzjy'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import formatTime from '@/utils/public.js'
import dwjyBinfo from '../dwjy/dwjyBcompont/dwjyBinfo'
import dwjyAinfo from '../dwjy/dwjyAcompont/dwjyAinfo'
import clu from '../compont/clu2.vue'
import citys from '@/assets/citys' // 三级联动数据
import dwjyBinfot from '@/views/jyjg/dwjy/dwcdjyCompont/dwjyA'
import dwjyAinfot from '@/views/jyjg/dwjy/dwcdjyCompont/dwjy'
import Qs from 'qs'
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
  { title: '状态', key: 'FSm1', width: 120, align: 'center', dataIndex: 'FSm1' },
  { title: '记录单编号', key: 'recordNo', align: 'center', dataIndex: 'recordNo', width: 280 },
  { title: '报检时间', key: 'inspectiontime', align: 'center', dataIndex: 'inspectiontime', width: 150 },
  { title: '检疫时间', key: 'quarantinetime', align: 'center', dataIndex: 'quarantinetime', width: 150 },
  { title: '货主姓名', key: 'shippername', align: 'center', dataIndex: 'shippername', width: 180 },
  { title: '动物种类', key: 'animalsort', align: 'center', dataIndex: 'animalsort', width: 150 },
  {
    title: '用途',
    key: 'myuse',
    align: 'center',
    dataIndex: 'myuse',
    width: 120
  },
  {
    title: '养殖场名称',
    key: 'farmsnme',
    align: 'center',
    dataIndex: 'farmsnme',
    width: 250
  },
  {
    title: '检疫地点',
    key: 'quarantineaddress',
    align: 'center',
    dataIndex: 'quarantineaddress',
    width: 200
  },
  {
    title: '启运地点',
    key: 'rqydzxx',
    align: 'center',
    dataIndex: 'rqydzxx',
    width: 300,
    customRender: (t, r, index) => {
      return t.replace(/\//g, '')
    }
  },
  {
    title: '到达地点',
    key: 'rdddzxxs',
    align: 'center',
    dataIndex: 'rdddzxxs',
    width: 300,
     customRender: (t, r, index) => {
      return t.replace(/\//g, '')
    }
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

// 申报单弹窗列表
const columnsSbd = [
  { title: '申报单编号', width: 220, align: 'center', dataIndex: 'QDWNumber', key: 'QDWNumber' },
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
  { title: '养殖场名称', width: 180, align: 'center', dataIndex: 'yzcmc', key: 'yzcmc' },
  { title: '动物种类', width: 150, align: 'center', dataIndex: 'QDWXuZhongZ', key: 'QDWXuZhongZ' },
  { title: '数量', width: 150, align: 'center', dataIndex: 'QDWQuantity', key: 'QDWQuantity' },
  { title: '检疫地点', width: 150, align: 'center', dataIndex: 'QDWAddress', key: 'QDWAddress' },
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
  { title: '名称', key: 'FSyzcmc', align: 'center', width: 200, dataIndex: 'FSyzcmc' },
  { title: '动物种类', key: 'FSxz', align: 'center', width: 150, dataIndex: 'FSxz' },
  { title: '地址', key: 'FSdz', align: 'center', width: 220, dataIndex: 'FSdz' },
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
// { id: 'zxqc', label: '种畜禽场' }

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
    dwjyBinfo,
    dwjyAinfo,
    clu,
    dwjyAinfot,
    dwjyBinfot,
    Area
  },
  data () {
    return {
      updateAddree: {
        rdddzxx: '',
         rdddzxx1: '',
          rdddzxx2: ''
      },
      printObj: {
        id: 'printNew',
        popTitle: '动物检疫（产品A）', // 文件标题
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      addree: '',
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
      keyWord: '',
      idList: '',
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
      // 区，动监站选择
      regionTF: false,
      regionTF1: false,
      regInfo: [],
      regInfo1: [], // 到达地点使用
      peoTF: false,
      peoTF1: false,
      peoInfo: [],
      peoInfo1: [],

      // 区名称
      regName: '请选择',
      regName1: '请选择',
      // 动监站名称
      peoName: '请选择',
      peoName1: '请选择',
      // 省市区三级联动数组数据
      arr: [],
      cityArr: [],
      countyArr: [],

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
      selectSbdinfo: false, // 申报单信息弹窗

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
      JLDLX: 'AH_AiryEmbryoQuarantine',
      kaiTF: false,
      ErBiaoHao: '',
      FrName: JSON.parse(localStorage.getItem('AllInfo')).FrName
    }
  },
  created () {
    this.arr = citys
    // 行政树
    getAdminAddress()
      .then(res => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
        this.regInfo = this.options[0].children
        this.regInfo1 = this.options[0].children
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
  mounted () {
    // this.initSSX()
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
    async pil () {
      if (this.selectedRowKeys.length > 0) {
        console.log(this.idList)
        await this.deleteInfo(this.idList)
        this.idList = ''
        // eslint-disable-next-line no-undef
        yenum1 = 1
        this.reload()
      } else {
        alert('请选择要删除的数据')
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRows)
      this.selectedRowKeys = selectedRowKeys
      var arr = ''
      selectedRows.forEach(item => {
        arr = arr + ',' + item.FStId
      })
      this.idList = arr.substring(1)
    },
    initSSX (defaultSheng) {
      // 初始省市县数据
      this.$nextTick(() => {
        this.form.setFieldsValue({
          startaddress: defaultSheng,
          rdddzxx: defaultSheng
        })
        this.getCity(defaultSheng, 'dd')
        this.getCity(defaultSheng, 'qy')
      })
    },
    // 获取市区
    getCity (val, type) {
      console.log(val + '##' + type)
      for (var i = 0; i < this.arr.length; i++) {
        var obj = this.arr[i]

        if (val === obj.label) {
          this.cityArr = obj.children
          this.countyArr = obj.children[0].children
          if (type === 'qy') {
            this.form.setFieldsValue({
              startaddress1: obj.children[0].label,
              startaddress2: obj.children[0].children[0].label
            })
          } else if (type === 'dd') {
            this.form.setFieldsValue({
              rdddzxx1: obj.children[0].label,
              rdddzxx2: obj.children[0].children[0].label
            })
          }
        }
      }
    },
    // 获取区县
    getCounty (val, type) {
      console.log(val + '&&' + type)
      for (var i = 0; i < this.cityArr.length; i++) {
        var obj = this.cityArr[i]
        if (val === obj.label) {
          this.countyArr = obj.children
          if (type === 'qy') {
            this.form.setFieldsValue({
              startaddress2: obj.children[0].label
            })
          } else if (type === 'dd') {
            this.form.setFieldsValue({
              rdddzxx2: obj.children[0].label
            })
          }
        }
      }
    },
    // 获取申报单编号
    getHao () {
      const AllInfo = JSON.parse(localStorage.getItem('AllInfo'))
      this.$axios
        .post(
          `${httper}/SetSBDBH.ashx?FSunitUstrId=${AllInfo.FSuserId}&lx=sb&FSunitId=${AllInfo.FSunitId}&FSunitName=${AllInfo.FSunitName}&uid=${AllInfo.FStId}`
        )
        .then(res => {
          var recordNo = res.data.data.result
          if (res.data.data.result) {
            this.$nextTick(() => {
                const FuName = sessionStorage.getItem('FuName')
              this.form.setFieldsValue({ vetname: FuName })
              this.form.setFieldsValue({ recordNo: recordNo })
              this.form.setFieldsValue({ supervisename: AllInfo.FuseEName })
            })
          }
        })
    },
    showB () {
      console.log('动物B')
      this.info = this.findList
      this.showvisible = true
      console.log(this.info)
    },
    showA () {
      console.log('动物A')
      this.info = this.findList
      this.showvisibleA = true
      console.log(this.info)
    },
    getCurrentDate () {
      return formatTime(null, 'yyyy-MM-dd hh:mm:ss')
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
          console.log(res)
          if (res.Result) {
            var datalist = JSON.parse(res.Data)
            //  console.log(JSON.stringify(datalist) + '&&')
            datalist.rows.forEach(item => {
              item.inspectiontime = formatTime(item.inspectiontime, 'yyyy-MM-dd')
              item.quarantinetime = formatTime(item.quarantinetime, 'yyyy-MM-dd')
            })
            this.data1 = datalist.rows

            if (datalist.rows.length) {
              this.findList = datalist.rows[0]
              if (this.findList.clinical === '合格') {
                this.kaiTF = true
              }
              if (this.findList.rdddzxx === '山东省' && this.findList.clinical === '合格') {
                this.ABTF = true
              } else if (this.findList.clinical === '合格') {
                this.ABTF = false
              }
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
      this.kaiTF = false
      this.initSSX('山东省')
    },
    updateModal (v) {
      console.log(v.FStId)
      this.formType = 'update'
      this.peoTF = true
      this.peoTF1 = true
      var p = {
        FStId: v.FStId,
        UserId: this.UserId
      }
      FindInfoByFStId(p).then(res => {
        console.log(res.Data, '@@@@')
        if (res.Result) {
          this.updateinfo = true
          this.$nextTick(() => {
            var datalist = res.Data
            this.initSSX(datalist.startaddress1)
            // this.ChangeRegion(datalist.startaddress1, 'qy')
            // this.ChangeRegion(datalist.rdddzxx1, 'dd')
            setTimeout(() => {
              console.log(datalist)
              this.form.setFieldsValue(datalist)
              this.updateAddree.rdddzxx = datalist.rdddzxx
              this.updateAddree.rdddzxx1 = datalist.rdddzxx1
              this.updateAddree.rdddzxx2 = datalist.rdddzxx2
            }, 500)
          })
        } else {
          this.$notification.info({ message: '未查询到任何信息' })
          // this.$notification.info({ message: res.Msg })
        }
      })
    },
    findModal (v) {
      var p = {
        FStId: v.FStId,
        UserId: this.UserId
      }
      FindInfoByFStId(p).then(res => {
        if (res.Result) {
          this.findinfo = true
          this.$nextTick(() => {
            res.Data.inspectiontime = formatTime(res.Data.inspectiontime, 'yyyy-MM-dd hh:mm:ss')
            res.Data.quarantinetime = formatTime(res.Data.quarantinetime, 'yyyy-MM-dd hh:mm:ss')
            res.Data.Gftime = formatTime(res.Data.Gftime, 'yyyy年MM月dd日 hh时')
            res.Data.rhzdate = formatTime(res.Data.rhzdate, 'yyyy年MM月dd日 hh时')
            this.findList = res.Data
            console.log(this.findList)
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
    // 市级选择触发
    ChangeTown (val) {
      console.log(val)
    },
    ChangeRegion (val, type) {
      console.log(val + ':' + type)
      if (val === '请选择' || val === '') {
        this.peoTF = false
      } else if (type === 'qy') {
        this.peoTF = true
        this.peoName = '请选择'
        if (this.regInfo[val]) {
          this.regName = this.regInfo[val].label
          this.peoInfo = this.regInfo[val].children
        }
      } else if (type === 'dd') {
        this.peoTF1 = true
        this.peoName1 = '请选择'
        if (this.regInfo[val]) {
          this.regName1 = this.regInfo1[val].label
          this.peoInfo1 = this.regInfo1[val].children
        }
      }
    },
    ChangePeo (val, type) {
      if (val === '请选择' || val === '') {
        this.peoName = '请选择'
      } else if (type === 'qy') {
        this.peoTF = true
        this.peoName = this.peoInfo[val].label
        console.log(this.regName, this.peoName)
        // const shi = this.form.getFieldValue('startaddress')
        // const rqydzxx = shi + this.regName + this.peoName// 生产单位名称地址
        // this.form.setFieldsValue({ rqydzxx: rqydzxx })
      } else if (type === 'dd') {
        console.log(this.regName1, this.peoName1)
        this.peoTF1 = true
        this.peoName1 = this.peoInfo1[val].label
        // console.log(this.regName, this.peoName)
        // const shi = this.form.getFieldValue('rdddzxx')
        // var rdddzxxs = shi + this.regName1 + this.peoName1// 到达地点
        // this.form.setFieldsValue({ rdddzxxs: rdddzxxs })
      }
    },

    // 申报单弹窗操作
    findQCPNumberInfo () {
      var p = {
        offsetSbd: this.offsetSbd,
        limitSbd: this.limitSbd,
        selectwhere: this.selectwhere,
        UserId: this.UserId
      }
      // console.log(JSON.stringify(p))
      FindSbdInfo(p)
        .then(res => {
          this.selectSbdinfo = true
          console.log(JSON.parse(res.Data))
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
      this.findQCPNumberInfo()
    },
    // onSelectChangeSbd (selectedRowKeys, selectedRows) { // 废弃
    //    console.log(selectedRowKeys)
    //     this.selectedRowKeysSbd = selectedRowKeys
    //    if (selectedRows) {
    //      var dataRow = selectedRows[0]
    //      console.log(JSON.stringify(dataRow))
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
      console.log(data)
      this.selectSbdinfo = false
      this.ErBiaoHao = data.QDWErBiaoHao
      this.$nextTick(() => {
        this.form.setFieldsValue({
          id: data.FStId,
          shippername: data.QDWCargoOwner, // 货主姓名
          teltphone: data.QDWPhone, // 联系电话
          // QDWNumber: data.QDWNumber, // 申报单编号
          farmsnme: data.yzcmc, // 养殖场名称
          animalsort: data.QDWXuZhongZ, // 动物种类
          // QDWNumber: data.QDWQuantity, // xx申报数量
          animalnum: data.QDWQuantity, // 申报数量
          QDWDanWei: data.QDWDanWei, // 单位
          quarantineaddress: data.QDWAddress ? data.QDWAddress : '现场', // 检疫地点
          myuse: data.QDWYongTu,
          startaddress: data.QDWShengQy,
          startaddress1: data.QDWShiQy,
          startaddress2: data.QDWXianQy,
          startaddress5: data.QDWTypeQy, // 启运类型
          startaddress3: data.QDWXiangQy,
          startaddress4: data.QDWCunQy,
          animalsources: data.animalsources ? data.animalsources : '养殖场',

          rdddzxx: data.QDWShengDd,
          rdddzxx1: data.QDWShiDd,
          rdddzxx2: data.QDWXianDd,
          rdddzxx5: data.QDWTypeDd, // 到达类型
          rdddzxx3: data.QDWXiangDd,
          rdddzxx4: data.QDWCunDd,

          rhzqz: data.QDWAttn // 官方兽医（货主签字）
        })
      })
    },
    handleCancelSbd (e) {
      this.selectSbdinfo = false
      this.selectwhere = ''
    },
    // 选择货主信息
    findShipper () {
      // this.Type = 'gmyzc'// 默认规模养殖场
      var p = {
        offset: this.offsetHz,
        limit: this.limitHz,
        Type: this.Type,
        FFarmName: this.FFarmName,
        UserId: this.UserId
      }
      console.log(JSON.stringify(p))
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
      console.log(JSON.stringify(data) + '@@@@选择的数据')
      this.selectShipperinfo = false
      this.$nextTick(() => {
        const adree = data.FSdz
         const arr = placexiangx(adree)
         const a = arr[3].replace('/', '')
        this.form.setFieldsValue({
          startaddress: arr[0],
          startaddress1: arr[1],
          startaddress2: arr[2],
          startaddress3: a,
          shippername: data.FSfzr, // 货主名称
          farmsnme: data.FSyzcmc, // 养殖场名称
          startaddress4: data.FSxxdz, // 启运类型后面的养殖场名称
          animalsort: data.FSxz, // 种类
          // startaddress: data.FSdz, // 地址全称
          teltphone: data.FSlxdh, // 电话
        //    if (data.FSyzclx !== '散养户') {
        //   startaddress5: '养殖场'
        // } else {
        // // eslint-disable-next-line no-redeclare
        // startaddress5:'散养户'
        // }
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

      this.findList = {}
      this.formType = ''
      this.form.resetFields()
    },
    deleteInfo (ids) {
      console.log(ids)
      var p = {
        FStId: ids,
        UserId: this.UserId
      }
      DeleteInfo(p).then(res => {
        this.$message.success('删除成功')
      })
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
    //  from表单验证
    handleSubmit (e) {
      e.preventDefault()
      var that = this
      const sheng = that.form.getFieldValue('startaddress')
      const shi = that.form.getFieldValue('startaddress1')
      const qu = that.form.getFieldValue('startaddress2')
      const xiang = that.form.getFieldValue('startaddress3')
      const cun = that.form.getFieldValue('startaddress4')
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
        console.log(JSON.stringify(v) + '##表单数据')
        if (!err) {
          // 新增
          var p = v
          p.ErBiaoHao = this.ErBiaoHao
          p.UserId = that.UserId
          p.QDWNumber = v.animalnum
          p.JLDLX = this.JLDLX
          if (that.formType === 'add') {
            console.log(p)
            // AddInfo(p)
            this.$axios({
              method: 'post',
              url: 'http://www.miliotech.com:8886/QDZSAPP/HtmlAshxQua/UplaodJYFiles.ashx',
              data: Qs.stringify({
                json: JSON.stringify(p),
                type: 'AH_AiryEmbryoQuarantine',
                uid: this.UserId
              })
            })
              .then(res => {
                setTimeout(() => {
                  this.$notification.success({
                    message: res.data.errorCode === 1 ? res.data.errorMsg : '新增成功'
                    // message: res.Msg
                  })
                }, 100)
                // if (res.Result) {
                if (res.data.errorCode !== 1) {
                  this.formType = ''
                  this.kaiTF = true
                  this.findAll()
                  // this.visible = false
                  // this.reload()
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
              console.log(JSON.stringify(result) + '&222#')
              UpdateInfo(result)
                .then(res => {
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
    margin-left: 50px;
       td{
      height: 60px;
    }
  }
}
#printNew {
  padding: 20px;
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
  width: 294px;
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
  width: 260px;
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
</style>
