<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :span="7">
                  <a-form-item
                    label="屠宰企业"
                    :labelCol="{ lg: { span: 9 }, sm: { span: 10 } }"
                    :wrapperCol="{ lg: { span: 15 }, sm: { span: 14 } }"
                  >
                    <a-input @blur="mocheck" v-model="queryParam.id" size="large" />
                  </a-form-item>
                </a-col>
                <a-col :span="3">
                  <a-select @change="selectShow" default-value="运营" size="large">
                    <a-select-option value="运营">
                      运营
                    </a-select-option>
                    <a-select-option value="注销">
                      注销
                    </a-select-option>
                  </a-select>
                </a-col>
              </div>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item label="调用次数">
                    <a-input-number v-model="queryParam.callNo" style="width: 100%" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="更新日期">
                    <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期" />
                  </a-form-item>
                </a-col>
                <!-- <a-col :md="8" :sm="24">
                <a-form-item label="使用状态">
                  <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col> -->
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
                <a-col :md="(!advanced && 4) || 12" :sm="12">
                  <span
                    class="table-page-search-submitButtons"
                    :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
                  >
                    <a-button type="primary" style="height:40px">查询</a-button>
                    <!-- <a-button style="margin-left: 8px;height:40px" @click="() => (queryParam = {})">重置</a-button>
                    <a @click="toggleAdvanced" style="margin-left: 8px">
                      {{ advanced ? '收起' : '展开' }}
                      <a-icon :type="advanced ? 'up' : 'down'" />
                    </a> -->
                  </span>
                </a-col>
              </div>
            </a-row>
          </a-form>
          <div style="margin-top:35px;">
            <a-button
              v-permission="{ active: 'slaugadd' }"
              type="primary"
              style="height:40px"
              icon="plus"
              @click="showModal()"
            >新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <!-- 新增 -->
            <a-modal
              :footer="null"
              title="管理新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1200px"
              :destroyOnClose="true"
            >
              <xqtzqyxyda-add></xqtzqyxyda-add>
            </a-modal>
            <a-modal
              :footer="null"
              title="管理新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1200px"
              :destroyOnClose="true"
            >
              <!-- <p>{{ ModalText }}</p> -->
              <!-----------------------------表单元素----------------------------  -->

              <a-form @submit="handleSubmit" :form="form">
                <a-row>
                  <a-col :span="10">
                    <a-form-item
                      label="屠宰企业名称"
                      :labelCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      :wrapperCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                    >
                      <a-input v-decorator="['FhName', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="2">
                    <a-form-item
                      :labelCol="{ lg: { span: 0 }, sm: { span: 0 } }"
                      :wrapperCol="{ lg: { span: 24 }, sm: { span: 24 } }"
                    >
                      <!-- <a-input placeholder="请输入编号" v-decorator="['FSmemo2', { rules: [{ required: true, message: '请输入' }] }]" /> -->
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="邮政编码"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                    >
                      <a-input
                        v-decorator="[
                          'FhYB',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row>
                  <a-col :span="16">
                    <a-form-item
                      label="地址"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                    >
                      <!-- <a-cascader :options="options" placeholder="所在地" @change="onChange"> </a-cascader> -->

                      <a-select style="width: 120px;margin-right: 10px;" @change="ChangeTown" default-value="青岛市">
                        <a-select-option value="青岛市">
                          青岛市
                        </a-select-option>
                      </a-select>
                      <a-select
                        style="width: 120px;margin-right: 10px;"
                        @change="ChangeRegion"
                        v-if="regionTF"
                        :default-value="regName"
                      >
                        <a-select-option value="请选择">
                          请选择
                        </a-select-option>
                        <a-select-option v-for="(item, index) in regInfo" :key="index">
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                      <a-select style="width: 120px;" @change="ChangePeo" :default-value="peoName">
                        <a-select-option value="请选择">
                          请选择
                        </a-select-option>
                        <a-select-option v-for="(item, index) in peoInfo" :key="index">
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item
                      :labelCol="{ lg: { span: 0 }, sm: { span: 0 } }"
                      :wrapperCol="{ lg: { span: 18 }, sm: { span: 18 } }"
                    >
                      <!-- FSxxdz 09-27新加字段，数据库可能需要添加 -->
                      <a-input
                        v-decorator="['FSxxdz', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="详细地址"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="经纬度:"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 17 } }"
                    >
                      <a-input
                        style="width:143.33px"
                        v-decorator="['FLongitude', { rules: [{ required: true, message: '请输入经度' }] }]"
                        name="FLongitude"
                        placeholder="请输入经度"
                      />

                      <a-input
                        style="width:143.33px"
                        v-decorator="['FLatitude', { rules: [{ required: true, message: '请输入纬度' }] }]"
                        name="FLatitude"
                        placeholder="请输入纬度"
                      />
                      <a-button @click="mapatlas" style="position: absolute; margin: 3px 10px">
                        选择
                      </a-button>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="法人代表"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhLegal', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="法人联系电话"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="[
                          'FhPhone',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1\d{10}$/, message: '手机号格式错误' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
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
                      label="负责人"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhFZR', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="负责人电话"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="[
                          'FhFZRPhone',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
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
                      label="传真"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhCZ', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="电子邮箱"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhNature', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="开户行"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['Fhkhh', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="银行卡号/一卡通号"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['Fhyhkh', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="企业网址"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhLicense', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="屠宰种类"
                      :labelCol="{ lg: { span: 6 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }"
                    >
                      <a-checkbox-group
                        v-decorator="['FhKind', { initialValue: [] }]"
                        @change="onChangeZL"
                        style="width: 100%;"
                      >
                        <a-row>
                          <a-col :span="4">
                            <a-checkbox value="鸡">
                              鸡
                            </a-checkbox>
                          </a-col>
                          <a-col :span="4">
                            <a-checkbox value="牛">
                              牛
                            </a-checkbox>
                          </a-col>
                          <a-col :span="4">
                            <a-checkbox value="猪">
                              猪
                            </a-checkbox>
                          </a-col>
                          <a-col :span="4">
                            <a-checkbox value="羊">
                              羊
                            </a-checkbox>
                          </a-col>
                          <a-col :span="4">
                            <a-checkbox value="鸭">
                              鸭
                            </a-checkbox>
                          </a-col>
                          <a-col :span="4">
                            <a-checkbox value="鹅">
                              鹅
                            </a-checkbox>
                          </a-col>
                        </a-row>
                      </a-checkbox-group>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="年屠宰能力"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhNTZNL', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="驻场官方兽医"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['Fhzcgfsy', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="兽医联系电话"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="[
                          'Fhzcgfsydh',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="质量负责人"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['Fhzlfzr', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="质量负责人电话"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="[
                          'Fhzlfzrdh',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1\d{10}$/, message: '手机号格式错误' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="安全生产负责人"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['Fhaqscfzr', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="安全生产负责人电话"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="[
                          'Fhaqscfzrdh',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="无害化焚烧处理能力(公斤)"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="[
                          'Fhwhhclnl',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
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
                      label="政府定点编码"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhZFDDBM', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="屠宰企业类型"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-select
                        v-decorator="['FhTZLX', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="请输入"
                        @change="handleSelectChange"
                      >
                        <a-select-option value="定点屠宰场">
                          定点屠宰场
                        </a-select-option>
                        <a-select-option value="小型屠宰场">
                          小型屠宰场
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="工商账号"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhGSZCH', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="工商注册日期"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-date-picker v-decorator="['FhZCTime', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="组织机构代码"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhZZJGDM', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="上年度屠宰数量（头/只）"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="[
                          'FhSNDCount',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
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
                      label="注册资本（万元）"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhZCMoney', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="总资产（万元）"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 0 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhZZCMoney', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="社会信用代码"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['Fmd', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="产品主要销往地区"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhCPXS', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="动物防疫条件合格证年审时间"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-date-picker v-decorator="['dwfydate', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="服务卖肉商户数量"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhFWSH', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="待宰服务辖区"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhDZFWXQ', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="企业员工数"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhQYZRS', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="待宰收费金额"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhDZCount', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="品质检验员数量"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhPZJYY', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="屠宰技术员数量"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhTZJSY', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="上年度实现利税（万元）"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhSXLS', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="上年度营业收入（万元）"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FhYYSR', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="环保部门排污许可证"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <!-- <a-input v-decorator="['xkz', { rules: [{ required: true, message: '请输入' }] }]" /> -->
                      <a-upload
                        v-decorator="['Fhpwxkz', { rules: [{ required: true, message: '请上传' }] }]"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture"
                      >
                        <a-button> <a-icon type="upload" /> 上传 </a-button>
                      </a-upload>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="主体类别"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['ztlb', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="畜产品质量安全承诺书"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <!-- <a-input v-decorator="['cls', { rules: [{ required: true, message: '请输入' }] }]" />-->
                      <a-upload
                        v-decorator="['Fhzlaqcns', { rules: [{ required: true, message: '请输入' }] }]"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture"
                      >
                        <a-button> <a-icon type="upload" /> 上传 </a-button>
                      </a-upload>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="经营范围"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['jyfw', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="动物防疫合格证"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-upload
                        v-decorator="['Fhdwfyhgz', { rules: [{ required: true, message: '请输入' }] }]"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture"
                      >
                        <a-button> <a-icon type="upload" /> 上传 </a-button>
                      </a-upload>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="法人代表身份证号"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['frdbsfz', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>

                <!-- ------------------------无害化申报---------------------------------- -->
                <!-- <a-row> -->
                <!-- <a-col :span="10">
                    <a-form-item
                      label="违规违法记录"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                    >
                      <a-textarea placeholder="违规违法记录" :rows="4" v-decorator="['Fhwgwfjl']" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="2">
                    <a-form-item :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }">
                      <a-button type="primary" @click="addjl">
                        添加
                      </a-button>
                    </a-form-item>
                  </a-col> -->
                <!-- <a-col :span="10">
                    <a-form-item
                      label="奖励信息"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                    >
                      <a-textarea placeholder="奖励信息" :rows="4" v-decorator="['Fhwgwfjl']" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="2">
                    <a-form-item :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }">
                      <a-button type="primary" @click="addjl">
                        添加
                      </a-button>
                    </a-form-item>
                  </a-col> -->
                <!-- </a-row> -->
                <!-- <a-table
                  :columns="columns1"
                  :data-source="data1"
                  :pagination="false"
                  style="width:1000px; margin:0 auto;"
                >
                  <a slot="name" slot-scope="text">{{ text }}</a>
                  <template slot="action" slot-scope="text, record">
                    <a slot="action" @click="delet1(record)">删除</a>
                  </template>
                </a-table> -->
                <a-row type="flex" justify="end" style="margin-top: 20px;">
                  <a-col>
                    <a-button type="primary" html-type="submit" style="width: 200px">
                      新增
                    </a-button>
                  </a-col>
                </a-row>
              </a-form>
            </a-modal>

            <!-- --------------------------修改弹窗-------------------------- -->

            <a-modal
              :footer="null"
              :title="'修改'"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1200px"
              :destroyOnClose="true"
            >
              <xqtzqyxyda-update :fatherinfo="fatherinfoItem"></xqtzqyxyda-update>
            </a-modal>
            <a-modal
              :footer="null"
              :title="'查看'"
              :visible="fintinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1200px"
              :destroyOnClose="true"
            >
              <xqtzqyxyda-info :fatherinfo="fatherinfoItem"></xqtzqyxyda-info>
            </a-modal>
            <a-modal
              :footer="null"
              :title="this.f ? '查看' : '修改'"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1200px"
              :destroyOnClose="true"
            >
              <!-- <p>{{ ModalText }}</p> -->
              <!-----------------------------表单元素----------------------------  -->

              <a-form @submit="handleSubmit" :form="form">
                <a-row style="display: none">
                  <a-col :span="12">
                    <a-form-item
                      label="id"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FStId', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="10">
                    <a-form-item
                      label="屠宰企业名称"
                      :labelCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhName', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="2">
                    <a-form-item
                      :disabled="this.f ? 'disabled' : false"
                      :labelCol="{ lg: { span: 0 }, sm: { span: 0 } }"
                      :wrapperCol="{ lg: { span: 24 }, sm: { span: 24 } }"
                    >
                      <a-input
                        disabled
                        :placeholder="!this.f ? '请输入编号' : ''"
                        v-decorator="['FSmemo2', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="邮政编码"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="[
                          'FhYB',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="16">
                    <a-form-item
                      label="地址"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      v-if="this.f"
                    >
                      <a-input :disabled="this.f ? 'disabled' : false" v-model="addressUp"> </a-input>
                    </a-form-item>

                    <!-- 修改时显示 -->
                    <a-form-item
                      label="地址"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                      v-if="!this.f"
                    >
                      <!-- <a-cascader
                        :disabled="this.f ? 'disabled' : false"
                        :options="options"
                        placeholder="所在地"
                        @change="mocheck"
                        :defaultValue="cs"
                      >
                      </a-cascader> -->

                      <a-select style="width: 120px;margin-right: 10px;" @change="ChangeTown" default-value="青岛市">
                        <a-select-option value="青岛市">
                          青岛市
                        </a-select-option>
                      </a-select>
                      <a-select
                        style="width: 120px;margin-right: 10px;"
                        @change="ChangeRegion"
                        v-if="regionTF"
                        :default-value="regName"
                      >
                        <a-select-option value="请选择">
                          请选择
                        </a-select-option>
                        <a-select-option v-for="(item, index) in regInfo" :key="index">
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                      <a-select style="width: 120px;" v-if="peoTF" @change="ChangePeo" :default-value="peoName">
                        <a-select-option value="请选择">
                          请选择
                        </a-select-option>
                        <a-select-option v-for="(item, index) in peoInfo" :key="index">
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="8">
                    <a-form-item
                      :labelCol="{ lg: { span: 0 }, sm: { span: 0 } }"
                      :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }"
                    >
                      <!-- FSxxdz 09-27新加字段，数据库可能需要添加 -->
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-if="!this.f"
                        v-decorator="['FSxxdz', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="详细地址"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="18">
                    <a-form-item
                      label="经纬度:"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 16 }, sm: { span: 17 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        style="width:143.33px"
                        v-decorator="['FLongitude', { rules: [{ required: true, message: '请输入经度' }] }]"
                        name="FLongitude"
                        placeholder="请输入经度"
                      />

                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        style="width:143.33px"
                        v-decorator="['FLatitude', { rules: [{ required: true, message: '请输入纬度' }] }]"
                        name="FLatitude"
                        placeholder="请输入纬度"
                      />
                      <a-button
                        :disabled="this.f ? 'disabled' : false"
                        @click="mapatlas"
                        style="position: absolute; margin: 3px 10px"
                      >
                        选择
                      </a-button>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="法人代表"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhLegal', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="法人联系电话"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="[
                          'FhPhone',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1\d{10}$/, message: '手机号格式错误' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
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
                      label="负责人"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhFZR', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="负责人电话"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="[
                          'FhFZRPhone',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1\d{10}$/, message: '手机号格式错误' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
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
                      label="传真"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhCZ', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="电子邮箱"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhNature', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="开户行"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['Fhkhh', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="银行卡号/一卡通号"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['Fhyhkh', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="企业网址"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhLicense', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="屠宰种类"
                      :labelCol="{ lg: { span: 6 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }"
                    >
                      <a-checkbox-group
                        v-decorator="['FhKind', { initialValue: [] }]"
                        @change="onChangeZL"
                        style="width: 100%;"
                      >
                        <a-row>
                          <a-col :span="4">
                            <a-checkbox :disabled="this.f ? 'disabled' : false" value="鸡">
                              鸡
                            </a-checkbox>
                          </a-col>
                          <a-col :span="4">
                            <a-checkbox :disabled="this.f ? 'disabled' : false" value="牛">
                              牛
                            </a-checkbox>
                          </a-col>
                          <a-col :span="4">
                            <a-checkbox :disabled="this.f ? 'disabled' : false" value="猪">
                              猪
                            </a-checkbox>
                          </a-col>
                          <a-col :span="4">
                            <a-checkbox :disabled="this.f ? 'disabled' : false" value="羊">
                              羊
                            </a-checkbox>
                          </a-col>
                          <a-col :span="4">
                            <a-checkbox :disabled="this.f ? 'disabled' : false" value="鸭">
                              鸭
                            </a-checkbox>
                          </a-col>
                          <a-col :span="4">
                            <a-checkbox :disabled="this.f ? 'disabled' : false" value="鹅">
                              鹅
                            </a-checkbox>
                          </a-col>
                        </a-row>
                      </a-checkbox-group>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="年屠宰能力"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhNTZNL', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="驻场官方兽医"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['Fhzcgfsy', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="兽医联系电话"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="[
                          'Fhzcgfsydh',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="质量负责人"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['Fhzlfzr', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="质量负责人电话"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="[
                          'Fhzlfzrdh',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="安全生产负责人"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['Fhaqscfzr', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="安全生产负责人电话"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="[
                          'Fhaqscfzrdh',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1[3456789]\d{9}$/, message: '手机号格式错误' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="无害化焚烧处理能力（公斤）"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="[
                          'Fhwhhclnl',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
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
                      label="政府定点编码"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhZFDDBM', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="屠宰企业类型"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-select
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhTZLX', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="请输入"
                        @change="handleSelectChange"
                      >
                        <a-select-option value="定点屠宰场">
                          定点屠宰场
                        </a-select-option>
                        <a-select-option value="小型屠宰场">
                          小型屠宰场
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="工商账号"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhGSZCH', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="工商注册日期"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <!-- <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhZCTime', { rules: [{ required: true, message: '请输入' }] }]"
                      /> -->
                      <a-date-picker
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhZCTime', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="组织机构代码"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhZZJGDM', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="上年度屠宰数量（头/只）"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="[
                          'FhSNDCount',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^[0-9]*$/, message: '只能输入数字' }
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
                      label="注册资本（万元）"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhZCMoney', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="总资产（万元）"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 0 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhZZCMoney', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="社会信用代码"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['Fmd', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="产品主要销往地区"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhCPXS', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="动物防疫条件合格证年审时间"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <!-- <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['dwfydate', { rules: [{ required: true, message: '请输入' }] }]"
                      /> -->
                      <a-date-picker
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['dwfydate', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="服务卖肉商户数量"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhFWSH', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="待宰服务辖区"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhDZFWXQ', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="企业员工数"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhQYZRS', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="待宰收费金额"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhDZCount', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="品质检验员数量"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhPZJYY', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="屠宰技术员数量"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhTZJSY', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="上年度实现利税（万元）"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhSXLS', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="上年度营业收入（万元）"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['FhYYSR', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="环保部门排污许可证"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <viewer :images="FhpwxkzP" style="width: 100px;" v-if="FhpwxkzP.length !== 0">
                        <img
                          v-for="(item, index) in FhpwxkzP"
                          :src="item.src"
                          :key="index"
                          style="width:30px; height:30px;"
                        />
                      </viewer>
                      <a-upload
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="[
                          'Fhpwxkz',
                          { rules: [{ required: FhpwxkzP.length ? false : true, message: '请上传' }] }
                        ]"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture"
                        v-if="FhpwxkzP.length === 0 || !this.f"
                        @change="uploadChange($event, 'FhpwxkzP')"
                      >
                        <a-button v-if="FhpwxkzP.length === 0 || !this.f" :disabled="this.f ? 'disabled' : false">
                          <a-icon type="upload" /> 上传
                        </a-button>
                      </a-upload>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="主体类别"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['ztlb', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="畜产品质量安全承诺书"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <viewer :images="FhclsP" style="width: 100px;" v-if="FhclsP.length !== 0">
                        <img
                          v-for="(item, index) in FhclsP"
                          :src="item.src"
                          :key="index"
                          style="width:30px; height:30px;"
                        />
                      </viewer>
                      <a-upload
                        v-decorator="[
                          'Fhzlaqcns',
                          { rules: [{ required: FhclsP.length ? false : true, message: '请上传' }] }
                        ]"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture"
                        :disabled="this.f ? 'disabled' : false"
                        v-if="FhclsP.length === 0 || !this.f"
                        @change="uploadChange($event, 'FhclsP')"
                      >
                        <a-button v-if="FhclsP.length === 0 || !this.f" :disabled="this.f ? 'disabled' : false">
                          <a-icon type="upload" /> 上传
                        </a-button>
                      </a-upload>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="经营范围"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['jyfw', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="动物防疫合格证"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <viewer :images="FhhgzP" style="width: 100px;" v-if="FhhgzP.length !== 0">
                        <img
                          v-for="(item, index) in FhhgzP"
                          :src="item.src"
                          :key="index"
                          style="width:30px; height:30px;"
                        />
                      </viewer>
                      <a-upload
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="[
                          'Fhdwfyhgz',
                          { rules: [{ required: FhhgzP.length ? false : true, message: '请上传' }] }
                        ]"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture"
                        v-if="FhhgzP.length === 0 || !this.f"
                        @change="uploadChange($event, 'FhhgzP')"
                      >
                        <a-button v-if="FhhgzP.length === 0 || !this.f" :disabled="this.f ? 'disabled' : false">
                          <a-icon type="upload" /> 上传
                        </a-button>
                      </a-upload>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="法人代表身份证号"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? 'disabled' : false"
                        v-decorator="['frdbsfz', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>

                <!-- ------------------------无害化申报---------------------------------- -->
                <!-- <a-row>
                  <a-col :span="10">
                    <a-form-item
                      label="违规违法记录"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                    >
                      <a-textarea
                        :disabled="this.f ? 'disabled' : false"
                        placeholder="违规违法记录"
                        :rows="4"
                        v-decorator="['Fhwgwfjl']"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }">
                      <a-button :disabled="this.f ? 'disabled' : false" type="primary" @click="addjl">
                        添加
                      </a-button>
                    </a-form-item>
                  </a-col>
                </a-row> -->
                <!-- <a-table
                  :columns="columns1"
                  :data-source="data1"
                  :pagination="false"
                  style="width:1000px; margin:0 auto;"
                >
                  <a slot="name" slot-scope="text">{{ text }}</a>
                  <template slot="action" slot-scope="text, record">
                    <a slot="action" :disabled="this.f ? 'disabled' : false" @click="delet1(record)">删除</a>
                  </template>
                </a-table> -->
                <a-row type="flex" justify="end" style="margin-top: 20px;">
                  <a-col>
                    <a-button v-if="!f" type="primary" html-type="submit" style="width: 150px; height: 40px;">
                      保存
                    </a-button>
                  </a-col>
                </a-row>
              </a-form>
            </a-modal>

            <!-- --------------------------删除弹窗----------------------------- -->

            <a-modal
              cancelText="取消"
              okText="确认"
              title="删除"
              :visible="deletinfo"
              :confirm-loading="confirmLoading"
              @ok="DeleteAll"
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
            <!-- ----------------------弹窗中的删除弹窗-------------------------------- -->
            <a-modal
              title="删除"
              :visible="deletinfo1"
              :confirm-loading="confirmLoading"
              @ok="DeleteAll"
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
            <!-- --------------------------地图弹窗 --------------------------------------->
            <a-modal
              title="地图"
              :visible="mapShow"
              @ok="handleOkmap"
              @cancel="handleCancelmap"
              width="800px "
              :zIndex="10000"
            >
              <!-- <p>{{ ModalTextmap }}</p> -->
              <!-- --------------------地图位置 -->
              <baidu-map
                class="map"
                @ready="handler"
                style="height: 500px;"
                :center="center"
                :zoom="13"
                :map-click="false"
                @click="maplist"
              >
                <div>
                  <!-- 自定义地图标点   :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}" -->
                  <bm-marker :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :position="center" @dragend="dragend">
                  </bm-marker>
                </div>
              </baidu-map>
              <a-form @submit="handleSubmit" :form="form">
                <a-form-item
                  label="经纬度:"
                  :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
                >
                  <a-input
                    style="width:143.33px"
                    v-decorator="['FLongitude', { rules: [{ required: true, message: '请输入经度' }] }]"
                    name="FLongitude"
                    placeholder="请输入经度"
                  />

                  <a-input
                    style="width:143.33px"
                    v-decorator="['FLatitude', { rules: [{ required: true, message: '请输入纬度' }] }]"
                    name="FLatitude"
                    placeholder="请输入纬度"
                  />
                  <a-button @click="handleReset" style="position: absolute; margin: 3px 10px">
                    重置
                  </a-button>
                </a-form-item>
              </a-form>
            </a-modal>
            <!-- 启用或禁用 -->
            <a-modal
              :title="this.FSztItem ? '启用' : '禁用'"
              :visible="FSztItemTF"
              :confirm-loading="confirmLoading"
              @ok="GetTZCOFFShow"
              @cancel="handleCancel"
              width="400px"
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
                    是否{{ this.FSztItem ? '启用' : '禁用' }}
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>

            <!-- --------------------------操作按钮--------------------------------------- -->
            <a-button
              v-permission="{ active: 'sladele' }"
              type="primary"
              style="height:40px"
              @click="delet()"
            >批量删除</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;

            <!-- --------------------------地点位置------------------------------------- -->
            <!-- <a-cascader
              style="margin-top: -1px ;width: 250px;float:right;"
              :options="options"
              placeholder="所在地"
              size="large"
              @change="onChange"
            >
              <a-icon
                slot="suffixIcon"
                type="environment"
                class="test"
                :style="{ fontSize: '26px', 'margin-top': '-11px', 'margin-right': '8px' }"
              />
            </a-cascader> -->
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
          <!-- ----------------------------表格内容------------------------------------- -->
          <a-table
            :pagination="false"
            :columns="columns"
            :data-source="data"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
          >
            <template slot="action" slot-scope="text, record">
              <a slot="action" v-permission="{ active: 'slasele' }" @click="find(record)">查看&nbsp;&nbsp;</a>
              <a slot="action" v-permission="{ active: 'slaupd' }" @click="update(record)">修改&nbsp;&nbsp;</a>
              <a
                slot="action"
                v-permission="{ active: 'slaupd' }"
                @click="GetTZCOFFItem(record)"
              >启用或禁用&nbsp;&nbsp;</a
              >

              <!-- <a slot="action" @click="delet(record)">删除</a> -->
            </template>
          </a-table>

          <!-- ----------------------------分页-------------------------------------------- -->
          <div>
            <a-pagination
              show-quick-jumper
              :default-current="offset"
              :total="total"
              show-less-items
              :current="offset"
              @change="onChanges"
              style="margin: 10px"
            />
            <span
              style="float: right;font-size:15px; margin-top:-3%;margin-right:5%"
            >当前第 {{ this.offset }}/{{ Math.ceil(this.total / 10) }} 页 共 {{ this.total }} 条记录 每页 10 条</span
            >
          </div>
        </div>
      </div>
    </page-header-wrapper>
  </div>
</template>
<script>
import { findAll, AddInfo, UpdateInfo, FindById, GetTZCOFF } from '@/api/tzc'
import http from '@/utils/httpapi'
// import QS from 'qs'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import replaceAddress from '@/utils/replaceAddress'
import xqtzqyxydaAdd from '@/views/jcsj/tzc/xqtzqyxydaAdd'
import xqtzqyxydaUpdate from '@/views/jcsj/tzc/xqtzqyxydaUpdate'
import xqtzqyxydaInfo from '@/views/jcsj/tzc/xqtzqyxydaInfo'
var yenum = 1
const columns = [
  {
    title: '序号',
    width: 80,
    align: 'center',
    dataIndex: 'FStId',
    key: 'FStId',
    customRender: (t, r, index) => {
      if (yenum === 1) {
        return parseInt(index) + 1
      } else {
        return parseInt(index) + parseInt(yenum - 1) * 10 + 1
      }
    }
  },
  { title: '屠宰企业', width: 250, align: 'center', dataIndex: 'FhName', key: 'FhName' },
  { title: '编号', width: 150, align: 'center', dataIndex: 'FSmemo2', key: 'FSmemo2' },
  {
    title: '地址',
    width: 250,
    align: 'center',
    dataIndex: 'FhAdressA',
    key: 'FhAdressA',
    customRender: (t, r, index) => {
      return t ? t.split('/').join('') : ''
    }
  },
  { title: '法人代表', width: 150, align: 'center', dataIndex: 'FhLegal', key: 'FhLegal' },
  { title: '法人联系电话', width: 150, align: 'center', dataIndex: 'FhPhone', key: 'FhPhone' },
  { title: '负责人', width: 150, align: 'center', dataIndex: 'FhFZR', key: 'FhFZR' },
  { title: '负责人手机', width: 150, align: 'center', dataIndex: 'FhFZRPhone', key: 'FhFZRPhone' },
  { title: '传真', width: 150, align: 'center', dataIndex: 'FhCZ', key: 'FhCZ' },
  { title: '屠宰种类', width: 150, align: 'center', dataIndex: 'FhKind', key: 'FhKind' },
  { title: '开户行', width: 200, align: 'center', dataIndex: 'Fhkhh', key: 'Fhkhh' },
  { title: '银行卡号/一卡通号', width: 200, align: 'center', dataIndex: 'Fhyhkh', key: 'Fhyhkh' },
  { title: '年屠宰能力', width: 200, align: 'center', dataIndex: 'FhNTZNL', key: 'FhNTZNL' },
  { title: '政府定点编码', width: 150, align: 'center', dataIndex: 'FhZFDDBM', key: 'FhZFDDBM' },
  {
    title: '屠宰企业类型',
    width: 150,
    align: 'center',
    dataIndex: 'FhTZLX',
    key: 'FhTZLX',
    customRender: (t, r, index) => {
      if (t === '1111') {
        return '小型屠宰场'
      } else {
        return t
      }
    }
  },
  { title: '工商注册号', width: 200, align: 'center', dataIndex: 'FhGSZCH', key: 'FhGSZCH' },
  { title: '组织机构代码', width: 200, align: 'center', dataIndex: 'FhZZJGDM', key: 'FhZZJGDM' },
  { title: '经营状态', width: 150, align: 'center', dataIndex: 'UnitCloseStatus', key: 'UnitCloseStatus' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 250,
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
// 表中表
const columns1 = [
  { title: '时间', width: 200, dataIndex: 'time', key: 'time' },
  { title: '记录', width: 200, dataIndex: 'jl', key: 'jl' },
  { title: '操作', width: 100, dataIndex: 'cz', key: 'cz', scopedSlots: { customRender: 'action' } }
]
const data1 = []

export default {
  inject: ['reload'],
  name: 'BaseForm',
  components: {
    xqtzqyxydaAdd,
    xqtzqyxydaUpdate,
    xqtzqyxydaInfo
  },
  data () {
    return {
      // 地图显示隐藏
      mapShow: false,
      // ModalTextmap: '请不要输入错误噢~',
      confirmLoadingmap: true,
      center: { FLongitude: '120.39629', FLatitude: '36.30744' },
      addr: '',
      options: [
        {
          value: '青岛',
          label: '青岛',
          children: [
            {
              value: '崂山',
              label: '崂山',
              children: [
                {
                  value: '动监站',
                  label: '动监站'
                }
              ]
            }
          ]
        }
      ],
      value: 1,
      hasSelected: 'true',

      // from 表单
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),

      // 点击 新增弹出框
      // // ModalText: '请不要输入错误噢~',
      visible: false,
      fintinfo: false,
      updateinfo: false,
      deletinfo: false,
      deletinfo1: false,
      confirmLoading: false,
      f: true,
      data,
      columns,
      data1,
      columns1,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      loading: false,
      number: 0,
      // 每页条数
      limit: 10,
      // 当前页
      offset: 1,
      // 总条数
      total: 0,
      // 所在地
      site: '',
      formData: '',
      ZL: '',
      JL: '',
      idList: '',
      cs: ['1', '1713', '1895'],
      FSunitUstrId: sessionStorage.getItem('FSunitUstrId'),
      UserId: sessionStorage.getItem('FStId'),
      photoTop: 'data:image/jpg;base64,',
      FhpwxkzP: [], // 环保排污许可证
      FhclsP: [], // 畜产品质量安全承诺书
      FhhgzP: [], // 动物防疫合格证
      FhName: '',
      // 区，动监站选择
      regionTF: true,
      regInfo: [],
      peoTF: false,
      peoInfo: [],
      // 区名称
      regName: '请选择',
      // 动监站名称
      peoName: '请选择',
      // 查看时地址回显
      addressUp: '',
      FSztInfo: '运营',
      tzcoffTF: false,
      FSztItem: false,
      FSztItemTF: false,
      FStIdTF: '',
      fatherinfoItem: {}
    }
  },
  created () {
    yenum = 1
    getAdminAddress()
      .then(res => {
        // this.options = JSON.parse(res)
        this.options = res
        this.regInfo = res[0].children
      })
      .catch(err => {
        console.log(err)
      })
    var that = this
    var p = {
      limit: that.limit,
      offset: that.offset,
      FhName: this.FhName,
      FSunitUstrId: this.FSunitUstrId,
      UserId: this.UserId,
      FSzt: this.FSztInfo
    }
    findAll(p).then(res => {
      console.log(JSON.parse(res.Data))
      that.data = JSON.parse(res.Data).rows
      that.total = JSON.parse(res.Data).total
    })
  },
  // mounted () {
  //    this.setFarmType()
  // },
  methods: {
    selectShow (v) {
      console.log(v)

      this.FSztInfo = v

      var that = this
      var p = {
        limit: that.limit,
        offset: that.offset,
        FhName: this.FhName,
        FSunitUstrId: this.FSunitUstrId,
        UserId: this.UserId,
        FSzt: this.FSztInfo
      }
      findAll(p).then(res => {
        console.log(JSON.parse(res.Data))
        that.data = JSON.parse(res.Data).rows
        that.total = JSON.parse(res.Data).total
      })
    },
    // 市级选择触发
    ChangeTown (val) {
      console.log(val)
    },
    ChangeRegion (val) {
      console.log(val)
      if (val === '请选择') {
        this.peoTF = false
      } else {
        this.peoTF = false
        setTimeout(() => {
          this.peoTF = true
          this.regName = this.regInfo[val].label
          this.peoName = '请选择'
          this.peoInfo = this.regInfo[val].children
        }, 0)
      }
    },
    ChangePeo (val) {
      if (val === '请选择') {
        this.peoName = '请选择'
      } else {
        this.peoTF = true
        this.peoName = this.peoInfo[val].label

        console.log(this.regName, this.peoName)
      }
    },

    // 修改上传图片时
    uploadChange (info, text) {
      for (let i = 0; i < info.fileList.length; i++) {
        info.fileList[i].response = '上传成功'
      }
      if (info.file.status === 'error') {
      } else if (info.file.status === 'done') {
        if (text === 'FhpwxkzP') {
          this.FhpwxkzP = []
        } else if (text === 'FhclsP') {
          this.FhclsP = []
        } else if (text === 'FhhgzP') {
          this.FhhgzP = []
        }
      }
    },
    // 模糊查询
    mocheck (checkedValues, e) {
      console.log(checkedValues, e, this.queryParam.id)
      if (!checkedValues.length && this.queryParam.id === '') {
        this.reload()
      }
      if (!e) {
        if (!this.queryParam.id) this.reload()
        this.FhName = this.queryParam.id
      } else if (e.length) {
        this.options.forEach(item => {
          if (item.label === e[0]) {
            this.FSunitUstrId = item.key
          } else {
            item.children.forEach(itemCh => {
              if (itemCh.label === e[0]) {
                this.FSunitUstrId = itemCh.key
              } else {
                itemCh.children.forEach(itemS => {
                  if (itemS.label === e[0]) {
                    this.FSunitUstrId = itemS.key
                  }
                })
              }
            })
          }
        })
        // for (var i = 0; i < e.length; i++) {
        //   this.FSunitUstrId = e[e.length - 1].key
        // }
      }
      yenum = 1
      this.limit = 10
      this.offset = 1
      var that = this
      var p = {
        limit: that.limit,
        offset: that.offset,
        FhName: this.FhName,
        FSunitUstrId: this.FSunitUstrId,
        UserId: this.UserId,
        FSzt: this.FSztInfo
      }
      findAll(p).then(res => {
        console.log(JSON.parse(res.Data))
        that.data = JSON.parse(res.Data).rows
        that.total = JSON.parse(res.Data).total
      })
    },
    addjl () {
      var time = new Date()
      var time1 = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
      var data = {
        time: time1,
        jl: this.form.getFieldValue('Fhwgwfjl')
      }
      this.data1.push(data)
      this.JL = this.form.getFieldValue('Fhwgwfjl')
      this.form.resetFields('Fhwgwfjl')
    },
    // 启用或禁用
    GetTZCOFFItem (v) {
      console.log(v)
      this.FSztItemTF = true
      if (v.UnitCloseStatus === '运营') {
        this.FSztItem = false
      } else {
        this.FSztItem = true
      }
      this.FStIdTF = v.FStId
    },
    GetTZCOFFShow () {
      GetTZCOFF(this.FStIdTF, this.UserId).then(res => {
        if (res.Result) {
          if (this.FSztItem) {
            this.$notification.success({
              message: '启用成功'
            })
          } else {
            this.$notification.success({
              message: '禁用成功'
            })
          }
          this.FSztItemTF = false
          this.reload()
        }
      })
    },

    handleReset () {
      this.form.resetFields()
    },
    handler: function ({ BMap, map }) {
      map.enableScrollWheelZoom(true)
      map.centerAndZoom('青岛市', 13)
      // const hide = this.$message.loading('正在获取当前省市请稍候..', 0)
      const _this = this
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(
        function (r) {
          // setTimeout(hide, 10)
          console.log(r)
          _this.center = { FLongitude: '120.39629', FLatitude: '36.30744' } // 设置center属性值
          // _this.autoLocationPoint = { lng: r.longitude, lat: r.latitude }        // 自定义覆盖物
          _this.initLocation = true
        },
        { enableHighAccuracy: true }
      )

      // 获取地理位置

      window.map = map
      // 赋值，方便调用，本节被用到
      this.BMap = BMap
      this.map = map
    },
    // 拖动结束后
    dragend (e) {
      console.log(e.point)
      console.log(e)
      const gc = new this.BMap.Geocoder()
      gc.getLocation(e.point, function (rs) {
        this.form.setFieldsValue({
          addr: rs.address,

          FLongitude: rs.point.lng,
          FLatitude: rs.point.lat
        })
      })
    },
    maplist (e) {
      console.log(e.point.lng + ',' + e.point.lat)
      this.center.FLongitude = e.point.lng
      this.center.FLatitude = e.point.lat

      this.form.setFieldsValue({
        FLongitude: e.point.lng,
        FLatitude: e.point.lat
      })
    },
    // 地图弹窗
    mapatlas (mapName) {
      this.mapShow = true
    },
    normFile (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    // 批量删除
    DeleteAll () {
      this.$axios({
        method: 'post',
        url: http + '/HarmlessProcess/DelHAS?FStId=' + this.idList
      }).then(res => {
        setTimeout(() => {
          this.$notification.success({
            message: '删除成功'
          })
        }, 100)
        this.reload()
      })
    },
    // data 表格删除
    delet (v) {
      if (!this.idList.length > 0) {
        this.$notification.error({
          message: '请选择一条数据'
        })
      } else {
        console.log('删除')
        this.deletinfo = true
      }
    },
    // data1 表格删除
    delet1 (v) {
      console.log('删除')
      console.log(v.time)
      this.deletinfo1 = true
      this.number = v.time
      console.log(this.number)
    },
    find (v) {
      // this.update(v)
      this.f = true
      this.fintinfo = true
      this.fatherinfoItem = {
              FStId: v.FStId
            }
    },
    // 修改
    update (v) {
      console.log(v)
      this.f = false
      console.log('修改')
      this.formData = 'update'
      this.cs = ['1', '1712', '2263', '2311']
      var addressAdmin = ''
      // 给对应的表单元素赋值
      FindById(v.FStId).then(res => {
        var Clres = JSON.parse(res.Data)[0]
        this.FhpwxkzP = [{ src: this.photoTop + Clres.Fhpwxkz }]
        this.FhclsP = [{ src: this.photoTop + Clres.Fhzlaqcns }]
        this.FhhgzP = [{ src: this.photoTop + Clres.Fhdwfyhgz }]
        console.log(JSON.parse(res.Data))
        addressAdmin = Clres.FhAdressA
        this.Zl = Clres.FhKind ? Clres.FhKind.split(',') : []
        console.log(addressAdmin)
        var Claddress = replaceAddress(addressAdmin.replace(/\//g, ''), this.options) || []
        if (Claddress && Claddress.length) {
          if (Claddress.length === 1) {
            this.fatherinfoItem = {
              FStId: v.FStId
            }
            this.updateinfo = true

            this.regInfo = this.options[0].children
            this.peoTF = false
            this.peoName = '请选择'
            this.regName = '请选择'
          } else if (Claddress.length === 2) {
            this.fatherinfoItem = {
              FStId: v.FStId
            }
            this.updateinfo = true

            this.regInfo = this.options[0].children
            this.peoTF = true
            this.peoName = '请选择'
            this.regName = Claddress[1]
            if (this.regInfo) {
              this.regInfo.forEach(item => {
                if (item.label === this.regName) {
                  this.peoInfo = item.children
                }
              })
            }
          } else if (Claddress.length === 3) {
            this.fatherinfoItem = {
              FStId: v.FStId
            }
            this.updateinfo = true

            this.regInfo = this.options[0].children
            this.peoTF = true
            this.regName = Claddress[1]
            this.peoName = Claddress[2]
            if (this.regInfo) {
              this.regInfo.forEach(item => {
                if (item.label === this.regName) {
                  this.peoInfo = item.children
                }
              })
            }
          }
        }

        this.$nextTick(() => {
          this.addressUp = (Clres.FhAdressA + Clres.FhAdressB).replace(/\//g, '')
          this.form.setFieldsValue({
            FStId: v.FStId,
            FhName: Clres.FhName,
            FSmemo2: Clres.FSmemo2,
            FhYB: Clres.FhYB,
            FhPhone: Clres.FhPhone,
            FLongitude: Clres.FLongitude,
            FLatitude: Clres.FLatitude,
            FhFZRPhone: Clres.FhFZRPhone,
            FhLegal: Clres.FhLegal,
            FhFZR: Clres.FhFZR,
            FhCZ: Clres.FhCZ,
            Fhkhh: Clres.Fhkhh,
            Fhyhkh: Clres.Fhyhkh,
            FhNature: Clres.FhNature,
            FhLicense: Clres.FhLicense,
            FhKind: Clres.FhKind,
            FhNTZNL: Clres.FhNTZNL,
            Fhzcgfsy: Clres.Fhzcgfsy,
            Fhzcgfsydh: Clres.Fhzcgfsydh,
            Fhzlfzr: Clres.Fhzlfzr,
            Fhzlfzrdh: Clres.Fhzlfzrdh,
            Fhaqscfzr: Clres.Fhaqscfzr,
            Fhaqscfzrdh: Clres.Fhaqscfzrdh,
            FhTZLX: Clres.FhTZLX,
            FhZFDDBM: Clres.FhZFDDBM,
            FhGSZCH: Clres.FhGSZCH,
            FhZCTime: Clres.FhZCTime,
            Fhwhhclnl: parseInt(Clres.Fhwhhclnl),
            FhZZJGDM: Clres.FhZZJGDM,
            FhSNDCount: parseInt(Clres.FhSNDCount),
            FhZCMoney: Clres.FhZCMoney,
            FhZZCMoney: Clres.FhZZCMoney,
            Fmd: Clres.Fmd,
            FhCPXS: Clres.FhCPXS,
            FhDZFWXQ: Clres.FhDZFWXQ,
            dwfydate: Clres.dwfydate,
            FhDZCount: Clres.FhDZCount,
            FhTZJSY: Clres.FhTZJSY,
            FhYYSR: Clres.FhYYSR,
            ztlb: Clres.ztlb,
            jyfw: Clres.jyfw,
            frdbsfz: Clres.frdbsfz,
            FhFWSH: Clres.FhFWSH,
            FhQYZRS: Clres.FhQYZRS,
            FhPZJYY: Clres.FhPZJYY,
            FhSXLS: Clres.FhSXLS,
            Fhwgwfjl: Clres.Fhwgwfjl,
            FSxxdz: Clres.FhAdressB
          })
        })
      })
    },

    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
      console.log(this.value)
    },
    aa (checkedValues) {
      console.log('checked = ', checkedValues)
      console.log(this.value)
    },
    onChangeZL (checkedValues) {
      console.log('checked = ', checkedValues)
      // if (checkedValues.length > 0) {
      // checkedValues.forEach(item => {
      //   this.Zl ? (this.Zl = this.Zl + ',' + item) : (this.Zl = item)
      // })
      // }
      this.Zl = checkedValues
    },
    onChanges (checkedValues) {
      this.selectedRowKeys = []
      console.log('checked = ', checkedValues)
      yenum = checkedValues
      var that = this
      that.offset = checkedValues

      var p = {
        limit: that.limit,
        offset: that.offset,
        FhName: this.FhName,
        FSunitUstrId: this.FSunitUstrId,
        UserId: this.UserId,
        FSzt: this.FSztInfo
      }
      findAll(p).then(res => {
        that.data = JSON.parse(res.Data).rows
        that.total = JSON.parse(res.Data).total
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      var arr = ''
      selectedRows.forEach(item => {
        arr = arr + ',' + item.FStId
      })
      this.idList = arr.substring(1)
      console.log(this.idList)
    },

    // 新增弹窗
    showModal (formName) {
      this.visible = true
      this.formData = 'add'
    },
    // 公用关闭按钮方法
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.updateinfo = false
        this.deletinfo = false
        this.confirmLoading = false

        this.form.resetFields()
      }, 100)
    },
    // data 表格删除关闭按钮方法
    handleOk1 () {
      // this.ModalText = '弹窗在两秒后关闭'
      // this.confirmLoading = true
      // setTimeout(() => {
      //   this.data = this.data.filter(item => parseInt(item.FStId) !== this.number)
      //   var p = {
      //     FStId: this.number
      //   }
      //   this.$axios({
      //     method: 'post',
      //     url: http + '/HarmlessProcess/DelHAS?FStId=' + p.FStId
      //   }).then(res => {
      //     setTimeout(() => {
      //       this.$notification.success({
      //         message: '删除成功'
      //       })
      //     }, 100)
      //     this.reload()
      //   })
      //   this.deletinfo = false
      //   this.confirmLoading = false
      // }, 1000)
    },
    // data1 表格删除关闭按钮方法
    handleOk2 () {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.data1 = this.data1.filter(item => item.time !== this.number)
        this.deletinfo1 = false
        this.confirmLoading = false
      }, 1000)
    },
    // 公用取消按钮方法
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.deletinfo = false
      this.updateinfo = false
      this.fintinfo = false
      this.peoName = '请选择'
      this.regName = '请选择'
      this.peoTF = false
      this.FSztItemTF = false
      this.Zl = []
      this.form.resetFields()
    },
    // 地图关闭按钮方法
    handleOkmap (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoadingmap = true
      setTimeout(() => {
        this.mapShow = false
        this.confirmLoadingmap = false
      }, 100)

      this.form.setFieldsValue({
        FLongitude: this.center.FLongitude,
        FLatitude: this.center.FLatitude
      })
    },
    // 地图 取消按钮方法
    handleCancelmap (e) {
      console.log('点击了取消')
      this.mapShow = false
    },

    //  from表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        // var fileFSsfykt = ''
        console.log(err)
        console.log(values)
        if (!err) {
          var getRes = this.form.getFieldValue('FSxxdz')

          console.log(getRes)
          var addressAdmin = ''
          console.log(addressAdmin)
          if (this.regName === '请选择') {
            addressAdmin = '青岛市'
          } else if (this.peoName === '请选择') {
            addressAdmin = '青岛市' + this.regName
          } else {
            addressAdmin = '青岛市' + this.regName + this.peoName
          }
          if (values.Fhpwxkz) {
            values.Fhpwxkz = values.Fhpwxkz.file.thumbUrl.split(',')[1]
          }
          if (values.Fhzlaqcns) {
            values.Fhzlaqcns = values.Fhzlaqcns.file.thumbUrl.split(',')[1]
          }
          if (values.Fhdwfyhgz) {
            values.Fhdwfyhgz = values.Fhdwfyhgz.file.thumbUrl.split(',')[1]
          }
          var that = this
          if (that.formData === 'add') {
            var data = {
              FhName: values.FhName,
              // FSmemo2: values.FSmemo2,
              FhYB: values.FhYB,
              FhPhone: values.FhPhone,
              FLongitude: values.FLongitude,
              FLatitude: values.FLatitude,
              FhFZRPhone: values.FhFZRPhone,
              FhLegal: values.FhLegal,
              FhFZR: values.FhFZR,
              FhCZ: values.FhCZ,
              FhNature: values.FhNature,
              FhLicense: values.FhLicense,
              FhKind: this.Zl.join(','),
              FhNTZNL: values.FhNTZNL,
              Fhzcgfsy: values.Fhzcgfsy,
              Fhzcgfsydh: values.Fhzcgfsydh,
              Fhzlfzr: values.Fhzlfzr,
              Fhzlfzrdh: values.Fhzlfzrdh,
              Fhaqscfzr: values.Fhaqscfzr,
              Fhaqscfzrdh: values.Fhaqscfzrdh,
              FhTZLX: values.FhTZLX,
              FhZFDDBM: values.FhZFDDBM,
              FhGSZCH: values.FhGSZCH,
              FhZCTime: values.FhZCTime,
              Fhwhhclnl: values.Fhwhhclnl,
              FhZZJGDM: values.FhZZJGDM,
              FhSNDCount: values.FhSNDCount,
              FhZCMoney: values.FhZCMoney,
              FhZZCMoney: values.FhZZCMoney,
              Fmd: values.Fmd,
              FhCPXS: values.FhCPXS,
              FhDZFWXQ: values.FhDZFWXQ,
              dwfydate: values.dwfydate,
              FhDZCount: values.FhDZCount,
              FhTZJSY: values.FhTZJSY,
              FhYYSR: values.FhYYSR,
              ztlb: values.ztlb,
              jyfw: values.jyfw,
              frdbsfz: values.frdbsfz,
              FhFWSH: values.FhFWSH,
              FhQYZRS: values.FhQYZRS,
              FhPZJYY: values.FhPZJYY,
              FhSXLS: values.FhSXLS,
              Fhwgwfjl: this.JL,
              FhAdressA: addressAdmin,
              FhAdressB: getRes || '',
              Fhpwxkz: values.Fhpwxkz,
              Fhzlaqcns: values.Fhzlaqcns,
              Fhdwfyhgz: values.Fhdwfyhgz,
              Fhkhh: values.Fhkhh,
              Fhyhkh: values.Fhyhkh,
              Fhhjmc: '',
              Fhhjdate: ''
            }
            AddInfo(data, this.UserId).then(res => {
              console.log(res)
              if (res.Msg === '已存在该手机号,请重新输入') {
                this.$notification.error({
                  message: '已存在该手机号,请重新输入'
                })
              } else {
                setTimeout(() => {
                  this.$notification.success({
                    message: '新增成功'
                  })
                }, 100)
                this.Zl = []
                this.offset = 1
                this.visible = false
                this.reload()
              }
            })
          } else if (that.formData === 'update') {
            console.log(values.FStId)
            console.log(values)
            if (!values.Fhpwxkz) {
              values.Fhpwxkz = this.FhpwxkzP[0].src.split(',')[1]
            }
            if (!values.Fhzlaqcns) {
              values.Fhzlaqcns = this.FhclsP[0].src.split(',')[1]
            }
            if (!values.Fhdwfyhgz) {
              values.Fhdwfyhgz = this.FhhgzP[0].src.split(',')[1]
            }
            var p = {
              FStId: values.FStId,
              FhName: values.FhName,
              // FSmemo2: values.FSmemo2,
              FhYB: values.FhYB,
              FhPhone: values.FhPhone,
              FLongitude: values.FLongitude,
              FLatitude: values.FLatitude,
              FhFZRPhone: values.FhFZRPhone,
              FhLegal: values.FhLegal,
              FhFZR: values.FhFZR,
              FhCZ: values.FhCZ,
              Fhkhh: values.Fhkhh,
              Fhyhkh: values.Fhyhkh,
              FhAdressA: addressAdmin,
              FhAdressB: getRes || '',
              FhNature: values.FhNature,
              FhLicense: values.FhLicense,
              FhKind: this.Zl.join(','),
              FhNTZNL: values.FhNTZNL,
              Fhzcgfsy: values.Fhzcgfsy,
              Fhzcgfsydh: values.Fhzcgfsydh,
              Fhzlfzr: values.Fhzlfzr,
              Fhzlfzrdh: values.Fhzlfzrdh,
              Fhaqscfzr: values.Fhaqscfzr,
              Fhaqscfzrdh: values.Fhaqscfzrdh,
              FhTZLX: values.FhTZLX,
              FhZFDDBM: values.FhZFDDBM,
              FhGSZCH: values.FhGSZCH,
              FhZCTime: values.FhZCTime,
              Fhwhhclnl: values.Fhwhhclnl,
              FhZZJGDM: values.FhZZJGDM,
              FhSNDCount: values.FhSNDCount,
              FhZCMoney: values.FhZCMoney,
              FhZZCMoney: values.FhZZCMoney,
              Fmd: values.Fmd,
              FhCPXS: values.FhCPXS,
              FhDZFWXQ: values.FhDZFWXQ,
              dwfydate: values.dwfydate,
              FhDZCount: values.FhDZCount,
              FhTZJSY: values.FhTZJSY,
              FhYYSR: values.FhYYSR,
              ztlb: values.ztlb,
              jyfw: values.jyfw,
              frdbsfz: values.frdbsfz,
              FhFWSH: values.FhFWSH,
              FhQYZRS: values.FhQYZRS,
              FhPZJYY: values.FhPZJYY,
              FhSXLS: values.FhSXLS,
              Fhwgwfjl: this.JL,
              Fhpwxkz: values.Fhpwxkz,
              Fhzlaqcns: values.Fhzlaqcns,
              Fhdwfyhgz: values.Fhdwfyhgz
            }
            console.log(p)
            UpdateInfo(p).then(res => {
              setTimeout(() => {
                this.$notification.success({
                  message: '修改成功'
                })
              }, 100)
              that.form.resetFields()
              this.Zl = []
              this.offset = 1
              this.visible = false
              this.reload()
            })
          }

          console.log('Received values of form: ', values)
        }
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
.all {
  border-top: 1px solid black;
  font-size: 30px;
  margin-top: 20px;
}
.btn[data-v-5446e98c] {
  width: 129% !important;
}
.div {
  background-color: white;
  height: 80px;
}
.div1 {
  background-color: white;
  margin: 20px;
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
.map {
  z-index: 1000;
}
>>> .ant-upload-list-picture .ant-upload-list-item-error,
.ant-upload-list-picture-card .ant-upload-list-item-error {
  border-color: #d9d9d9 !important;
}
>>> .ant-upload-list-item-error .ant-upload-list-item-card-actions .anticon {
  color: #d9d9d9;
}
>>> .ant-upload-list-item-name {
  color: #d9d9d9;
}
</style>
