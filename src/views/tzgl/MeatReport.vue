<template>
  <div>
    <page-header-wrapper>
      <div class="div1" v-show="!this.chanATF">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;" @submit="handleSubmit" :form="form">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="屠宰企业">
                    <a-input v-model="selectwhere" size="large" style="width: 150%" />
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
                    <a-button type="primary" @click="cx" style="height:40px">查询</a-button>
                  </span>
                </a-col>
              </div>
            </a-row>
          </a-form>
          <div style="margin-top:35px;">
            <!-- 新增-->
            <a-button
              v-permission="{ active: 'MQQReporteadd' }"
              type="primary"
              style="height:40px"
              icon="plus"
              @click="showModal()"
            >新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button
              v-permission="{ active: 'MQQReportedele' }"
              @click="delAll"
              type="primary"
              style="height:40px"
            >批量删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px; width:80px;" @click="handleEdit()">导出</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px">列表定制</a-button>
            <a-modal
              :footer="null"
              title="新增肉品品质合格报告"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
              :destroyOnClose="true"
              :zIndex="100"
            >
              <a-form @submit="handleSubmit" :form="Addform" style="padding: 30px!important">
                <table
                  border="1"
                  cellspacing="0"
                  cellpadding="0"
                  width="900px"
                  style="line-height:50px; border-color: #6A6868;"
                >
                  <a-form-item
                    label="编号"
                    :labelCol="{ lg: { span: 3 }, sm: { span: 7 } }"
                    :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                  >
                    <a-input
                      :maxLength="7"
                      v-decorator="[
                        'BH',
                        {
                          rules: [
                            { required: true, message: '请输入' },
                            { pattern: /^[0-9]*$/, message: '只能输入数字' }
                          ]
                        }
                      ]"
                      name="BH"
                    />
                  </a-form-item>

                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="屠宰企业"
                        :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['YZCName', { rules: [{ required: true, message: '请输入' }] }]"
                          name="YZCName"
                        />
                        <a-button @click="showTz()" style="position: absolute; margin: 6px 5px">
                          选择
                        </a-button>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="数量/重量"
                        :labelCol="{ lg: { span: 0 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 15 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['Sumber', { rules: [{ required: true, message: '请输入' }] }]"
                          name="Sumber"
                          style="width:70%"
                        />
                        <span>（公斤）</span>
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <tr>
                    <td><span style="margin-left:30px">1、本批产品未检出“瘦肉精”等违禁物质，未注水及他物质；</span></td>
                  </tr>
                  <tr>
                    <td>
                      <span style="margin-left:30px">2、屠宰的种猪及及晚阉猪，已在胴体及品质检验合格证上注明;</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        style="margin-left:30px"
                      >3、 其他项目已按照《生猪屠宰产品品质检验规程》规定检验, 产品合格.
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a-row>
                        <a-col :span="12">
                          <a-form-item
                            label="肉品品质检验负责人"
                            :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                            :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                          >
                            <a-input
                              v-decorator="['Fname', { rules: [{ required: true, message: '请输入' }] }]"
                              name="Fname"
                            />
                          </a-form-item>
                        </a-col>
                        <a-col :span="12">
                          <a-form-item
                            label="签字时间"
                            :labelCol="{ lg: { span: 0 }, sm: { span: 7 } }"
                            :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                          >
                            <a-date-picker
                              disabled
                              format="yyyy-MM-DD"
                              v-decorator="['Stime', { rules: [{ required: true, message: '请输入' }] }]"
                              style="width: 100%"
                            />
                          </a-form-item>
                        </a-col>
                      </a-row>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a-row>
                        <a-col :span="12">
                          <a-form-item
                            label="入场动物检疫证明号码"
                            :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                            :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                          >
                            <a-input
                              v-decorator="['jyzm', { rules: [{ required: true, message: '请输入' }] }]"
                              name="jyzm"
                            />
                          </a-form-item>
                        </a-col>
                      </a-row>
                    </td>
                  </tr>

                  <tr v-if="this.kaiTF && this.AllInfo.FrName == '官方兽医'">
                    <td>
                      <a-button type="primary" @click="findA()" style="width:100px; height: 40px;margin:10px;">
                        产品A
                      </a-button>
                      <a-button type="primary" @click="findB()" style="width:100px; height: 40px;margin:10px;">
                        产品B
                      </a-button>
                    </td>
                  </tr>
                </table>

                <a-form-item :wrapper-col="{ span: 12, offset: 7 }" v-if="!this.kaiTF">
                  <a-button type="primary" html-type="submit" style="width:315px; height: 40px;margin-top:30px;">
                    确认
                  </a-button>
                </a-form-item>
              </a-form>
            </a-modal>
            <!-- 修改弹窗 查看弹窗 -->
            <a-modal
              :title="this.f ? '肉品品质合格报告单修改' : '肉品品质合格报告单详情'"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1000px"
              :destroyOnClose="true"
              :zIndex="100"
            >
              <a-form @submit="handleSubmit" :form="UFform" style="  padding: 30px!important;">
                <div>
                  <table
                    border="1"
                    cellspacing="0"
                    cellpadding="0"
                    width="900px"
                    style="line-height:50px; border-color: #6A6868;"
                  >
                    <a-form-item
                      label="编号"
                      :labelCol="{ lg: { span: 3 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :maxLength="7"
                        :disabled="!this.f && 'disabled'"
                        v-decorator="[
                          'BH',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
                            ]
                          }
                        ]"
                        name="BH"
                      />
                    </a-form-item>

                    <a-row>
                      <a-col :span="12">
                        <a-form-item
                          label="屠宰企业"
                          :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                        >
                          <a-input
                            :disabled="!this.f && 'disabled'"
                            v-decorator="['YZCName', { rules: [{ required: true, message: '请输入' }] }]"
                            name="YZCName"
                          />
                          <a-button v-if="this.f" @click="showTz()" style="position: absolute; margin: 6px 5px">
                            选择
                          </a-button>
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item
                          label="数量/重量"
                          :labelCol="{ lg: { span: 0 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 15 }, sm: { span: 17 } }"
                        >
                          <a-input
                            :disabled="!this.f && 'disabled'"
                            v-decorator="['Sumber', { rules: [{ required: true, message: '请输入' }] }]"
                            name="Sumber"
                            style="width:70%"
                          />
                          <span>（公斤）</span>
                        </a-form-item>
                      </a-col>
                    </a-row>

                    <tr>
                      <td>
                        <span style="margin-left:30px">1、本批产品未检出“瘦肉精”等违禁物质，未注水及他物质；</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span style="margin-left:30px">2、屠宰的种猪及及晚阉猪，已在胴体及品质检验合格证上注明;</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span
                          style="margin-left:30px"
                        >3、 其他项目已按照《生猪屠宰产品品质检验规程》规定检验, 产品合格.
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a-row>
                          <a-col :span="12">
                            <a-form-item
                              label="肉品品质检验负责人"
                              :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                              :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                            >
                              <a-input
                                :disabled="!this.f && 'disabled'"
                                v-decorator="['Fname', { rules: [{ required: true, message: '请输入' }] }]"
                                name="Fname"
                              />
                            </a-form-item>
                          </a-col>
                          <a-col :span="12">
                            <a-form-item
                              label="签字时间"
                              :labelCol="{ lg: { span: 0 }, sm: { span: 7 } }"
                              :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                            >
                              <a-date-picker
                                disabled
                                format="yyyy-MM-DD"
                                v-decorator="['Stime', { rules: [{ required: true, message: '请输入' }] }]"
                                style="width: 100%"
                              />
                            </a-form-item>
                          </a-col>
                        </a-row>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <a-row>
                          <a-col :span="12">
                            <a-form-item
                              label="入场动物检疫证明号码"
                              :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                              :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                            >
                              <a-input
                                :disabled="!this.f && 'disabled'"
                                v-decorator="['jyzm', { rules: [{ required: true, message: '请输入' }] }]"
                                name="jyzm"
                              />
                            </a-form-item>
                          </a-col>
                        </a-row>
                      </td>
                    </tr>
                    <tr v-if="AllInfo.FrName === '官方兽医'">
                      <!-- v-if="AllInfo.FrName==='官方兽医'" -->
                      <td>
                        <a-button type="primary" @click="findA()" style="width:100px; height: 40px;margin:10px;">
                          产品A
                        </a-button>
                        <a-button type="primary" @click="findB()" style="width:100px; height: 40px;margin:10px;">
                          产品B
                        </a-button>
                      </td>
                    </tr>
                  </table>
                </div>
                <a-form-item v-if="this.f" :wrapper-col="{ span: 12, offset: 7 }">
                  <a-button type="primary" html-type="submit" style="width:315px; height: 40px;margin-top:30px;">
                    确认
                  </a-button>
                </a-form-item>
                <a-form-item v-if="!this.f" :wrapper-col="{ span: 12, offset: 7 }">
                  <a-button v-print="'#printNew'" style="width:315px; height: 40px;margin-top:30px;">
                    打印
                  </a-button>
                </a-form-item>
                <!-- <a-form-item v-if="!this.f" :wrapper-col="{ span: 12, offset: 7 }">
                  <a-button type="primary" @click="handleCancel" style="width:315px; height: 40px;margin-top:30px;">
                    关闭
                  </a-button>
                </a-form-item> -->
              </a-form>
            </a-modal>

            <a-modal :zIndex="100" width="1000px" v-model="infoModal" :destroyOnClose="true" :footer="null">
              <div id="printNew">
                <h3 class="h3Title">肉品品质检验合格报告单</h3>
                <div style="text-align: right; width: 670px">
                  NO:<span id="FBH" style="font-weight:bold;">{{ upInfo.BH }}</span>
                </div>
                <table class="tt">
                  <tr>
                    <td class="lie">屠宰企业</td>
                    <td class="lie1">{{ upInfo.YZCName }}</td>
                    <td class="lie">数量/重量</td>
                    <td class="lie1">{{ upInfo.Sumber }}（公斤）</td>
                  </tr>
                  <tr>
                    <td colspan="4">
                      1、本批产品未检出“瘦肉精”等违禁物质，未注水及他物质;<br />
                      2、屠宰的种猪及晚阉猪，已在胴体及品质检验合格证上注明;<br />
                      3、其他项目已按照《生猪屠宰产品品质检验规程》规定检验, 产品合格.<br />
                      <div class="qz">
                        <p>肉品品质检验负责人签字：{{ upInfo.Fname }}</p>
                        <p style="margin-left:50px">{{ upInfo.Stime | dateFormat }}</p>
                        <p>（屠宰企业肉品品质检验专用章）</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4" class="foot">
                      <p>
                        注：本报告单一猪一单，生猪产品一个包装或一个批次一单，由官方兽医连同动物检疫合格证明存根一并留存备查
                      </p>
                    </td>
                  </tr>
                </table>

                <div v-if="AllInfo.FrName === '官方兽医'" class="btns">
                  <!-- v-if="AllInfo.FrName==='官方兽医'" -->
                  <a-button type="primary" @click="findA()" style="width:100px; height: 40px;margin:10px;">
                    产品A
                  </a-button>
                  <a-button type="primary" @click="findB()" style="width:100px; height: 40px;margin:10px;">
                    产品B
                  </a-button>
                </div>
                <p class="h">发布人：{{ upInfo.FSuserName }} 发布时间：{{ upInfo.FScTime | dateFormat }}</p>
              </div>
              <a-button type="primary" v-print="'#printNew'" class="dayi">打印</a-button>
            </a-modal>
            <!-- 选择屠宰企业 -->
            <a-modal
              :title="this.f ? '肉品品质合格报告单修改' : '肉品品质合格报告单详情'"
              :visible="Tztf"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1000px"
              :destroyOnClose="true"
              :zIndex="1001"
            >
              <a-table
                :pagination="false"
                :columns="columns"
                :data-source="HAleanmeatList"
                :scroll="{ x: 1300 }"
                :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                style="margin-top:5px;"
              >
              </a-table>
            </a-modal>
            <!-- 屠宰弹窗 -->
            <a-modal
              :footer="null"
              title="屠宰企业"
              :visible="SBmodalTF"
              :confirm-loading="confirmLoading"
              @cancel="handleCancelSb"
              width="1000px"
              :destroyOnClose="true"
              :zIndex="1000"
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
                  :default-current="offsetTz"
                  :total="totalTz"
                  show-less-items
                  @change="onChangeTz"
                  :current="offsetTz"
                  style="margin: 10px"
                />
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
            :data-source="HAleanmeatList"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a v-permission="{ active: 'MQQReportesele' }" slot="action" @click="find(record)">查看&nbsp;&nbsp;</a>
              <a v-permission="{ active: 'MQQReporteupd' }" slot="action" @click="update(record)">修改&nbsp;&nbsp;</a>
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
      <a-modal :zIndex="101" :destroyOnClose="true" v-model="Avis" :footer="null" width="1000px">
        <chan-a :findList="changA"></chan-a>
      </a-modal>
      <a-modal :zIndex="101" :destroyOnClose="true" v-model="Bvis" :footer="null" width="1000px">
        <chan-b :findList="changB"></chan-b>
      </a-modal>
    </page-header-wrapper>
  </div>
</template>
<script>
// 接口请求调用
// import { FindInfoByFStId } from '@/api/tzjyEb/AnimaJyzmA.js'
import { getRppzjyhgList, getRppzjyhgInsert, getRppzjyhgxq, getRppzjyhgUpdate, getRppzjyhgDel } from '@/api/tzgl/rppgjc'
import formatTime from '@/utils/public.js'
import { getGetTZCList } from '@/api/GetTZCList'
import ChanA from '@/views/component/chanpingA.vue' // chanpAforMeat.vue
import ChanB from '@/views/component/chanpingB.vue'

// 当前页
var yenum1 = 1
var yenumTz = 1

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
  { title: '编号', width: 200, align: 'center', dataIndex: 'BH', key: 'BH' },
  { title: '屠宰企业', width: 200, align: 'center', dataIndex: 'YZCName', key: 'YZCName' },
  { title: '数量/重量', width: 200, align: 'center', dataIndex: 'Sumber', key: 'Sumber' },
  { title: '肉品品质检验负责人签字', width: 220, align: 'center', dataIndex: 'Fname', key: 'Fname' },
  {
    title: '签字时间',
    width: 200,
    align: 'center',
    dataIndex: 'Stime',
    key: 'Stime',
    customRender: (t, r, index) => {
      return t ? formatTime(t, 'yyyy-MM-dd hh:mm:ss') : ''
    }
  },
  { title: '入厂动物检疫证明号码', width: 200, align: 'center', dataIndex: 'jyzm', key: 'jyzm' },
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
      if (yenumTz === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenumTz - 1) * 10 + 1
      }
    }
  },
  { title: '屠宰企业', width: 200, align: 'center', dataIndex: 'FhName', key: 'FhName' },
  { title: '法人代表', width: 200, align: 'center', dataIndex: 'FhLegal', key: 'FhLegal' },
  { title: '联系电话', width: 200, align: 'center', dataIndex: 'FhPhone', key: 'FhPhone' },
  { title: '地址', width: 300, align: 'center', dataIndex: 'AddressName', key: 'AddressName' }
]
export default {
  components: {
    ChanA,
    ChanB
  },
  inject: ['reload'],
  data () {
    return {
      printObj: {
        id: 'printNew',
        popTitle: '肉品品质合格报告单', // 文件标题
        extraCss: 'https://www.google.com,https://www.google.com',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },
      infoModal: false,
      AllInfo: JSON.parse(localStorage.getItem('AllInfo')),
      Avis: false,
      changA: {},
      Bvis: false,
      changB: {},
      fstid: '',
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
      UserId: sessionStorage.getItem('FStId'),

      // 模糊查询当前页
      selectwhere: '',
      Tztf: false,
      yenumTz,
      // 屠宰单位选择当前页数
      offsetTz: 1,
      // 屠宰每页条数
      limitTz: 10,
      totalTz: 10,

      queryParam: { status: 0, status1: 0 },
      fromdata: '',
      columns,
      columnsSB,
      HAleanmeatList: [],
      selectedRowKeys: [],
      selectedRowKeys1: [],
      selectedRowKeysSb: [],
      SBDInfo: [],
      SBmodalTF: false,
      yzctype: 'tzc',
      // from 表单
      form: this.$form.createForm(this),
      Addform: this.$form.createForm(this),
      UFform: this.$form.createForm(this),

      // 点击 弹出框
      visible: false,
      delInfo: false,
      FStIdItem: '',
      f: true,
      updateinfo: false,
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      loading: false,
      upInfo: {},
      delAllTF: false,
      delAllInfo: [],
      chanATF: false,
      ChanAFStId: 'dsfd',
      kaiTF: false,
      infoItem: {}
    }
  },
  created () {
    yenum1 = 1
    yenumTz = 1
    this.getRppzjyhgListInfo()
  },
  methods: {
    cx () {
      var p = {
        limit: 10,
        offset: 1,
        UserId: this.UserId,
        selectwhere: this.selectwhere
      }
      getRppzjyhgList(p)
        .then(res => {
          console.log(res)
          var Clres = JSON.parse(res.Data)
          this.HAleanmeatList = Clres.rows
          this.totalnum = parseInt(Clres.total)
          this.upInfo = this.HAleanmeatList[0]
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    getCurrentDate () {
      var currentDate = formatTime(null, 'yyyy-MM-dd hh:mm:ss')
      return currentDate
    },
    findA () {
      console.log(this.upInfo)
      this.changA = this.upInfo
      this.Avis = true
    },
    findB () {
      console.log(this.upInfo)
      this.changB = this.upInfo
      this.Bvis = true
    },
    // 列表查询
    getRppzjyhgListInfo () {
      var p = {
        limit: this.limit,
        offset: this.offset,
        UserId: this.UserId,
        selectwhere: this.selectwhere
      }
      getRppzjyhgList(p)
        .then(res => {
          console.log(res)
          var Clres = JSON.parse(res.Data)
          this.HAleanmeatList = Clres.rows
          this.totalnum = parseInt(Clres.total)
          this.upInfo = this.HAleanmeatList[0]
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 屠宰场信息查询
    getTzInfo () {
      var p = {
        offset: this.offsetTz,
        limit: this.limitTz,
        selectwhere: this.selectwhere,
        yzctype: this.yzctype,
        UserId: this.UserId
      }
      getGetTZCList(p)
        .then(res => {
          console.log(res)
          var Clres = JSON.parse(res.Data)
          this.SBmodalTF = true
          this.SBDInfo = Clres.rows
          this.totalTz = parseInt(Clres.total)
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
      this.getRppzjyhgListInfo()
    },
    onChangeTz (checkedValues) {
      console.log(checkedValues)
      this.offsetTz = checkedValues
      yenumTz = this.offsetTz
      this.getTzInfo()
    },
    // 查询屠宰场
    // 屠宰弹窗
    showTz () {
      this.getTzInfo()
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      console.log(selectedRows)
      this.delAllInfo = selectedRows
    },
    onSelectChangeSb (selectedRowKeys, selectedRows) {
      console.log(selectedRows)
      this.selectedRowKeysSb = selectedRowKeys
      if (this.f && this.updateinfo) {
        if (selectedRows) {
          const selectedRowsFh = selectedRows[0].FhName
          console.log(selectedRowsFh)
          this.SBmodalTF = false
          this.$nextTick(() => {
            this.UFform.setFieldsValue({
              YZCName: selectedRowsFh
            })
          })
        }
      } else {
        if (selectedRows) {
          const selectedRowsFhT = selectedRows[0].FhName
          this.SBmodalTF = false
          this.$nextTick(() => {
            this.Addform.setFieldsValue({
              YZCName: selectedRowsFhT
            })
          })
        }
      }
    },
    // 弹窗
    delet (v) {
      this.delInfo = true
      this.FStIdItem = v.FStId
    },
    delAll () {
      if (!this.delAllInfo.length) {
        this.$notification.error({
          message: '请选择一条数据'
        })
        this.delInfo = false
      } else {
        this.delInfo = true
        this.delAllTF = true
      }
    },
    handleDel () {
      var p = {
        FStId: this.FStIdItem,
        UserId: this.UserId
      }
      if (this.delAllTF) {
        var delFst = []
        console.log(this.delAllInfo)
        this.delAllInfo.forEach(item => {
          delFst.push(item.FStId)
        })
        p.FStId = delFst.join(',')
      }

      getRppzjyhgDel(p).then(res => {
        if (res.Result) {
          this.$notification.success({
            message: '删除成功'
          })
          this.delInfo = false
          this.reload()
        } else {
          this.$notification.error({
            message: '删除失败，请联系管理人员'
          })
        }
      })
    },
    showModal (formName) {
      this.fromdata = 'add'
      this.visible = true
    },
    find (v) {
      this.infoModal = true
      this.FStIdItem = v.FStId
      this.getHAleanmeatListInfoItem1(v.FStId)
      // this.updateinfo = true
    },
    // 单条数据查询
    getHAleanmeatListInfoItem1 (v) {
      var p = {
        FStId: v,
        UserId: this.UserId
      }
      getRppzjyhgxq(p)
        .then(res => {
          console.log(res)
          var Clres = res.Data
          console.log(Clres)
          this.upInfo = Clres
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 单条数据查询
    getHAleanmeatListInfoItem (v) {
      var p = {
        FStId: v,
        UserId: this.UserId
      }
      getRppzjyhgxq(p)
        .then(res => {
          console.log(res)
          var Clres = res.Data
          console.log(Clres)
          this.upInfo = Clres
          this.updateinfo = true
          this.$nextTick(() => {
            this.UFform.setFieldsValue(Clres)
          })
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    update (v) {
      this.f = true
      this.fromdata = 'update'
      this.getHAleanmeatListInfoItem(v.FStId)
      // setTimeout(() => {
      //   this.$notification.success({
      //     message: '无原型'
      //   })
      // }, 100)
      // this.updateinfo = true
    },
    handleSubmit (e) {
      e.preventDefault()

      if (this.fromdata === 'add') {
        this.Addform.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            var p = {
              BH: values.BH,
              YZCName: values.YZCName,
              Sumber: values.Sumber,
              Fname: values.Fname,
              Stime: values.Stime,
              jyzm: values.jyzm
            }
            console.log('执行了')
            console.log(p)
            getRppzjyhgInsert(p, this.UserId)
              .then(res => {
                console.log(res)
                if (res.Result) {
                  this.$notification.success({
                    message: '新增成功'
                  })
                  // this.visible = false
                  // this.reload()
                  this.kaiTF = true
                  this.upInfo = {}
                  this.getRppzjyhgListInfo()
                  console.log(this.upInfo)
                } else {
                  this.$notification.error({
                    message: '新增失败，请联系管理人员'
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
        this.UFform.validateFields((err, values) => {
          if (!err) {
            var formDataS = this.UFform.getFieldsValue()
            this.upInfo.YZCName = formDataS.YZCName
            this.upInfo.Stime = formDataS.Stime._d || this.upInfo.Stime
            this.upInfo.BH = formDataS.BH
            this.upInfo.Sumber = formDataS.Sumber
            this.upInfo.Fname = formDataS.Fname
            this.upInfo.jyzm = formDataS.jyzm

            getRppzjyhgUpdate(this.upInfo, this.UserId)
              .then(res => {
                console.log(res)
                if (res.Result) {
                  this.$notification.success({
                    message: '修改成功'
                  })
                  this.updateinfo = false
                  this.reload()
                }
              })
              .catch(rol => {
                console.log(rol)
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
      this.f = false
      console.log('点击了取消')
      this.kaiTF = false
      this.visible = false
      this.updateinfo = false
      this.jinyong = false
      this.delInfo = false
      this.userdanwei1 = ''
      this.selectedRowKeys1 = []
      this.upInfo = {}
      // 给对应的表单元素赋值
      this.form.setFieldsValue({
        FuseEName: this.userdanwei1
      })
      this.form.resetFields()
    },
    handleCancelSb () {
      this.SBmodalTF = false
      yenumTz = 1
    },
    ChanAShow () {
      this.ChanAFStId = this.updateinfo = false
      this.chanATF = true
    }
  }
}
</script>
<style scoped>
@media print {
  #printNew {
    width: 900px;
    padding:0 20px;
    /* margin-left: 55px; */
  }
  .btns {
    display: none;
  }
}
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
.kv-label {
  border-top: 1px solid #cacaca;
  padding: 5px;
}
.kv-content {
  background: #fff;
}
#myTable {
  width: 800px;
}
#printNew {
  padding: 0 60px;
  font-size: 18px;
}
.h3Title {
  display: inline-block;
  margin-left: 50%;
  transform: translateX(-50%);
}
.qz {
  display: inline-block;
  margin-left: 60%;
  margin-top: 20px;
}
.foot p {
  display: inline-block;
  width: 800px;
}
.h {
  display: inline-block;
  margin-left: 40%;
}
.lie {
  background: #ccc;
  text-align: center;
}
.lie1 {
  text-align: center;
}
.dayi {
  margin-left: 50%;
  transform: translateX(-50%);
}
table,
table tr th,
table tr td {
  border: 1px solid #ccc;
}
</style>
