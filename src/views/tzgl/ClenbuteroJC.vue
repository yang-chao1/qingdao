<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;" @submit="handleSubmit" :form="form">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :md="10" :sm="24">
                  <a-form-item label="样品名称">
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
            <a-button v-permission="{active:'CTestingadd'}" type="primary" style="height:40px" icon="plus" @click="showModal()">新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button v-permission="{active:'CTestingdele'}" @click="delet" type="primary" style="height:40px">批量删除</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px; width:80px;" @click="handleEdit()">导出</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px">列表定制</a-button>
            <a-modal
              :footer="null"
              title="瘦肉精检测新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
              :zIndex="100"
              :destroyOnClose="true"
            >
              <a-form @submit="handleSubmit" :form="form">
                <a-row>
                  <a-col :span="10">
                    <a-form-item
                      label="屠宰企业"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="['FhName', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FhName"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="2">
                    <a-form-item>
                      <a-button @click="showTz()" type="primary" style=" height: 30px;">
                        确认
                      </a-button>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="日期"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-date-picker v-decorator="['FhJCDate', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="检测人员姓名"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FhJCRYName', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FhJCRYName"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="屠宰数量"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FhTZCount', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FhTZCount"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="样品名称"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FHYPMC', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FHYPMC"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="抽样数量"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['FhCYCount', { rules: [{ required: true, message: '请输入' }] }]"
                        name="FhCYCount"
                      />
                      <!-- <a-input
                        v-decorator="['xx3', { rules: [{ required: true, message: '请输入' }] }]"
                        name="xx3"
                        style="width:100px;position: absolute; margin: 3px 10px"
                      /> -->
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="14">
                    <a-form-item
                      label="检测项目"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 16 }, sm: { span: 17 } }"
                    >
                      <a-checkbox-group v-decorator="['FhJCMD']" style="width: 100%;">
                        <a-checkbox value="克伦特罗">
                          克伦特罗
                        </a-checkbox>
                        <a-checkbox value="沙丁胺醇">
                          沙丁胺醇
                        </a-checkbox>
                        <a-checkbox value="莱克多巴胺">
                          莱克多巴胺
                        </a-checkbox>
                      </a-checkbox-group>
                    </a-form-item>
                  </a-col>
                  <a-col :span="10">
                    <a-form-item
                      label="检测结果"
                      :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-select
                        v-decorator="['FhJCJG', { rules: [{ required: true, message: '请选择' }] }]"
                        :default-value="FhJCJGType"
                        @change="onSelectChangeSelect"
                      >
                        <a-select-option value="请选择">
                          请选择
                        </a-select-option>
                        <a-select-option value="阴性">
                          阴性
                        </a-select-option>
                        <a-select-option value="阳性">
                          阳性
                        </a-select-option>
                        <a-select-option value="暂未检测">
                          暂未检测
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 结果为阳性时显示 -->
                <div v-if="this.isPositiveResult">
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="阳性样品编号"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['FhYXYPBH', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FhYXYPBH"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="阳性样品牲畜耳标号"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['FhYXYPSC', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FhYXYPSC"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="产地来源"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['FhCDLY', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FhCDLY"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="同群牲畜数量"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['FhTQSCSL', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FhTQSCSL"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="复检阳性样品送样日期	"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-date-picker v-decorator="['FhYXYPCD', { rules: [{ required: true, message: '请输入' }] }]" />

                        <!-- <a-input
                          v-decorator="['FhYXYPCD', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FhYXYPCD"
                        /> -->
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="复检结果"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['FhFJJG', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FhFJJG"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="复检阳性牲畜数量	"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['FhFJYXSCCount', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FhFJYXSCCount"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="处理情况"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['FhCLQK', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FhCLQK"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="备注	"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          v-decorator="['FhRemark']"
                          name="FhRemark"
                        />
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
              :title="this.f ? '瘦肉精检测修改' : '瘦肉精检测详情'"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1000px"
              :destroyOnClose="true"
              :zIndex="100"
            >
              <div>
                <a-form @submit="handleSubmit" :form="UFform">
                  <a-row>
                    <a-col :span="10">
                      <a-form-item
                        label="屠宰企业"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      >
                        <a-input
                          disabled
                          v-decorator="['FhName', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FhName"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="2">
                      <a-form-item v-if="this.f">
                        <a-button @click="showTz()" type="primary" style=" height: 30px;">
                          确认
                        </a-button>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">

                      <a-form-item
                        label="日期"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-date-picker :disabled="!this.f && 'disabled'" v-decorator="['FhJCDate', { rules: [{ required: true, message: '请输入' }] }]" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="检测人员姓名"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="!this.f && 'disabled'"
                          v-decorator="['FhJCRYName', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FhJCRYName"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="屠宰数量"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="!this.f && 'disabled'"
                          v-decorator="['FhTZCount', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FhTZCount"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="样品名称"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="!this.f && 'disabled'"
                          v-decorator="['FHYPMC', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FHYPMC"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="抽样数量"

                        :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="!this.f && 'disabled'"
                          v-decorator="['FhCYCount', { rules: [{ required: true, message: '请输入' }] }]"
                          name="FhCYCount"
                        />
                        <!-- <a-input
                        v-decorator="['xx3', { rules: [{ required: true, message: '请输入' }] }]"
                        name="xx3"
                        style="width:100px;position: absolute; margin: 3px 10px"
                      /> -->
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="14">
                      <a-form-item
                        label="检测项目"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 16 }, sm: { span: 17 } }"
                      >
                        <a-checkbox-group @change="onChange1" :disabled="!this.f && 'disabled'" v-decorator="['FhJCMD']" style="width: 100%;">
                          <a-checkbox value="克伦特罗">
                            克伦特罗
                          </a-checkbox>
                          <a-checkbox value="沙丁胺醇">
                            沙丁胺醇
                          </a-checkbox>
                          <a-checkbox value="莱克多巴胺">
                            莱克多巴胺
                          </a-checkbox>
                        </a-checkbox-group>
                      </a-form-item>
                    </a-col>
                    <a-col :span="10">
                      <a-form-item
                        label="检测结果"
                        :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-select
                          :disabled="!this.f && 'disabled'"
                          v-decorator="['FhJCJG', { rules: [{ required: true, message: '请选择' }] }]"
                          :defaultValue="FhJCJGType"
                          @change="onSelectChangeSelect"
                        >
                          <a-select-option value="请选择">
                            请选择
                          </a-select-option>
                          <a-select-option value="阴性">
                            阴性
                          </a-select-option>
                          <a-select-option value="阳性">
                            阳性
                          </a-select-option>
                          <a-select-option value="暂未检测">
                            暂未检测
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <!-- 结果为阳性时显示 -->
                  <div v-if="this.isPositiveResult">
                    <a-row>
                      <a-col :span="12">
                        <a-form-item
                          label="阳性样品编号"
                          :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                        >
                          <a-input
                            :disabled="!this.f && 'disabled'"
                            v-decorator="['FhYXYPBH', { rules: [{ required: true, message: '请输入' }] }]"
                            name="FhYXYPBH"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item
                          label="阳性样品牲畜耳标号"
                          :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                        >
                          <a-input
                            :disabled="!this.f && 'disabled'"
                            v-decorator="['FhYXYPSC', { rules: [{ required: true, message: '请输入' }] }]"
                            name="FhYXYPSC"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>

                    <a-row>
                      <a-col :span="12">
                        <a-form-item
                          label="产地来源"
                          :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                        >
                          <a-input
                            :disabled="!this.f && 'disabled'"
                            v-decorator="['FhCDLY', { rules: [{ required: true, message: '请输入' }] }]"
                            name="FhCDLY"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item
                          label="同群牲畜数量"
                          :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                        >
                          <a-input
                            :disabled="!this.f && 'disabled'"
                            v-decorator="['FhTQSCSL', { rules: [{ required: true, message: '请输入' }] }]"
                            name="FhTQSCSL"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>

                    <a-row>
                      <a-col :span="12">
                        <a-form-item
                          label="复检阳性样品送样日期	"
                          :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                        >
                          <a-date-picker
                            :disabled="!this.f && 'disabled'"
                            v-decorator="['FhYXYPCD', { rules: [{ required: true, message: '请输入' }] }]"
                          />
                          <!-- <a-input
                            v-decorator="['FhYXYPCD', { rules: [{ required: true, message: '请输入' }] }]"
                            name="FhYXYPCD"
                          /> -->
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item
                          label="复检结果"
                          :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                        >
                          <a-input
                            :disabled="!this.f && 'disabled'"
                            v-decorator="['FhFJJG', { rules: [{ required: true, message: '请输入' }] }]"
                            name="FhFJJG"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>

                    <a-row>
                      <a-col :span="12">
                        <a-form-item
                          label="复检阳性牲畜数量	"
                          :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                        >
                          <a-input
                            :disabled="!this.f && 'disabled'"
                            v-decorator="['FhFJYXSCCount', { rules: [{ required: true, message: '请输入' }] }]"
                            name="FhFJYXSCCount"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <a-form-item
                          label="处理情况"
                          :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                        >
                          <a-input
                            :disabled="!this.f && 'disabled'"
                            v-decorator="['FhCLQK', { rules: [{ required: true, message: '请输入' }] }]"
                            name="FhCLQK"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="12">
                        <a-form-item
                          label="备注	"
                          :labelCol="{ lg: { span: 8 }, sm: { span: 7 } }"
                          :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                        >
                          <a-input
                            :disabled="!this.f && 'disabled'"
                            v-decorator="['FhRemark']"
                            name="FhRemark"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </div>
                  <a-form-item :wrapper-col="{ span: 12, offset: 7 }" v-if="this.f">
                    <a-button type="primary" html-type="submit" style="width:315px; height: 40px;">
                      确认
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>
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
              :zIndex="1200"

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
            :loading="isloading"
            :pagination="false"
            :columns="columns"
            :data-source="HAleanmeatList"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a v-permission="{active:'CTestingsele'}" slot="action" @click="find(record)">查看&nbsp;&nbsp;</a>
              <a v-permission="{active:'CTestingupd'}" slot="action" @click="update(record)">修改&nbsp;&nbsp;</a>
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
            >当前第 {{ offset }}/{{ Math.ceil(this.totalnum / 10) }} 页 共 {{ this.totalnum }} 条记录 每页 10
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
import { getHAleanmeatList, getHAleanmeatxq, getHAleanmeatInsert, getHAleanmeatUpdate, getHAleanmeatDel } from '@/api/tzgl/srjjc'
import moment from 'moment'
import formatTime from '@/utils/public.js'
import { getGetTZCList } from '@/api/GetTZCList'
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
  { title: '屠宰企业', width: 200, align: 'center', dataIndex: 'FhName', key: 'FhName' },
  { title: '检测人员姓名', width: 200, align: 'center', dataIndex: 'FhJCRYName', key: 'FhJCRYName' },
  {
    title: '日期',
    width: 200,
    align: 'center',
    dataIndex: 'FhJCDate',
    key: 'FhJCDate',
    customRender: (t, r, index) => {
      return t ? formatTime(t, 'yyyy-MM-dd') : ''
    }
  },
  { title: '屠宰数量', width: 220, align: 'center', dataIndex: 'FhTZCount', key: 'FhTZCount' },
  { title: '样品名称', width: 200, align: 'center', dataIndex: 'FHYPMC', key: 'FHYPMC' },
  { title: '抽样数量', width: 220, align: 'center', dataIndex: 'FhCYCount', key: 'FhCYCount' },
  { title: '检测项目', width: 200, align: 'center', dataIndex: 'FhJCMD', key: 'FhJCMD' },
  { title: '检测结果', width: 200, align: 'center', dataIndex: 'FhJCJG', key: 'FhJCJG' },
  { title: '处理情况', width: 200, align: 'center', dataIndex: 'FhCLQK', key: 'FhCLQK' },
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
  inject: ['reload'],
  data () {
    return {
      isloading: false,
      // 格式化日期
      moment,
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
      yzctype: 'tzc',
      yenumTz,
      // 屠宰单位选择当前页数
      offsetTz: 1,
      // 屠宰每页条数
      limitTz: 10,
      totalTz: 10,
      UserId: sessionStorage.getItem('FStId'),
      FStIdItme: 0,

      queryParam: { status: 0, status1: 0 },
      fromdata: '',
      columns,
      columnsSB,
      HAleanmeatList: [],
      checkboxInfo: [],

      // from 表单
      form: this.$form.createForm(this),
      UFform: this.$form.createForm(this),

      // 点击 弹出框
      visible: false,
      delInfo: false,
      delAllTF: false,
      f: true,
      updateinfo: false,
      confirmLoading: false,
      SBDInfo: [],
      SBmodalTF: false,

      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      selectedRowKeysSb: [],
      delAllInfo: [],
      loading: false,
      FhJCJGType: '请选择',
      isPositiveResult: false, // 检测结果是否为阳性
      upInfo: {}
    }
  },
  created () {
    this.isloading = true
    yenum1 = 1
    yenumTz = 1
    this.getHAleanmeatListInfo()
  },
  methods: {
    // 列表数据查询
    getHAleanmeatListInfo () {
      var p = {
        limit: this.limit,
        offset: this.offset,
        UserId: this.UserId,
        selectwhere: this.selectwhere
      }
      getHAleanmeatList(p)
        .then(res => {
          this.isloading = false
          var Clres = JSON.parse(res.Data)
          this.HAleanmeatList = Clres.rows
          this.totalnum = parseInt(Clres.total)
        })
        .catch(rol => {
          // console.log(rol)
        })
    },
    getCurrentData () {
      return new Date().toLocaleDateString()
    },
    // 单条数据查询
    getHAleanmeatListInfoItem (v) {
      var p = {
        FStId: v,
        UserId: this.UserId
      }
      getHAleanmeatxq(p)
        .then(res => {
          // console.log(res)
          var Clres = res.Data

          this.checkboxInfo = Clres.FhJCMD ? Clres.FhJCMD.split(',') : []
          Clres.FhJCMD = Clres.FhJCMD ? Clres.FhJCMD.split(',') : []
          if (Clres.FhJCJG === '阳性') {
            this.isPositiveResult = true
          } else {
            this.isPositiveResult = false
          }
          this.upInfo = Clres
          this.$nextTick(() => {
            this.UFform.setFieldsValue(Clres)
          })
        })
        .catch(rol => {
          // console.log(rol)
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
      getGetTZCList(p).then(res => {
        // console.log(res)
        var Clres = JSON.parse(res.Data)
        this.SBmodalTF = true
        this.SBDInfo = Clres.rows
        this.totalTz = parseInt(Clres.total)
      }).catch(rol => {
        // console.log(rol)
      })
    },

    // 分页方法
    onChange (checkedValues) {
      this.selectedRowKeys = []
      // console.log('checked = ', checkedValues)
      this.yenum = checkedValues
      this.offset = checkedValues
      yenum1 = checkedValues
      this.delAllInfo = []
      this.getHAleanmeatListInfo()
    },
    onChangeTz (checkedValues) {
      // console.log(checkedValues)
      this.offsetTz = checkedValues
      yenumTz = this.offsetTz
      this.getTzInfo()
    },
    // 多选
    onChange1 (val) {
      // console.log(val)
      this.checkboxInfo = val
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChangeSelect (value) {
      // console.log(value)
      if (value === '阳性') {
        this.isPositiveResult = true
      } else {
        this.isPositiveResult = false
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      // console.log(selectedRowKeys, selectedRows)
      this.selectedRowKeys = selectedRowKeys
       var arr = []
      selectedRows.forEach(item => {
        arr.push(item.FStId)
        this.delAllInfo = arr
      })
      arr = []
    },
    onSelectChangeSb (selectedRowKeys, selectedRows) {
      this.selectedRowKeysSb = selectedRowKeys
      if (this.f && this.updateinfo) {
        if (selectedRows) {
        this.SBmodalTF = false
        this.$nextTick(() => {
          this.UFform.setFieldsValue({
            FhName: selectedRows[0].FhName
          })
        })
      }
      } else {
        if (selectedRows) {
        this.SBmodalTF = false
        const selectedRowsadd = selectedRows[0].FhName
        this.$nextTick(() => {
          this.form.setFieldsValue({
            FhName: selectedRowsadd
          })
        })
      }
      }
    },
    // 弹窗
    showModal (formName) {
      this.fromdata = 'add'
      this.visible = true
    },
    // 屠宰弹窗
    showTz () {
      this.getTzInfo()
    },
    find (v) {
      this.f = false
      this.updateinfo = true
      this.getHAleanmeatListInfoItem(v.FStId)
      // 检测结果是否为阳性
      if (this.UFform.getFieldValue('FhJCJG') === '阳性') {
        this.isPositiveResult = true
      } else {
        this.isPositiveResult = false
      }
    },
    update (v) {
      this.fromdata = 'update'
      this.f = true
      this.updateinfo = true
      this.FStIdItme = v.FStId
      this.getHAleanmeatListInfoItem(v.FStId)
      if (this.UFform.getFieldValue('FhJCJG') === '阳性') {
        this.isPositiveResult = true
      } else {
        this.isPositiveResult = false
      }
    },
    delet (v) {
       if (!this.delAllInfo.length) {
        this.$notification.error({
          message: '请选择一条数据'
        })
      } else {
      this.FStIdItme = v.FStId
      this.delInfo = true
      }
    },
    delAll () {
      if (!this.delAllInfo.length) {
        this.$notification.error({
          message: '请选择一条数据'
        })
      } else {
        this.delInfo = true
        this.delAllTF = true
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      if (this.fromdata === 'update') {
        this.UFform.validateFields((err, val) => {
          if (!err) {
            var formItm = this.UFform.getFieldsValue()
              this.upInfo.FStId = this.FStIdItme
              this.upInfo.FhName = formItm.FhName
              this.upInfo.FhJCDate = formItm.FhJCDate._d ? formItm.FhJCDate._d : this.upInfo.FhJCDate
              this.upInfo.FhJCRYName = formItm.FhJCRYName
              this.upInfo.FhTZCount = formItm.FhTZCount
              this.upInfo.FHYPMC = formItm.FHYPMC
              this.upInfo.FhCYCount = formItm.FhCYCount
              this.upInfo.FhJCMD = this.checkboxInfo.length ? this.checkboxInfo.join(',') : this.upInfo.FhJCMD
              this.upInfo.FhJCJG = formItm.FhJCJG
              this.upInfo.FhYXYPBH = formItm.FhYXYPBH
              this.upInfo.FhYXYPSC = formItm.FhYXYPSC
              this.upInfo.FhCDLY = formItm.FhCDLY
              this.upInfo.FhTQSCSL = formItm.FhTQSCSL
              this.upInfo.FhYXYPCD = formItm.FhYXYPCD ? formItm.FhYXYPCD._d : this.upInfo.FhYXYPCD
              this.upInfo.FhFJJG = formItm.FhFJJG
              this.upInfo.FhFJYXSCCount = formItm.FhFJYXSCCount
              this.upInfo.FhCLQK = formItm.FhCLQK
              this.upInfo.FhRemark = formItm.FhRemark

            getHAleanmeatUpdate(this.upInfo, this.UserId).then(res => {
              if (res.Result) {
                this.$notification.success({
                  message: '修改成功'
                })
                this.updateinfo = false
                this.reload()
              }
            }).catch(rol => {
              // console.log(rol)
            })
          } else {
            this.$notification.error({
              message: '请检查输入数据'
            })
          }
        })
      } else if (this.fromdata === 'add') {
        // if (this.form.getFieldValue('hJCDate')) return
        this.form.validateFields((err, val) => {
          if (!err) {
            var p = {
              FhName: val.FhName,
              FhJCDate: val.FhJCDate ? val.FhJCDate._d : val.FhJCDate,
              FhJCRYName: val.FhJCRYName,
              FhTZCount: val.FhTZCount,
              FHYPMC: val.FHYPMC,
              FhCYCount: val.FhCYCount,
              FhJCMD: val.FhJCMD ? val.FhJCMD.join(',') : val.FhJCMD,
              FhJCJG: val.FhJCJG,
              FhYXYPBH: val.FhYXYPBH,
              FhYXYPSC: val.FhYXYPSC,
              FhCDLY: val.FhCDLY,
              FhTQSCSL: val.FhTQSCSL,
              FhYXYPCD: val.FhYXYPCD ? val.FhYXYPCD._d : val.FhYXYPCD,
              FhFJJG: val.FhFJJG,
              FhFJYXSCCount: val.FhFJYXSCCount,
              FhCLQK: val.FhCLQK,
              FhRemark: val.FhRemark
            }
            getHAleanmeatInsert(p, this.UserId)
              .then(res => {
                if (res.Result) {
                  this.$notification.success({
                    message: '新增成功'
                  })
                  this.visible = false
                  this.reload()
                }
              })
              .catch(rol => {
                // console.log(rol)
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
        this.SBmodalTF = false
        this.form.resetFields()
      }, 100)
    },
    // 确定删除
    handleDel () {
      var p = {
        UserId: this.UserId,
        FStId: this.delAllInfo
      }
      getHAleanmeatDel(p).then(res => {
        console.log(res)
        if (res.Result) {
          this.$notification.success({
            message: '删除成功'
          })
          this.delInfo = false
          this.reload()
        }
      }).catch(rol => {
        console.log(rol)
      })
    },
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.updateinfo = false
      this.jinyong = false
      this.userdanwei1 = ''
      this.isPositiveResult = false
      this.SBmodalTF = false
      this.selectedRowKeys1 = []
      this.delAllTF = false
      this.delInfo = false
      // 给对应的表单元素赋值
      this.form.setFieldsValue({
        FuseEName: this.userdanwei1
      })
      this.form.resetFields()
    },
    handleCancelSb () {
      this.SBmodalTF = false
      yenumTz = 1
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
