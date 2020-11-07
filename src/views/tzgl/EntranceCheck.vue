<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;" @submit="handleSubmit" :form="form">
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
            <a-button
              v-permission="{ active: 'TEExaminationadd' }"
              type="primary"
              style="height:40px"
              icon="plus"
              @click="showModal()"
            >新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button
              v-permission="{ active: 'TEExaminationdele' }"
              @click="delAll"
              type="primary"
              style="height:40px"
            >批量删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- <a-button type="primary" style="height:40px; width:80px;" @click="handleEdit()">导出</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px">列表定制</a-button> -->
            <a-modal
              :footer="null"
              title="入场查验登记"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
            >
              <a-form @submit="handleSubmit" :form="form">
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="屠宰场名称"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="true"
                        v-decorator="['eOwner', { rules: [{ required: true, message: '请输入' }] }]"
                        name="eOwner"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="日期"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <!-- <a-date-picker
                        disabled
                        format="yyyy-MM-dd hh:mm:ss"
                        v-decorator="['eDate', { rules: [{ required: true, message: '请输入' }],initialValue:getCurrentDate() }]"
                        style="width: 100%"
                        :showToday="true"
                      /> -->
                      <a-input disabled v-decorator="['eDate', { initialValue: getCurrentDate() }]" name="eDate" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="检疫证明号码"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        @blur="showJY"
                        :maxLength="10"
                        v-decorator="[
                          'eNo',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^[a-zA-Z0-9]{10}$/, message: '只能输入数字' }
                            ]
                          }
                        ]"
                        name="eNo"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="车牌号码"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="['CPHM', { rules: [{ required: true, message: '请输入' }] }]"
                        name="CPHM"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="动物种类"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="['eAnimal', { rules: [{ required: true, message: '请输入' }] }]"
                        name="eAnimal"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="动物数量及单位"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="[
                          'eNum',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              {
                                pattern: /^[0-9]*$/,
                                message: '只能输入数字'
                              }
                            ]
                          }
                        ]"
                        name="eNum"
                        style="width:100px!important"
                      />
                      <a-input
                        disabled
                        v-decorator="['eUnit', { rules: [{ required: true, message: '请输入' }] }]"
                        name="eUnit"
                        style="width:100px!important;position: absolute; margin: 3px 10px"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      disabled
                      label="货主（经纪人）"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="['eCOwner', { rules: [{ required: true, message: '请输入' }] }]"
                        name="eCOwner"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="联系电话"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 14 }, sm: { span: 17 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="['ePhone', { rules: [{ required: true, message: '请输入' }] }]"
                        name="ePhone"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="养殖场名称"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="['YZCMC', { rules: [{ required: true, message: '请输入' }] }]"
                        name="YZCMC"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="来源地"
                      :labelCol="{ lg: { span: 10 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                    >
                      <a-input
                        disabled
                        v-decorator="['eSeedbed', { rules: [{ required: true, message: '请输入' }] }]"
                        name="eSeedbed"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12" v-if="isShowEarTag">
                    <a-form-item
                      label="耳标号"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 17 } }"
                    >
                      <a-input
                        disabled
                        type="textarea"
                        v-decorator="['EBH', { rules: [{ required: true, message: '请输入' }] }]"
                        name="EBH"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="临床检查情况"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <!-- <a-input
                        v-decorator="['eHealthy', { rules: [{ required: true, message: '请输入' }] }]"
                        name="eHealthy"
                      /> -->
                      <a-select
                        v-decorator="['eHealthy', { rules: [{ required: true, message: '请输入' }] }]"
                        @change="selectChangeitem"
                      >
                        <a-select-option value="正常">正常</a-select-option>
                        <a-select-option value="异常">异常</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>

                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="开证人"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 17 } }"
                    >
                      <a-input disabled v-decorator="['FKaiName']" name="FKaiName" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="查验人员"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        v-decorator="['eRummager', { rules: [{ required: true, message: '请输入' }] }]"
                        name="eRummager"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="18">
                    <a-form-model-item
                      label="死亡耳标编号"
                      :labelCol="{ lg: { span: 6 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 16 }, sm: { span: 15 } }"
                    >
                      <a-textarea :auto-size="{ minRows: 3, maxRows: 3 }" v-decorator="['FSmemo3']" style="height:90px"/>
                      <a-button @click="checkEB" style="position: absolute;margin-left:2%;"> 选择 </a-button>
                    </a-form-model-item>
                  </a-col>
                </a-row>

                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="死亡畜禽数量"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['FSmemo2']" name="FSmemo2" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="待宰栏"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 7 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input v-decorator="['eDZQ']" name="eDZQ" />
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row>
                  <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
                    <a-button type="primary" html-type="submit" style="width:315px; height: 40px;">
                      确认
                    </a-button>
                  </a-form-item>
                </a-row></a-form
              >
            </a-modal>
            <!-- 修改弹窗 查看弹窗 -->
            <a-modal
              :title="this.f ? '入场查验修改' : '入场查验详情'"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1000px"
              :destroyOnClose="true"
            >
              <div>
                <a-form @submit="handleSubmit" :form="updateinfoform">
                  <a-row>
                    <a-col :span="12"> </a-col>
                    <a-col :span="12"> </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="屠宰场名称"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          disabled
                          v-decorator="['eOwner', { rules: [{ required: true, message: '请输入' }] }]"
                          name="eOwner"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="日期"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          disabled
                          v-decorator="['eDate', { rules: [{ required: true, message: '请输入' }] }]"
                          name="eDate"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="检疫证明号码"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          disabled
                          v-decorator="['eNo', { rules: [{ required: true, message: '请输入' }] }]"
                          name="eNo"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="车牌号码"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          disabled
                          v-decorator="['CPHM', { rules: [{ required: true, message: '请输入' }] }]"
                          name="CPHM"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="动物种类"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          disabled
                          v-decorator="['eAnimal', { rules: [{ required: true, message: '请输入' }] }]"
                          name="eAnimal"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="动物数量及单位"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          disabled
                          v-decorator="['eNum', { rules: [{ required: true, message: '请输入' }] }]"
                          name="eNum"
                          style="width:100px!important"
                        />
                        <a-input
                          disabled
                          v-decorator="['eUnit', { rules: [{ required: true, message: '请输入' }] }]"
                          name="eUnit"
                          style="width:100px!important;position: absolute; margin: 3px 10px"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="货主（经纪人）"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          disabled
                          v-decorator="['eCOwner', { rules: [{ required: true, message: '请输入' }] }]"
                          name="eCOwner"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="联系电话"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          disabled
                          v-decorator="['ePhone', { rules: [{ required: true, message: '请输入' }] }]"
                          name="ePhone"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="养殖场名称"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          disabled
                          v-decorator="['YZCMC', { rules: [{ required: true, message: '请输入' }] }]"
                          name="YZCMC"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="来源地"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          disabled
                          :auto-size="{ minRows: 2, maxRows: 2 }"
                          type="textarea"
                          v-decorator="['eSeedbed', { rules: [{ required: true, message: '请输入' }] }]"
                          name="eSeedbed"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12" v-if="isShowEarTag">
                      <a-form-item
                        label="耳标号"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          type="textarea"
                          disabled
                          :auto-size="{ minRows: 2, maxRows: 2 }"
                          v-decorator="['EBH', { rules: [{ required: true, message: '请输入' }] }]"
                          name="EBH"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="临床检查情况"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      >
                        <a-input
                          v-if="!this.f"
                          disabled
                          v-decorator="['eHealthy', { rules: [{ required: true, message: '请输入' }] }]"
                          name="eHealthy"
                        />
                        <a-select
                          v-if="this.f"
                          v-decorator="['eHealthy', { rules: [{ required: true, message: '请输入' }] }]"
                          @change="selectChangeitem"
                        >
                          <a-select-option value="正常">正常</a-select-option>
                          <a-select-option value="异常">异常</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="开证人"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 15 }, sm: { span: 17 } }"
                      >
                        <a-input disabled v-decorator="['FKaiName']" name="FKaiName" />
                      </a-form-item>
                    </a-col>

                    <a-col :span="12">
                      <a-form-item
                        label="查验人员"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input
                          :disabled="!this.f"
                          v-decorator="['eRummager', { rules: [{ required: true, message: '请输入' }] }]"
                          name="eRummager"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="16">
                      <a-form-model-item
                        label="死亡耳标编号"

                        :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
                        :wrapperCol="{ lg: { span: 16 }, sm: { span: 15 } }"
                      >
                        <a-textarea :auto-size="{ minRows: 3, maxRows: 3 }" :disabled="!this.f" v-decorator="['FSmemo3']" style="height:90px"/>
                        <a-button v-if="this.f" @click="checkEB" style="position: absolute;margin-left:2%;"> 选择 </a-button>
                      </a-form-model-item>
                    </a-col>
                  </a-row>

                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="死亡畜禽数量"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input :disabled="!this.f" v-decorator="['FSmemo2']" name="FSmemo2" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="待宰栏"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                      >
                        <a-input :disabled="!this.f" v-decorator="['eDZQ']" name="eDZQ" />
                      </a-form-item>
                    </a-col>
                  </a-row>

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
            :data-source="HusbStockGetList"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a v-permission="{ active: 'TEExaminationsele' }" slot="action" @click="find(record)">查看&nbsp;&nbsp;</a>
              <a
                v-permission="{ active: 'TEExaminationupd' }"
                slot="action"
                @click="update(record)"
              >修改&nbsp;&nbsp;</a
              >
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
      <a-modal :destroyOnClose="true" :zIndex="1004" v-model="erVisited" :footer="null" width="800px">
        <er :man="man" :num="ernum" @hander-fa="ff"></er>
      </a-modal>
    </page-header-wrapper>
  </div>
</template>
<script>
// 接口请求调用
import { getHusbStockGet, getQuaEntrancexq, getQuaEntranceUpdate, getQuaEntranceDel } from '@/api/tzgl/rccy'
import Qs from 'qs'
import formatTime from '@/utils/public.js'
import er from '@/views/jyjg/compont/er'
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
  { title: '屠宰场名称', width: 200, align: 'center', dataIndex: 'eOwner', key: 'eOwner' },
  {
    title: '日期',
    width: 200,
    align: 'center',
    dataIndex: 'eDate',
    key: 'eDate',
    customRender: (t, r, index) => {
      return t ? formatTime(t, 'yyyy-MM-dd hh:mm:ss') : ''
    }
  },
  { title: '动物种类', width: 200, align: 'center', dataIndex: 'eAnimal', key: 'eAnimal' },
  { title: '临床检查情况', width: 220, align: 'center', dataIndex: 'eHealthy', key: 'eHealthy' },
  { title: '查验人员', width: 200, align: 'center', dataIndex: 'eRummager', key: 'eRummager' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]

// const data = [
//   {
//     xx1: '即墨市店集东里生猪屠宰场',
//     xx2: '2020-09-23'
//   }
// ]
const showEarTagArr = ['猪', '牛', '羊']
export default {
  inject: ['reload'],
  components: {
    er
  },
  data () {
    return {
      // 耳标输入
      man: '',
      ernum: 0,
      erVisited: false,
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
      HusbStockGetList: [],

      // from 表单
      form: this.$form.createForm(this),
      updateinfoform: this.$form.createForm(this),

      // 点击 弹出框
      visible: false,
      FStIdItme: '',
      delInfo: false,
      f: true,
      updateinfo: false,
      confirmLoading: false,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      selectedRowKeys: [],
      selectedRowKeys1: [],
      loading: false,
      FStId: sessionStorage.getItem('FStId'),
      FuseEName: sessionStorage.getItem('FuseEName'),
      infores: {},
      delTF: false,
      delAllInfo: [],
      isShowEarTag: false, // 是否显示耳标号文本框
      showEarTagArr,
      mocheckInfo: ''
    }
  },
  created () {
    yenum1 = 1
    this.getHusbStockGetList()
  },
  methods: {
    // 耳标新增
    checkEB () {
      if (this.fromdata === 'add') {
        this.ernum = parseInt(this.form.getFieldValue('eNum')) || 0
      } else {
        this.ernum = parseInt(this.updateinfoform.getFieldValue('eNum')) || 0
      }
      this.erVisited = true
      console.log(this.ernum)
    },
    mocheck () {
      if (this.mocheckInfo) {
        this.selectwhere = 'eOwner:' + this.mocheckInfo
      } else {
        this.selectwhere = ''
      }
      this.onChange(1)
    },
    ff (arr) {
      console.log(arr)
      if (this.fromdata === 'add') {
        this.form.setFieldsValue({
          AEarTag: arr
        })
      } else {
        this.form.setFieldsValue({
          AEarTag: arr
        })
      }

      this.erVisited = false
    },
    getCurrentDate () {
      var currentDate = formatTime(null, 'yyyy-MM-dd hh:mm:ss')
      return currentDate
    },
    // 获取列表数据
    getHusbStockGetList () {
      var p = {
        UserId: this.FStId,
        offset: this.offset,
        limit: this.limit,
        selectwhere: this.selectwhere
      }
      getHusbStockGet(p)
        .then(res => {
          console.log(res)
          var Clres = JSON.parse(res.Data)
          this.HusbStockGetList = Clres.rows
          this.totalnum = parseInt(Clres.total)
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    // 获取单条数据
    getitemOne (v) {
      var p = { FStId: v, UserId: this.FStId }
      getQuaEntrancexq(p)
        .then(res => {
          console.log(res)
          if (res.Result) {
            var Clres = res.Data
            this.infores = Clres
            this.updateinfo = true
            // 是否显示耳标号（动物种类为猪牛羊的时候显示）
            if (showEarTagArr.indexOf(Clres.eAnimal) === -1) {
              this.isShowEarTag = false
            } else this.isShowEarTag = true
            this.$nextTick(() => {
              this.updateinfoform.setFieldsValue({
                eOwner: Clres.eOwner,
                eDate: formatTime(Clres.eDate, 'yyyy-MM-dd hh:mm:ss '),
                eNo: Clres.eNo,
                CPHM: Clres.CPHM,
                eAnimal: Clres.eAnimal,
                eNum: Clres.eNum,
                eUnit: Clres.eUnit,
                eCOwner: Clres.eCOwner,
                ePhone: Clres.ePhone,
                YZCMC: Clres.YZCMC,
                eSeedbed: Clres.eSeedbed,
                EBH: Clres.EBH,
                eHealthy: Clres.eHealthy,
                eRummager: Clres.eRummager,
                FKaiName: Clres.FKaiName,
                eDZQ: Clres.eDZQ,
                FSmemo2: Clres.FSmemo2,
                FSmemo3: Clres.FSmemo3
              })
            })
          }
        })
        .catch(rol => {
          console.log(rol)
        })
    },
    showJY () {
      console.log(this.form.getFieldValue('eNo'), this.form.getFieldError('eNo'))
      if (this.form.getFieldValue('eNo') && !this.form.getFieldError('eNo')) {
        //  var v = 3701008901
        this.$axios({
          method: 'get',
          url:
            'http://www.miliotech.com:8886/QDZSAPP/HtmlAshxQua/RuChanChaYan.ashx?JYZMHM=' +
            this.form.getFieldValue('eNo')
        }).then(res => {
          console.log(res)
          if (!res.data.errorCode) {
            // 基本信息
            var Clres = res.data.data.result1[0]
            // 是否显示耳标号（动物种类为猪牛羊的时候显示）
            if (showEarTagArr.indexOf(Clres.Column9) === -1) {
              this.isShowEarTag = false
            } else this.isShowEarTag = true
            // var ClresEB = res.data.data.list[0]
            this.$nextTick(() => {
              this.form.setFieldsValue({
                CPHM: Clres.Column1, // 车牌号
                eAnimal: Clres.Column9, // 动物种类
                eNum: Clres.Column2, // 数量     Znum :Clres. //总数
                eUnit: Clres.Column3, // 单位
                eCOwner: Clres.Column4, // 货主（经纪人）
                ePhone: Clres.Column5, // 联系电话
                YZCMC: Clres.Column6, // 养殖场名称
                eSeedbed: Clres.Column7, // 来源地  eAdd //来源地
                EBH: Clres.Column8, // 耳标号
                FKaiName: Clres.Column10 // 开证人
              })
            })
          } else {
            this.$notification.error({
              message: res.data.errorMsg
            })
          }
        })
      }
    },
    // 分页方法
    onChange (checkedValues) {
      this.selectedRowKeys = []
      console.log('checked = ', checkedValues)
      this.yenum = checkedValues
      this.offset = checkedValues
      yenum1 = checkedValues
      this.getHusbStockGetList()
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.delAllInfo = selectedRows
    },
    selectChangeitem (v) {
      console.log(v)
    },
    // 弹窗
    showModal (formName) {
      this.fromdata = 'add'
      this.isShowEarTag = false
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          eOwner: this.FuseEName
        })
      })
    },
    find (v) {
      console.log(v)
      this.f = false
      this.getitemOne(v.FStId)
    },
    // 修改
    update (v) {
      this.f = true
      this.fromdata = 'update'
      this.getitemOne(v.FStId)
    },
    delet (v) {
      this.FStIdItme = v.FStId
      this.delInfo = true
    },
    delAll () {
      if (!this.delAllInfo.length) {
        this.$notification.error({
          message: '请选择一条数据'
        })
      } else {
        this.delInfo = true
        this.delTF = true
      }
    },
    handleSubmit (e) {
      console.log('执行了')
      e.preventDefault()

      if (this.fromdata === 'add') {
        this.form.validateFields((err, v) => {
          console.log(v)
          console.log(v)
          if (!err) {
            v.eExamine = ''
            v.eRemark = ''
            v.eZwjcjg = ''
            v.eChandi = ''
            v.Znum = v.eNum
            v.eAdd = v.eSeedbed
            v.eVNo = v.CPHM
            v.xs = new Date().getHours()
            this.$axios({
              method: 'post',
              url: 'http://www.miliotech.com:8886/QDZSAPP/HtmlAshxQua/add.ashx',
              data: Qs.stringify({
                json: JSON.stringify(v),
                uid: this.FStId,
                type: 1
              })
            }).then(res => {
              console.log(res)
              if (res.status === 200) {
                this.$notification.success({
                  message: '新增成功'
                })
                this.visible = false
                this.reload()
              }
            })
          } else {
            this.$notification.error({
              message: '请检查输入数据'
            })
          }
        })
      } else if (this.fromdata === 'update') {
        this.updateinfoform.validateFields((err, v) => {
          console.log(v)
          var formInfo = this.updateinfoform
          this.infores.eOwner = formInfo.getFieldValue('eOwner')
          this.infores.eDate = formInfo.getFieldValue('eDate')
          this.infores.eNo = formInfo.getFieldValue('eNo')
          this.infores.CPHM = formInfo.getFieldValue('CPHM')
          this.infores.eAnimal = formInfo.getFieldValue('eAnimal')
          this.infores.eNum = formInfo.getFieldValue('eNum')
          this.infores.eUnit = formInfo.getFieldValue('eUnit')
          this.infores.eCOwner = formInfo.getFieldValue('eCOwner')
          this.infores.ePhone = formInfo.getFieldValue('ePhone')
          this.infores.YZCMC = formInfo.getFieldValue('YZCMC')
          this.infores.eSeedbed = formInfo.getFieldValue('eSeedbed')
          this.infores.EBH = formInfo.getFieldValue('EBH')
          this.infores.eRummager = formInfo.getFieldValue('eRummager')
          this.infores.eHealthy = formInfo.getFieldValue('eHealthy')
          this.infores.Znum = formInfo.getFieldValue('eNum')
          this.infores.eAdd = formInfo.getFieldValue('eSeedbed')
          this.infores.eVNo = formInfo.getFieldValue('CPHM')
          this.infores.xs = new Date().getHours()
          this.infores.FKaiName = formInfo.getFieldValue('FKaiName')
          this.infores.eDZQ = formInfo.getFieldValue('eDZQ')
          this.infores.FSmemo2 = formInfo.getFieldValue('FSmemo2')
          this.infores.FSmemo3 = formInfo.getFieldValue('FSmemo3')
          if (!err) {
            getQuaEntranceUpdate(this.infores, this.FStId)
              .then(res => {
                console.log(res)
                if (res.Result) {
                  this.$notification.success({
                    message: '修改成功'
                  })
                  this.visible = false
                  this.reload()
                }
              })
              .catch(rol => {
                console.log(rol)
              })
          } else {
            this.$notification.error({
              message: '请检查输入数据'
            })
          }
        })
      }
    },
    // 确定删除
    handleDel () {
      var p = {
        UserId: this.FStId,
        FStId: this.FStIdItme
      }
      if (this.delTF) {
        p.FStId = ''
        this.delAllInfo.forEach(item => {
          console.log(item)
          // delall.push(item.FStId)
          if (p.FStId === '') {
            p.FStId = item.FStId
          } else {
            p.FStId = p.FStId + ',' + item.FStId
          }
        })
      }
      getQuaEntranceDel(p)
        .then(res => {
          console.log(res)
          if (res.Result) {
            this.$notification.success({
              message: '删除成功'
            })
            this.delInfo = false
            this.reload()
          }
        })
        .catch(rol => {
          console.log(rol)
        })
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
      this.delInfo = false
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
.ant-input {
  width: 238px !important;
}
</style>
