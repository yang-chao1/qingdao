<template>
  <div>
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
            <a-select style="width: 120px;margin-right: 10px;" @change="ChangeTown" default-value="青岛市">
              <a-select-option value="青岛市">
                青岛市
              </a-select-option>
            </a-select>
            <a-select
              style="width: 120px;margin-right: 10px;"
              @change="ChangeRegion"
              :default-value="this.regName"
            >
              <a-select-option value="请选择">
                请选择
              </a-select-option>
              <a-select-option v-for="(item, index) in regInfo" :key="index" :value="item.label">
                {{ item.label }}
              </a-select-option>
            </a-select>
            <a-select style="width: 120px;" @change="ChangePeo" :default-value="this.peoName" >
              <a-select-option value="请选择">
                请选择
              </a-select-option>
              <a-select-option v-for="(item, index) in peoInfo" :key="index" :value="item.label">
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
            <a-checkbox-group :options="anminClass" v-decorator="['FhKind', { initialValue: [] }]" @change="onChangeZL" style="width: 100%;">
              <!-- <a-row>
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
              </a-row> -->
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
      <a-row type="flex" justify="end" style="margin-top: 20px;">
        <a-col>
          <a-button type="primary" html-type="submit" style="width: 200px">
            新增
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
import { AddInfo } from '@/api/tzc'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import Clfunid from '@/utils/Clfunid'
export default {
  inject: ['reload'],
  name: 'BaseForm',
  data () {
    return {
      // 地图显示隐藏
      mapShow: false,
      // ModalTextmap: '请不要输入错误噢~',
      confirmLoadingmap: true,
      center: { FLongitude: '120.39629', FLatitude: '36.30744' },
      addr: '',
      options: [],
      value: 1,
      hasSelected: 'true',
      // from 表单
      form: this.$form.createForm(this),
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
      // 动物种类
      anminClass: [
        { label: '鸡', value: '鸡' },
        { label: '猪', value: '猪' },
        { label: '牛', value: '牛' },
        { label: '羊', value: '羊' },
        { label: '鸭', value: '鸭' },
        { label: '鹅', value: '鹅' }

      ],
      // 地址权限对象
      adderssPermise: {}
    }
  },
  created () {
     getAdminAddress()
      .then(res => {
        // this.options = JSON.parse(res)
        this.options = res
      this.adderssPermise = Clfunid(this.options)
      if (this.adderssPermise) {
        this.regName = this.adderssPermise.regName
        this.regInfo = this.adderssPermise.regInfo
        this.peoName = this.adderssPermise.peoName
        this.peoInfo = this.adderssPermise.peoInfo
      }
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

    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },

    onChangeZL (checkedValues) {
      console.log('checked = ', checkedValues)
      this.Zl = checkedValues
    },
    // 公用关闭按钮方法
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.deletinfo = false
        this.confirmLoading = false
        this.form.resetFields()
      }, 100)
    },

    // 公用取消按钮方法
    handleCancel (e) {
      console.log('点击了取消')
      this.visible = false
      this.deletinfo = false
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
    // 表单提交
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
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
