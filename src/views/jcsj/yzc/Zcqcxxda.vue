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
                    label="养殖场名称"
                    :labelCol="{ lg: { span: 9 }, sm: { span: 10 } }"
                    :wrapperCol="{ lg: { span: 15 }, sm: { span: 14 } }"
                  >
                    <a-input @blur="mocheck" v-model="queryParam.id" placeholder="" size="large" style="width: 100%" />
                  </a-form-item>
                </a-col>
                <a-col :span="4">
                  <a-select @change="selectShow" default-value="已启用" size="large">
                    <a-select-option value="已启用">
                      已启用
                    </a-select-option>
                    <a-select-option value="已注销">
                      已注销
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
              v-permission="{ active: 'faradd' }"
              type="primary"
              style="height:40px"
              icon="plus"
              @click="showModal()"
            >新增</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-tree-select
              style="margin-top: -1px ;width: 250px;float:right;"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              placeholder="所在地"
              allowClear
              :tree-data="options"
              @change="mocheck"
            >
            </a-tree-select>
            <!-- 新增 -->
            <a-modal
              :footer="null"
              title="管理新增"
              :visible="visible"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
              :destroyOnClose="true"
            >
              <!-- <p>{{ ModalText }}</p> -->
              <!-----------------------------表单元素----------------------------  -->

              <a-form @submit="handleSubmit" :form="form">
                <a-row>
                  <a-col :span="10">
                    <a-form-item
                      label="养殖场（户）名称"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                    >
                      <a-input v-decorator="['FSyzcmc', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <!-- <a-col :span="2">
                    <a-form-item
                      :labelCol="{ lg: { span: 0 }, sm: { span: 0 } }"
                      :wrapperCol="{ lg: { span: 24 }, sm: { span: 24 } }"
                    >
                      <a-input
                        placeholder="编号"
                        v-decorator="['FSmemo2', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col> -->
                  <a-col :span="12">
                    <a-form-item
                      label="养殖场类型"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="['FSyzclx', { rules: [{ required: true, message: '请输入' }] }]"
                        :disabled="'disabled'"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <!-- 行政地址 -->
                  <a-col :span="16">
                    <a-form-item
                      label="地址"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }"
                    >
                      <!-- <a-cascader :options="options" placeholder="所在地" @change="onChanges"> </a-cascader> -->
                      <a-select style="width: 120px;margin-right: 10px;" @change="ChangeTown" default-value="青岛市">
                        <a-select-option value="青岛市">
                          青岛市
                        </a-select-option>
                      </a-select>
                      <a-select
                        style="width: 120px;margin-right: 10px;"
                        @change="ChangeRegion"
                        :default-value="regName"
                      >
                        <a-select-option value="请选择" v-if="this.regInfo.length>1">
                          请选择
                        </a-select-option>
                        <a-select-option v-for="(item, index) in regInfo" :key="index">
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                      <a-select style="width: 120px;" @change="ChangePeo" :default-value="peoName">
                        <a-select-option value="请选择" v-if="this.peoInfo.length>1">
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
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                    >
                      <!-- FSxxdz 09-27新加字段，数据库可能需要添加 -->
                      <a-input
                        v-decorator="['FSxxdz']"
                        placeholder="详细地址"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="18">
                    <a-form-item
                      label="负责人"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="['FSfzr', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="负责人"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item
                      label="经纬度:"
                      :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                    >
                      <a-input
                        style="width:143.33px"
                        v-decorator="['FLongittude', { rules: [{ required: true, message: '请输入经度' }] }]"
                        name="FLongittude"
                        placeholder="请选择"
                      />

                      <a-input
                        style="width:143.33px"
                        v-decorator="['FLatitude', { rules: [{ required: true, message: '请输入纬度' }] }]"
                        name="FLatitude"
                        placeholder="请选择"
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
                      label="联系电话"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="[
                          'FSlxdh',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1\d{10}$/, message: '手机号格式错误' }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="企业占地亩数"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FSzdms']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="畜种种类"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-select
                        v-decorator="['FSxz', { rules: [{ required: true, message: '请选择' }], initialValue: '猪' }]"
                        placeholder="畜种种类"
                        @select="setFarmType"
                      >
                        <a-select-option v-for="(item, index) in typeChZ" :key="index" :value="typeChZ[index]">
                          {{ item }}
                        </a-select-option>
                        <!-- <a-select-option value="0">
                          生猪
                        </a-select-option>
                        <a-select-option value="1">
                          奶牛
                        </a-select-option>
                        <a-select-option value="2">
                          肉鸡
                        </a-select-option>
                        <a-select-option value="3">
                          肉鸭
                        </a-select-option>
                        <a-select-option value="4">
                          蛋鸡
                        </a-select-option>
                        <a-select-option value="5">
                          蛋鸭
                        </a-select-option>
                        <a-select-option value="6">
                          肉牛
                        </a-select-option>
                        <a-select-option value="7">
                          羊
                        </a-select-option>
                        <a-select-option value="8">
                          兔
                        </a-select-option> -->
                      </a-select>
                      <!-- <a-input v-decorator="['FSxz', { rules: [{ required: true, message: '请输入' }] }]" /> -->
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="饲养品种"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FScypz']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="设计存栏"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="[
                          'FSsjcl',
                          {
                            rules: [
                              { required: this.dataSource.length ? false : true, message: '请输入' },
                              { pattern: /^[0-9]*$/, message: '设计存栏必须为整数' }
                            ]
                          }
                        ]"
                        @keyup="setFarmType"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="设计年出栏"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="[
                          'FSsjncl',
                          {
                            rules: [
                              { required: this.dataSource.length ? false : true, message: '请输入' },
                              ,
                              { pattern: /^[0-9]*$/, message: '设计年出栏必须为整数' }
                            ]
                          }
                        ]"
                        @keyup="setFarmType"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-button
                  v-if="this.syhTF"
                  type="primary"
                  class="editable-add-btn"
                  @click="handleAdd"
                  style="width: 100px;margin:10px  0 10px 450px"
                >
                  添加
                </a-button>
                <!-- 默认隐藏，第一次判断养殖场类型为非散养户时显示 -->
                <div v-if="!this.syhTF && this.infoTF">
                  <a-row>
                    <a-col :span="24">
                      <h2>{{ resultType }}</h2>
                      <hr width="100%" v-if="resultType" />
                    </a-col>
                  </a-row>
                  <a-row v-if="isShowZxqc">
                    <a-col :span="11">
                      <a-form-item
                        label="是否是种畜禽场"
                        :labelCol="{ lg: { span: 13 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 5 } }"
                      >
                        <!-- FSzxqc 09-27新加字段-->
                        <a-select
                          v-decorator="['FSzxqc', { rules: [{ required: true, message: '请输入' }] }]"
                          placeholder="是否是种畜禽场"
                          @change="showLicenseFile($event)"
                        >
                          <a-select-option value="是">
                            是
                          </a-select-option>
                          <a-select-option value="否">
                            否
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="13" v-if="isShowLicense">
                      <a-form-item
                        label="种畜企业生产经营许可证"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 13 }, sm: { span: 10 } }"
                      >
                        <!-- FSjyxkzh  10-10新加字段-->
                        <a-input
                          v-decorator="['FSjyxkztext', { rules: [{ required: true, message: '请输入' }] }]"
                          placeholder="生产经营许可证号"
                          style="width:160px"
                        />
                        <a-upload
                          v-decorator="['FSzxjyxkz']"
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          list-type="picture"
                          @change="uploadChange($event, 'FSzxjyxkz')"
                          :before-upload="beforeUpload"
                        >
                          <a-button> <a-icon type="upload" /> 上传 </a-button>
                        </a-upload>
                      </a-form-item>
                    </a-col>
                    <!-- FSjyxkzh  10-10新加字段-->
                    <!-- <a-col :span="4" v-if="isShowLicense">
                    <a-form-item
                      :labelCol="{ lg: { span: 0 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 6 }, sm: { span: 10 } }"
                    >
                      <a-upload
                        v-decorator="['FSjyxkz']"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture"
                      >
                        <a-button> <a-icon type="upload" /> 上传 </a-button>
                      </a-upload>
                    </a-form-item>
                  </a-col> -->
                  </a-row>
                  <a-row>
                    <a-col :span="12" v-if="isShowGmAndYz">
                      <a-form-item
                        label="是否直连直报中备案"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-select
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FSzlba', { rules: [{ required: true, message: '请输入' }] }]"
                          placeholder="是否直连直报中备案"
                          @change="handleSelectChange"
                        >
                          <a-select-option value="是">
                            是
                          </a-select-option>
                          <a-select-option value="否">
                            否
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12" v-if="isShowGmAndYz">
                      <a-form-item
                        label="是否配建粪污处理设施"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-select
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FSpjwfss', { rules: [{ required: true, message: '请输入' }] }]"
                          placeholder="是否配建粪污处理设施"
                          @change="showPeiJian($event)"
                        >
                          <a-select-option value="是">
                            是
                          </a-select-option>
                          <a-select-option value="否">
                            否
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row v-if="isShowPeiJian">
                    <a-col :span="12">
                      <a-form-item
                        label="是否正常运转"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-select
                          v-decorator="['FSzcyz', { rules: [{ required: true, message: '请输入' }] }]"
                          placeholder="是否正常运转"
                          @change="showNormalYz($event)"
                        >
                          <a-select-option value="是">
                            是
                          </a-select-option>
                          <a-select-option value="否">
                            否
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="7" v-if="isShowNormalYz">
                      <a-form-item
                        label="配建内容"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
                      >
                        <a-select
                          v-decorator="['FSwfpjnr', { rules: [{ required: true, message: '请输入' }] }]"
                          placeholder="配建内容"
                          @change="showFSwfpjnr($event)"
                        >
                          <a-select-option value="干粪棚">
                            干粪棚
                          </a-select-option>
                          <a-select-option value="污水池">
                            污水池
                          </a-select-option>
                          <a-select-option value="其他">
                            其他
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="5">
                      <a-form-item
                        :labelCol="{ lg: { span: 1 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 18 }, sm: { span: 13 } }"
                      >
                        <a-input v-decorator="['FSqt']" v-if="isShowFSwfpjnr" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12" v-if="isShowNormalYz && isShowPeiJian">
                      <a-form-item
                        label="粪污处理设施配建体积（立方）"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input v-decorator="['FSwfpjtj', { rules: [{ required: true, message: '请输入' }] }]" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </div>
                <!-- 默认隐藏，第一次判断为散养户时显示且添加数据后显示 -->
                <div>
                  <div v-if="this.syhTF && this.addSYTF && this.dataSource.length">
                    <a-table bordered :data-source="dataSource" :columns="columnsT">
                      <!-- <span style="margin-left: 8px">
                        <template v-if="false">
                          {{ `Selected ${selectedRowKeys.length} items` }}
                        </template>
                      </span> -->
                      <template slot="operation" slot-scope="text, record">
                        <a slot="operation" @click="onDelete(text, record)">
                          删除
                        </a>
                      </template>
                    </a-table>
                  </div>
                </div>

                <a-row>
                  <a-col :span="13" v-if="isShowGmAndYz">
                    <a-form-item
                      label="动物防疫条件合格证"
                      :labelCol="{ lg: { span: 11 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 10 } }"
                    >
                      <!-- 新增字段FSdwfyhgzh 10.10 -->
                      <a-input
                        v-decorator="['FSfyhgztext', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="防疫条件合格证号"
                        style="width:160px"
                      />
                      <a-upload
                        v-decorator="['FSdwfyhgz']"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture"
                        @change="uploadChange($event, 'FSdwfyhgz')"
                      >
                        <a-button> <a-icon type="upload" /> 上传 </a-button>
                      </a-upload>
                    </a-form-item></a-col
                    >
                  <!-- 新增字段FSdwfyhgzh 10.10 -->
                  <!-- <a-col :span="6" v-if="isShowGmAndYz">
                    <a-form-item
                      :labelCol="{ lg: { span: 0 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 16 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="['FSdwfyhgzh', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="防疫条件合格证号"
                      />
                    </a-form-item>
                  </a-col> -->
                  <a-col :span="isShowGmAndYz ? 11 : 24">
                    <a-form-item
                      label="统一社会信用代码"
                      :labelCol="{ lg: { span: isShowGmAndYz ? 8 : 6 }, sm: { span: 10 } }"
                      :wrapperCol="{ lg: { span: isShowGmAndYz ? 11 : 5 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FSxydm']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="银行卡号/一卡通号"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FSyhkh', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="身份证号码"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FSsfzhm', { rules: [{ required: true, message: '请输入' }] }]" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="身份证/一卡通照片（合照）"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <!-- FSsfykt  09-28新加字段 -->
                      <!-- action="https://www.mocky.io/v2/5cc8019d300000980a055e76" -->
                      <a-upload
                        v-decorator="['FSsfzimg', { rules: [{ required: true, message: '请上传' }] }]"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture"
                        @change="uploadChange($event, 'FSsfzimg')"
                      >
                        <a-button> <a-icon type="upload" /> 上传 </a-button>
                      </a-upload>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-form-item v-if="!this.addSYH" >
                  <a-button type="primary" html-type="submit" style="width: 100px;margin:10px  0 10px 450px">
                    保存
                  </a-button>
                </a-form-item>
              </a-form>
              <!-- 无害化手机号添加 暂定：为散养户时显示-->
              <div v-if="this.syhTF && this.addSYH">
                <h3>电话号码绑定</h3>
                <a-form @submit="SYHAdd" :form="SYHform">
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="企业名称"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input v-decorator="['EnterpriseName', { rules: [{ required: true, message: '请输入' }] }]" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="电话号码"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input
                          v-decorator="[
                            'Mobile',
                            {
                              rules: [
                                { required: true, message: '请输入' },
                                { pattern: /^1\d{10}$/, message: '手机号格式错误' }
                              ]
                            }
                          ]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-button
                    v-if="this.addSYH"
                    type="primary"
                    html-type="submit"
                    class="editable-add-btn"
                    style="width: 100px;margin:10px  0 10px 450px"
                  >
                    添加
                  </a-button>
                </a-form>
                <a-table v-if="this.dataSourceSJ.length" bordered :data-source="dataSourceSJ" :columns="columns1">
                  <!-- <span style="margin-left: 8px">
                        <template v-if="false">
                          {{ `Selected ${selectedRowKeys.length} items` }}
                        </template>
                      </span> -->
                  <template slot="action" slot-scope="text, record">
                    <a slot="action" @click="SYHdel(text, record)">
                      删除
                    </a>
                  </template>
                </a-table>
              </div>
            </a-modal>

            <!-- --------------------------修改弹窗-------------------------- -->

            <a-modal
              :footer="null"
              :title="this.f ? '修改' : '查看'"
              :visible="updateinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              width="1000px"
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
                      <a-input v-decorator="['FStId']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="养殖场（户）名称"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                    >
                      <a-input
                        :disabled="this.f ? false : 'disabled'"
                        v-decorator="['FSyzcmc', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <!-- <a-col :span="2">
                    <a-form-item
                      :labelCol="{ lg: { span: 0 }, sm: { span: 0 } }"
                      :wrapperCol="{ lg: { span: 24 }, sm: { span: 24 } }"
                    >
                      <a-input
                        :disabled="this.f ? false : 'disabled'"
                        placeholder="编号"
                        v-decorator="['FSmemo2', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col> -->
                  <a-col :span="10">
                    <a-form-item
                      label="养殖场类型"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="['FSyzclx', { rules: [{ required: true, message: '请输入' }] }]"
                        :disabled="'disabled'"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row v-if="!this.f">
                  <a-col :span="18">
                    <a-form-item
                      label="地址"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 11 }, sm: { span: 11 } }"
                    >
                      <!-- FSxxdz 09-27新加字段，数据库可能需要添加 -->
                      <a-input :disabled="this.f ? false : 'disabled'" v-decorator="['FSxxdz']" />
                    </a-form-item>
                  </a-col>
                </a-row>

                <a-row v-if="this.f">
                  <a-col :span="16">
                    <a-form-item
                      label="地址"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 16 } }"
                    >
                      <a-select style="width: 120px;margin-right: 10px;" @change="ChangeTown" default-value="青岛市">
                        <a-select-option value="青岛市">
                          青岛市
                        </a-select-option>
                      </a-select>
                      <a-select
                        style="width: 120px;margin-right: 10px;"
                        @change="ChangeRegion"
                        :default-value="regName"
                      >
                        <a-select-option value="请选择" v-if="this.regInfo.length>1">
                          请选择
                        </a-select-option>
                        <a-select-option v-for="(item, index) in regInfo" :key="index">
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                      <a-select style="width: 120px;" @change="ChangePeo" :default-value="peoName">
                        <a-select-option value="请选择" v-if="this.peoInfo.length>1">
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
                      :wrapperCol="{ lg: { span: 15 }, sm: { span: 15 } }"
                    >
                      <!-- FSxxdz 09-27新加字段，数据库可能需要添加 -->
                      <a-input
                        :disabled="this.f ? false : 'disabled'"
                        v-decorator="['FSxxdz', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="详细地址"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item
                      label="负责人"
                      :labelCol="{ lg: { span: 6 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 6 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? false : 'disabled'"
                        v-decorator="['FSfzr', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="负责人"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="24">
                    <a-form-item
                      label="经纬度:"
                      :labelCol="{ lg: { span: 6 }, sm: { span: 6 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                    >
                      <a-input
                        style="width:143.33px"
                        v-decorator="['FLongittude', { rules: [{ required: true, message: '请输入经度' }] }]"
                        name="FLongittude"
                        placeholder="请选择"
                        :disabled="this.f ? false : 'disabled'"
                      />

                      <a-input
                        style="width:143.33px"
                        :disabled="this.f ? false : 'disabled'"
                        v-decorator="['FLatitude', { rules: [{ required: true, message: '请输入纬度' }] }]"
                        name="FLatitude"
                        placeholder="请选择"
                      />
                      <a-button
                        :disabled="this.f ? false : 'disabled'"
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
                      label="联系电话"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? false : 'disabled'"
                        v-decorator="[
                          'FSlxdh',
                          {
                            rules: [
                              { required: true, message: '请输入' },
                              { pattern: /^1\d{10}$/, message: '手机号格式错误' }
                            ]
                          }
                        ]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="企业占地亩数"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input :disabled="this.f ? false : 'disabled'" v-decorator="['FSzdms']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- 修改或为散养户时显示的table -->
                <div v-if="this.f || this.syhTF">
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="畜种种类"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input v-if="!this.f" :disabled="this.f ? false : 'disabled'" v-decorator="['FSxz']" />
                        <a-select
                          v-if="this.f"
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="[
                            'FSxz',
                            { rules: [{ required: this.dataSource.length ? false : true, message: '请选择' }] }
                          ]"
                          placeholder="畜种种类"
                          @select="setFarmType"
                        >
                          <a-select-option v-for="(item, index) in typeChZ" :key="index" :value="typeChZ[index]">
                            {{ item }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="饲养品种"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input :disabled="this.f ? false : 'disabled'" v-decorator="['FScypz']" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="设计存栏"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="[
                            'FSsjcl',
                            {
                              rules: [
                                { required: this.dataSource.length ? false : true, message: '请输入' },
                                { pattern: /^[0-9]*$/, message: '设计存栏必须为整数' }
                              ]
                            }
                          ]"
                          @keyup="setFarmType"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="设计年出栏"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="[
                            'FSsjncl',
                            {
                              rules: [
                                { required: this.dataSource.length ? false : true, message: '请输入' },
                                ,
                                { pattern: /^[0-9]*$/, message: '设计年出栏必须为整数' }
                              ]
                            }
                          ]"
                          @keyup="setFarmType"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </div>
                <!-- 查看且不为散养户时显示 -->
                <div v-if="!this.f && !this.syhTF">
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="畜种种类"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input v-if="!this.f" :disabled="this.f ? false : 'disabled'" v-decorator="['FSxz']" />
                        <a-select
                          v-if="this.f"
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="[
                            'FSxz',
                            { rules: [{ required: this.dataSource.length ? false : true, message: '请选择' }] }
                          ]"
                          placeholder="畜种种类"
                          @select="setFarmType"
                        >
                          <a-select-option v-for="(item, index) in typeChZ" :key="index" :value="typeChZ[index]">
                            {{ item }}
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="饲养品种"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="[
                            'FScypz',
                            { rules: [{ required: this.dataSource.length ? false : true, message: '请输入' }] }
                          ]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="设计存栏"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="[
                            'FSsjcl',
                            {
                              rules: [
                                { required: this.dataSource.length ? false : true, message: '请输入' },
                                { pattern: /^[0-9]*$/, message: '设计存栏必须为整数' }
                              ]
                            }
                          ]"
                          @keyup="setFarmType"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="设计年出栏"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="[
                            'FSsjncl',
                            {
                              rules: [
                                { required: this.dataSource.length ? false : true, message: '请输入' },
                                ,
                                { pattern: /^[0-9]*$/, message: '设计年出栏必须为整数' }
                              ]
                            }
                          ]"
                          @keyup="setFarmType"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </div>
                <!-- 为散养户时 -->
                <a-button
                  v-if="this.syhTF && this.f"
                  type="primary"
                  class="editable-add-btn"
                  @click="handleAdd"
                  style="width: 100px;margin:10px  0 10px 450px"
                >
                  添加
                </a-button>
                <!-- 默认隐藏，第一次判断养殖场类型为非散养户时显示 -->
                <div v-if="!this.syhTF && this.infoTF">
                  <a-row>
                    <a-col :span="24">
                      <h2>{{ resultType }}</h2>
                      <hr width="100%" v-if="resultType" />
                    </a-col>
                  </a-row>
                  <a-row v-if="isShowZxqc">
                    <a-col :span="11">
                      <a-form-item
                        label="是否是种畜禽场"
                        :labelCol="{ lg: { span: 13 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 5 } }"
                      >
                        <!-- FSzxqc 09-27新加字段-->
                        <a-select
                          v-decorator="['FSzxqc', { rules: [{ required: true, message: '请输入' }] }]"
                          placeholder="是否是种畜禽场"
                          @change="showLicenseFile($event)"
                          :disabled="this.f ? false : 'disabled'"
                        >
                          <a-select-option value="是">
                            是
                          </a-select-option>
                          <a-select-option value="否">
                            否
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="13" v-if="isShowLicense">
                      <a-form-item
                        label="种畜企业生产经营许可证"
                        :labelCol="{ lg: { span: 10 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 13 }, sm: { span: 10 } }"
                      >
                        <!-- FSjyxkzh  10-10新加字段-->
                        <a-input
                          v-decorator="['FSjyxkztext', { rules: [{ required: true, message: '请输入' }] }]"
                          placeholder="生产经营许可证号"
                          style="width:160px"
                          :disabled="this.f ? false : 'disabled'"
                        />
                        <a-upload
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FSzxjyxkz']"
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          list-type="picture"
                          @change="uploadChange($event, 'FSzxjyxkz')"
                        >
                          <a-button> <a-icon type="upload" /> 上传 </a-button>
                        </a-upload>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12" v-if="isShowGmAndYz">
                      <a-form-item
                        label="是否直连直报中备案"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-select
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FSzlba', { rules: [{ required: true, message: '请输入' }] }]"
                          placeholder="是否直连直报中备案"
                          @change="handleSelectChange"
                        >
                          <a-select-option value="是">
                            是
                          </a-select-option>
                          <a-select-option value="否">
                            否
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="12" v-if="isShowGmAndYz">
                      <a-form-item
                        label="是否配建粪污处理设施"
                        :labelCol="{ lg: { span: 9 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-select
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FSpjwfss', { rules: [{ required: true, message: '请输入' }] }]"
                          placeholder="是否配建粪污处理设施"
                          @change="showPeiJian($event)"
                        >
                          <a-select-option value="是">
                            是
                          </a-select-option>
                          <a-select-option value="否">
                            否
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row v-if="isShowPeiJian">
                    <a-col :span="12">
                      <a-form-item
                        label="是否正常运转"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-select
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FSzcyz', { rules: [{ required: true, message: '请输入' }] }]"
                          placeholder="是否正常运转"
                          @change="showNormalYz($event)"
                        >
                          <a-select-option value="是">
                            是
                          </a-select-option>
                          <a-select-option value="否">
                            否
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="7" v-if="isShowNormalYz">
                      <a-form-item
                        label="配建内容"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
                      >
                        <a-select
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FSwfpjnr', { rules: [{ required: true, message: '请输入' }] }]"
                          placeholder="配建内容"
                          @change="showFSwfpjnr($event)"
                        >
                          <a-select-option value="干粪棚">
                            干粪棚
                          </a-select-option>
                          <a-select-option value="污水池">
                            污水池
                          </a-select-option>
                          <a-select-option value="其他">
                            其他
                          </a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :span="5">
                      <a-form-item
                        :disabled="this.f ? false : 'disabled'"
                        :labelCol="{ lg: { span: 1 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 18 }, sm: { span: 13 } }"
                      >
                        <a-input v-decorator="['FSqt']" v-if="isShowFSwfpjnr" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12" v-if="isShowNormalYz && isShowPeiJian">
                      <a-form-item
                        label="粪污处理设施配建体积（立方）"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['FSwfpjtj', { rules: [{ required: true, message: '请输入' }] }]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </div>
                <!-- 默认隐藏，第一次判断为散养户时显示且添加数据后显示 -->
                <div>
                  <div v-if="this.syhTF && this.addSYTF && this.dataSource.length && this.f">
                    <a-table bordered :data-source="dataSource" :columns="columnsT">
                      <!-- <span style="margin-left: 8px">
                        <template v-if="false">
                          {{ `Selected ${selectedRowKeys.length} items` }}
                        </template>
                      </span> -->
                      <template slot="operation" slot-scope="text, record">
                        <a slot="operation" @click="onDelete(text, record)">
                          删除
                        </a>
                      </template>
                    </a-table>
                  </div>
                </div>
                <!-- 查看时且为散养户 -->
                <div>
                  <div v-if="this.syhTF && this.addSYTF && this.dataSource.length && !this.f">
                    <a-table bordered :data-source="dataSource" :columns="columnsY"> </a-table>
                  </div>
                </div>
                <a-row v-if="!this.f && this.isShowZxqc && this.dataSource.length">
                  <a-col :span="24">
                    <h2>{{ resultType }}</h2>
                    <hr width="100%" />
                  </a-col>
                </a-row>
                <a-row v-if="isShowZxqc && this.dataSource.length">
                  <a-col :span="11">
                    <a-form-item
                      label="是否是种畜禽场"
                      :labelCol="{ lg: { span: 13 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <!-- FSzxqc 09-27新加字段-->
                      <a-select
                        v-decorator="['FSzxqc', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="是否是种畜禽场"
                        @change="showLicenseFile($event)"
                        :disabled="this.f ? false : 'disabled'"
                      >
                        <a-select-option value="是">
                          是
                        </a-select-option>
                        <a-select-option value="否">
                          否
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="13" v-if="isShowLicense">
                    <a-form-item
                      label="种畜企业生产经营许可证"
                      :labelCol="{ lg: { span: 11 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 10 } }"
                    >
                      <!-- FSjyxkzh  10-10新加字段-->
                      <a-input
                        v-decorator="['FSjyxkztext', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="生产经营许可证号"
                        :disabled="this.f ? false : 'disabled'"
                        style="width:160px"
                      />
                      <a-upload
                        v-if="this.f"
                        v-decorator="['FSzxjyxkz']"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture"
                        @change="uploadChange($event, 'FSzxjyxkz')"
                      >
                        <a-button :disabled="this.f ? false : 'disabled'"> <a-icon type="upload" /> 上传 </a-button>
                      </a-upload>
                      <!-- FSjyxkz  09-28新加字段-->
                      <viewer :images="FSzxjyxkzP" style="width: 100px;" v-if="FSzxjyxkzP.length !== 0">
                        <!-- //photo 一定要一个数组，否则报错 -->
                        <img
                          v-for="(item, index) in FSzxjyxkzP"
                          :src="item.src"
                          :key="index"
                          style="width:30px; height:30px;"
                        />
                      </viewer>
                    </a-form-item>
                  </a-col>
                  <!-- FSjyxkzh  10-10新加字段-->
                  <!-- <a-col :span="6" v-if="isShowLicense">
                    <a-form-item
                      :labelCol="{ lg: { span: 0 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 16 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="['FSjyxkzh', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="生产经营许可证号"
                      />
                    </a-form-item>
                  </a-col> -->
                </a-row>
                <a-row v-if="!this.f && this.isShowZxqc && this.dataSource.length">
                  <a-col :span="12" v-if="isShowGmAndYz && this.dataSource.length">
                    <a-form-item
                      label="是否直连直报中备案"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-if="!this.f"
                        disabled
                        v-decorator="['FSzlba', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                      <a-select
                        v-if="this.f"
                        v-decorator="['FSzlba', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="是否直连直报中备案"
                        @change="handleSelectChange"
                      >
                        <a-select-option value="是">
                          是
                        </a-select-option>
                        <a-select-option value="否">
                          否
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12" v-if="isShowGmAndYz && this.dataSource.length">
                    <a-form-item
                      label="是否配建粪污处理设施"
                      :labelCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                      :wrapperCol="{ lg: { span: 9 }, sm: { span: 9 } }"
                    >
                      <a-input
                        v-if="!this.f"
                        :disabled="this.f ? false : 'disabled'"
                        v-decorator="['FSpjwfss', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                      <a-select
                        v-if="this.f"
                        v-decorator="['FSpjwfss', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="是否配建粪污处理设施"
                        @change="showPeiJian($event)"
                        :disabled="this.f ? false : 'disabled'"
                      >
                        <a-select-option value="是">
                          是
                        </a-select-option>
                        <a-select-option value="否">
                          否
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row v-if="isShowPeiJian && this.dataSource.length">
                  <a-col :span="12">
                    <a-form-item
                      label="是否正常运转"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-select
                        v-decorator="['FSzcyz', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="是否正常运转"
                        @change="showNormalYz($event)"
                        :disabled="this.f ? false : 'disabled'"
                      >
                        <a-select-option value="是">
                          是
                        </a-select-option>
                        <a-select-option value="否">
                          否
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="7" v-if="isShowNormalYz">
                    <a-form-item
                      label="配建内容"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 11 }, sm: { span: 8 } }"
                    >
                      <a-select
                        v-decorator="['FSwfpjnr', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="配建内容"
                        @change="showFSwfpjnr($event)"
                        :disabled="this.f ? false : 'disabled'"
                      >
                        <a-select-option value="干粪棚">
                          干粪棚
                        </a-select-option>
                        <a-select-option value="污水池">
                          污水池
                        </a-select-option>
                        <a-select-option value="其他">
                          其他
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :span="5">
                    <a-form-item
                      :labelCol="{ lg: { span: 1 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 18 }, sm: { span: 13 } }"
                    >
                      <a-input v-if="isShowFSwfpjnr" v-decorator="['FSqt']" :disabled="this.f ? false : 'disabled'" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12" v-if="isShowNormalYz && isShowPeiJian && this.dataSource.length">
                    <a-form-item
                      label="粪污处理设施配建体积（立方）"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? false : 'disabled'"
                        v-decorator="['FSwfpjtj', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="实际存栏"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input disabled v-decorator="['Fnsjcl']" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="实际年出栏"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input disabled v-decorator="['Fnsjncl']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="13" v-if="isShowGmAndYz && this.dataSource.length">
                    <a-form-item
                      label="动物防疫条件合格证"
                      :labelCol="{ lg: { span: 11 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 12 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="['FSfyhgztext', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="防疫条件合格证号"
                        style="width:160px"
                        :disabled="!this.f"
                      />
                      <a-upload
                        v-if="this.f"
                        v-decorator="['FSdwfyhgz']"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        list-type="picture"
                        :disabled="this.f ? false : 'disabled'"
                        @change="uploadChange($event, 'FSdwfyhgz')"
                      >
                        <a-button :disabled="this.f ? false : 'disabled'"> <a-icon type="upload" /> 上传 </a-button>
                      </a-upload>
                      <viewer v-if="FSdwfyhgzP.length !== 0">
                        <!-- //photo 一定要一个数组，否则报错 -->
                        <img
                          v-for="(item, index) in FSdwfyhgzP"
                          :src="item.src"
                          :key="index"
                          style="width:30px; height:30px;"
                        />
                      </viewer>
                    </a-form-item>
                  </a-col>
                  <!-- 新增字段FSdwfyhgzh 10.10 -->
                  <!-- <a-col :span="6" v-if="isShowGmAndYz">
                    <a-form-item
                      :labelCol="{ lg: { span: 0 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 16 }, sm: { span: 10 } }"
                    >
                      <a-input
                        v-decorator="['FSdwfyhgzh', { rules: [{ required: true, message: '请输入' }] }]"
                        placeholder="防疫条件合格证号"
                      />
                    </a-form-item>
                  </a-col> -->
                  <a-col :span="isShowGmAndYz ? 11 : 24">
                    <a-form-item
                      label="统一社会信用代码"
                      :labelCol="{ lg: { span: isShowGmAndYz ? 8 : 6 }, sm: { span: 10 } }"
                      :wrapperCol="{ lg: { span: isShowGmAndYz ? 10 : 5 }, sm: { span: 10 } }"
                    >
                      <a-input :disabled="this.f ? false : 'disabled'" v-decorator="['FSxydm']" />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="银行卡号/一卡通号"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? false : 'disabled'"
                        v-decorator="['FSyhkh', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="身份证号码"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input
                        :disabled="this.f ? false : 'disabled'"
                        v-decorator="['FSsfzhm', { rules: [{ required: true, message: '请输入' }] }]"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="身份证/一卡通照片（合照）"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <viewer :images="IDcardP" style="width: 100px;" v-if="IDcardP.length !== 0">
                        <!-- //photo 一定要一个数组，否则报错 -->
                        <img
                          v-for="(item, index) in IDcardP"
                          :src="item.src"
                          :key="index"
                          style="width:30px; height:30px;"
                        />
                      </viewer>

                      <a-upload
                        v-if="this.f"
                        v-decorator="[
                          'FSsfzimg',
                          { rules: [{ required: IDcardP.length === 0 ? true : false, message: '请输入' }] }
                        ]"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        :disabled="this.f ? false : 'disabled'"
                        @change="uploadChange($event, 'FSsfzimg')"
                        list-type="picture"
                      >
                        <a-button :disabled="this.f ? false : 'disabled'"> <a-icon type="upload" /> 上传 </a-button>
                      </a-upload>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-form-item v-if="f">
                  <a-button type="primary" html-type="submit" style="width: 100px;margin:10px  0 10px 450px">
                    保存
                  </a-button>
                </a-form-item>
              </a-form>
              <!-- 查看添加手机号 -->
              <a-table
                v-if="this.dataSourceSJ.length && !this.f"
                bordered
                :data-source="dataSourceSJ"
                :columns="columnsL"
              >
              </a-table>

              <!-- 无害化手机号添加 暂定：为散养户时显示-->
              <div v-if="this.syhTF && this.f">
                <h3 v-if="this.f">电话号码绑定</h3>
                <a-form @submit="SYHAdd" v-if="this.f" :form="SYHform">
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="企业名称"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="['EnterpriseName', { rules: [{ required: true, message: '请输入' }] }]"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="电话号码"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input
                          :disabled="this.f ? false : 'disabled'"
                          v-decorator="[
                            'Mobile',
                            {
                              rules: [
                                { required: true, message: '请输入' },
                                { pattern: /^1\d{10}$/, message: '手机号格式错误' }
                              ]
                            }
                          ]"
                        />
                      </a-form-item>
                    </a-col>
                  </a-row>

                  <a-button
                    v-if="this.f"
                    type="primary"
                    html-type="submit"
                    class="editable-add-btn"
                    style="width: 100px;margin:10px  0 10px 450px"
                  >
                    添加
                  </a-button>
                </a-form>

                <!-- 修改 -->
                <a-table
                  v-if="this.dataSourceSJ.length && this.f"
                  bordered
                  :data-source="dataSourceSJ"
                  :columns="columns2"
                >
                  <template slot="action" slot-scope="text, record">
                    <a slot="action" @click="SYHdel(text, record)">
                      删除
                    </a>
                  </template>
                </a-table>
              </div>
            </a-modal>

            <!-- --------------------------删除弹窗----------------------------- -->

            <a-modal
              :title="this.FSzt ? '启用' : '禁用'"
              :visible="deletinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk1"
              @cancel="handleCancel"
              width="400px"
            >
              <div>
                <a-form @submit="handleSubmit" :form="form">
                  <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
                    是否{{ this.FSzt ? '启用' : '禁用' }}
                  </a-form-item>
                </a-form>
              </div>
            </a-modal>
            <!-- ----------------------弹窗中的删除弹窗-------------------------------- -->
            <a-modal
              title="删除"
              :visible="deletinfo1"
              :confirm-loading="confirmLoading"
              @ok="handleOk2"
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
              :confirm-loading="confirmLoadingmap"
              @ok="handleOkmap"
              @cancel="handleCancelmap"
              width="800px"
              :zIndex="10000"
            >
              <!-- <p>{{ ModalTextmap }}</p> -->
              <!-- 地图弹框-------------------------------------------------------------- -->

              <!-- <p>{{ ModalTextmap }}</p> -->
              <!-- 地图弹框-------------------------------------------------------------- -->

              <!-- <p>{{ ModalTextmap }}</p> -->
              <!-- 地图位置 -->
              <baidu-map
                class="map"
                @ready="handler"
                style="height: 500px;"
                :center="center"
                :zoom="1000"
                :map-click="true"
                :isVisible="true"
                @click="maplist"
                :scroll-wheel-zoom="true"
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
                    v-decorator="['FLongittude', { rules: [{ required: true, message: '请输入经度' }] }]"
                    name="FLongittude"
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
          <!-- ----------------------------表格内容------------------------------------- -->
          <a-table
            :loading="isloading"
            :columns="columns"
            :data-source="data"
            :scroll="{ x: 1300 }"
            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            style="margin-top:5px;"
            :pagination="false"
          >
            <span style="margin-left: 8px">
              <template v-if="hasSelected">
                {{ `Selected ${selectedRowKeys.length} items` }}
              </template>
            </span>
            <template slot="action" slot-scope="text, record">
              <a slot="action" v-permission="{ active: 'farsele' }" @click="find(record)">查看&nbsp;&nbsp;</a>
              <a slot="action" v-permission="{ active: 'farupd' }" @click="update(record)">修改&nbsp;&nbsp;</a>
              <a slot="action" v-permission="{ active: 'farupd' }" @click="delet(record)">启用/禁用</a>
            </template>
          </a-table>
          <div>
            <a-pagination
              show-quick-jumper
              :default-current="offset"
              :total="total"
              show-less-items
              @change="onChange"
              :current="offset"
              style="margin: 10px;"
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
import { findAll, AddInfo, UpdateInfo, checkInfo, checkOFFs, getBindmobile, getDeleteBindmobile } from '@/api/yzc'
import http from '@/utils/httpapi'
// import QS from 'qs'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import breeding from '@/api/breeding'
import replaceAddress from '@/utils/replaceAddress'
import Clfunid from '@/utils/Clfunid'

// import { type } from 'mockjs2'
const EditableCell = {
  template: `
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper">
          <a-input :value="value" @change="handleChange" @pressEnter="check" /><a-icon
            type="check"
            class="editable-cell-icon-check"
            @click="check"
          />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ value || ' ' }}
          <a-icon type="edit" class="editable-cell-icon" @click="edit" />
        </div>
      </div>
    `,
  props: {
    text: String
  },
  data () {
    return {
      value: this.text,
      editable: false
    }
  },
  methods: {
    handleChange (e) {
      const value = e.target.value
      this.value = value
    },
    check () {
      this.editable = false
      this.$emit('change', this.value)
    },
    edit () {
      this.editable = true
    }
  }
}
var yenum = 1
// 畜种种类
const typeChZ = ['猪', '奶牛', '肉牛', '羊', '蛋鸡', '肉鸡（含小公鸡）', '蛋鸭', '肉鸭', '肉兔', '种兔', '鹅', '其它']
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
  { title: '编号', width: 300, align: 'center', dataIndex: 'FSmemo2', key: 'FSmemo2' },
  { title: '养殖场（户）名称', width: 300, align: 'center', dataIndex: 'FSyzcmc', key: 'FSyzcmc' },
  { title: '养殖场类型', width: 150, align: 'center', dataIndex: 'FSyzclx', key: 'FSyzclx' },
  {
    title: '经营状态',
    width: 150,
    align: 'center',
    dataIndex: 'FSzt',
    key: 'FSzt',
    customRender: (t, r, index) => {
      if (t) {
        return '已注销'
      } else {
        return '已启用'
      }
    }
  },
  {
    title: '地址',
    width: 300,
    align: 'center',
    dataIndex: 'FSdz',
    key: 'FSdz',
    customRender: (t, r, index) => {
      return t ? t.split('/').join('') : ''
    }
  },
  { title: '负责人', width: 150, align: 'center', dataIndex: 'FSfzr', key: 'FSfzr' },
  { title: '联系电话', width: 150, align: 'center', dataIndex: 'FSlxdh', key: 'FSlxdh' },
  {
    title: '畜种种类',
    width: 120,
    align: 'center',
    dataIndex: 'FSxz',
    key: 'FSxz',
    customRender: (t, r, index) => {
      return t
    }
  },
  { title: '饲养品种', width: 200, align: 'center', dataIndex: 'FScypz', key: 'FScypz' },
  { title: '企业占地亩数', width: 150, align: 'center', dataIndex: 'FSzdms', key: 'FSzdms' },
  { title: '设计存栏', width: 200, align: 'center', dataIndex: 'FSsjcl', key: 'FSsjcl' },
  { title: '设计年出栏', width: 200, align: 'center', dataIndex: 'FSsjncl', key: 'FSsjncl' },
  { title: '是否直连直报中备案', width: 200, align: 'center', dataIndex: 'FSzlba', key: 'FSzlba' },
  { title: '是否配建粪污处理设施', width: 200, align: 'center', dataIndex: 'FSpjwfss', key: 'FSpjwfss' },
  { title: '粪污处理设施配建内容', width: 200, align: 'center', dataIndex: 'FSwfpjnr', key: 'FSwfpjnr' },
  { title: '粪污处理设施配建体积（立方）', width: 250, align: 'center', dataIndex: 'FSwfpjtj', key: 'FSwfpjtj' },
  { title: '统一社会信用代码', width: 200, align: 'center', dataIndex: 'FSxydm', key: 'FSxydm' },
  { title: '身份证号码', width: 200, align: 'center', dataIndex: 'FSsfzhm', key: 'FSsfzhm' },
  { title: '银行卡号/一卡通号', width: 200, align: 'center', dataIndex: 'FSyhkh', key: 'FSyhkh' },
  // { title: '身份证/一卡通照片（合照）', width: 150, dataIndex: 'FSsfzimage', key: 'FSsfzimage' },
  { title: '实际存栏', width: 150, align: 'center', dataIndex: 'Fnsjcl', key: 'Fnsjcl' },
  { title: '实际年出栏', width: 150, align: 'center', dataIndex: 'Fnsjncl', key: 'Fnsjncl' },
  // { title: '动物防疫条件合格证', width: 200, dataIndex: 'FSdwfyhgz', key: 'FSdwfyhgz' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 180,
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
// 表中表
const columns1 = [
  { title: '企业名称', width: 200, align: 'center', dataIndex: 'EnterpriseName', key: 'EnterpriseName' },
  { title: '电话号码', width: 200, align: 'center', dataIndex: 'Mobile', key: 'Mobile' },
  { title: '操作', width: 100, dataIndex: 'cz', key: 'cz', scopedSlots: { customRender: 'action' } }
]
// 修改的表
const columns2 = [
  { title: '企业名称', width: 200, align: 'center', dataIndex: 'FSenterpriseName', key: 'FSenterpriseName' },
  { title: '电话号码', width: 200, align: 'center', dataIndex: 'TelePhone', key: 'TelePhone' },
  { title: '操作', width: 100, dataIndex: 'cz', key: 'cz', scopedSlots: { customRender: 'action' } }
]

const data1 = [
  {
    xuhao: 1,
    qyname: '11111',
    dhhh: '11111'
  },
  {
    xuhao: 2,
    qyname: '11111',
    dhhh: '11111'
  },
  {
    xuhao: 3,
    qyname: '11111',
    dhhh: '11111'
  }
]

export default {
  inject: ['reload'],
  name: 'BaseForm',
  components: {
    EditableCell
  },
  data () {
    return {
      // 根据行政查出的地址数据
      FsuIdaddress: {},
      // 经营状态
      FSztInfo: 0,
      typeChZ,
      f: true,
      idList: '',
      // 每页条数
      limit: 10,
      // 当前页
      offset: 1,
      // 总条数
      total: 0,
      // 地图显示隐藏
      mapShow: false,
      // ModalTextmap: '请不要输入错误噢~',
      confirmLoadingmap: false,
      center: { FLongittude: '120.39629', FLatitude: '36.30744' },
      // 暂存地址
      centerNow: { FLongittude: '120.39629', FLatitude: '36.30744' },
      addr: '',
      options: [],
      value: 1,
      hasSelected: 'true',

      // from 表单
      form: this.$form.createForm(this),
      form1: this.$form.createForm(this),
      SYHform: this.$form.createForm(this),

      // 点击 新增弹出框
      // ModalText: '请不要输入错误噢~',
      visible: false,
      fintinfo: false,
      updateinfo: false,
      deletinfo: false,
      deletinfo1: false,
      confirmLoading: false,
      // 照片
      // 动物防疫合格证
      FSdwfyhgz: [],
      data,
      columns,
      data1,
      columns1,
      columns2,
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      selectedRowKeys: [],
      loading: false,
      number: 0,
      formDate: '',
      site: '',
      resultType: '',
      isShowZxqc: false,
      isShowLicense: false,
      isShowPeiJian: false,
      isShowFSwfpjnr: false,
      isShowNormalYz: false,
      isShowGmAndYz: false, // 是否是规模养殖场或养殖专业户
      FSunitUstrId: sessionStorage.getItem('FSunitUstrId'),
      FSyzcmc: '',
      FSfzr: '',
      UserId: sessionStorage.getItem('FStId'),
      // 新数据图片头
      photoTop: 'data:image/jpg;base64,',
      // 旧数据图片头
      photoTopOld: 'http://qdxmsupervision.qingdao.gov.cn:8181/QDPT',
      // 身份证照片
      IDcardP: [],
      // 种畜企业生产经营许可证
      FSzxjyxkzP: [],
      // 动物防疫合格证
      FSdwfyhgzP: [],
      // 区，动监站选择
      regionTF: false,
      regInfo: [],
      peoTF: false,
      peoInfo: [],
      // 区名称
      regName: '请选择',
      // 动监站名称
      peoName: '请选择',
      // 禁用启用的状态
      FSzt: 0,
      // 是否是散养户
      syhTF: false,
      // 默认隐藏
      infoTF: false,
      // 散养户是否添加了数据
      addSYTF: false,
      dataSource: [
        // {
        //   FSxz: '畜种种类',
        //   FScypz: '畜饲养品种',
        //   FSsjcl: '设计存栏',
        //   FSsjncl: '设计年出栏'
        // }
      ],
      dataSourceSJ: [],
      count: 0,
      isloading: false,
      columnsT: [
        {
          title: '畜种种类',
          dataIndex: 'FSxz',
          width: '30%',
          key: 'FSxz'
        },
        {
          title: '饲养品种',
          dataIndex: 'FScypz',
          key: 'FScypz'
        },
        {
          title: '设计存栏',
          dataIndex: 'FSsjcl',
          key: 'FSsjcl'
        },
        {
          title: '设计年出栏',
          dataIndex: 'FSsjncl',
          key: 'FSsjncl'
        },
        {
          title: '操作',
          dataIndex: 'cz',
          key: 'cz',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      columnsY: [
        {
          title: '畜种种类',
          dataIndex: 'FSxz',
          width: '30%',
          key: 'FSxz'
        },
        {
          title: '饲养品种',
          dataIndex: 'FScypz',
          key: 'FScypz'
        },
        {
          title: '设计存栏',
          dataIndex: 'FSsjcl',
          key: 'FSsjcl'
        },
        {
          title: '设计年出栏',
          dataIndex: 'FSsjncl',
          key: 'FSsjncl'
        }
      ],
      columnsL: [
        {
          title: '企业名称',
          dataIndex: 'UserName',
          width: '50%',
          align: 'center',
          key: 'UserName'
        },
        {
          title: '电话号码',
          width: '50%',
          align: 'center',
          dataIndex: 'TelePhone',
          key: 'TelePhone'
        }
      ],
      FSunitIdItme: '',
      FSunitUstrIdItem: '',
      FSunitNameItem: '',
      addSYH: false,
      addSYHInfo: 0
    }
  },
  created () {
    this.isloading = true
    yenum = 1
    // 行政树
    getAdminAddress()
      .then(res => {
        // console.log(res)
        // this.options = JSON.parse(res)
        this.options = res
        this.regInfo = res[0].children
        this.regionTF = true
        this.FsuIdaddress = Clfunid(this.options)
      })
      .catch(err => {
        console.log(err)
      })
    var that = this
    var p = {
      limit: that.limit,
      offset: that.offset,
      FSunitUstrId: this.FSunitUstrId,
      FSyzcmc: this.FSyzcmc,
      FSfzr: this.FSfzr,
      UserId: this.UserId,
      FSzt: this.FSztInfo
    }
    findAll(p).then(res => {
      // console.log(res)
      // console.log(JSON.parse(res.Data))
      that.data = JSON.parse(res.Data).rows
      that.total = JSON.parse(res.Data).total
      this.isloading = false
    })
  },
  beforeUpload (file, fileList) {
    // console.log('之前')
    // console.log(file, fileList)
  },
  // mounted () {

  // },
  methods: {
    selectShow (v) {
      // console.log(v)
      if (v === '已注销') {
        this.FSztInfo = 1
      } else {
        this.FSztInfo = 0
      }
      var that = this
      var p = {
        limit: that.limit,
        offset: that.offset,
        FSunitUstrId: this.FSunitUstrId,
        FSyzcmc: this.FSyzcmc,
        FSfzr: this.FSfzr,
        UserId: this.UserId,
        FSzt: this.FSztInfo
      }
      findAll(p).then(res => {
        // console.log(res)
        // console.log(JSON.parse(res.Data))
        that.data = JSON.parse(res.Data).rows
        that.total = JSON.parse(res.Data).total
      })
    },
    // 市级选择触发
    ChangeTown (val) {
      // console.log(val)
    },
    ChangeRegion (val) {
      // console.log(val)
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

        // console.log(this.regName, this.peoName)
      }
    },
    // 模糊查询
    mocheck (checkedValues, e) {
      // console.log(checkedValues, e, this.queryParam.id)
      if (!checkedValues.length && this.queryParam.id === '') {
        this.reload()
      }
      // console.log(this.queryParam.id)
      if (!e) {
        if (!this.queryParam.id) this.reload()
        this.FSfzr = this.queryParam.id
        this.FSyzcmc = this.queryParam.id
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
            // console.log(this.FSunitUstrId)
          }
        })
        // for (var i = 0; i < e.length; i++) {
        //   this.FSunitUstrId = e[e.length - 1].key
        // }
      }
      // console.log(this.FSunitUstrId)
      yenum = 1
      this.limit = 10
      this.offset = 1
      var that = this
      var p = {
        limit: that.limit,
        offset: that.offset,
        FSunitUstrId: this.FSunitUstrId,
        FSyzcmc: this.FSyzcmc,
        FSfzr: this.FSfzr,
        UserId: this.UserId,
        FSzt: this.FSztInfo
      }
      findAll(p).then(res => {
        that.data = JSON.parse(res.Data).rows
        that.total = JSON.parse(res.Data).total
      })
    },
    handleReset () {
      this.form.resetFields()
    },
    // ---------------------地图方法---[]
    handler: function ({ BMap, map }) {
      map.enableScrollWheelZoom(true)
      this.BMap = BMap
      this.map = map
      // this.center.FeJd = ''
      var point = new BMap.Point(this.center.FLongittude, this.center.FLatitude)
      map.centerAndZoom(point, 13)
      var marker = new BMap.Marker(point) // 创建标注
      map.addOverlay(marker) // 将标注添加到地图中
      // const hide = this.$message.loading('正在获取当前省市请稍候..', 0)
      const _this = this
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(
        function (r) {
          // setTimeout(hide, 10)
          // console.log(r)
          _this.center = { FLongittude: '120.39629', FLatitude: '36.30744' } // 设置center属性值
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
      // console.log(e.point)
      // console.log(e)
      const gc = new this.BMap.Geocoder()
      gc.getLocation(e.point, function (rs) {
        this.form.setFieldsValue({
          addr: rs.address,
          FLongittude: rs.point.lng,
          FLatitude: rs.point.lat
        })
      })
    },
    maplist: function (e) {
      // console.log(e)
      // console.log(e.point.lng + ',' + e.point.lat)
      this.center.FLongittude = e.point.lng
      this.center.FLatitude = e.point.lat
      this.map.clearOverlays()
      var newPint = new this.BMap.Point(this.center.FLongittude, this.center.FLatitude)
      var marker = new this.BMap.Marker(newPint) // 创建标注
      this.map.addOverlay(marker) // 将标注添加到地图中
      this.map.panTo(newPint)

      this.form.setFieldsValue({
        FLongittude: e.point.lng,
        FLatitude: e.point.lat
      })
    },
    // 地图弹窗
    mapatlas (mapName) {
      this.mapShow = true
    },
    normFile (e) {
      // console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    // data 表格删除
    delet (v) {
      // console.log('删除')
      // console.log(v)
      this.deletinfo = true
      this.number = v.FStId
      this.FSzt = v.FSzt
      // console.log(this.number)
    },
    // 删除所有
    DeleteAll () {
      this.$axios({
        method: 'post',
        url: http + '/HarmlessProcess/GetYZCSC?FStId=' + this.idList
      }).then(res => {
        setTimeout(() => {
          this.$notification.success({
            message: '删除成功'
          })
        }, 100)
        this.reload()
      })
    },
    find (v) {
      // console.log(v)
      if (v.FSzt) {
        this.$notification.error({
          message: '该养殖场数据已被禁用，请联系管理人员'
        })
      } else {
        this.f = false
        var p = {
          FStId: v.FStId
        }
        checkInfo(p)
          .then(res => {
            this.IDcardP = []
            this.FSzxjyxkzP = []
            this.FSdwfyhgzP = []
            console.log(res)
            var Clres = res.Data.FarmsInfos
            this.dataSourceSJ = res.Data.Mobiles
            console.log(this.dataSourceSJ)

            console.log(Clres)
            if (Clres[0].FSzxjyxkz) {
              if (Clres[0].FSzxjyxkz.length > 5000) {
                this.FSzxjyxkzP = [{ src: this.photoTop + Clres[0].FSzxjyxkz }]
              } else {
                this.FSzxjyxkzP = [{ src: this.photoTopOld + Clres[0].FSzxjyxkz }]
              }
            }
            // console.log(Clres[0].FSsfzimg)
            if (Clres[0].FSsfzimg) {
              if (Clres[0].FSsfzimg.length > 5000) {
                this.IDcardP = [{ src: this.photoTop + Clres[0].FSsfzimg }]
              } else {
                this.IDcardP = [{ src: this.photoTopOld + Clres[0].FSsfzimg }]
              }
            }
            if (Clres[0].FSdwfyhgz) {
              if (Clres[0].FSdwfyhgz.length > 5000) {
                this.FSdwfyhgzP = [{ src: this.photoTop + Clres[0].FSdwfyhgz }]
              } else {
                this.FSdwfyhgzP = [{ src: this.photoTopOld + Clres[0].FSdwfyhgz }]
              }
            }

            if (Clres[0].FSyzclx === '散养户') {
              // console.log('执行了，散养户赋值')
              this.syhTF = true
              if (Clres[0].FSxz) {
                this.dataSource = []
                this.addSYTF = true
                Clres.forEach(item => {
                  this.dataSource.push({
                    FSxz: item.FSxz || '',
                    FSsjncl: item.FSsjncl || '',
                    FSsjcl: item.FSsjcl || '',
                    FScypz: item.FScypz || ''
                  })
                })
              }
            } else {
              this.setFarmType(Clres[0].FSyzclx, 'isData')
              this.callTogetherShow(Clres[0].FSzxqc, Clres[0].FSpjwfss, Clres[0].FSwfpjnr, Clres[0].FSzcyz)
            }

            var item = Clres[0]
            // 给对应的表单元素赋值
            if (item.FSpjwfss === '否' || !item.FSpjwfss) {
              this.isShowPeiJian = false
            } else {
              this.isShowPeiJian = true
            }
            this.updateinfo = true
            this.$nextTick(() => {
              this.form.setFieldsValue({
                FStId: item.FStId,
                FSyzcmc: item.FSyzcmc,
                FSyzclx: item.FSyzclx,
                // FSdz: item.FSdz,
                FSfzr: item.FSfzr,
                FSlxdh: item.FSlxdh,
                FSxz: item.FSxz,
                FScypz: item.FScypz,
                FSzdms: item.FSzdms,
                FSsjcl: item.FSsjcl,
                FSsjncl: item.FSsjncl,
                FSzxqc: item.FSzxqc,
                FSzlba: item.FSzlba,
                FSpjwfss: item.FSpjwfss,
                FSzcyz: item.FSzcyz,
                FSwfpjnr: item.FSwfpjnr,
                FSwfpjtj: item.FSwfpjtj,
                FSxydm: item.FSxydm,
                FSsfzhm: item.FSsfzhm,
                FSyhkh: item.FSyhkh,
                // FSsfzimage: 1,
                // FSdwfyhgz: 1,
                Fnsjcl: item.Fnsjcl,
                Fnsjncl: item.Fnsjncl,
                FSxxdz: (item.FSdz + item.FSxxdz).replace(/\//g, '') || '',
                // FSmemo2: item.FSmemo2,
                FLongittude: item.FLongittude,
                FLatitude: item.FLatitude,
                FSfyhgztext: item.FSfyhgztext,
                FSjyxkztext: item.FSjyxkztext,
                FSqt: item.FSqt
              })
              // console.log(this.form.getFieldValue('FSzcyz') + '###22#')
            })
          })
          .catch(rol => {
            console.log(rol)
          })
      }
    },
    // 修改
    update (v) {
      if (v.FSzt) {
        this.$notification.error({
          message: '该养殖场数据已被禁用，请联系管理人员'
        })
      } else {
        this.formDate = 'update'
        console.log('修改' + v.FStId)
        this.addSYHInfo = v.FStId
        this.$axios({
          method: 'get',
          url: http + '/HarmlessProcess/SelectYZC?FStId=' + v.FStId
        })
          .then(res => {
            var redCl = res.data.Data.FarmsInfos
            this.dataSourceSJ = res.data.Data.Mobiles

            if (redCl[0].FSzxjyxkz) {
              this.FSzxjyxkzP = [{ src: this.photoTop + redCl[0].FSzxjyxkz }]
            }
            if (redCl[0].FSsfzimg) {
              this.IDcardP = [{ src: this.photoTop + redCl[0].FSsfzimg }]
            }
            if (redCl[0].FSdwfyhgz) {
              this.FSdwfyhgzP = [{ src: this.photoTop + redCl[0].FSdwfyhgz }]
            }

            var Clres = JSON.parse(localStorage.getItem('AllInfo'))
            this.regInfo = this.options[0].children

            if (redCl[0].FSunitUstrId.length === 2) {
              this.regName = '请选择'
              this.peoName = '请选择'
              if (redCl[0].FSxxdz === '') {
                redCl[0].FSxxdz = redCl[0].FSdz.slice(3) || ''
              }
            } else if (redCl[0].FSunitUstrId.length === 4) {
              this.regInfo.forEach(item => {
                if (item.key === redCl[0].FSunitUstrId) {
                  this.regName = item.label
                  this.peoInfo = item.children
                  this.peoName = '请选择'
                  if (redCl[0].FSxxdz === '') {
                    redCl[0].FSxxdz = redCl[0].FSdz.slice(this.regName.length + 3) || ''
                  }
                }
              })
            } else if (redCl[0].FSunitUstrId.length === 6) {
              this.regInfo.forEach(item => {
                if (item.key === redCl[0].FSunitUstrId.slice(0, 4)) {
                  this.regName = item.label
                  this.peoInfo = item.children
                  item.children.forEach(itemt => {
                    if (itemt.key === redCl[0].FSunitUstrId) {
                      this.peoName = itemt.label
                      if (redCl[0].FSxxdz === '') {
                        redCl[0].FSxxdz = redCl[0].FSdz.slice(this.regName.length + this.peoName.length + 3) || ''
                      }
                    }
                  })
                }
              })
            } else {
              this.regInfo.forEach(item => {
                if (item.key === redCl[0].FSunitUstrId.slice(0, 4)) {
                  this.regName = item.label
                  this.peoInfo = item.children
                  item.children.forEach(itemt => {
                    if (itemt.key === redCl[0].FSunitUstrId.slice(0, 6)) {
                      this.peoName = itemt.label
                      if (redCl[0].FSxxdz === '') {
                        redCl[0].FSxxdz = redCl[0].FSdz.slice(this.regName.length + this.peoName.length + 3) || ''
                      }
                    }
                  })
                }
              })
            }
            var Claddress = replaceAddress(redCl[0].FSdz.replace(/\//g, ''), this.options) || []
            if (Claddress && Claddress.length) {
              if (Claddress.length === 1) {
                this.updateinfo = true
                this.regInfo = this.options[0].children
                this.peoTF = false
                this.peoName = '请选择'
                this.regName = '请选择'
              } else if (Claddress.length === 2) {
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

            if (Clres.FSunitUstrId.length === 2) {
              this.regInfo = this.options[0].children
              this.peoInfo = this.regInfo[0].children
            } else if (Clres.FSunitUstrId.length === 4) {
              this.options[0].children.forEach(item => {
                if (item.label === Clres.FSunitName) {
                  this.regInfo = [item]
                  this.peoInfo = this.regInfo[0].children
                }
              })
            } else if (Clres.FSunitUstrId.length === 6) {
              this.options[0].children.forEach(item => {
                if (item.children) {
                  item.children.forEach(itemt => {
                    if (itemt.label === Clres.FSunitName) {
                      this.regInfo = item
                      this.peoInfo = itemt
                    }
                  })
                }
              })
            }

            // console.log(this.regName, this.peoName)
            if (redCl[0].FSyzclx === '散养户') {
              console.log('执行了估值')
              this.$nextTick(() => {
                this.SYHform.setFieldsValue({
                  EnterpriseName: redCl[0].FSyzcmc
                })
              })

              // console.log('执行了，散养户赋值')
              this.syhTF = true
              if (redCl[0].FSxz) {
                this.dataSource = []
                this.addSYTF = true
                redCl.forEach(item => {
                  this.dataSource.push({
                    FSxz: item.FSxz || '',
                    FSsjncl: item.FSsjncl || '',
                    FSsjcl: item.FSsjcl || '',
                    FScypz: item.FScypz || ''
                  })
                })
              }
            } else {
              this.setFarmType(redCl[0].FSyzclx, 'isData')

              this.callTogetherShow(redCl[0].FSzxqc, redCl[0].FSpjwfss, redCl[0].FSwfpjnr, redCl[0].FSzcyz)
            }

            if (redCl[0].FSpjwfss === '否' || !redCl[0].FSpjwfss) {
              this.isShowPeiJian = false
            } else {
              this.isShowPeiJian = true
            }
            // 给对应的表单元素赋值
            this.updateinfo = true

            this.f = true
            // console.log(this.f)
            this.FSunitIdItme = redCl[0].FSunitId
            this.FSunitNameItem = redCl[0].FSunitName
            this.FSunitUstrIdItem = redCl[0].FSunitUstrId
            this.$nextTick(() => {
              this.form.setFieldsValue({
                FStId: redCl[0].FStId,
                FSyzcmc: redCl[0].FSyzcmc,
                FSyzclx: redCl[0].FSyzclx,
                // FSdz: this.site,
                FSfzr: v.FSfzr,
                FSlxdh: redCl[0].FSlxdh,
                FSxz: redCl[0].FSxz,
                FScypz: redCl[0].FScypz,
                FSzdms: redCl[0].FSzdms,
                FSsjcl: redCl[0].FSsjcl,
                FSsjncl: redCl[0].FSsjncl,
                FSzxqc: redCl[0].FSzxqc,
                FSzlba: redCl[0].FSzlba,
                FSpjwfss: redCl[0].FSpjwfss,
                FSzcyz: redCl[0].FSzcyz,
                FSwfpjnr: redCl[0].FSwfpjnr,
                FSwfpjtj: redCl[0].FSwfpjtj,
                FSxydm: redCl[0].FSxydm,
                FSsfzhm: redCl[0].FSsfzhm,
                FSyhkh: redCl[0].FSyhkh,
                // FSsfzimage: 1,
                // FSdwfyhgz: 1,
                Fnsjcl: redCl[0].Fnsjcl,
                Fnsjncl: redCl[0].Fnsjncl,
                FSxxdz: redCl[0].FSxxdz,
                // FSmemo2: redCl[0].FSmemo2,
                FLongittude: redCl[0].FLongittude,
                FLatitude: redCl[0].FLatitude,
                FSfyhgztext: redCl[0].FSfyhgztext,
                FSjyxkztext: redCl[0].FSjyxkztext,
                FSqt: redCl[0].FSqt
              })

              if (this.dataSource.length) {
                this.form.setFieldsValue({
                  FSxz: '猪',
                  FSsjncl: '',
                  FSsjcl: '',
                  FScypz: ''
                })
              }
            })
          })
          .catch(rol => {
            // console.log(rol)
          })
      }
    },
    handleSelectChange (value) {
      // console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    onChange (checkedValues) {
      yenum = checkedValues
      // console.log('checked = ', checkedValues)
      var that = this
      this.offset = checkedValues
      var p = {
        limit: that.limit,
        offset: that.offset,
        FSunitUstrId: this.FSunitUstrId,
        FSyzcmc: this.FSyzcmc,
        FSfzr: this.FSfzr,
        UserId: this.UserId,
        FSzt: this.FSztInfo
      }
      findAll(p).then(res => {
        that.data = JSON.parse(res.Data).rows
        that.total = JSON.parse(res.Data).total
      })
    },
    onChanges (checkedValues, checkedre) {
      // console.log('checked = ', checkedValues, checkedre)
      for (var i = 0; i < checkedValues.length; i++) {
        if (i === 0) {
          this.site = checkedre[i].label
        } else {
          this.site = this.site + '/' + checkedre[i].label
        }
      }
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      var arr = ''
      selectedRows.forEach(item => {
        arr = arr + ',' + item.FStId
      })
      this.idList = arr.substring(1)
    },
    hideAll () {
      this.resultType = ''
      this.isShowZxqc = false
      this.isShowGmAndYz = false
      this.isShowLicense = false
      this.isShowPeiJian = false
      this.isShowFSwfpjnr = false
      this.isShowNormalYz = false
    },
    setFarmType (FSyzclx, type) {
      // 养殖场类型判断获取
      this.hideAll()
      // console.log(FSyzclx, type)
      var FSyzclxVal = ''
      var formObj = this.form

      if (type !== 'isData') {
        // 操作新增页面时
        var FSxz = formObj.getFieldValue('FSxz') // 畜种种类
        var FSsjcl = formObj.getFieldValue('FSsjcl') // 设计存栏
        var FSsjncl = formObj.getFieldValue('FSsjncl') // 设计年出栏
        FSyzclxVal = breeding(FSxz, FSsjcl, FSsjncl)
      } else if (FSyzclx) {
        // 后台的数据控制
        FSyzclxVal = FSyzclx
      }

      if (FSyzclxVal && FSyzclxVal.indexOf('未填写') === -1) {
        this.resultType = '结果：' + FSyzclxVal
        this.infoTF = true
        if (FSyzclxVal === '散养户') {
          formObj.setFieldsValue({
            FSyzclx: '散养户'
          })
          this.syhTF = true
        } else if (this.dataSource.length === 0) {
          this.syhTF = false
          if (FSyzclxVal === '规模养殖场') this.isShowZxqc = true
          else this.isShowZxqc = false
          if (FSyzclxVal === '规模养殖场' || FSyzclxVal === '养殖专业户') {
            this.isShowGmAndYz = true
          } else this.isShowGmAndYz = false

          formObj.setFieldsValue({
            FSyzclx: FSyzclxVal
          })
        }
      } else {
        this.hideAll()
      }
    },
    // 是否是种畜禽场
    showLicenseFile (obj) {
      // console.log(obj)
      if (obj) {
        if (obj.split('').indexOf('是') !== -1) {
          this.isShowLicense = true
        } else {
          this.isShowLicense = false
        }
      }
    },
    // 是否配建粪污处理设施
    showPeiJian (obj) {
      // console.log(obj)
      // console.log(obj ? obj.replace(' ', '') : obj==='')
      if (obj) {
        if (obj.split('').indexOf('是') !== -1) {
          this.isShowPeiJian = true
        } else {
          // console.log(this.isShowPeiJian, '执行了赋值')
          this.isShowPeiJian = false
        }
      }
    },
    // 配建内容选择
    showFSwfpjnr (obj) {
      if (obj === '其他') {
        this.isShowFSwfpjnr = true
      } else {
        this.isShowFSwfpjnr = false
      }
    },
    // 是否正常运转
    showNormalYz (obj) {
      // console.log(obj)
      if (obj) {
        if (obj.split('').indexOf('是') !== -1) {
          this.isShowNormalYz = true
        } else {
          this.isShowNormalYz = false
        }
      }
    },
    callTogetherShow (FSzxqc, FSpjwfss, FSwfpjnr, FSzcyz) {
      // 统一调用显示隐藏的方法
      this.showLicenseFile(FSzxqc)
      this.showPeiJian(FSpjwfss)
      this.showFSwfpjnr(FSwfpjnr)
      this.showNormalYz(FSzcyz)
    },
    // 新增的查看地址
    showPermiseer () {
      var Clres = JSON.parse(localStorage.getItem('AllInfo'))
      if (Clres.FSunitUstrId.length === 2) {
        this.regName = '崂山区'
        this.regInfo = this.options[0].children
        this.peoName = '北宅'
        this.peoInfo = this.regInfo[0].children
      } else if (Clres.FSunitUstrId.length === 4) {
        this.options[0].children.forEach(item => {
          if (item.label === Clres.FSunitName) {
            this.regInfo = [item]
            this.regName = item.label
            this.peoInfo = this.regInfo[0].children
            // console.log(this.regInfo)
            this.peoName = this.peoInfo[0].label
          }
        })
      } else if (Clres.FSunitUstrId.length === 6) {
        this.options[0].children.forEach(item => {
          if (item.children) {
            item.children.forEach(itemt => {
              if (itemt.label === Clres.FSunitName) {
                this.regName = item.label
                this.regInfo = item
                this.peoName = itemt.label
                this.peoInfo = itemt
              }
            })
          }
        })
      }
    },

    // 新增弹窗
    showModal (formName) {
      this.showPermiseer()
      this.visible = true
      this.f = false
      this.formDate = 'add'
      this.regInfo = this.FsuIdaddress.regInfo
      this.peoInfo = this.FsuIdaddress.peoInfo
      this.regName = this.FsuIdaddress.regName
      this.peoName = this.FsuIdaddress.peoName
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
      }, 10)
    },
    // data 表格删除关闭按钮方法
    handleOk1 () {
      var pres = {
        FStId: this.number,
        FSzt: this.FSzt,
        FuseEid: this.number
        // FuseEid: sessionStorage.getItem('FuseEid')
      }
      if (this.FSzt) {
        pres.FSzt = 0
      } else {
        pres.FSzt = 1
      }
      // console.log(pres)
      checkOFFs(pres).then(res => {
        if (res.Result) {
          if (pres.FSzt) {
            this.$notification.success({
              message: '禁用成功'
            })
          } else {
            this.$notification.success({
              message: '启用成功'
            })
          }

          this.deletinfo = false
          this.reload()
        }
      })
    },
    // data1 表格删除关闭按钮方法
    handleOk2 () {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.data1 = this.data1.filter(item => parseInt(item.xuhao) !== this.number)
        this.deletinfo1 = false
        this.confirmLoading = false
      }, 1000)
    },
    // 公用取消按钮方法
    handleCancel (e) {
      // console.log('点击了取消')
      this.visible = false
      this.deletinfo = false
      this.updateinfo = false
      this.form.resetFields()
      this.peoName = '请选择'
      this.regName = '请选择'
      this.peoTF = false
      // 显示隐藏控制，回归初始状态
      this.isShowZxqc = false
      this.isShowLicense = false
      this.isShowPeiJian = false
      this.isShowFSwfpjnr = false
      this.isShowNormalYz = false
      this.resultType = ''
      // 散养户控制
      this.addSYTF = false
      this.syhTF = false
      this.dataSource = []
      this.infoTF = false
      this.addSYH = false
      this.dataSourceSJ = []
      this.f = false
      this.reload()
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
        FLongittude: this.center.FLongittude,
        FLatitude: this.center.FLatitude
      })
    },
    // 地图 取消按钮方法
    handleCancelmap (e) {
      // console.log('点击了取消')
      this.mapShow = false
    },

    // 修改上传图片时
    uploadChange (info, text) {
      // console.log('-----------------')
      // console.log(info)
      // console.log(text)
      for (let i = 0; i < info.fileList.length; i++) {
        info.fileList[i].response = '上传成功'
      }
      if (info.file.status === 'error') {
      } else if (info.file.status === 'done') {
        if (text === 'FSzxjyxkz') {
          this.FSzxjyxkzP = []
        } else if (text === 'FSdwfyhgz') {
          this.FSdwfyhgzP = []
        } else if (text === 'FSsfzimg') {
          this.IDcardP = []
        }
      }
    },
    // 动态增加散养户列表
    onCellChange (key, dataIndex, value) {
      const dataSource = [...this.dataSource]
      const target = dataSource.find(item => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.dataSource = dataSource
      }
    },
    // 散养户列表删除
    onDelete (val, key) {
      const dataSource = [...this.dataSource]
      this.form.setFieldsValue({
        FSxz: '猪',
        FScypz: '',
        FSsjcl: '',
        FSsjncl: ''
      })
      // console.log(val, key)
      this.dataSource = dataSource.filter(item => item !== key)
      if (!this.dataSource.length) {
        this.syhTF = false
      }
      // console.log(this.dataSource)
    },
    // 散养户列表新增
    handleAdd () {
      this.addSYTF = true
      const { count, dataSource } = this
      const newData = {
        FSxz: this.form.getFieldValue('FSxz'),
        FScypz: this.form.getFieldValue('FScypz'),
        FSsjcl: this.form.getFieldValue('FSsjcl'),
        FSsjncl: this.form.getFieldValue('FSsjncl')
      }
      this.dataSource = [...dataSource, newData]
      this.count = count + 1
      this.form.setFieldsValue({
        FSxz: '猪',
        FScypz: '',
        FSsjcl: '',
        FSsjncl: ''
      })
    },
    // 散养户新增电话事件
    SYHAdd (e) {
      e.preventDefault()
      this.SYHform.validateFields((err, v) => {
        if (!err) {
          if (this.dataSourceSJ.length < 3) {
            this.addBindmobile(v)
          } else {
            this.$notification.error({
              message: '每位散养户最多只能绑定三个手机号'
            })
          }
        } else {
          this.$notification.error({
            message: '请检查输入信息'
          })
        }
      })
    },
    // 新增电话方法
    addBindmobile (v) {
      var p = {
        FStId: this.addSYHInfo || 0,
        Mobile: this.SYHform.getFieldValue('Mobile'),
        EnterpriseName: this.SYHform.getFieldValue('EnterpriseName'),
        Type: 3,
        UserId: this.UserId
      }
      if (this.FSyzclxVal === '结果：规模养殖场') {
        p.Type = 1
      }
      if (this.FSyzclxVal === '结果：种畜禽场') {
        p.Type = 2
      }
      if (this.FSyzclxVal === '结果：散养户') {
        p.Type = 3
      }
      if (this.FSyzclxVal === '结果：养殖专业户') {
        p.Type = 4
      }

      getBindmobile(p).then(res => {
        if (res === '保存成功！') {
          if (!this.f) {
            this.dataSourceSJ.push({
              Mobile: v.Mobile,
              EnterpriseName: v.EnterpriseName
            })
          } else {
            this.dataSourceSJ.push({
              TelePhone: v.Mobile,
              FSenterpriseName: v.EnterpriseName
            })
          }

          this.$notification.success({
            message: res
          })
        } else {
          this.$notification.error({
            message: res
          })
        }
      })
    },
    SYHdel (text, record) {
      if (this.dataSourceSJ.length) {
        if (this.f) {
          this.dataSourceSJ.forEach((item, index) => {
            if (item.TelePhone === record.TelePhone) {
              this.dataSourceSJ.splice(index, 1)
            }
          })
          getDeleteBindmobile(record.TelePhone).then(res => {
            console.log(res)
            this.$notification.success({
              message: res
            })
          })
        } else {
          this.dataSourceSJ.forEach((item, index) => {
            if (item.Mobile === record.Mobile) {
              this.dataSourceSJ.splice(index, 1)
            }
          })
          getDeleteBindmobile(record.Mobile).then(res => {
            console.log(res)
            this.$notification.success({
              message: res
            })
          })
        }
      }
    },
    //  from表单验证
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, v) => {
        // console.log(v)
        var fileFSsfykt = ''
        if (!err) {
          var getRes = this.form.getFieldValue('FSxxdz') || ''
          // console.log(getRes)
          var addressAdmin = ''
          if (this.regName === '请选择') {
            addressAdmin = '青岛市'
          } else if (this.peoName === '请选择') {
            addressAdmin = '青岛市' + this.regName
          } else {
            addressAdmin = '青岛市' + this.regName + this.peoName
          }

          // addressAdmin += getRes
          var that = this
          if (v.FSsfzimg) {
            fileFSsfykt = v.FSsfzimg.file.thumbUrl.split(',')
          } else if (this.IDcardP.length) {
            // console.log(this.IDcardP)
            fileFSsfykt = this.IDcardP[0].src.split(',')
          }
          var FSjyxkzphto = ''
          if (v.FSzxjyxkz) {
            FSjyxkzphto = v.FSzxjyxkz.file.thumbUrl.split(',')
          } else if (this.FSzxjyxkzP.length) {
            // console.log(this.FSzxjyxkzP)
            FSjyxkzphto = this.FSzxjyxkzP[0].src.split(',')
          }
          var FSdwfyhgzphto = ''
          if (v.FSdwfyhgz) {
            FSdwfyhgzphto = v.FSdwfyhgz.file.thumbUrl.split(',')
          } else if (this.FSdwfyhgzP.length) {
            // console.log(this.FSdwfyhgzP)
            FSdwfyhgzphto = this.FSdwfyhgzP[0].src.split(',')
          }
          // console.log(FSjyxkzphto)
          // 新增
          if (that.formDate === 'add') {
            this.addSYH = true
            var p = {
              Type: [],
              FarmsRecord: {
                FSyzcmc: v.FSyzcmc,
                FSyzclx: v.FSyzclx,
                FSdz: addressAdmin,
                FSfzr: v.FSfzr,
                FSlxdh: v.FSlxdh,
                FSxz: v.FSxz,
                FScypz: v.FScypz,
                FSzdms: v.FSzdms,
                FSsjcl: v.FSsjcl,
                FSsjncl: v.FSsjncl,
                FSzlba: v.FSzlba,
                FSpjwfss: v.FSpjwfss,
                FSwfpjnr: v.FSwfpjnr,
                FSwfpjtj: v.FSwfpjtj,
                FSxydm: v.FSxydm,
                FSsfzhm: v.FSsfzhm,
                FSyhkh: v.FSyhkh,
                Fnsjcl: v.Fnsjcl,
                Fnsjncl: v.Fnsjncl,
                FSzcyz: v.FSzcyz,
                FSdwfyhgz: FSdwfyhgzphto.length ? FSdwfyhgzphto[1] : '',
                FSsfzimg: fileFSsfykt.length ? fileFSsfykt[1] : '',
                FSzxjyxkz: FSjyxkzphto ? FSjyxkzphto[1] : '',
                FSzxqc: v.FSzxqc,
                FSxxdz: getRes,
                // FSmemo2: v.FSmemo2,
                FLongittude: v.FLongittude,
                FLatitude: v.FLatitude,
                FSfyhgztext: v.FSfyhgztext,
                FSjyxkztext: v.FSjyxkztext,
                FSqt: v.FSqt
              }
            }
            if (this.dataSource.length !== 0) {
              this.dataSource.forEach(item => {
                p.Type.push({
                  FCategory: item.FSxz || '',
                  Fvariety: item.FScypz || '',
                  Fsjcl: item.FSsjcl || '',
                  Fsjncl: item.FSsjncl || ''
                })
              })
            }

            AddInfo(JSON.parse(JSON.stringify(p)), this.UserId)
              .then(res => {
                // console.log(p)
                console.log(res)

                if (res.Msg === '已存在该手机号,请重新输入') {
                  this.addSYH = false
                  return this.$notification.error({
                    message: '已存在该手机号,请重新输入'
                  })
                } else {
                  setTimeout(() => {
                    this.$notification.success({
                      message: '新增成功'
                    })
                  }, 10)
                  this.addSYHInfo = res.Data
                  if (res.Result) {
                    this.addSYH = true
                    this.$nextTick(() => {
                      this.SYHform.setFieldsValue({
                        EnterpriseName: this.form.getFieldValue('FSyzcmc')
                      })
                    })
                  } else {
                    this.addSYH = false
                  }
                  // this.offset = 1
                  // this.visible = false
                  // this.reload()
                }
              })
              .catch(rol => {
                this.addSYH = false
              })
            // 修改
          } else if (that.formDate === 'update') {
            var pp = {
              Type: [],
              FarmsRecord: {
                FStId: v.FStId,
                FSyzcmc: v.FSyzcmc,
                FSyzclx: v.FSyzclx,
                FSdz: addressAdmin,
                FSfzr: v.FSfzr,
                FSlxdh: v.FSlxdh,
                FSxz: v.FSxz,
                FScypz: v.FScypz,
                FSzdms: v.FSzdms,
                FSsjcl: v.FSsjcl,
                FSsjncl: v.FSsjncl,
                FSzlba: v.FSzlba,
                FSpjwfss: v.FSpjwfss,
                FSwfpjnr: v.FSwfpjnr,
                FSwfpjtj: v.FSwfpjtj,
                FSxydm: v.FSxydm,
                FSsfzhm: v.FSsfzhm,
                FSyhkh: v.FSyhkh,
                Fnsjcl: v.Fnsjcl,
                Fnsjncl: v.Fnsjncl,
                FSzcyz: v.FSzcyz,
                // FSdwfyhgz: v.FSdwfyhgz,
                FSdwfyhgz: FSdwfyhgzphto.length ? FSdwfyhgzphto[1] : '',
                FSsfzimg: fileFSsfykt.length ? fileFSsfykt[1] : '',
                FSzxjyxkz: FSjyxkzphto ? FSjyxkzphto[1] : '',
                FSzxqc: v.FSzxqc,
                FSxxdz: getRes,
                // FSmemo2: v.FSmemo2,
                FLongittude: v.FLongittude,
                FLatitude: v.FLatitude,
                FSfyhgztext: v.FSfyhgztext,
                FSjyxkztext: v.FSjyxkztext,
                FSqt: v.FSqt || '',
                FSunitId: '',
                FSunitUstrId: '',
                FSunitName: ''
              }
            }
            if (this.regName === '请选择') {
              addressAdmin = '青岛市'
            } else if (this.peoName === '请选择') {
              addressAdmin = '青岛市' + this.regName
            } else {
              addressAdmin = '青岛市' + this.regName + this.peoName
            }
            if (this.regName === '请选择' && this.peoName === '请选择') {
              pp.FarmsRecord.FSunitId = this.options[0].value
              pp.FarmsRecord.FSunitUstrId = this.options[0].key
              pp.FarmsRecord.FSunitName = this.options[0].label
            } else if (this.regName !== '请选择' && this.peoName === '请选择') {
              this.options[0].children.forEach(item => {
                if (item.label === this.regName) {
                  pp.FarmsRecord.FSunitId = item.value
                  pp.FarmsRecord.FSunitUstrId = item.key
                  pp.FarmsRecord.FSunitName = item.label
                }
              })
            } else {
              // console.log(this.peoName)
              this.options[0].children.forEach(item => {
                if (item.children) {
                  item.children.forEach(itemt => {
                    if (itemt.label === this.peoName) {
                      // console.log(itemt)
                      pp.FarmsRecord.FSunitId = itemt.value
                      pp.FarmsRecord.FSunitUstrId = itemt.key
                      pp.FarmsRecord.FSunitName = itemt.label
                    }
                  })
                }
              })
            }
            if (this.dataSource.length !== 0) {
              this.dataSource.forEach(item => {
                pp.Type.push({
                  FCategory: item.FSxz,
                  Fvariety: item.FScypz,
                  Fsjcl: item.FSsjcl,
                  Fsjncl: item.FSsjncl
                })
              })
            }
            // console.log(pp)
            UpdateInfo(JSON.parse(JSON.stringify(pp)), this.UserId).then(res => {
              // console.log(res)
              setTimeout(() => {
                this.$notification.success({
                  message: '修改成功'
                })
              }, 100)
              this.offset = 1
              this.visible = false
              this.reload()
            })
          }
          // console.log('Received values of form: ', v)
        } else {
          this.$notification.error({
            message: '请检查输入信息'
          })
        }
        // console.log(err)
      })
    }
  }
}
</script>
<style scoped>
.all {
  border-top: 1px solid black;
  font-size: 30px;
}
.btn[data-v-5933f4da] {
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
