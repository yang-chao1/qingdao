<template>
  <div>
    <page-header-wrapper>
      <div class="div1">
        <div class="div3">
          <a-form layout="inline" style="margin-top:30px;">
            <a-row :gutter="48">
              <div class="div5">
                <a-col :sm="24">
                  <a-form-item label="养殖场名称">
                    <a-input v-model="queryParam.id" placeholder="" size="large" />
                  </a-form-item>
                  <a-form-item >
                    <a-button type="primary" style="height:40px" @click="mocheck">查询</a-button>
                  </a-form-item>
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
                    <!-- <a-button type="primary" style="height:40px" @click="$refs.table.refresh(true)">查询</a-button> -->
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
            <!-- <a-button type="primary" style="height:40px" icon="plus" @click="showModal()">新增</a-button>&nbsp;&nbsp;&nbsp;&nbsp; -->

            <!-- 查看 -->
            <a-modal
              cancelText="取消"
              okText="确定"
              title="审核详情"
              :visible="findinfo"
              :confirm-loading="confirmLoading"
              @ok="handleOk"
              @cancel="handleCancel"
              :footer="null"
              width="1000px"
              destroyOnClose
            >
              <!-- 审核详情查看及确认审核通过 -->

              <a-form @submit="handleSubmitOK" :form="form">
                <a-row>
                  <a-col :span="12" style="display:none;">
                    <a-form-item
                      label="id"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input v-decorator="['FStId']" name="FStId" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="养殖场（户）名称"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input name="FSyzcmc" v-decorator="['FSyzcmc']" disabled />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="养殖场类型"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input name="FSyzclx" v-decorator="['FSyzclx']" disabled />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="地址"
                      :labelCol="{ lg: { span: 11 }, sm: { span: 11 } }"
                      :wrapperCol="{ lg: { span: 11 }, sm: { span: 11 } }"
                    >
                      <a-input name="FSdz" v-decorator="['FSdz']" disabled />
                      <!-- <a-cascader disabled :options="options" placeholder="所在地" @change="onChanges"> </a-cascader> -->
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="负责人"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input name="FSfzr" v-decorator="['FSfzr']" disabled />
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
                      <a-input disabled name="FSlxdh" v-decorator="['FSlxdh']" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="企业占地亩数"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input name="FSzdms" disabled v-decorator="['FSzdms']" />
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
                      <a-input name="FSxz" disabled v-decorator="['FSxz']" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="畜饲养品种"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input name="FScypz" disabled v-decorator="['FScypz']" />
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
                      <a-input name="FSsjcl" disabled v-decorator="['FSsjcl']" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="设计年出栏"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input name="FSsjncl" v-decorator="['FSsjncl']" disabled />
                    </a-form-item>
                  </a-col>
                </a-row>

                <!-- 类型判断 -->
                <!-- 散养户时隐藏 -->
                <div v-if="syhTF">
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="是否是种畜禽场"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <!-- <a-select v-decorator="['FSzxqc']" placeholder="是否是种畜禽场" @change="showLicenseFile($event)" disabled>
                        <a-select-option value="是">
                          是
                        </a-select-option>
                        <a-select-option value="否">
                          否
                        </a-select-option>
                      </a-select> -->
                        <a-input name="FSzxqc" disabled v-decorator="['FSzxqc']" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12" v-if="isShowLicense">
                      <a-form-item
                        label="种畜企业生产经营许可证"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }">
                        <viewer
                          :images="zxqcP"
                          style="width: 100px;">
                          <img
                            v-for="(item, index) in zxqcP"
                            :src="item.src"
                            :key="index"
                            style="width:30px; height:30px;"
                          />
                        </viewer>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="是否直连直报中备案"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input name="FSzlba" disabled v-decorator="['FSzlba']" />
                      <!-- <a-select
                        disabled
                        v-decorator="['FSzlba', { rules: [{ required: true, message: '请输入' }] }]"
                        @change="handleSelectChange"
                      >
                        <a-select-option value="是">
                          是
                        </a-select-option>
                        <a-select-option value="否">
                          否
                        </a-select-option>
                     </a-select> -->
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="是否配建粪污处理设施"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input disabled name="FSpjwfss" v-decorator="['FSpjwfss']" />
                      <!-- <a-select
                        disabled
                        v-decorator="['FSpjwfss', { rules: [{ required: true, message: '请输入' }] }]"
                        @change="handleSelectChange"
                      >

                        <a-select-option value="是">
                          是
                        </a-select-option>
                        <a-select-option value="否">
                          否
                        </a-select-option>
                      </a-select> -->
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="是否正常运转"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input name="FSzcyz" disabled v-decorator="['FSzcyz']" />
                      <!-- <a-select
                        disabled
                        v-decorator="['normal', { rules: [{ required: true, message: '请输入' }] }]"
                        @change="handleSelectChange"
                      >
                        <a-select-option value="是">
                          是
                        </a-select-option>
                        <a-select-option value="否">
                          否
                        </a-select-option>
                      </a-select> -->
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="配建内容 "
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input disabled name="FSwfpjnr" v-decorator="['FSwfpjnr']" />
                      <!-- <a-select
                        disabled
                        v-decorator="['FSwfpjnr', { rules: [{ required: true, message: '请输入' }] }]"
                        @change="handleSelectChange"
                      >
                        <a-select-option value="污水池">
                          污水池
                        </a-select-option>
                        <a-select-option value="焚烧厂">
                          焚烧厂
                        </a-select-option>
                      </a-select> -->
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :span="12">
                      <a-form-item
                        label="粪污处理设施配件体积（立方）"
                        :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input name="FSwfpjtj" v-decorator="['FSwfpjtj']" disabled />
                      </a-form-item>
                    </a-col>
                    <a-col :span="12">
                      <a-form-item
                        label="统一社会信用代码"
                        :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                        :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                      >
                        <a-input name="FSxydm" v-decorator="['FSxydm']" disabled />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </div>

                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="实际存栏"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input name="Fnsjcl" v-decorator="['Fnsjcl']" disabled />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="实际年出栏"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input name="Fnsjncl" v-decorator="['Fnsjncl']" disabled />
                    </a-form-item>
                  </a-col>
                </a-row>
                <!--  <a-row>
                 <a-col
                    :span="12">
                    <a-form-item
                      label="动物防疫条件合格证"
                      :labelCol="{lg: {span: 12}, sm: {span: 12}}"
                      :wrapperCol="{lg: {span: 10}, sm: {span: 10} }">
                      <a-input
                        v-decorator="['dwjbjcbgbh' , { rules: [{ required: true, message: '请输入' }] }]"/>
                    </a-form-item>
                  </a-col>

                </a-row> -->
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="银行卡号/一卡通号"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input name="FSyhkh" v-decorator="['FSyhkh']" disabled />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item
                      label="身份证号码"
                      :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                    >
                      <a-input name="FSsfzhm" v-decorator="['FSsfzhm']" disabled />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="身份证/一卡通照片（合照）"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }">
                      <viewer
                        :images="IDcardP"
                        style="width: 100px;">
                        <img
                          v-for="(item, index) in IDcardP"
                          :src="item.src"
                          :key="index"
                          style="width:30px; height:30px;"
                        />
                      </viewer>
                    </a-form-item>
                  </a-col>
                </a-row>
                <!-- <a-row>
                  <a-col :span="12">
                    <a-form-item
                      label="上传厂容场貌图片"
                      :labelCol="{ lg: { span: 12 }, sm: { span: 12 } }"
                      :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"

                        <img :src="" alt="">
              <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" list-type="picture">
                                <a-button disabled> <a-icon type="upload" /> 上传 </a-button>
                              </a-upload>
                  </a-form-item>
                  </a-col>
                </a-row> -->
                <div v-if="tongguo" class="tab" style="margin-top: 80px; width: 80%; margin: 80px auto 60px;">
                  <a-row type="flex" justify="center" align="bottom" style="height: 60px;">
                    <a-col :span="24" style="height: 60px;">
                      <div>
                        <p style="height: 60px; line-height: 60px;">基层动监站审核情况</p>
                      </div>
                    </a-col>
                  </a-row>
                  <a-row type="flex" justify="space-between" align="bottom">
                    <a-col :span="5">
                      <div>
                        <p>审核单位</p>
                      </div>
                    </a-col>
                    <a-col :span="7">
                      <a-form-item :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }">
                        <a-input v-decorator="['FSshdw']" disabled style="margin-left:10px;" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="5">
                      <div>
                        <p>审核时间</p>
                      </div>
                    </a-col>
                    <a-col :span="7">
                      <a-form-item :wrapperCol="{ lg: { span: 22 }, sm: { span: 22 } }">
                        <a-input v-decorator="['FSshdate']" disabled style="margin-left:10px;" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row type="flex" justify="space-between" align="bottom">
                    <a-col :span="5">
                      <div>
                        <p>审核人</p>
                      </div>
                    </a-col>
                    <a-col :span="7">
                      <a-form-item :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }">
                        <a-input v-decorator="['FSshr']" disabled style="margin-left:10px;" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="5">
                      <div>
                        <p>审核意见</p>
                      </div>
                    </a-col>
                    <a-col :span="7">
                      <a-form-item :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }" style="display: none">
                        <a-input v-decorator="['FSzt']" style="margin-left:10px;" />
                      </a-form-item>
                      <a-form-item :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }">
                        <a-radio :defaultChecked="true">{{ this.ly === true ? '驳回' : '通过' }}</a-radio>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row v-if="this.ly">
                    <a-col :span="5">
                      <div>
                        <p>驳回理由</p>
                      </div>
                    </a-col>
                    <a-col :span="19">
                      <a-form-item :wrapperCol="{ lg: { span: 16 }, sm: { span: 16 } }">
                        <a-input v-decorator="['FSbhly']" disabled style="margin-left:10px;" />
                      </a-form-item>
                    </a-col>
                  </a-row>
                </div>
                <a-row type="flex" justify="center" v-show="this.findBtn">
                  <a-col :span="10">
                    <a-button type="primary" html-type="submit" style="width:150px; height: 40px; margin-left: 120px;">
                      审核通过
                    </a-button>
                  </a-col>
                  <a-col :span="10">
                    <a-button type="danger" style="width:150px; height: 40px; margin-left: 100px;" @click="bh()">
                      驳回
                    </a-button>
                  </a-col>
                </a-row>
              </a-form>
            </a-modal>
            <!-- 驳回 -->
            <a-modal
              cancelText="取消"
              okText="确定"
              title="驳回"
              :visible="bohui"
              :confirm-loading="confirmLoading"
              @ok="handleSubmitNO"
              @cancel="bohuiCancel"
              width="600px"
            >
              <a-form @submit="handleSubmitNO" :form="form">
                <a-form-item
                  label="审核人"
                  :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                >
                  <a-input disabled v-decorator="['FSshr']" />
                </a-form-item>
                <a-form-item
                  label="驳回理由"
                  :labelCol="{ lg: { span: 8 }, sm: { span: 8 } }"
                  :wrapperCol="{ lg: { span: 10 }, sm: { span: 10 } }"
                >
                  <a-textarea
                    placeholder="驳回理由"
                    :rows="4"
                    v-decorator="['FSbhly', { rules: [{ required: true, message: '请输入' }] }]"
                  />
                </a-form-item>
              </a-form>
            </a-modal>
            <!-- --------------------------操作按钮--------------------------------------- -->
            <a-button type="primary" style="height:40px" @click="handleEdit()">列表定制</a-button
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <a-button type="primary" style="height:40px" @click="handleOkInfo()">审核</a-button>&nbsp;&nbsp;&nbsp;&nbsp;

            <!-- --------------------------地点位置------------------------------------- -->
            <!-- <a-cascader
              style="margin-top: -1px ;width: 250px;float:right;"
              :options="options"
              placeholder="所在地"
              size="large"
              @change="mocheck"
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
              <a slot="action" v-permission="{active:'regsele'}" @click="find(record)">查看&nbsp;&nbsp;</a>
            </template>
          </a-table>
          <div>
            <a-pagination
              show-quick-jumper
              :default-current="offset"
              :total="total"
              show-less-items
              :current="offset"
              @change="onChange"
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
import { FindAll, FindInfoByFStId, AddInfo, BHInfo } from '@/api/zcsh'
import { GetToken } from '@/api/getToken'
// import QS from 'qs'
import { getAdminAddress } from '@/api/AdministrativeAddress'
import { getTime } from '@/utils/time'
var yenum = 1
const columns = [
  {
    title: '序号',
    width: 80,
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
  {
    title: '状态',
    width: 180,
    align: 'center',
    dataIndex: 'FSzt',
    key: 'FSzt',
    customRender: (t, r, index) => {
      if (!t) {
        return '已申请'
      } else if (t === 1) {
        return '基层动监站审核通过'
      } else {
        return '驳回'
      }
    }
  },
  { title: '养殖场（户）名称', width: 250, align: 'center', dataIndex: 'FSyzcmc', key: 'FSyzcmc' },
  { title: '养殖场类型', width: 200, align: 'center', dataIndex: 'FSyzclx', key: 'FSyzclx' },
  { title: '地址', width: 250, align: 'center', dataIndex: 'FSdz', key: 'FSdz' },
  { title: '负责人', width: 150, align: 'center', dataIndex: 'FSfzr', key: 'FSfzr' },
  { title: '联系电话', width: 150, align: 'center', dataIndex: 'FSlxdh', key: 'FSlxdh' },
  { title: '畜种', width: 150, align: 'center', dataIndex: 'FSxz', key: 'FSxz' },
  { title: '饲养品种', width: 150, align: 'center', dataIndex: 'FScypz', key: 'FScypz' },
  { title: '企业占地亩数', width: 180, align: 'center', dataIndex: 'FSzdms', key: 'FSzdms' },
  { title: '设计存栏', width: 200, align: 'center', dataIndex: 'FSsjcl', key: 'FSsjcl' },
  { title: '设计年出栏', width: 200, align: 'center', dataIndex: 'FSsjncl', key: 'FSsjncl' },
  { title: '是否直连直报中备案', width: 200, align: 'center', dataIndex: 'FSzlba', key: 'FSzlba' },
  { title: '是否配建粪污处理设施', width: 200, align: 'center', dataIndex: 'FSpjwfss', key: 'FSpjwfss' },
  { title: '粪污处理设施配件内容', width: 200, align: 'center', dataIndex: 'FSwfpjnr', key: 'FSwfpjnr' },
  { title: '粪污处理设施配件体积（立方）', width: 250, align: 'center', dataIndex: 'FSwfpjtj', key: 'FSwfpjtj' },
  { title: '统一社会信用代码', width: 200, align: 'center', dataIndex: 'FSxydm', key: 'FSxydm' },
  { title: '身份证号码', width: 200, align: 'center', dataIndex: 'FSsfzhm', key: 'FSsfzhm' },
  { title: '银行卡号/一卡通号', width: 200, align: 'center', dataIndex: 'FSyhkh', key: 'FSyhkh' },
  // { title: '身份证/一卡通照片（合照）', width: 150, dataIndex: 'FSsfzimage', key: 'FSsfzimage' },
  { title: '实际存栏', width: 200, align: 'center', dataIndex: 'Fnsjcl', key: 'Fnsjcl' },
  { title: '实际年出栏', width: 200, align: 'center', dataIndex: 'Fnsjncl', key: 'Fnsjncl' },
  // { title: '动物防疫条件合格证', width: 200, dataIndex: 'FSdwfyhgz', key: 'FSdwfyhgz' },
  {
    title: '操作',
    key: 'cz',
    fixed: 'right',
    width: 150,
    scopedSlots: { customRender: 'action' }
  }
]

const data = []
// 表中表
const columns1 = [
  { title: '序号', width: 80, dataIndex: 'xuhao', key: 'xuhao' },
  { title: '企业名称', width: 200, dataIndex: 'qyname', key: 'qyname' },
  { title: '电话号码', width: 200, dataIndex: 'dhhh', key: 'dhhh' },
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
  data () {
    return {

      ly: false,
      bohui: false,
      tongguo: false,
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
      center: { lng: '120.39629', lat: '36.30744' },
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

      // 点击 新增弹出框
      ModalText: '',
      visible: false,
      findinfo: false,
      confirmLoading: false,

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
      formDate: '',
      site: '',
      findBtn: false,
      // 要审核或要查看的FStId
      plFStId: 0,
      FSyzcmc: '',
      FSunitUstrId: sessionStorage.getItem('FSunitUstrId'),
      UserId: sessionStorage.getItem('FStId'),
      FuName: sessionStorage.getItem('FuName'),
      photoTop: 'data:image/jpg;base64,',
      IDcardP: [], // 身份证照片
      zxqcP: [], // 种畜禽场许可证
      isShowLicense: false,
      syhTF: false
    }
  },

  created () {
    yenum = 1
    getAdminAddress()
      .then(res => {
        // this.options = JSON.parse(res)
        this.options = res
      })
      .catch(err => {
        console.log(err)
      })
    var that = this
    GetToken().then(res => {
      var p = {
        limit: that.limit,
        offset: that.offset,
        FSunitUstrId: this.FSunitUstrId,
        FSyzcmc: this.FSyzcmc,
        UserId: this.UserId
      }
      FindAll(p).then(res => {
        console.log(res)
        console.log(JSON.parse(res.Data))
        that.data = JSON.parse(res.Data).rows
        that.total = JSON.parse(res.Data).total
      })
    })
  },
  methods: {
    // 模糊查询
    mocheck (checkedValues, e) {
      // console.log(e)
      // console.log(checkedValues, e, this.queryParam.id)
      // if (!checkedValues.length && this.queryParam.id === '') {
      //   this.reload()
      // }
      // console.log(this.queryParam.id)
      if (!e) {
        if (!this.queryParam.id) this.reload()
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
          }
        })
        console.log(this.FSunitUstrId)
        // for (var i = 0; i < e.length; i++) {
        //   this.FSunitUstrId = e[e.length - 1].key
        // }
      } else if (!e.length) {
        this.FSunitUstrId = sessionStorage.getItem('FSunitUstrId')
      }
      yenum = 1
      this.limit = 10
      this.offset = 1
      // var p = {
      //   limit: this.limit,
      //   offset: this.offset,
      //   FSunitUstrId: this.FSunitUstrId,
      //   FSyzcmc: this.FSyzcmc,
      //   UserId: this.UserId
      // }
      this.onChange(this.offset)
      // FindAll(p).then(res => {
      //   console.log(res)
      //   console.log(JSON.parse(res.Data))
      //   this.data = JSON.parse(res.Data).rows
      //   this.total = JSON.parse(res.Data).total
      // })
    },
    bohuiCancel () {
      this.form.resetFields()

      this.bohui = false
    },
    okbohui () {
      this.bohui = false
      this.tongguo = true
      this.ly = true
    },
    ok () {
      this.tongguo = true
      this.ly = false
      var date = new Date()
      var hh = date.getHours()
      var mm = date.getMinutes()
      var ss = date.getSeconds()
      var yy = date.getFullYear()
      var MM = date.getMonth()
      var dd = date.getDate()
      var nowday = new Date(yy, MM, dd, hh, mm, ss)
        .toLocaleString()
        .replace('年', '-')
        .replace('月', '-')
        .replace('日', '')
      this.$nextTick(() => {
        this.form.setFieldsValue({
          // FSshr:,
          FSshdw: '李四的单位',
          FSshr: '李四',
          FSshdate: nowday,
          FSzt: 1
        })
      })
    },
    bh () {
      this.bohui = true
      this.$nextTick(() => {
        // this.form.setFieldsValue({
        //   FSshr: this.FuName,
        //   FSbhly: this.form.getFieldsValue('FSbhly'),
        //   FSzt: 2
        // })
        this.form.setFieldsValue({
           FSshr: this.FuName
        })
      })
    },
    // data 表格查看
    find (v) {
      this.findBtn = false
      console.log(v)
      this.plFStId = v.FStId
      FindInfoByFStId(this.plFStId).then(res => {
        console.log(res)
         var Clres = res.Data
         this.showLicenseFile(Clres[0].FSzxqc)// 是否显示经营许可证
         this.IDcardP = [{ src: this.photoTop + Clres[0].FSsfzzp }]// 身份证合照
         this.zxqcP = [{ src: this.photoTop + Clres[0].FSzxjyxkz }]// 种畜禽场经营许可证
        this.findinfo = true
        if (Clres[0].FSyzclx === '散养户') {
          this.syhTF = false
        } else {
          this.syhTF = true
        }
        Clres.forEach((item, ind) => {
          if (!ind) {
            this.$nextTick(() => {
              this.form.setFieldsValue({
                FStId: item.FStId,
                FSguidId: item.FSguidId,
                FScTime: item.FScTime,
                FSuTime: item.FSuTime,
                FSuserId: item.FSuserId,
                FSuserName: item.FSuserName,
                FSunitId: item.FSunitId,
                FSunitUstrId: item.FSunitUstrId,
                FSunitName: item.FSunitName,
                FSenterpriseId: item.FSenterpriseId,
                FSenterpriseName: item.FSenterpriseName,
                FSaudit: item.FSaudit,
                FSreviewer: item.FSreviewer,
                FSmemo1: item.FSmemo1,
                FSmemo2: item.FSmemo2,
                FSmemo3: item.FSmemo3,
                FiDel: item.FiDel,
                FSm1: item.FSm1,
                FSm2: item.FSm2,
                FSm3: item.FSm3,
                FSm4: item.FSm4,
                FSm5: item.FSm5,
                FSyzcmc: item.FSyzcmc,
                FSyzclx: item.FSyzclx,
                FSdz: item.FSdz,
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
                FSwfpjnr: item.FSwfpjnr,
                FSwfpjtj: item.FSwfpjtj,
                FSxydm: item.FSxydm,
                FSsfzhm: item.FSsfzhm,
                FSyhkh: item.FSyhkh,
                Fnsjcl: item.Fnsjcl,
                Fnsjncl: item.Fnsjncl,
                FSzt: item.FSzt,
                FSzcyz: item.FSzcyz
              })
            })
          }
        })
      })
    },
    handleOkInfo () {
      if (this.selectedRowKeys.length > 1) {
        this.$notification.error({
          message: '一次只能选择一条数据进行审核'
        })
      } else if (!this.selectedRowKeys.length) {
        this.$notification.error({
          message: '请选择一条要审核的数据'
        })
      } else {
        this.findBtn = true
        this.findinfo = true
        FindInfoByFStId(this.plFStId).then(res => {
          console.log(res)
          this.findinfo = true
          res.Data.forEach((item, ind) => {
            if (!ind) {
              this.$nextTick(() => {
                this.form.setFieldsValue({
                  FStId: item.FStId,
                  FSguidId: item.FSguidId,
                  FScTime: item.FScTime,
                  FSuTime: item.FSuTime,
                  FSuserId: item.FSuserId,
                  FSuserName: item.FSuserName,
                  FSunitId: item.FSunitId,
                  FSunitUstrId: item.FSunitUstrId,
                  FSunitName: item.FSunitName,
                  FSenterpriseId: item.FSenterpriseId,
                  FSenterpriseName: item.FSenterpriseName,
                  FSaudit: item.FSaudit,
                  FSreviewer: item.FSreviewer,
                  FSmemo1: item.FSmemo1,
                  FSmemo2: item.FSmemo2,
                  FSmemo3: item.FSmemo3,
                  FiDel: item.FiDel,
                  FSm1: item.FSm1,
                  FSm2: item.FSm2,
                  FSm3: item.FSm3,
                  FSm4: item.FSm4,
                  FSm5: item.FSm5,
                  FSyzcmc: item.FSyzcmc,
                  FSyzclx: item.FSyzclx,
                  FSdz: item.FSdz,
                  FSfzr: item.FSfzr,
                  FSlxdh: item.FSlxdh,
                  FSxz: item.FSxz,
                  FScypz: item.FScypz,
                  FSzdms: item.FSzdms,
                  FSsjcl: item.FSsjcl,
                  FSsjncl: item.FSsjncl,
                  FSzlba: item.FSzlba,
                  FSpjwfss: item.FSpjwfss,
                  FSwfpjnr: item.FSwfpjnr,
                  FSwfpjtj: item.FSwfpjtj,
                  FSxydm: item.FSxydm,
                  FSsfzhm: item.FSsfzhm,
                  FSyhkh: item.FSyhkh,
                  Fnsjcl: item.Fnsjcl,
                  Fnsjncl: item.Fnsjncl,
                  FSzt: item.FSzt,
                  FSzcyz: item.FSzcyz
                })
              })
            }
          })
        })
        this.form.setFieldsValue({
          FStId: this.plFStId
        })
      }
    },

    handleSelectChange (value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    },
    onChange (checkedValues) {
      console.log('checked = ', checkedValues)
      var that = this
      this.offset = checkedValues
      yenum = checkedValues
      GetToken().then(res => {
        var p = {
          limit: that.limit,
          offset: that.offset,
          FSunitUstrId: this.FSunitUstrId,
          FSyzcmc: this.FSyzcmc,
          UserId: this.UserId
        }
        FindAll(p).then(res => {
          console.log(res)
          that.data = JSON.parse(res.Data).rows
          that.total = JSON.parse(res.Data).total
        })
      })
    },
    onChanges (checkedValues) {
      console.log('checked = ', checkedValues)
      for (var i = 0; i < checkedValues.length; i++) {
        this.site = this.site + '/' + checkedValues[i]
      }
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      if (this.selectedRowKeys.length === 0) {
        this.plFStId = this.data[selectedRowKeys].FStId
        console.log(this.plFStId)
      }
      this.selectedRowKeys = selectedRowKeys
    },
    showLicenseFile (obj) { // 是否是种畜禽场
      console.log(obj)
      if (obj === '是') {
        this.isShowLicense = true
      } else this.isShowLicense = false
    },
    // 新增弹窗
    showModal (formName) {
      this.visible = true
      this.formDate = 'add'
    },
    // 公用关闭按钮方法
    handleOk (e) {
      // this.ModalText = '弹窗在两秒后关闭'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.findinfo = false
        this.tongguo = false
        this.ly = false
        this.confirmLoading = false
      }, 1000)
    },
    // 公用取消按钮方法
    handleCancel (e) {
      console.log('点击了取消')
      this.plFStId = 0
      this.selectedRowKeys = []
      this.visible = false
      this.findinfo = false
      this.tongguo = false
      this.ly = false
    },
    //  from表单验证
    // handler
    handleSubmitOK (e) {
      e.preventDefault()
      console.log(this.plFStId)
      console.log(this.form.getFieldValue('FStId'))
      this.form.validateFields((err, v) => {
        console.log(v)
        if (!err) {
          var p = {
            FStId: v.FStId,
            FSshdw: sessionStorage.getItem('FuseEName'),
            FSshr: sessionStorage.getItem('FuName'),
            FSshdate: getTime(),
            FSshyj: '同意',
            UserId: this.UserId
          }
          AddInfo(p).then(res => {
            if (res.Result) {
              this.$notification.success({
                message: '审核成功'
              })
              this.reload()
            }
            console.log(res)
          })
          console.log('Received values of form: ', v)
        } else {
          this.$notification.error({
            message: '申请数据不完整或不符合规则，请联系管理人员'
          })
        }
      })
    },
    // handler
    handleSubmitNO (e) {
      e.preventDefault()
      this.form.validateFields((err, v) => {
        if (!err) {
          var p = {
            FStId: v.FStId,
            // FSunitUstrId: sessionStorage.getItem('FSunitUstrId'),
            FSshdw: sessionStorage.getItem('FuseEName'),
            FSshr: sessionStorage.getItem('FuName'),
            FSshdate: getTime(),
            FSshyj: '驳回',
            FSbhly: v.FSbhly,
            UserId: this.UserId
          }
          BHInfo(p).then(res => {
            if (res.Result) {
              this.$notification.success({
                message: '驳回成功'
              })
              this.bohui = false
              this.tongguo = true
              this.ly = true
              this.reload()
            }
            console.log(res)
          })
          console.log('Received values of form: ', v)
        }
      })
    },
    // 列表定制
    handleEdit () {
      this.$notification.error({
        message: '待开发，敬请期待'
      })
    }
  }
}
</script>
<style scoped>
.upload-list-inline >>> .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
}
.all {
  border-top: 1px solid black;
  font-size: 30px;
}
.btn[data-v-d287e032] {
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
.tab div {
  height: 40px;
  border: rgba(0, 0, 0, 0.11) 1px solid;
  line-height: 40px;
  text-align: center;
  margin: -1px;
}
.tab input {
  background-color: white;
  border: none;
}
.tab p {
  background-color: wheat;
}
</style>
