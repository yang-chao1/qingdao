<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;" @submit="handleSubmits" :form="form">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="物资名称">
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
            <!-- 新增-->
            <a-button v-permission="{active:'WRegistrationadd'}" type="primary" style="height:40px" icon="plus" @click="showModal()">新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-modal
              :footer="null"
              title="新增入库信息"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
            >
              <a-form @submit="handleSubmit" :form="Addform">
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="物资类别"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-select @change="ChangeFc" v-decorator="['FWZLB']" placeholder="请选择">
                        <a-select-option v-for="(item, index) in suppliesTypeInfo" :key="index" :value="item.FcName">
                          {{ item.FcName }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="物资名称"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-select
                        :disabled="this.FRnameTF ? 'disabled' : false"
                        @change="ChangeCj"
                        v-decorator="['FRname', { rules: [{ required: true, message: '请选择' }] }]"
                        placeholder="请选择"
                      >
                        <a-select-option v-for="(item, index) in FRnameInfo" :key="index" :value="item.FWzmc">
                          {{ item.FWzmc }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="入库数量"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FRnumber', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FRnumber"
                      />
                    </a-form-item>
                    <a-form-item
                      label="单位"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input disabled v-decorator="['FRunit']" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="生产厂家"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-select
                        @change="ChangeCC"
                        :disabled="this.FRproductionTF ? 'disabled' : false"
                        v-decorator="['FRproduction', { rules: [{ required: true, message: '请选择' }] }]"
                        placeholder="请选择"
                      >
                        <a-select-option v-for="(item, index) in FRproductionInfo" :key="index" :value="item.FWzsccj">
                          {{ item.FWzsccj }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="生产批号"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FRBatch']" name="FRBatch" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="签收单位"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FRrksign']" name="FRrksign" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="签收人"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FRsign']" name="FRsign" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="入库时间"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-date-picker
                        v-decorator="['FRstorage', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FRstorage"
                        placeholder="请输入更新日期"
                      />
                      <!-- <a-input
                        v-decorator="['FRstorage', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FRstorage"
                      /> -->
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="有效期"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-date-picker
                        v-decorator="['FRvalidity', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FRvalidity"
                        placeholder="请输入更新日期"
                      />
                      <!-- <a-input
                        v-decorator="['FRvalidit', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FRvalidit"
                      /> -->
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 畜禽标识类的物资时显示 -->
                <div v-if="cqbsTF">
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="任务号"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input disabled v-decorator="['xx3']" name="xx3" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="箱号"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input disabled v-decorator="['xx3']" name="xx3" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="耳标号段"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input disabled v-decorator="['xx3']" name="xx3" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </div>

                <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                  <a-button type="primary" html-type="submit" style="width:315px; height: 40px;">
                    确认
                  </a-button>
                </a-form-item>
              </a-form>
            </a-modal>
            <!-- 修改弹窗 查看弹窗 -->
            <a-modal
              :title="this.f ? '修改' : '查看'"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1000px"
              :destroyOnClose="true"
            >
              <div>
                <a-form @submit="handleSubmit" :form="Upform">
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="物资类别"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-select
                          @change="ChangeFc"
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FWZLB']"
                          placeholder="请选择"
                        >
                          <a-select-option v-for="(item, index) in suppliesTypeInfo" :key="index" :value="item.FcName">
                            {{ item.FcName }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="物资名称"
                        @change="ChangeCj"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-select
                          :disabled="this.f && this.FRnameTF ? false : 'disabled'"
                          v-decorator="['FRname', { rules: [{ required: true, message: '物资名称' }] }]"
                          placeholder="请选择"
                        >
                          <a-select-option v-for="(item, index) in FRnameInfo" :key="index" :value="item.FWzmc">
                            {{ item.FWzmc }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="入库数量（万套）"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FRnumber', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FRnumber"
                        />
                      </a-form-item>
                      <a-form-item
                        label="单位"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input disabled v-decorator="['FRunit']" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="生产厂家"
                        @change="ChangeCC"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-select
                          :disabled="this.f && this.FRproductionTF ? false : 'disabled'"
                          v-decorator="['FRproduction', { rules: [{ required: true, message: '请输入' }] }]"
                          placeholder="请选择"
                        >
                          <a-select-option v-for="(item, index) in FRproductionInfo" :key="index" :value="item.FWzsccj">
                            {{ item.FWzsccj }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="生产批号"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input :disabled="this.f ? false : 'disabled'" v-decorator="['FRBatch']" name="FRBatch" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="签收单位"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input :disabled="this.f ? false : 'disabled'" v-decorator="['FRrksign']" name="FRrksign" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="签收人"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input :disabled="this.f ? false : 'disabled'" v-decorator="['FRsign']" name="FRsign" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="入库时间"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-if="!this.f"
                          disabled
                          v-decorator="['FRstorage', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FRstorage"
                        />
                        <a-date-picker
                          v-if="this.f"
                          v-decorator="['FRstorage', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FRstorage"
                          placeholder="请输入更新日期"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="有效期"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-if="!this.f"
                          disabled
                          v-decorator="['FRvalidity', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FRvalidity"
                        />
                        <a-date-picker
                          v-if="this.f"
                          v-decorator="['FRvalidity', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FRvalidity"
                          placeholder="请输入更新日期"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 畜禽标识类的物资时显示 -->
                  <div v-if="this.cqbsTF">
                    <a-row>
                      <a-col :span="12">
                        <a-form-item
                          label="任务号"
                          :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                        >
                          <a-input disabled v-decorator="['xx3']" name="xx3" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item
                          label="箱号"
                          :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                        >
                          <a-input disabled v-decorator="['xx3']" name="xx3" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="12">
                        <a-form-item
                          label="耳标号段"
                          :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                        >
                          <a-input disabled v-decorator="['xx3']" name="xx3" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </div>

                  <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                    <a-button
                      type="primary"
                      html-type="submit"
                      style="width:315px; height: 40px;"
                      :hidden="this.f ? false : 'hidden'"
                    >
                      确认
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
            <!-- <a-button type="primary" style="height:40px">统计</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px">导出</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px">列表定制</a-button> -->
            <a-tree-select
              style="margin-top: -1px ;width: 250px;float:right;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="所在地"
              allowClear
              :tree-data="options"
              @change="mocheck"
            >
            </a-tree-select>
          </div>
          <!-- 页面表格 -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="zYRKDjListIfno"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a v-permission="{active:'WRegistrationsele'}" slot="action" @click="find(record)">查看&nbsp;&nbsp;</a>
              <a v-permission="{active:'WRegistrationupd'}" slot="action" @click="update(record)">修改&nbsp;&nbsp;</a>
            </template>
          </a-table>
          <div>
            <a-pagination
              show-quick-jumper
              :default-current="offset"
              :total="this.totalnum"
              show-less-items
              @change="onChange"
              :current="offset"
              style="margin: 10px"
            />
            <span
              style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
            >当前第 {{ offset }}/{{ Math.ceil(this.totalnum / limit) }} 页 共 {{ this.totalnum }} 条记录 每页
              {{ this.limit }} 条</span
            >
          </div>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
// 接口请求调用
import { zYRKDjList, ZYRKDjXQ, zYRKDjaddxllist, zYRKDjInsert, zYRKDjUpdate } from '@/api/jbfk'
import formatTime from '@/utils/public'
import { getAdminAddress } from '@/api/AdministrativeAddress'
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
  { title: '物资类别', width: 200, align: 'center', dataIndex: 'FWZLB', key: 'FWZLB' },
  { title: '物资名称', width: 200, align: 'center', dataIndex: 'FRname', key: 'FRname' },
  { title: '数量', width: 200, align: 'center', dataIndex: 'FRnumber', key: 'FRnumber' },
  { title: '单位', width: 220, align: 'center', dataIndex: 'FRunit', key: 'FRunit' },
  { title: '生产厂家', width: 200, align: 'center', dataIndex: 'FRproduction', key: 'FRproduction' },
  { title: '距离天数', width: 100, align: 'center', dataIndex: 'DAYNumber', key: 'DAYNumber' },
  { title: '状态', width: 200, align: 'center', dataIndex: 'statics', key: 'statics' },
  { title: '批号', width: 200, align: 'center', dataIndex: 'FRBatch', key: 'FRBatch' },
  { title: '入库时间',
width: 200,
align: 'center',
dataIndex: 'FRstorage',
key: 'FRstorage',
  customRender: (t, r, index) => {
      return formatTime(t, 'yyyy-MM-dd hh:mm:ss')
    } },
  { title: '有效时间',
width: 200,
align: 'center',
dataIndex: 'FRvalidity',
key: 'FRvalidity',
  customRender: (t, r, index) => {
      return formatTime(t, 'yyyy-MM-dd hh:mm:ss')
    } },
  { title: '签收单位', width: 200, align: 'center', dataIndex: 'FSenterpriseName', key: 'FSenterpriseName' },
  { title: '签收人', width: 200, align: 'center', dataIndex: 'FRsign', key: 'FRsign' },
  { title: '维护时间',
width: 200,
align: 'center',
dataIndex: 'xx13',
key: 'xx13',
customRender: (t, r, index) => {
      return formatTime(t, 'yyyy-MM-dd hh:mm:ss')
    } },
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
      selectwhere: '',

      queryParam: { status: 0, status1: 0 },
      fromdata: '',
      columns,
      zYRKDjListIfno: [],

      // from 表单
      form: this.$form.createForm(this),
      Addform: this.$form.createForm(this),
      Upform: this.$form.createForm(this),
      suppliesTypeInfo: [], // 参数类型数组
      FRnameInfo: [],
      FRproductionInfo: [],
      suppliesTypeTF: true,
      FRnameTF: true,
      FRproductionTF: true,

      // 点击 弹出框
      visible: false,
      f: true,
      updateinfo: false,
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      loading: false,
      UserId: sessionStorage.getItem('FStId'),
      FStIdItem: '',
      // 畜禽标识类的物资
      cqbsTF: false,
      // 列表查询
      // 物资类别 固定为1 获取物资类别信息   为2时获取物资名称  为4时获取生产厂家
      wttype: '',
      // 物资类别
      fyname: '',
      // 物资名称
      Sjname: '',
      // 单位
      dwName: '',
      UpInfo: {},
      // 行政存储
      FeQD: [],
      FeQS: [],
      FeDJ: [],
      FeDjz: [],
      options: []
    }
  },
  created () {
    yenum1 = 1
    this.ajaxData()
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
        // for (var i = 0; i < this.FeQS.length - 1; i++) {

        // }
        console.log(this.FeQD, this.FeQS, this.FeDJ)
      })
      .catch(rol => {
        console.log(rol)
      })
  },
  methods: {
    mocheck () {

    },
    ajaxData (index, ins) {
      yenum1 = 1
      if (index) {
        yenum1 = index
      }
      var parameter = {
        UserId: this.UserId,
        offset: this.offset,
        limit: this.limit,
        selectwhere: this.selectwhere
      }
      // 列表信息查询
      zYRKDjList(parameter).then(res => {
        console.log(111)
        var a = JSON.parse(res.Data)
        this.zYRKDjListIfno = a.rows
        this.totalnum = parseInt(a.total)
        console.log(a)
      })
    },
    // 详情查询
    ZYRKDjXQInfo () {
      var p = {
        FStId: this.FStIdItem,
        UserId: this.UserId
      }
      ZYRKDjXQ(p)
        .then(res => {
          console.log(res)
          var Clres = res.Data
          this.UpInfo = Clres
          if (Clres.FWZLB === '畜禽标识类') {
            this.cqbsTF = true
          }
          Clres.FRstorage = formatTime(Clres.FRstorage, 'yyyy-MM-dd hh:mm:ss')
          Clres.FRvalidity = formatTime(Clres.FRvalidity, 'yyyy-MM-dd hh:mm:ss')

          this.Upform.setFieldsValue(Clres)

          // })
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 分页方法
    onChange (checkedValues, a) {
      this.selectedRowKeys = []
      this.yenum = checkedValues
      this.offset = checkedValues
      yenum1 = checkedValues
      this.ajaxData(checkedValues)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys, selectedRows) {},
    // 弹窗
    showModal () {
      this.fromdata = 'add'
      this.visible = true
      this.wttype = 1
      this.zYRKDjaddxllistInfo()
    },
    // 下拉菜单查询
    zYRKDjaddxllistInfo () {
      var p = {
        wttype: this.wttype,
        fyname: this.fyname,
        name: this.Sjname,
        UserId: this.UserId
      }
      zYRKDjaddxllist(p)
        .then(res => {
          console.log(res)
          if (res.Result) {
            var Clres = JSON.parse(res.Data).rows
            if (this.wttype === 1) {
              this.suppliesTypeInfo = Clres
              this.FRnameTF = true
              this.FRproductionTF = true
              this.FRnumber = ''
              this.FRnameInfo = []
              this.FRproductionInfo = []
            } else if (this.wttype === 2) {
              this.FRnameTF = false
              this.FRproductionTF = true
              this.$nextTick(() => {
                this.Addform.setFieldsValue({
                  FRname: '',
                  FRnumber: '',
                  FRproduction: '',
                  FRunit: ''
                })
              })
              console.log(res)
              this.FRnameInfo = Clres
              this.FRproductionInfo = []
            } else if (this.wttype === 4) {
              this.FRproductionTF = false
              this.$nextTick(() => {
                this.Addform.setFieldsValue({
                  FRnumber: '',
                  FRproduction: '',
                  FRunit: this.dwName
                })
              })
              this.FRproductionInfo = Clres
            }
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    find (v) {
      this.f = false
      this.updateinfo = true
      this.FStIdItem = v.FStId
      this.ZYRKDjXQInfo()
    },
    update (v) {
      this.f = true
      this.updateinfo = true
      this.FStIdItem = v.FStId
      this.fromdata = 'update'
      this.wttype = 1
      this.zYRKDjaddxllistInfo()
      this.ZYRKDjXQInfo()
      console.log('修改' + v.FStId)
    },
    // 通过防疫物资类型查询防疫物资名称  请求时name是物资类别
    ChangeFc (v) {
      this.wttype = 2
      this.Sjname = v
      console.log(v)
      if (v === '畜禽标识类') {
        this.cqbsTF = true
      } else {
        this.cqbsTF = false
      }
      this.zYRKDjaddxllistInfo()
    },
    // 通过物资名称查询生产厂家 请求时name是物资名称 fyname是物资名称
    ChangeCj (v) {
      console.log(v)
      this.wttype = 4
      this.fyname = this.Sjname
      this.Sjname = v

      this.FRnameInfo.forEach(item => {
        if (item.FWzmc === v) {
          this.dwName = item.FDw
        }
      })
      this.zYRKDjaddxllistInfo()
    },
    ChangeCC (v) {
      console.log(v)
    },
    handleSubmits (e) {
      e.preventDefault()
    },
    handleSubmit (e) {
      e.preventDefault()
      if (this.fromdata === 'add') {
        this.Addform.validateFields((err, values) => {
          //  formData.forEach((value, key) => jsonData[key] = value);
          if (!err) {
            console.log(values)
            console.log(values.FRstorage._d)
            values.FRstorage = values.FRstorage._d
            values.FRvalidity = values.FRvalidity._d
            // this.ajaxData(1, values.xx)
            zYRKDjInsert(values, this.UserId)
              .then(res => {
                console.log(res)
                if (res.Result) {
                  this.$notification.success({
                    message: '新增成功'
                  })
                  this.visible = false
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
            this.$notification.error({
              message: '请检查输入信息'
            })
          }
        })
      } else if (this.fromdata === 'update') {
        this.Upform.validateFields((err, values) => {
          if (!err) {
            var formFv = this.Upform

              this.UpInfo.FRBatch = formFv.getFieldValue('FRBatch')
              this.UpInfo.FRname = formFv.getFieldValue('FRname')
              this.UpInfo.FRnumber = formFv.getFieldValue('FRnumber')
              this.UpInfo.FRproduction = formFv.getFieldValue('FRproduction')
              this.UpInfo.FRrksign = formFv.getFieldValue('FRrksign')
              this.UpInfo.FRsign = formFv.getFieldValue('FRsign')
              this.UpInfo.FRstorage = formFv.getFieldValue('FRstorage')
              this.UpInfo.FRunit = formFv.getFieldValue('FRunit')
             this.UpInfo.FRvalidity = formFv.getFieldValue('FRvalidity')
              this.UpInfo.FWZLB = formFv.getFieldValue('FWZLB')

            zYRKDjUpdate(this.UpInfo, this.UserId)
              .then(res => {
                console.log(res)
                if (res.Result) {
                  this.$notification.success({
                    message: '修改成功'
                  })
                  this.updateinfo = false
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
          } else {
            this.$notification.error({
              message: '请检查输入信息'
            })
          }
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
      this.cqbsTF = false
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
/* .ant-select-selection {
    width: 215px;
}
.ant-input{
  width: 215px;
} */
</style>
