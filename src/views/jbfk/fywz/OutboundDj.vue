<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;" :form="form">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="名称">
                    <a-input v-model="mocheckName" size="large" style="width: 150%" />
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
            <a-button
              v-permission="{ active: 'ORegistrationadd' }"
              type="primary"
              style="height:40px"
              icon="plus"
              @click="showModal()"
            >新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-modal
              :footer="null"
              title="新增出库信息"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
              :destroyOnClose="true"
              :zIndex="1000"
            >
              <a-form @submit="handleSubmit" :form="Addform">
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="物资名称"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FRname', { rules: [{ required: true, message: '物资名称' }] }]"
                        name="FRname"
                      >
                      </a-input>
                      <a-button @click="showFRname" style="position: absolute; margin: 3px 10px">
                        选择
                      </a-button>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="出库数量"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FRnumber', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FRnumber"
                      />
                    </a-form-item>
                    <a-form-item
                      label="计量单位"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FRunit', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FRunit"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="生产厂家"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FRproduction', { required: true, message: '生产厂家' }]"
                        name="FRproduction"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="生产批号"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FRBatch', { required: true, message: '生产批号' }]" name="FRBatch" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="领用单位"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FRRecipientsUnit', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FRRecipientsUnit"
                      />
                      <a-button @click="showFRRecipientsUnitModal()" style="position: absolute; margin: 3px 10px">
                        选择
                      </a-button>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="领用人员"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FRpersonnel', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FRpersonnel"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="出库日期"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-date-picker
                        v-decorator="['FRstockDate', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FRstockDate"
                        placeholder="请输入更新日期"
                      />
                      <!-- <a-input
                        v-decorator="['FRstockDate', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FRstockDate"
                      /> -->
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="用途"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-select
                        v-decorator="['FRuse', { rules: [{ required: true, message: '请输入' }] }]"
                        @change="selectChangeitem"
                      >
                        <a-select-option value="免疫">免疫</a-select-option>
                        <a-select-option value="消毒">消毒</a-select-option>
                        <a-select-option value="演练">演练</a-select-option>
                        <a-select-option value="采样">采样</a-select-option>
                        <a-select-option value="紧急免疫">紧急免疫</a-select-option>
                      </a-select>
                      <!-- <a-input
                        v-decorator="['FRuse', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FRuse"
                      /> -->
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 畜禽标识类的物资时显示 -->
                <div v-if="this.cqbsTF">
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="任务号"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input disabled v-decorator="['xx3']" name="xx3" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="箱号"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input disabled v-decorator="['xx3']" name="xx3" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="耳标号段"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
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
              :zIndex="1000"
            >
              <div>
                <a-form @submit="handleSubmit" :form="UPform">
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="物资名称"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FRname', { rules: [{ required: true, message: '物资名称' }] }]"
                          name="FRname"
                        >
                        </a-input>
                        <a-button v-if="this.f" @click="showFRname" style="position: absolute; margin: 3px 10px">
                          选择
                        </a-button>
                      </a-form-item>
                    </a-col>

                    <a-col :span="12">
                      <a-form-item
                        label="出库数量"
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
                        label="计量单位"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FRunit', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FRunit"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="生产厂家"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FRproduction']"
                          name="FRproduction"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="生产批号"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input :disabled="this.f ? false : 'disabled'" v-decorator="['FRBatch']" name="FRBatch" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="领用单位"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FRRecipientsUnit', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FRRecipientsUnit"
                        />
                        <a-button
                          @click="showFRRecipientsUnitModal"
                          style="position: absolute; margin: 3px 10px"
                          :hidden="this.f ? false : 'hidden'"
                        >
                          选择
                        </a-button>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="领用人员"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FRpersonnel', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FRpersonnel"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="出库日期"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-if="!this.f"
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FRstockDate', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FRstockDate"
                        />
                        <a-date-picker
                          v-if="this.f"
                          v-decorator="['FRstockDate', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FRstockDate"
                          placeholder="请输入更新日期"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="用途"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FRuse', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FRuse"
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
                          :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                        >
                          <a-input disabled v-decorator="['xx3']" name="xx3" />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item
                          label="箱号"
                          :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                        >
                          <a-input disabled v-decorator="['xx3']" name="xx3" />
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="12">
                        <a-form-item
                          label="耳标号段"
                          :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
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
            <!-- 物资名称查询弹窗 -->
            <a-modal
              title="选择"
              :visible="WzmodalTf"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancelWz"
              :footer="null"
              width="1000px"
              :destroyOnClose="true"
              :zIndex="1001"
            >
              <div>
                <span>关键字</span>
                <a-input
                  style="width:200px;"
                  v-decorator="['FRuse', { rules: [{ required: true, message: '请输入' }] }]"
                  name="FRuse"
                />
                <a-button type="primary" style="width:100px; height: 30px;margin: 0 15px;">
                  搜索
                </a-button>
                <a-select style="width:200px;" @change="ChangeFc" v-decorator="['FWZLB']" placeholder="请选择">
                  <a-select-option v-for="(item, index) in suppliesTypeInfo" :key="index" :value="item.FcName">
                    {{ item.FcName }}
                  </a-select-option>
                </a-select>
              </div>
              <!-- 物资表格 -->
              <a-table
                :pagination="false"
                :columns="columnsWz"
                :data-source="WzInfo"
                :scroll="{ x: 1300 }"
                :row-selection="{ selectedRowKeys: selectedRowKeysWz, onChange: onSelectChangeWz, type: 'radio' }"
                style="margin-top:5px;"
              >
              </a-table>
              <div>
                <a-pagination
                  show-quick-jumper
                  :default-current="offsetWZ"
                  :total="totalnumWZ"
                  show-less-items
                  @change="onChange"
                  :current="offsetWZ"
                  style="margin: 10px"
                />
                <span
                  style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
                >当前第 {{ offsetWZ }}/{{ Math.ceil(totalnumWZ / limitWZ) }} 页 共 {{ totalnumWZ }} 条记录 每页 10
                  条</span
                >
              </div>
            </a-modal>
            <!-- 领用物资查询弹窗 -->
            <a-modal
              title="领用物资"
              :visible="LYmodalTf"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancelLY"
              :footer="null"
              width="1000px"
              :destroyOnClose="true"
              :zIndex="1001"
            >
              <div>
                <span>关键字</span>
                <a-input
                  style="width:200px;"
                  v-decorator="['FRuse', { rules: [{ required: true, message: '请输入' }] }]"
                  name="FRuse"
                />
                <a-button type="primary" style="width:100px; height: 30px;margin: 0 15px;">
                  搜索
                </a-button>
              </div>
              <a-table
                :pagination="false"
                :columns="columnsLY"
                :data-source="LYInfo"
                :scroll="{ x: 900 }"
                :row-selection="{ selectedRowKeys: selectedRowKeysWz, onChange: onSelectChangeLY, type: 'radio' }"
                style="margin-top:5px;"
              >
              </a-table>
              <div>
                <a-pagination
                  show-quick-jumper
                  :default-current="offsetLY"
                  :total="totalnumLY"
                  show-less-items
                  @change="onChange"
                  :current="offsetLY"
                  style="margin: 10px"
                />
                <span
                  style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
                >当前第 {{ offsetLY }}/{{ Math.ceil(totalnumLY / limitLY) }} 页 共 {{ totalnumLY }} 条记录 每页 10
                  条</span
                >
              </div>
            </a-modal>
            <!-- 删除弹窗 -->
            <a-modal
              cancelText="取消"
              okText="确认"
              title="删除"
              :visible="deletinfo"
              :confirm-loading="confirmLoading"
              @ok="DelOk"
              @cancel="DelNo"
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
            <a-button @click="delItem" type="primary" style="height:40px">删除</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <a-button type="primary" style="height:40px">统计</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px">导出</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px">列表定制</a-button> -->
            <a-tree-select
              style="margin-top: -1px ;width: 250px;float:right;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="所在地"
              allowClear
              :tree-data="options"
              @change="mocheckF"
            >
            </a-tree-select>
          </div>
          <!-- 页面表格 -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="zYCKDJListInfo"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a v-permission="{ active: 'ORegistrationele' }" slot="action" @click="find(record)">查看&nbsp;&nbsp;</a>
              <a
                v-permission="{ active: 'ORegistrationupd' }"
                slot="action"
                @click="update(record)"
              >修改&nbsp;&nbsp;</a
              >
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
            >当前第 {{ offset }}/{{ Math.ceil(totalnum / limit) }} 页 共 {{ totalnum }} 条记录 每页 10 条</span
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
  zYCKDJList,
  ZYCKDJListAdd,
  ZYCKDJListUpdate,
  ZYCKDJDel,
  ZYCKDJXQ,
  Getgetrkwz,
  zYRKDjaddxllist,
  GetZYCKDJLYDW
} from '@/api/jbfk'
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
  { title: '名称', width: 200, align: 'center', dataIndex: 'FRname', key: 'FRname' },
  { title: '数量', width: 200, align: 'center', dataIndex: 'FRnumber', key: 'FRnumber' },
  { title: '单位', width: 200, align: 'center', dataIndex: 'FRunit', key: 'FRunit' },
  { title: '生产厂家', width: 220, align: 'center', dataIndex: 'FRproduction', key: 'FRproduction' },
  { title: '批号', width: 200, align: 'center', dataIndex: 'FRBatch', key: 'FRBatch' },
  {
    title: '出库时间',
    width: 100,
    align: 'center',
    dataIndex: 'FRstockDate',
    key: 'FRstockDate',
    customRender: (t, r, index) => {
      return formatTime(t, 'yyyy-MM-dd')
    }
  },
  { title: '领用人员', width: 200, align: 'center', dataIndex: 'FRpersonnel', key: 'FRpersonnel' },
  { title: '领用单位', width: 200, align: 'center', dataIndex: 'FRRecipientsUnit', key: 'FRRecipientsUnit' },
  { title: '用途', width: 200, align: 'center', dataIndex: 'FRuse', key: 'FRuse' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
const columnsWz = [
  { title: '物资名称', width: 200, align: 'center', dataIndex: 'FRname', key: 'FRname' },
  { title: '物资类别', width: 200, align: 'center', dataIndex: 'FWZLB', key: 'FWZLB' },
  { title: '生产厂家', width: 200, align: 'center', dataIndex: 'FRproduction', key: 'FRproduction' },
  { title: '生产批号', width: 200, align: 'center', dataIndex: 'FRBatch', key: 'FRBatch' },
  { title: '存库数量', width: 200, align: 'center', dataIndex: 'kucun', key: 'kucun' },
  { title: '入库数量', width: 200, align: 'center', dataIndex: 'FRnumber', key: 'FRnumber' },
  { title: '出库数量', width: 200, align: 'center', dataIndex: 'chu', key: 'chu' },
  { title: '报废数量', width: 200, align: 'center', dataIndex: 'bf', key: 'bf' },
  { title: '单位', width: 220, align: 'center', dataIndex: 'FRunit', key: 'FRunit' },
  { title: '有效时间', width: 200, align: 'center', dataIndex: 'FRvalidity', key: 'FRvalidity' }
]
const columnsLY = [
  { title: '行政名称', width: 100, align: 'center', dataIndex: 'FSunitName', key: 'FSunitName' },
  { title: '单位名称', width: 100, align: 'center', dataIndex: 'LingYongDW', key: 'LingYongDW' }
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
      mocheckName: '',
      mocheckKey: '',
      wttype: '',
      fyname: '',
      Sjname: '',

      // 物资名称查询弹窗
      totalnumWZ: 0,
      // 单位总数
      DWtotalWZ: 0,
      // 当前页
      yenumWZ: 1,
      // 单位选择当前页数
      offsetWZ: 1,
      // 每页条数
      limitWZ: 10,

      // 领用单位查询弹窗
      totalnumLY: 0,
      // 单位总数
      DWtotalLY: 0,
      // 当前页
      yenumLY: 1,
      // 单位选择当前页数
      offsetLY: 1,
      // 每页条数
      limitLY: 10,

      queryParam: { status: 0, status1: 0 },
      fromdata: '',
      columns,
      columnsWz,
      columnsLY,
      zYCKDJListInfo: [],
      WzInfo: [],
      LYInfo: [],

      // from 表单
      form: this.$form.createForm(this),
      Addform: this.$form.createForm(this),
      UPform: this.$form.createForm(this),
      // 点击 弹出框
      visible: false,
      deletinfo: false,
      f: true,
      updateinfo: false,
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      selectedRowKeysWz: [],
      loading: false,
      FStIdItem: '',
      UserId: sessionStorage.getItem('FStId'),
      suppliesTypeInfo: [],
      createdInfo: false,
      WzmodalTf: false,
      LYmodalTf: false,
      resCl: {},
      delAllInfo: [],
      upInfo: {},
      cqbsTF: false,
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
    // 模糊查询
    mocheck () {
      if (this.mocheckName !== '') {
        if (this.mocheckKey === '') {
          this.selectwhere = 'FRname:' + this.mocheckName
        } else {
          this.selectwhere = 'FRname:' + this.mocheckName + ';FSunitUstrId:' + this.mocheckKey
        }
      } else {
        if (this.mocheckKey === '') {
          this.selectwhere = ''
        } else {
          this.selectwhere = 'FSunitUstrId:' + this.mocheckKey
        }
      }
      this.ajaxData()
    },
    mocheckF (v) {
      console.log(v)
      this.options.forEach(item => {
        console.log(item)
        if (!v) {
          if (this.mocheckName !== '') {
            this.selectwhere = 'FRname:' + this.mocheckName
          } else {
            this.selectwhere = ''
          }
        } else {
          if (item.value === v) {
            this.mocheckKey = item.key
          } else {
            if (item.children) {
              item.children.forEach(itemt => {
                if (itemt.value === v) {
                  this.mocheckKey = itemt.key
                } else {
                  if (itemt.children) {
                    itemt.children.forEach(itemz => {
                      if (itemz.value === v) {
                        this.mocheckKey = itemz.key
                      }
                    })
                  }
                }
              })
            }
          }
          if (this.mocheckName !== '') {
            this.selectwhere = 'FRname:' + this.mocheckName + ';FSunitUstrId:' + this.mocheckKey
          } else {
            this.selectwhere = 'FSunitUstrId:' + this.mocheckKey
          }
        }
      })
      this.ajaxData()
    },
    // 获取列表信息
    ajaxData () {
      var parameter = {
        UserId: this.UserId,
        pageindex: this.offset,
        pagesize: this.limit,
        selectwhere: this.selectwhere
      }
      zYCKDJList(parameter).then(res => {
        var Clres = JSON.parse(res.Data)
        console.log(Clres)
        if (Clres) {
          this.zYCKDJListInfo = Clres.rows
          this.totalnum = parseInt(Clres.total)
        }

        // console.log(Clres)
      })
    },
    // 获取单项信息
    getZYCKDJXQ () {
      var p = {
        FStId: this.FStIdItem,
        UserId: this.UserId
      }
      ZYCKDJXQ(p)
        .then(res => {
          console.log(res)
          var Clres = res.Data
          this.resCl = Clres
          Clres.FRstockDate = formatTime(Clres.FRstockDate, 'yyyy-MM-dd')
          this.upInfo = Clres
          if (Clres.FWZLB === '畜禽标识类') {
            this.cqbsTF = true
          }
          this.$nextTick(() => {
            this.UPform.setFieldsValue(Clres)
          })
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 分页方法
    onChange (checkedValues) {
      this.selectedRowKeys = []
      this.yenum = checkedValues
      this.offset = checkedValues
      yenum1 = checkedValues
      this.ajaxData()
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 列被选中时
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys, selectedRows)
      this.selectedRowKeys = selectedRowKeys
      this.delAllInfo = selectedRows
    },
    onSelectChangeWz (selectedRowKeys, selectedRows) {
      this.selectedRowKeysWz = selectedRowKeys
      console.log(selectedRows)
      if (this.fromdata === 'add') {
        this.WzmodalTf = false
        if (selectedRowKeys[0].FWZLB === '畜禽标识类') {
          this.cqbsTF = true
        }
        this.$nextTick(() => {
          this.Addform.setFieldsValue(selectedRows[0])
        })
      } else {
        this.WzmodalTf = false
        if (selectedRowKeys[0].FWZLB === '畜禽标识类') {
          this.cqbsTF = true
        }
        this.$nextTick(() => {
          this.UPform.setFieldsValue(selectedRows[0])
        })
      }
    },
    onSelectChangeLY (selectedRowKeys, selectedRows) {
      this.selectedRowKeysLY = selectedRowKeys
      console.log(selectedRows)
      if (this.fromdata === 'add') {
        this.LYmodalTf = false
        this.$nextTick(() => {
          this.Addform.setFieldsValue({
            FRRecipientsUnit: selectedRows[0].LingYongDW
          })
        })
      } else {
        this.LYmodalTf = false
        this.$nextTick(() => {
          this.UPform.setFieldsValue({
            FRRecipientsUnit: selectedRows[0].LingYongDW
          })
        })
      }
    },
    selectChangeitem (val) {
      console.log(val)
    },
    // 弹窗
    showModal () {
      this.fromdata = 'add'
      this.visible = true
      this.zYRKDjaddxllistInfo()
    },
    // 物资名称获取
    GetgetrkwzInfo (v) {
      var p = {
        wztype: v,
        offset: this.offset,
        limit: this.limit,
        UserId: this.UserId
      }

      Getgetrkwz(p)
        .then(res => {
          console.log(res)
          var Clres = JSON.parse(res.Data)
          if (res.Data) {
            this.WzInfo = Clres.rows
            this.totalnumWZ = parseInt(Clres.total)
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 物资名称查询弹窗控制
    showFRname () {
      this.WzmodalTf = true
      this.wttype = 1
      this.zYRKDjaddxllistInfo()
    },
    // 领用单位
    showFRRecipientsUnitModal () {
      this.LYmodalTf = true
      this.wttype = ''
      this.GetZYCKDJLYDWInfo()
    },
    // 领用单位查询
    GetZYCKDJLYDWInfo () {
      var p = {
        wztype: this.wttype,
        limit: this.limitLY,
        offset: this.offsetLY,
        UserId: this.UserId
      }
      GetZYCKDJLYDW(p)
        .then(res => {
          console.log(res)
          var Clres = JSON.parse(res.Data)
          if (res.Data) {
            this.LYInfo = Clres.rows
            this.totalnumLY = parseInt(Clres.total)
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 下拉菜单查询
    zYRKDjaddxllistInfo () {
      var p = {
        wttype: 1,
        fyname: this.fyname,
        name: this.Sjname,
        UserId: this.UserId
      }

      zYRKDjaddxllist(p)
        .then(res => {
          console.log(res)
          if (res.Result) {
            if (res.Data) {
              var Clres = JSON.parse(res.Data).rows
              this.suppliesTypeInfo = Clres
            }
            if (this.WzmodalTf) {
              this.GetgetrkwzInfo(this.suppliesTypeInfo[0].FcName)
            }
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    ChangeFc () {},
    find (v) {
      console.log(v)
      this.f = false
      this.FStIdItem = v.FStId
      this.getZYCKDJXQ()
      this.updateinfo = true
      // setTimeout(() => {
      //   this.f = false
      //   this.$nextTick(() => {
      //   this.UPform.setFieldsValue(this.resCl)
      // })
      // }, 0)
    },
    update (v) {
      this.f = true

      this.FStIdItem = v.FStId
      this.fromdata = 'update'
      this.updateinfo = true
      this.getZYCKDJXQ()
      console.log('修改' + v.FStId)
    },
    delItem () {
      if (this.delAllInfo.length) {
        this.deletinfo = true
      } else {
        this.$notification.error({
          message: '请选择一条数据'
        })
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      if (this.fromdata === 'add') {
        this.Addform.validateFields((err, v) => {
          if (!err) {
            console.log(v)
            var p = {
              FRname: v.FRname,
              FRnumber: v.FRnumber,
              FRproduction: v.FRproduction,
              FRBatch: v.FRBatch,
              FRRecipientsUnit: v.FRRecipientsUnit,
              FRpersonnel: v.FRpersonnel,
              FRstockDate: v.FRstockDate,
              FRuse: v.FRuse,
              FRunit: v.FRunit
            }
            ZYCKDJListAdd(p, this.UserId)
              .then(res => {
                console.log(res)
                if (res.Result) {
                  this.$notification.success({
                    message: '新增成功'
                  })
                  this.visible = false
                  this.reload()
                }
              })
              .catch(rol => {
                console.log(rol)
              })
          }
        })
      } else if (this.fromdata === 'update') {
        this.UPform.validateFields((err, v) => {
          if (!err) {
            v.FStId = this.FStIdItem
            var formInfo = this.UPform.getFieldsValue()

            this.upInfo.FRname = formInfo.FRname
            this.upInfo.FRnumber = formInfo.FRnumber
            this.upInfo.FRunit = formInfo.FRunit
            this.upInfo.FRproduction = formInfo.FRproduction
            this.upInfo.FRBatch = formInfo.FRBatch
            this.upInfo.FRRecipientsUnit = formInfo.FRRecipientsUnit
            this.upInfo.FRpersonnel = formInfo.FRpersonnel
            this.upInfo.FRstockDate = formInfo.FRstockDate
            this.upInfo.FRuse = formInfo.FRuse
            console.log(this.upInfo)
            ZYCKDJListUpdate(this.upInfo, this.UserId)
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
    DelOk () {
      if (this.delAllInfo.length) {
        var p = []
        this.delAllInfo.forEach(item => {
          p.push(item.FStId)
        })

        ZYCKDJDel(p.join(','))
          .then(res => {
            if (res.Result) {
              this.$notification.success({
                message: '删除成功'
              })
              this.deletinfo = false
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
      }
    },
    DelNo () {
      this.deletinfo = false
      this.delAllInfo = []
      this.selectedRowKeys = []
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
      this.WzInfo = false

      this.userdanwei1 = ''
      this.selectedRowKeys1 = []
      this.selectedRowKeysWz = []
      this.LYInfo = []
      this.cqbsTF = false
      // 给对应的表单元素赋值
      this.form.setFieldsValue({
        FuseEName: this.userdanwei1
      })
      this.form.resetFields()
    },
    handleCancelWz () {
      this.WzmodalTf = false
    },
    handleCancelLY () {
      this.LYmodalTf = false
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
