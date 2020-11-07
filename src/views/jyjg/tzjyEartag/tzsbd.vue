<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;" @submit="handleSubmit" :form="form">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="申报点名称">
                    <a-input v-model="mocheckInfo" size="large" style="width: 150%" />
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
                    <a-button type="primary" @click="mocheck" style="height:40px">查询</a-button>
                  </span>
                </a-col>
              </div>
            </a-row>
          </a-form>
          <div style="margin-top:35px;">
            <!-- 新增-->
            <a-button type="primary" style="height:40px" icon="plus" @click="showModal()">新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" @click="dellAll" style="height:40px">批量删除</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <a-button type="primary" style="height:40px; width:80px;" @click="handleEdit()">导出</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
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
            <a-modal
              :footer="null"
              title="屠宰申报点新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
              :destroyOnClose="true"
            >
              <!-- 申报点 -->
              <a-form @submit="handleSubmitSbd" :form="SBDform">
                <a-row>
                  <a-col :span="10">
                    <a-form-item
                      label="申报点名称"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 13 }, sm: { span: 16 } }"
                    >
                      <a-input
                        :disabled="this.addTF"
                        v-decorator="['FsbdName', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FsbdName"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="2">
                    <a-button v-if="!this.addTF" @click="showSB" style="position: absolute; margin: 3px 10px">
                      选择
                    </a-button>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="地址	"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 16 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="['FAddress', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FAddress"
                        style="width:48%"
                      />
                      <a-input
                        :disabled="this.addTF"
                        v-decorator="['FLAddress', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FLAddress"
                        style="width:50%;margin-left: 1%"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="11">
                    <a-form-item
                      label="机构负责人"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="this.addTF"
                        v-decorator="['FfzrName', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FfzrName"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="13">
                    <a-form-item
                      label="联系电话"
                      :labelCol="{ lg: { span: 11 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="this.addTF"
                        v-decorator="['FfzrTel', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FfzrTel"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                  <a-button v-if="!this.addTF" type="primary" html-type="submit" style="width:315px; height: 40px;">
                    添加
                  </a-button>
                </a-form-item>
              </a-form>
              <!-- 官方兽医 -->
              <a-form @submit="handleSubmitGF" :form="GFform">
                <a-row>
                  <a-col :span="10">
                    <a-form-item
                      label="官方兽医"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 13 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FuName', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FuName"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="2">
                    <a-button @click="showGF" style="position: absolute; margin: 3px 10px">
                      选择
                    </a-button>
                  </a-col>

                  <a-col :span="12">
                    <a-form-item
                      label="手机号码	"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      :wrapperCol="{ lg: { span: 11 }, sm: { span: 14 } }"
                    >
                      <a-input
                        v-decorator="[
                          'FuPhone',
                          { rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }] }
                        ]"
                        name="FuPhone"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                  <a-button type="primary" html-type="submit" style="width:315px; height: 40px;">
                    添加
                  </a-button>
                </a-form-item>
              </a-form>
              <div v-if="this.GFaddInfo.length">
                <a-table
                  :pagination="false"
                  :columns="columnsGFadd"
                  :data-source="GFaddInfo"
                  :scroll="{ x: 800 }"
                  style="margin-top:5px;"
                >
                  <template slot="action" slot-scope="text, record">
                    <a slot="action" @click="deletAdd(record)">删除&nbsp;&nbsp;</a>
                  </template>
                </a-table>
                <!-- <a-button type="primary" style="width:100px; height: 40px;margin:20px 0 10px 800px;">
                  提交
                </a-button> -->
              </div>
            </a-modal>
            <!-- 修改弹窗 查看弹窗 -->
            <a-modal
              :title="this.f ? '屠宰申报点修改' : '屠宰申报点详情'"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1000px"
              :destroyOnClose="true"
            >
              <div>
                <!-- 申报点 -->
                <a-form @submit="handleSubmitSbd" :form="SBDformUp">
                  <a-row>
                    <a-col :span="10">
                      <a-form-item
                        label="申报点名称"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 16 } }"
                      >
                        <a-input
                          disabled
                          v-decorator="['FsbdName', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FsbdName"
                        />
                      </a-form-item>
                    </a-col>
                    <!-- <a-col :span="2">
                      <a-button
                        v-if="this.f && !this.addTF"
                        @click="showSB"
                        style="position: absolute; margin: 3px 10px"
                      >
                        选择
                      </a-button>
                    </a-col> -->
                    <a-col :span="12">
                      <a-form-item
                        label="地址	"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 16 } }"
                      >
                        <a-input
                          disabled
                          v-decorator="['FAddress', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FAddress"
                          style="width:48%"
                        />
                        <a-input
                          :disabled="!this.f"
                          v-decorator="['FLAddress', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FLAddress"
                          style="width:50%;margin-left: 1%"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="11">
                      <a-form-item
                        label="机构负责人"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 11 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="!this.f"
                          v-decorator="['FfzrName', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FfzrName"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="联系电话"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="!this.f"
                          v-decorator="['FfzrTel', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FfzrTel"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                    <a-button
                      v-if="this.f && !this.addTF"
                      type="primary"
                      html-type="submit"
                      style="width:315px; height: 40px;"
                    >
                      添加
                    </a-button>
                  </a-form-item>
                </a-form>
                <!-- 官方兽医 -->
                <a-form @submit="handleSubmitGF" :form="GFformUp" v-if="this.f">
                  <a-row>
                    <a-col :span="10">
                      <a-form-item
                        label="官方兽医"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['FuName', { rules: [{ required: !this.GFaddInfo.length, message: '请输入' }] }]"
                          name="FuName"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="2">
                      <a-button @click="showGF" style="position: absolute; margin: 3px 10px">
                        选择
                      </a-button>
                    </a-col>

                    <a-col :span="12">
                      <a-form-item
                        label="手机号码	"
                        :labelCol="{ lg: { span: 6 }, sm: { span: 10 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 14 } }"
                      >
                        <a-input
                          v-decorator="[
                            'FuPhone',
                            {
                              rules: [
                                {
                                  required: !this.GFaddInfo.length,
                                  message: '请输入正确的手机号',
                                  pattern: /^1[3456789]\d{9}$/
                                }
                              ]
                            }
                          ]"
                          name="FuPhone"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                    <a-button type="primary" html-type="submit" style="width:315px; height: 40px;">
                      添加
                    </a-button>
                  </a-form-item>
                </a-form>
                <div v-if="this.GFaddInfo.length && this.f">
                  <a-table
                    :pagination="false"
                    :columns="columnsGFadd"
                    :data-source="GFaddInfo"
                    :scroll="{ x: 800 }"
                    style="margin-top:5px;"
                  >
                    <template slot="action" slot-scope="text, record">
                      <a slot="action" @click="deletAdd(record)">删除&nbsp;&nbsp;</a>
                    </template>
                  </a-table>
                </div>
                <div v-if="this.GFaddInfo.length && !this.f">
                  <a-table
                    :pagination="false"
                    :columns="columnsGFadd"
                    :data-source="GFaddInfo"
                    :scroll="{ x: 800 }"
                    style="margin-top:5px;"
                  >
                    <template slot="action">
                      <a slot="action">&nbsp;&nbsp;</a>
                    </template>
                  </a-table>
                </div>
              </div>
            </a-modal>
            <!-- 申报点信息查询 -->
            <a-modal
              :footer="null"
              title="申报点名称"
              :visible="SBmodalTF"
              :confirm-loading="confirmLoading"
              @cancel="handleCancelSb"
              width="1000px"
              :destroyOnClose="true"
            >
              <div>
                <span>关键字</span>
                <a-input
                  style="width:200px;"
                  v-decorator="['FhLegal', { rules: [{ required: true, message: '请输入' }] }]"
                  name="FhLegal"
                />
                <a-button type="primary" style="width:100px; height: 30px;margin: 0 15px;">
                  搜索
                </a-button>
              </div>
              <a-table
                :pagination="false"
                :columns="columnsSB"
                :data-source="SBDInfo"
                :scroll="{ x: 900 }"
                :row-selection="{ selectedRowKeys: selectedRowKeysSb, onChange: onSelectChangeSb, type: 'radio' }"
                style="margin-top:5px;"
              >
              </a-table>
              <div>
                <a-pagination
                  show-quick-jumper
                  :default-current="offsetSB"
                  :total="totalSBD"
                  show-less-items
                  @change="onChangeSBD"
                  :current="offsetSB"
                  style="margin: 10px"
                />
                <span
                  style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
                >当前第 {{ offsetSB }}/{{ Math.ceil(totalSBD / 10) }} 页 共 {{ this.totalSBD }} 条记录 每页 10
                  条</span
                >
              </div>
            </a-modal>
            <!-- 官方兽医查询 -->
            <a-modal
              :footer="null"
              title="官方兽医名称"
              :visible="GFmodalTF"
              :confirm-loading="confirmLoading"
              @cancel="handleCancelGF"
              width="1000px"
              :destroyOnClose="true"
            >
              <div>
                <span>关键字</span>
                <a-input
                  style="width:200px;"
                  v-decorator="['FhLegal', { rules: [{ required: true, message: '请输入' }] }]"
                  name="FhLegal"
                />
                <a-button type="primary" style="width:100px; height: 30px;margin: 0 15px;">
                  搜索
                </a-button>
              </div>
              <a-table
                :pagination="false"
                :columns="columnsGF"
                :data-source="GFInfo"
                :scroll="{ x: 900 }"
                :row-selection="{ selectedRowKeys: selectedRowKeysGF, onChange: onSelectChangeGF, type: 'radio' }"
                style="margin-top:5px;"
              >
              </a-table>
              <div>
                <a-pagination
                  show-quick-jumper
                  :default-current="offsetGF"
                  :total="totalGF"
                  show-less-items
                  @change="onChangeGF"
                  :current="offsetGF"
                  style="margin: 10px"
                />
                <span
                  style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
                >当前第 {{ offsetGF }}/{{ Math.ceil(totalGF / 10) }} 页 共 {{ this.totalGF }} 条记录 每页 10 条</span
                >
              </div>
            </a-modal>
            <!-- 删除弹框 -->
            <a-modal
              :title="'删除'"
              :visible="Delinfo"
              :confirm-loading="confirmLoading"
              @ok="DelOk"
              @cancel="DelNo"
              width="400px"
              :destroyOnClose="true"
            >
              是否删除
            </a-modal>
          </div>
          <!-- 页面表格 -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="SBDInfosGetListInfo"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a slot="action" @click="find(record)">查看&nbsp;&nbsp;</a>
              <a slot="action" @click="update(record)">修改&nbsp;&nbsp;</a>
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
            >当前第 {{ this.yenum }}/{{ Math.ceil(this.totalnum / 10) }} 页 共 {{ this.totalnum }} 条记录 每页 10
              条</span
            >
          </div>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
// 接口请求调用
import {
  getSBDInfosGetList,
  getSBDInfoUpCK,
  getSBDInfosGetCK,
  getSlaughterBkGet,
  getVeterionaryGet,
  getSBDInfoDel,
  getSBDInfoCAInsert,
  getSBDInfoInsert,
  getSBDInfoDelGF
} from '@/api/tzjyEb/tzsbd'
import getKey from '@/utils/keyCheck.js'
import { getAdminAddress } from '@/api/AdministrativeAddress'
// 当前页
var yenum1 = 1
var yenumSB = 1
var yenumGf = 1

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
  { title: '申报点名称', width: 200, align: 'center', dataIndex: 'FsbdName', key: 'FsbdName' },
  { title: '申报点地址', width: 200, align: 'center', dataIndex: 'FAddress', key: 'FAddress' },
  { title: '负责人', width: 200, align: 'center', dataIndex: 'FfzrName', key: 'FfzrName' },
  { title: '联系电话', width: 220, align: 'center', dataIndex: 'FfzrTel', key: 'FfzrTel' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
const columnsSB = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    dataIndex: 'FStId',
    key: 'FStId',
    customRender: (t, r, index) => {
      if (yenumSB === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenumSB - 1) * 10 + 1
      }
    }
  },
  { title: '屠宰企业', width: 200, align: 'center', dataIndex: 'FhName', key: 'FhName' },
  { title: '法人代表', width: 200, align: 'center', dataIndex: 'FhLegal', key: 'FhLegal' },
  { title: '联系电话', width: 200, align: 'center', dataIndex: 'FhPhone', key: 'FhPhone' },
  { title: '地址', width: 220, align: 'center', dataIndex: 'AddressName', key: 'AddressName' }
]
const columnsGF = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    dataIndex: 'FStId',
    key: 'FStId',
    customRender: (t, r, index) => {
      if (yenumGf === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenumGf - 1) * 10 + 1
      }
    }
  },
  { title: '姓名', width: 200, align: 'center', dataIndex: 'FuName', key: 'FuName' },
  { title: '性别', width: 200, align: 'center', dataIndex: 'FuSex', key: 'FuSex' },
  { title: '联系电话', width: 200, align: 'center', dataIndex: 'FuPhone', key: 'FuPhone' },
  { title: '单位', width: 220, align: 'center', dataIndex: 'FuseEName', key: 'FuseEName' }
]
const columnsGFadd = [
  { title: '姓名', width: 200, align: 'center', dataIndex: 'FuName', key: 'FuName' },
  { title: '联系电话', width: 200, align: 'center', dataIndex: 'FuPhone', key: 'FuPhone' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 250,
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
      // 当前页
      yenumSB,
      yenumGf,
      // 单位选择当前页数
      offsetSB: 1,
      totalSBD: 10,
      // 每页条数
      limitGF: 10,
      offsetGF: 1,
      totalGF: 10,
      // 每页条数
      limitSB: 10,
      // 模糊查询当前页
      FsbdName: '',
      mocheckInfo: '',
      // 申报点查询
      FhLegal: '',
      // 官方兽医查询
      FuName: '',
      UserId: sessionStorage.getItem('FStId'),
      queryParam: { status: 0, status1: 0 },
      fromdata: '',
      columns,
      columnsSB,
      columnsGF,
      columnsGFadd,
      SBDInfosGetListInfo: [],

      SBDInfo: [],
      GFInfo: [],
      // from 表单
      form: this.$form.createForm(this),
      SBDform: this.$form.createForm(this),
      SBDformUp: this.$form.createForm(this),
      GFform: this.$form.createForm(this),
      GFformUp: this.$form.createForm(this),
      // 点击 弹出框
      visible: false,
      SBmodalTF: false,
      GFmodalTF: false,
      Delinfo: false,

      f: true,
      updateinfo: false,
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      selectedRowKeysSb: [],
      selectedRowKeysGF: [],
      loading: false,
      FStIditem: 0,
      delAllInfo: [],
      SBDItemInfo: {},
      GFItemInfo: {},
      GFaddInfo: [],
      addTF: false,
      userGfFstid: [],
      addGFInfo: '',
      unitID: '',

      moFSunitUstrId: '',
      options: []
    }
  },
  created () {
    yenumSB = 1
    yenum1 = 1
    yenumGf = 1
    this.getSBDInfosGetListInfo()
    getAdminAddress()
      .then(res => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
      })
      .catch(rol => {
        console.log(rol)
      })
  },
  methods: {
     // 模糊查询
    mocheck (che, val) {
      yenumSB = 1
    yenum1 = 1
    yenumGf = 1
      this.limit = 10
      this.offset = 1
      console.log(che, val)
      if (!val) {
        this.FsbdName = this.mocheckInfo
        this.unitID = this.moFSunitUstrId
      } else {
        if (val.length) {
          this.FsbdName = this.mocheckInfo
          this.unitID = getKey(this.options, val[0])
        } else {
          this.FsbdName = this.mocheckInfo
          this.unitID = this.moFSunitUstrId
        }
      }
      this.getSBDInfosGetListInfo()
    },
    // 列表查询
    getSBDInfosGetListInfo () {
      var p = {
        limit: this.limit,
        offset: this.offset,
        UserId: this.UserId,
        FsbdName: this.FsbdName,
        unitID: this.unitID
      }
      getSBDInfosGetList(p)
        .then(res => {
          console.log(res)
          if (res.Result) {
            if (res.Data !== '') {
              var Clres = JSON.parse(res.Data)
            console.log(Clres)
            this.totalnum = Clres.total
            this.SBDInfosGetListInfo = Clres.rows
            } else {
              this.$notification.error({ message: '未查到满足该条件的通知单,请更换条件' })
            }
          }
        })
        .then(rol => {
          console.log(rol)
        })
    },
    // 官方兽医查看
    getSBDInfoUpCKInfo (v) {
      getSBDInfoUpCK(v)
        .then(res => {
          console.log(res)
          if (res.Result) {
            this.updateinfo = true
            this.GFaddInfo = res.Data
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 申报点查看
    getSBDInfosGetCKInfo (v) {
      getSBDInfosGetCK(v)
        .then(res => {
          console.log(res)
          if (res.Result) {
            // this.SBDInfo = res.Data
            this.updateinfo = true
            this.addTF = true
            this.SBDItemInfo = res.Data[0]
            this.addGFInfo = res.Data[0].FStId
            this.$nextTick(() => {
              this.SBDformUp.setFieldsValue(res.Data[0])
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    // 分页方法
    onChange (checkedValues) {
      this.selectedRowKeys = []
      console.log('checked = ', checkedValues)
      this.yenum = checkedValues
      this.offset = checkedValues
      yenum1 = checkedValues
      this.getSBDInfosGetListInfo()
    },
    onChangeSBD (checkedValues) {
      yenumSB = checkedValues
      this.offsetSB = checkedValues
      this.getSlaughterBkGetInfo()
    },
    onChangeGF (checkedValues) {
      yenumGf = checkedValues
      this.offsetGF = checkedValues
      this.getVeterionaryGetInfo()
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.delAllInfo = selectedRows
      console.log(selectedRowKeys, selectedRows)
    },
    onSelectChangeSb (selectedRowKeys, selectedRows) {
      this.selectedRowKeysSb = selectedRowKeys
      this.SBDItemInfo = selectedRows[0]
      this.SBmodalTF = false
      if (this.fromdata === 'add') {
        this.$nextTick(() => {
          this.SBDform.setFieldsValue({
            FsbdName: selectedRows[0].FhName,
            FAddress: selectedRows[0].FhAdressA,
            FLAddress: selectedRows[0].FhAdressB,
            FfzrName: selectedRows[0].FhLegal,
            FfzrTel: selectedRows[0].FhPhone
          })
        })
      } else if (this.fromdata === 'update') {
        this.$nextTick(() => {
          this.SBDformUp.setFieldsValue({
            FsbdName: selectedRows[0].FhName,
            FAddress: selectedRows[0].FhAdressA,
            FLAddress: selectedRows[0].FhAdressB,
            FfzrName: selectedRows[0].FhLegal,
            FfzrTel: selectedRows[0].FhPhone
          })
        })
      }

      console.log(selectedRowKeys, selectedRows)
    },
    onSelectChangeGF (selectedRowKeys, selectedRows) {
      this.selectedRowKeysGF = selectedRowKeys
      this.GFItemInfo = selectedRows[0]
      this.GFmodalTF = false

      if (this.fromdata === 'add') {
        this.$nextTick(() => {
          this.GFform.setFieldsValue(selectedRows[0])
        })
      } else if (this.fromdata === 'update') {
        this.$nextTick(() => {
          this.GFformUp.setFieldsValue(selectedRows[0])
        })
      }
    },
    // 弹窗控制方法
    showModal (formName) {
      this.fromdata = 'add'
      this.visible = true
    },
    showSB () {
      console.log('执行了赋值')
      this.SBmodalTF = true
      this.getSlaughterBkGetInfo()
    },
    showGF () {
      this.GFmodalTF = true
      this.getVeterionaryGetInfo()
    },
    // 申报点名称查询
    getSlaughterBkGetInfo () {
      var p = {
        limit: this.limitSB,
        offset: this.offsetSB,
        FhLegal: this.FhLegal,
        UserId: this.UserId
      }
      getSlaughterBkGet(p)
        .then(res => {
          console.log(res)
          var Clres = JSON.parse(res.Data)
          this.SBDInfo = Clres.rows
          this.totalSBD = Clres.total
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 官方兽医查询
    getVeterionaryGetInfo () {
      var p = {
        limit: this.limitGF,
        offset: this.offsetGF,
        FuName: this.FuName,
        UserId: this.UserId
      }
      getVeterionaryGet(p)
        .then(res => {
          console.log(res)
          var Clres = JSON.parse(res.Data)
          this.GFInfo = Clres.rows
          this.totalGF = Clres.total
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    find (v) {
      this.f = false
      this.FStIditem = v.FStId

      this.getSBDInfoUpCKInfo(this.FStIditem)
      this.getSBDInfosGetCKInfo(this.FStIditem)
    },
    update (v) {
      this.fromdata = 'update'
      this.f = true
      this.updateinfo = true
      this.getSBDInfoUpCKInfo(v.FStId)
      this.getSBDInfosGetCKInfo(v.FStId)
      console.log('修改' + v.FStId)
    },
    // 删除弹窗控制
    delet (v) {
      console.log(v)
      this.FStIditem = v.FStId
      this.Delinfo = true
    },

    DelOk () {
      if (!this.delAllInfo.length) {
        this.getSBDInfoDelItem(this.FStIditem)
      } else {
        var p = []
        this.delAllInfo.forEach(item => {
          p.push(item.FStId)
        })
        this.getSBDInfoDelItem(p.join(','))
      }
    },
    DelNo () {
      this.Delinfo = false
      this.delAllInfo = []
      this.selectedRowKeys = []
    },
    dellAll () {
      if (!this.delAllInfo.length) {
        this.$notification.error({
          message: '请选择一条数据'
        })
      } else {
        this.Delinfo = true
      }
    },
    // 官方兽医删除
    deletAdd (v) {
      console.log(v)
      console.log(this.GFaddInfo)
      console.log(v, this.addGFInfo)

      var p = { FStId: v.FStId, FGlid: this.addGFInfo }
      getSBDInfoDelGF(p)
        .then(res => {
          console.log(res)
          if (res.Result) {
            this.GFaddInfo.forEach((item, index) => {
              if (item.FStId === v.FStId) {
                this.GFaddInfo.splice(index, 1)
              }
            })
            this.$notification.success({
                message: '删除成功'
              })
          } else {
            this.$notification.error({
              message: '删除失败，请联系管理人员'
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    // 删除
    getSBDInfoDelItem (v) {
      getSBDInfoDel(v)
        .then(res => {
          console.log(res)
          if (res.Result) {
            this.$notification.success({
              message: '删除成功'
            })
            this.Delinfo = false
            this.reload()
          } else {
            this.$notification.error({
              message: '删除失败，请联系管理人员'
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },

    handleSubmit (e) {
      e.preventDefault()
      if (this.fromdata === 'update') {
      }
    },
    // 弹窗关闭
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      this.SBmodalTF = false
      setTimeout(() => {
        this.visible = false
        this.updateinfo = false
        this.confirmLoading = false
        this.form.resetFields()
      }, 100)
    },
    // 官方兽医新增确定
    handleSubmitGF (e) {
      e.preventDefault()
      if (this.addTF) {
        if (this.fromdata === 'add') {
          this.GFform.validateFields((err, val) => {
            if (!err) {
              var formInfoGf = this.GFform.getFieldsValue()
              this.GFItemInfo.FuName = formInfoGf.FuName
              this.GFItemInfo.FuPuone = formInfoGf.FuPhone
              if (this.userGfFstid.indexOf(this.GFItemInfo.FStId) === -1) {
                this.userGfFstid.push(this.GFItemInfo.FStId)
                var p = {
                  FTName: this.GFItemInfo.FuseEName,
                  FTGlid: this.GFItemInfo.FuseEid,
                  FGlid: parseInt(this.addGFInfo),
                  FuName: formInfoGf.FuName,
                  FuGlid: this.GFItemInfo.FStId,
                  FuPhone: formInfoGf.FuPhone
                }
                console.log(this.GFItemInfo)
                getSBDInfoCAInsert(p, this.UserId, p.FuGlid)
                  .then(res => {
                    console.log(formInfoGf)
                    if (res.Result) {
                      console.log(res)
                      this.GFaddInfo.push({
                        FuName: formInfoGf.FuName,
                        FuPhone: formInfoGf.FuPhone,
                        FStId: this.GFItemInfo.FStId
                      })
                      this.$notification.success({
                        message: '新增成功'
                      })
                    } else {
                      this.$notification.error({
                        message: res.Msg
                      })
                    }
                  })
                  .catch(rol => {
                    console.log(rol)
                  })
              } else {
                this.$notification.error({
                  message: '该官方兽医已录入，请不要重复录入'
                })
              }
            } else {
              this.$notification.error({
                message: '请检查输入信息'
              })
            }
          })
        } else if (this.fromdata === 'update') {
          this.GFformUp.validateFields((err, val) => {
            if (!err) {
              var formInfoGf = this.GFformUp.getFieldsValue()
              this.GFItemInfo.FuName = formInfoGf.FuName
              this.GFItemInfo.FhPuone = formInfoGf.FuPhone
              if (this.userGfFstid.indexOf(this.GFItemInfo.FStId) === -1) {
                this.userGfFstid.push(this.GFItemInfo.FStId)
                var p = {
                  FTName: this.GFItemInfo.FuseEName,
                  FTGlid: this.GFItemInfo.FuseEid,
                  FGlid: parseInt(this.addGFInfo),
                  FuName: formInfoGf.FuName,
                  FuGlid: this.GFItemInfo.FStId,
                  FuPhone: formInfoGf.FuPhone
                }
                console.log(this.GFItemInfo)
                getSBDInfoCAInsert(p, this.UserId, p.FuGlid)
                  .then(res => {
                    console.log(res)
                    if (res.Result) {
                      console.log(res)
                      this.GFaddInfo.push({
                        FuName: formInfoGf.FuName,
                        FuPhone: formInfoGf.FuPhone,
                        FStId: this.GFItemInfo.FStId
                      })
                      this.$notification.success({
                        message: '新增成功'
                      })
                    } else {
                      this.$notification.error({
                        message: res.Msg
                      })
                    }
                  })
                  .catch(rol => {
                    console.log(rol)
                  })
              } else {
                this.$notification.error({
                  message: '该官方兽医已录入，请不要重复录入'
                })
              }
            } else {
              this.$notification.error({
                message: '请检查输入信息'
              })
            }
          })
        }
      } else {
        this.$notification.error({
          message: '请先添加申报点'
        })
      }
    },
    // 申报点新增
    handleSubmitSbd (e) {
      e.preventDefault()
      if (this.fromdata === 'add') {
        this.SBDform.validateFields((err, v) => {
          if (!err) {
            var formInfoGf = this.SBDform.getFieldsValue()
            this.SBDItemInfo.FsbdName = formInfoGf.FsbdName
            this.SBDItemInfo.FhAdressA = formInfoGf.FAddress
            this.SBDItemInfo.FhAdressB = formInfoGf.FLAddress
            this.SBDItemInfo.FfzrName = formInfoGf.FfzrName
            this.SBDItemInfo.FfzrTel = formInfoGf.FfzrTel
            var p = {
              FsbdName: formInfoGf.FsbdName,
              FGlid: this.SBDItemInfo.FStId,
              FAddress: formInfoGf.FAddress,
              FLAddress: formInfoGf.FLAddress,
              FfzrName: formInfoGf.FfzrName,
              FfzrTel: formInfoGf.FfzrTel
            }
            getSBDInfoInsert(p, this.UserId)
              .then(res => {
                console.log(res)
                this.addTF = true
                this.addGFInfo = res.Msg
                this.$notification.success({
                  message: '新增成功'
                })
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
        this.SBDformUp.validateFields((err, v) => {
          if (!err) {
            var formInfoGfup = this.SBDformUp.getFieldsValue()
            this.SBDItemInfo.FsbdName = formInfoGfup.FsbdName
            this.SBDItemInfo.FhAdressA = formInfoGfup.FAddress
            this.SBDItemInfo.FhAdressB = formInfoGfup.FLAddress
            this.SBDItemInfo.FfzrName = formInfoGfup.FfzrName
            this.SBDItemInfo.FfzrTel = formInfoGfup.FfzrTel
            var pp = {
              FsbdName: formInfoGfup.FsbdName,
              FGlid: this.SBDItemInfo.FStId,
              FAddress: formInfoGfup.FAddress,
              FLAddress: formInfoGfup.FLAddress,
              FfzrName: formInfoGfup.FfzrName,
              FfzrTel: formInfoGfup.FfzrTel
            }
            getSBDInfoInsert(pp, this.UserId)
              .then(res => {
                console.log(res)
                this.addTF = true
                this.addGFInfo = res.Msg
                this.$notification.success({
                  message: '新增成功'
                })
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
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.updateinfo = false
      this.jinyong = false
      this.userdanwei1 = ''
      this.selectedRowKeys1 = []
      this.selectedRowKeysSb = []
      this.selectedRowKeysGF = []
      if (this.GFaddInfo.length) {
        this.reload()
      }
      this.GFaddInfo = []
      this.GFInfo = []
      yenumSB = 1
      yenumGf = 1
      this.f = false
      this.addTF = false
      // 给对应的表单元素赋值
      this.form.setFieldsValue({
        FuseEName: this.userdanwei1
      })
      this.form.resetFields()
    },
    handleCancelSb () {
      this.selectedRowKeysSb = []
      this.SBmodalTF = false
    },
    handleCancelGF () {
      this.selectedRowKeysGF = []
      this.GFmodalTF = false
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
