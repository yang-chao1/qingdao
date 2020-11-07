<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="屠宰场名称">
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
            <a-button type="primary" style="height:40px" @click="pil">批量删除</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px; width:80px;" @click="handleEdit()">导出</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px">列表定制</a-button>
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
              title="动物准宰通知书新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
            >
              <a-form @submit="handleSubmit" :form="form">
                <h2 style="text-align:center"><b>动物准宰通知书</b></h2>
                <a-row type="flex" justify="end">
                  <a-col :span="12">
                    <a-form-item
                      label="No"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FNumber', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FNumber"
                      />
                      <a-input
                        v-decorator="['FTzcid', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FTzcid"
                        style="display: none"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="屠宰场名称"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['TName', { rules: [{ required: true, message: '请选择' }] }]"></a-input>
                      <!-- <a-select
                        v-decorator="['TName', { rules: [{ required: true, message: '请选择' }]}]"
                      >
                        <a-select-option value="青岛三得良定点屠宰">
                          青岛三得良定点屠宰
                        </a-select-option>
                        <a-select-option value="即墨市南泉生猪定点屠宰场">
                          即墨市南泉生猪定点屠宰场
                        </a-select-option>
                      </a-select> -->
                    </a-form-item>
                  </a-col>
                </a-row>

                <!-- <a-col :span="12">
                    <a-form-item
                      label="申报单编号"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 13 }, sm: { span: 12 } }"
                    >
                      <a-input

                        v-decorator="['QCPNumber', { rules: [{ required: true, message: '请输入' }] }]"
                        name="QCPNumber"
                        style="width:90%"
                      />
                      <a-button type="primary" @click="xz" style="position: absolute; margin: 3px 10px">
                        选择
                      </a-button>
                    </a-form-item>
                  </a-col> -->

                <a-row>
                  <a-col :span="24">
                    <a-form-item>
                      <span
                        style="margin-left:7%"
                      >依据《中华人民共和国动物防疫法》和国家有关检疫标准的规定，对你厂（场、点）的</span
                      >
                      <a-input
                        v-decorator="['FCount', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FCount"
                        style="width:60px;margin:5px"
                      />

                      <a-select
                        v-decorator="['FUnit', { rules: [{ required: true, message: '请选择' }] }]"
                        style="width:100px;margin:5px"
                      >
                        <a-select-option value="头">头</a-select-option>
                        <a-select-option value="只">只</a-select-option>
                        <a-select-option value="羽">羽</a-select-option>
                        <a-select-option value="匹">匹</a-select-option>
                        <a-select-option value="箱">箱</a-select-option>
                        <a-select-option value="尾">尾</a-select-option>
                        <a-select-option value="其他">其他</a-select-option>
                      </a-select>
                      <a-select
                        v-decorator="['QCProduct', { rules: [{ required: true, message: '请选择' }] }]"
                        style="width:100px"
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
                      实施宰前检查。经宰前检查合格，准予屠宰
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="负责人"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FSm1', { rules: [{ required: true, message: '请输入' }] }]" name="FSm1" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item>
                      <span style="margin-left:7%">经官方兽医批准，予以准宰</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="动物卫生监督机构"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FHygiene', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FHygiene"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="官方兽医（签名）"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FVeterinary', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FVeterinary"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="end">
                  <a-col :span="12">
                    <a-form-item
                      label="日期"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-date-picker
                        v-decorator="[
                          'FDate',
                          { rules: [{ required: true, message: '请输入' }], initialValue: getCurrentDate() }
                        ]"
                        name="FDate"
                        type="date"
                        placeholder=""
                        style="width: 100%"
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
            <!-- 修改弹窗  -->
            <a-modal
              title="动物准宰通知书修改"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1000px"
              :destroyOnClose="true"
            >
              <a-form @submit="updateSubmit" :form="updateform">
                <h2 style="text-align:center"><b>动物准宰通知书</b></h2>
                <a-row type="flex" justify="end">
                  <a-col :span="12">
                    <a-form-item
                      label="No"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FNumber', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FNumber"
                      />
                      <a-input
                        v-decorator="['FTzcid', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FTzcid"
                        style="display: none"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="屠宰场名称"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 13 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['TName', { rules: [{ required: true, message: '请选择' }], initialValue: '0' }]"
                      >
                      </a-input>
                    </a-form-item>
                  </a-col>
                </a-row>

                <!-- <a-col :span="12">
                    <a-form-item
                      label="申报单编号"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                    >
                      <a-input
                        v-decorator="['QCPNumber', { rules: [{ required: true, message: '请输入' }] }]"
                        name="QCPNumber"
                        style="width:90%"
                      />
                      <a-button @click="xz" style="position: absolute; margin: 3px 10px">
                        选择
                      </a-button>
                    </a-form-item>
                  </a-col> -->

                <a-row>
                  <a-col :span="24">
                    <a-form-item>
                      <span
                        style="margin-left:7%"
                      >依据《中华人民共和国动物防疫法》和国家有关检疫标准的规定，对你厂（场、点）的</span
                      >
                      <a-input
                        v-decorator="['FCount', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FCount"
                        style="width:60px;margin:5px"
                      />
                      <a-select
                        v-decorator="['FUnit', { rules: [{ required: true, message: '请选择' }] }]"
                        style="width:100px;margin:5px"
                      >
                        <a-select-option value="头">头</a-select-option>
                        <a-select-option value="只">只</a-select-option>
                        <a-select-option value="羽">羽</a-select-option>
                        <a-select-option value="匹">匹</a-select-option>
                        <a-select-option value="箱">箱</a-select-option>
                        <a-select-option value="尾">尾</a-select-option>
                        <a-select-option value="其他">其他</a-select-option>
                      </a-select>
                      <a-select
                        v-decorator="['QCProduct', { rules: [{ required: true, message: '请选择' }] }]"
                        style="width:100px"
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
                      实施宰前检查。经宰前检查合格，准予屠宰
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="负责人"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FSm1', { rules: [{ required: true, message: '请输入' }] }]" name="FSm1" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item>
                      <span style="margin-left:7%">经官方兽医批准，予以准宰</span>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="动物卫生监督机构"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FHygiene', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FHygiene"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="官方兽医（签名）"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FVeterinary', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FVeterinary"
                      />
                      <a-input
                        v-decorator="['FStId', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FStId"
                        style="display:none"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row type="flex" justify="end">
                  <a-col :span="12">
                    <a-form-item
                      label="日期"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-date-picker
                        v-decorator="['FDate', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FDate"
                        type="date"
                        placeholder=""
                        style="width: 100%"
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
            <!-- 查看弹窗 -->
            <a-modal
              title="动物准宰通知书详情"
              :visible="findinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1000px"
              :destroyOnClose="true"
            >
              <div>
                <h2 style="text-align:center"><b>动物准宰通知书</b></h2>
                <template>
                  <a-row type="flex" justify="end"> No： {{ info.FNumber }} </a-row>
                  <a-row>
                    <a-form-item> {{ info.TName }}： </a-form-item>
                  </a-row>
                  <a-row>
                    <a-form-item>
                      <span
                        style="margin-left:3%"
                      >依据《中华人民共和国动物防疫法》和国家有关检疫标准的规定，对你厂（场、点）的 {{ info.FCount }}
                        {{ info.FUnit }} {{ info.QCProduct }} 实施宰前检查。经宰前检查合格，准予屠宰</span
                      >
                    </a-form-item>
                  </a-row>
                  <a-row>
                    <a-form-item>
                      <span style="margin-left:3%">负责人： {{ info.FSm1 }}</span>
                    </a-form-item>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item>
                        <span style="margin-left:5%">经官方兽医批准，予以准宰</span>
                      </a-form-item>
                    </a-col>
                    <a-col>
                      <a-form-item>
                        <span style="float:right;">动物卫生监督机构： {{ info.FHygiene }}</span>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row type="flex" justify="end">
                    <a-form-item> 官方兽医签名： {{ info.FVeterinary }} </a-form-item>
                  </a-row>
                  <a-row type="flex" justify="end">
                    {{ info.FDate | dateFormat }}
                  </a-row>
                </template>
              </div>
            </a-modal>
          </div>
          <!-- 页面表格 -->
          <a-table
            :loading="isloading"
            :rowKey="record => record.FStId"
            :pagination="false"
            :columns="columns"
            :data-source="data"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a slot="action" @click="find(record.FStId)">查看&nbsp;&nbsp;</a>
              <a slot="action" @click="update(record.FStId)">修改&nbsp;&nbsp;</a>
              <!-- <template>
                <a-popconfirm placement="topRight" title="确认删除？" ok-text="确定" @confirm="confirm(record.FStId)" cancel-text="取消">
                  <a>删除&nbsp;&nbsp;</a>
                </a-popconfirm>
              </template> -->
            </template>
          </a-table>
          <div>
            <a-pagination
              show-quick-jumper
              :default-current="offset"
              :total="totalnum"
              show-less-items
              show-size-changer
              @change="onChanges"
              :current="offset"
              @showSizeChange="onShowSizeChange"
              style="margin: 10px"
            />
            <span
              style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
            >当前第 {{ this.offset }}/{{ Math.ceil(this.totalnum / this.limit) }} 页 共 {{ this.totalnum }} 条记录
              每页 10 条</span
            >
          </div>
        </div>
      </div>
    </page-header-wrapper>
    <a-modal v-model="vv" :footer="null" width="1000px" :destroyOnClose="true">
      <clu :columns1="clo" :totalnum="tt" :shu="shu" @child-event1="father" @tiao="tiao"> </clu>
    </a-modal>
  </div>
</template>
<script>
import { GettzcsbdaddressInfo } from '@/api/tzjyEb/AnimaJyzmA.js'
import clu from '../compont/clu2.vue'
// import zztzdB from './zztzdCompont/zztzdB'
// 接口请求调用
import {
  ApprovalGet,
  TZGet,
  ApprovalGetCK,
  DeclarationCDDel,
  ApprovalGetInsert,
  ApprovalInsert,
  ApprovalGetUp,
  ApprovalUp
} from '@/api/zztzd'
import getKey from '@/utils/keyCheck.js'
import { getAdminAddress } from '@/api/AdministrativeAddress'
// 当前页
// eslint-disable-next-line no-irregular-whitespace
import formatTime from '@/utils/public.js'
// 当前页
var yenum1 = 1

// eslint-disable-next-line no-unused-vars
var yeOffset = 10
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
        return parseInt(index) + parseInt(yenum1 - 1) * yeOffset + 1
      }
    }
  },
  { title: '编号', width: 200, align: 'center', dataIndex: 'FNumber', key: 'FNumber' },
  { title: '屠宰场名称', width: 200, align: 'center', dataIndex: 'TName', key: 'TName' },
  { title: '数量', width: 200, align: 'center', dataIndex: 'FCount', key: 'FCount' },
  { title: '单位', width: 200, align: 'center', dataIndex: 'FUnit', key: 'FUnit' },
  { title: '动物种类', width: 220, align: 'center', dataIndex: 'QCProduct', key: 'QCProduct' },
  { title: '动物卫生监督机构', width: 200, align: 'center', dataIndex: 'FHygiene', key: 'FHygiene' },
  { title: '官方兽医签名', width: 200, align: 'center', dataIndex: 'FVeterinary', key: 'FVeterinary' },
  {
    title: '时间',
    width: 200,
    align: 'center',
    dataIndex: 'FDate',
    key: 'FDate',
    customRender: (t, r, index) => {
      return formatTime(t, 'yyyy-MM-dd')
    }
  },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    align: 'center',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  inject: ['reload'], // 页面刷新this.reload()使用
  components: {
    // zztzdB
    clu
  },
  data () {
    return {
      val: '',
      tt: 0,
      vv: false,
      clo: [
        {
          title: '申报单编号',
          key: 'QCPNumber',
          width: 100,
          align: 'center',
          dataIndex: 'QCPNumber'
        },
        {
          title: '动物种类',
          key: 'QCProduct',
          align: 'center',
          dataIndex: 'QCProduct',
          width: 80
        },
        {
          title: '申报数量',
          key: 'QCPQuantity',
          align: 'center',
          dataIndex: 'QCPQuantity',
          width: 180
        },
        {
          title: '申报人名称',
          key: 'SBRMC',
          align: 'center',
          dataIndex: 'SBRMC',
          width: 180
        },
        {
          title: '联系电话',
          key: 'QCPPhone',
          align: 'center',
          dataIndex: 'QCPPhone',
          width: 180
        },
        {
          title: '单位',
          key: 'QCPDanWei',
          align: 'center',
          dataIndex: 'QCPDanWei',
          width: 180
        },
        {
          title: '操作',
          key: 'cz',
          fixed: 'right',
          width: 150,
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      hao: '',
      selectwhere: '',
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
      findBynameyenum: 1,
      info: {},
      queryParam: { status: 0, status1: 0 },
      fromdata: '',
      columns,
      data: [],
      UserId: sessionStorage.getItem('FStId'),
      // from 表单
      form: this.$form.createForm(this),
      updateform: this.$form.createForm(this),
      // 点击 弹出框
      visible: false,
      f: true,
      updateinfo: false,
      findinfo: false,
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      loading: false,
      idList: '',
      shu: [],
      unitID: '',
      mocheckInfo: '',
      moFSunitUstrId: '',
      options: [],
      isloading: false
    }
  },
  created () {
    this.isloading = true
    yenum1 = 1
    getAdminAddress()
      .then(res => {
        console.log(res)
        // var Clres = JSON.parse(res)
        this.options = res
      })
      .catch(rol => {
        console.log(rol)
      })
    this.getAll()
    this.getAdree()
  },
  methods: {
    // 模糊查询
    mocheck (che, val) {
      yenum1 = 1
      this.limit = 10
      this.offset = 1
      console.log(che, val)
      if (!val) {
        this.selectwhere = this.mocheckInfo
        this.unitID = this.moFSunitUstrId
      } else {
        if (val.length) {
          this.selectwhere = this.mocheckInfo
          this.unitID = getKey(this.options, val[0])
        } else {
          this.selectwhere = this.mocheckInfo
          this.unitID = this.moFSunitUstrId
        }
      }
      this.getAll()
    },
    getCurrentDate () {
      var currentDate = formatTime(null, 'yyyy-MM-dd')
      return currentDate
    },
    getAdree () {
      console.log(this.UserId)
      GettzcsbdaddressInfo(this.UserId).then(res => {
        console.log(res.Data)
        if (res.Data) {
          this.form.setFieldsValue({ TName: res.Data.FsbdName, FTzcid: res.Data.FGlid })
        }
      })
    },
    // 弹窗visible
    showModal () {
      ApprovalGetInsert(this.UserId).then(res => {
        console.log(res)
        this.form.setFieldsValue({
          FNumber: res.FNumber
          // FTzcid: res.
          // FVeterinary: res.FVeterinary,
          //  FHygiene: res.FHygiene
        })
        const a = sessionStorage.getItem('FuseEName')
        const b = sessionStorage.getItem('FuName')
        this.form.setFieldsValue({ FHygiene: a })
        this.form.setFieldsValue({ FVeterinary: b })
      })
      // this.form.QCPNumber = res.FNumber
      this.getAdree()
      this.fromdata = 'add'
      this.visible = true
    },
    tiao (data) {
      console.log(data)
      TZGet(data).then(res => {
        const list1 = JSON.parse(res.Data)
        this.shu = list1.rows
        this.tt = parseInt(list1.total)
      })
    },
    father (data) {
      console.log(data)
      this.form.setFieldsValue({
        QCPNumber: data.QCPNumber,
        QCProduct: data.QCProduct,
        TName: data.TName,
        FSm1: data.SBRMC,
        FCount: data.QCPQuantity,
        FUnit: data.QCPDanWei
      })
      this.updateform.setFieldsValue({
        QCPNumber: data.QCPNumber,
        QCProduct: data.QCProduct,
        TName: data.TName,
        FSm1: data.SBRMC,
        FCount: data.QCPQuantity,
        FUnit: data.QCPDanWei
      })
      this.vv = false
    },

    xz () {
      console.log(11)
      TZGet({ offset: 1, limit: 10, selectWhere: '' }).then(res => {
        this.shu = JSON.parse(res.Data).rows
        this.tt = parseInt(JSON.parse(res.Data).total)
      })
      this.vv = true
    },
    async pil () {
      console.log(this.idList)
      if (this.selectedRowKeys.length > 0) {
        await this.deleteInfo(this.idList)
        this.idList = ''
      } else {
        alert('请选择要删除的数据')
      }
    },
    deleteInfo (ids) {
      DeclarationCDDel(ids, this.UserId)
        .then(res => {
          this.$message.success('删除成功')
        })
        .catch(res => {
          this.$message.error('服务器错误')
        })
      yenum1 = 1
      this.reload()
    },
    confirm (id) {
      console.log(id)
      this.deleteInfo(id)
    },
    cx () {
      this.getAll()
    },
    getAll () {
      var p = {
        selectWhere: this.selectwhere,
        limit: this.limit,
        offset: this.offset,
        unitID: this.unitID
      }
      ApprovalGet(p, this.UserId)
        .then(res => {
          this.isloading = false
          console.log(res)
          if (res.Data !== '') {
            const Clres = JSON.parse(res.Data)
            console.log(Clres)
            this.data = Clres.rows
            this.totalnum = parseInt(Clres.total)
          } else {
            this.$notification.error({ message: '未查询到任何信息' })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 分页方法
    onChanges (checkedValues) {
      this.selectedRowKeys = []
      yenum1 = checkedValues
      this.offset = checkedValues

      this.getAll()
    },
    onShowSizeChange (current, pageSize) {
      console.log('1111', current, pageSize)
      this.offset = current
      this.limit = pageSize
      // const data = {
      //   limit: pageSize,
      //   offset: current,
      //   selectWhere: this.selectwhere,
      //   unitID: this.unitID
      // }
      yeOffset = pageSize
      this.getAll()
      this.limit = pageSize
      yenum1 = current

      this.totalPage = Math.ceil(this.total / this.limit)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      var arr = ''
      selectedRows.forEach(item => {
        arr = arr + ',' + item.FStId
      })
      this.idList = arr.substring(1)
    },

    find (id) {
      ApprovalGetCK(id, this.UserId)
        .then(res => {
          this.info = res.Data[0]
          this.findinfo = true
        })
        .catch(res => {
          this.$message.error('服务器异常')
        })
    },
    update (id) {
      ApprovalGetUp(id, this.UserId)
        .then(res => {
          this.updateform.setFieldsValue(res.Data[0])
          this.updateform.setFieldsValue({ FStId: id })
          console.log(res)
        })
        .catch(res => {
          this.$message.error('服务器异常')
        })
      this.updateinfo = true
    },
    updateSubmit (e) {
      e.preventDefault()
      console.log(this.form)
      // eslint-disable-next-line handle-callback-err
      this.updateform.validateFields((err, v) => {
        console.log(err)
        console.log(v)

        if (!err) {
          ApprovalUp(v, this.UserId).then(res => {
            this.$message.success('修改成功')
            this.reload()
          })
        }
      })
    },
    handleSubmit (e) {
      e.preventDefault()

      // eslint-disable-next-line handle-callback-err
      this.form.validateFields((err, v) => {
        console.log(v)
        if (!err) {
          ApprovalInsert(v, this.UserId).then(res => {
            console.log(res)
            this.reload()
          })
        } else {
          return false
        }
      })
    },
    // 弹窗关闭
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.updateinfo = false
        this.findinfo = false
        this.confirmLoading = false
        this.form.resetFields()
      }, 100)
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.updateinfo = false
      this.findinfo = false
      this.jinyong = false

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
