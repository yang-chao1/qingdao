<template>
  <div>
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
            <a-input v-decorator="['FhName', { rules: [{ required: true, message: '请输入' }] }]" />
          </a-form-item>
        </a-col>
        <a-col :span="2">
          <a-form-item
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
          <!-- 修改时显示 -->
          <a-form-item
            label="地址"
            :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
            :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
          >
            <a-select style="width: 120px;margin-right: 10px;" @change="ChangeTown" default-value="青岛市">
              <a-select-option value="青岛市">
                青岛市
              </a-select-option>
            </a-select>
            <a-select style="width: 120px;margin-right: 10px;" @change="ChangeRegion" :default-value="regName">
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
            :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }"
          >
            <!-- FSxxdz 09-27新加字段，数据库可能需要添加 -->
            <a-input
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
            <a-checkbox-group v-decorator="['FhKind', { initialValue: [] }]" @change="onChangeZL" style="width: 100%;">
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
            label="无害化焚烧处理能力（公斤）"
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
            <!-- <a-input

                        v-decorator="['FhZCTime', { rules: [{ required: true, message: '请输入' }] }]"
                      /> -->
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
            <!-- <a-input

                        v-decorator="['dwfydate', { rules: [{ required: true, message: '请输入' }] }]"
                      /> -->
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
            <viewer :images="FhpwxkzP" style="width: 100px;" v-if="FhpwxkzP.length !== 0">
              <img v-for="(item, index) in FhpwxkzP" :src="item.src" :key="index" style="width:30px; height:30px;" />
            </viewer>
            <a-upload
              v-decorator="['Fhpwxkz', { rules: [{ required: FhpwxkzP.length ? false : true, message: '请上传' }] }]"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture"
              v-if="FhpwxkzP.length === 0 || !this.f"
              @change="uploadChange($event, 'FhpwxkzP')"
            >
              <a-button v-if="FhpwxkzP.length === 0 || !this.f"> <a-icon type="upload" /> 上传 </a-button>
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
            <viewer :images="FhclsP" style="width: 100px;" v-if="FhclsP.length !== 0">
              <img v-for="(item, index) in FhclsP" :src="item.src" :key="index" style="width:30px; height:30px;" />
            </viewer>
            <a-upload
              v-decorator="['Fhzlaqcns', { rules: [{ required: FhclsP.length ? false : true, message: '请上传' }] }]"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture"
              v-if="FhclsP.length === 0 || !this.f"
              @change="uploadChange($event, 'FhclsP')"
            >
              <a-button v-if="FhclsP.length === 0 || !this.f"> <a-icon type="upload" /> 上传 </a-button>
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
            <viewer :images="FhhgzP" style="width: 100px;" v-if="FhhgzP.length !== 0">
              <img v-for="(item, index) in FhhgzP" :src="item.src" :key="index" style="width:30px; height:30px;" />
            </viewer>
            <a-upload
              v-decorator="['Fhdwfyhgz', { rules: [{ required: FhhgzP.length ? false : true, message: '请上传' }] }]"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              list-type="picture"
              v-if="FhhgzP.length === 0 || !this.f"
              @change="uploadChange($event, 'FhhgzP')"
            >
              <a-button v-if="FhhgzP.length === 0 || !this.f"> <a-icon type="upload" /> 上传 </a-button>
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
      <!-- <a-row>
                  <a-col :span="10">
                    <a-form-item
                      label="违规违法记录"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 14 }, sm: { span: 14 } }"
                    >
                      <a-textarea

                        placeholder="违规违法记录"
                        :rows="4"
                        v-decorator="['Fhwgwfjl']"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="6">
                    <a-form-item :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }">
                      <a-button   type="primary" @click="addjl">
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
                    <a slot="action"   @click="delet1(record)">删除</a>
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
    <!-- --------------------------地图弹窗 --------------------------------------->
    <a-modal
      title="地图"
      :visible="mapShow"
      @ok="handleOkmap"
      @cancel="handleCancelmap"
      width="800px "
      :zIndex="10000">
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
  </div>
</template>
<script>
import { UpdateInfo, FindById } from '@/api/tzc'
// import QS from 'qs'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import replaceAddress from '@/utils/replaceAddress'
import Clfunid from '@/utils/Clfunid'
export default {
  inject: ['reload'],
  name: 'BaseForm',
  props: {
    // fatherinfo: Object
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
  // watch: {
  //   fatherinfo (newfatherinfo, oldfatherinfo) {
  //       console.log(newfatherinfo, oldfatherinfo)
  //       this.fatherinfoItem = newfatherinfo
  //   }
  // },
  created () {
    getAdminAddress()
      .then(res => {
        // this.options = JSON.parse(res)
        console.log(res)
        this.options = res
         this.update(this.$attrs.fatherinfo)
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
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

    // 修改
    update (v) {
      this.f = false
      this.formData = 'update'
      this.cs = ['1', '1712', '2263', '2311']
      var addressAdmin = ''
      // 给对应的表单元素赋值
      FindById(v.FStId).then(res => {
        console.log(res)
        var Clres = JSON.parse(res.Data)[0]
        this.FhpwxkzP = [{ src: this.photoTop + Clres.Fhpwxkz }]
        this.FhclsP = [{ src: this.photoTop + Clres.Fhzlaqcns }]
        this.FhhgzP = [{ src: this.photoTop + Clres.Fhdwfyhgz }]
        console.log(JSON.parse(res.Data))
        addressAdmin = Clres.FhAdressA
        this.Zl = Clres.FhKind ? Clres.FhKind.split(',') : []
        console.log(addressAdmin)
        var Claddress = replaceAddress(addressAdmin.replace(/\//g, ''), this.options) || []
        console.log(Claddress)
        this.adderssPermise = Clfunid(this.options)
        if (Claddress && Claddress.length) {
          if (Claddress.length === 1) {
            if (this.adderssPermise) {
              this.regName = this.adderssPermise.regName
              this.regInfo = this.adderssPermise.regInfo
              this.peoName = this.adderssPermise.peoName
              this.peoInfo = this.adderssPermise.peoInfo
            }
          } else if (Claddress.length === 2) {
            this.regInfo = this.options[0].children
            this.peoTF = true
            if (this.adderssPermise) {
              this.regInfo = this.adderssPermise.regInfo
              this.peoInfo = this.adderssPermise.peoInfo
            }

            this.peoName = '请选择'
            this.regName = Claddress[1]
            if (this.regInfo) {
              this.regInfo.forEach(item => {
                if (item.label === this.regName) {
                  this.peoInfo = item.children
                  if (this.adderssPermise) {
                    this.regInfo = this.adderssPermise.regInfo
                    this.peoInfo = this.adderssPermise.peoInfo
                  }
                }
              })
            }
          } else if (Claddress.length === 3) {
            this.regInfo = this.options[0].children
            this.peoTF = true
            this.regName = Claddress[1]
            this.peoName = Claddress[2]
            if (this.regInfo) {
              this.regInfo.forEach(item => {
                if (item.label === this.regName) {
                  if (this.adderssPermise) {
                    console.log('执行了')
                    this.regInfo = this.adderssPermise.regInfo
                    this.peoInfo = this.adderssPermise.peoInfo
                  }
                }
              })
            }
          }
        }
        this.$nextTick(() => {
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
      this.Zl = checkedValues
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
            this.Zl = []
            this.offset = 1
            this.visible = false
            this.reload()
          })
        }
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
